import { getCached, setCached } from "./cache";
import { parseRssXml } from "./rss-parser";
import type { IndustryNewsItem, IndustryNewsSource, NewsItem } from "../types/newsroom";

const RSS_URL = "https://api.blockchainwire.io/feed-rss.xml";
const CACHE_KEY = "newsroom_feed";
const CACHE_TTL = 600000; // 10 minutes

const FALLBACK_URLS = [
  RSS_URL,
  "https://corsproxy.io/?url=" + encodeURIComponent(RSS_URL),
  "https://api.allorigins.win/raw?url=" + encodeURIComponent(RSS_URL),
];

export async function fetchNewsroomFeed(): Promise<NewsItem[]> {
  // Check cache first
  const cached = getCached(CACHE_KEY);
  if (cached && Array.isArray(cached)) {
    console.log("[Newsroom API] Serving from cache");
    return cached as NewsItem[];
  }

  // Try each fallback URL
  for (const url of FALLBACK_URLS) {
    try {
      console.log("[Newsroom API] Fetching from:", url.split("?")[0] || url);
      const response = await fetch(url, {
        headers: {
          Accept: "application/rss+xml, application/xml, text/xml",
        },
      });

      if (!response.ok) {
        console.warn(`[Newsroom API] HTTP ${response.status} from ${url.split("?")[0] || url}`);
        continue;
      }

      const xml = await response.text();
      const items = parseRssXml(xml);

      if (items.length > 0) {
        console.log(`[Newsroom API] Successfully fetched ${items.length} items`);
        setCached(CACHE_KEY, items, CACHE_TTL);
        return items;
      }
    } catch (error) {
      console.warn(`[Newsroom API] Failed to fetch from ${url.split("?")[0] || url}:`, error);
    }
  }

  console.error("[Newsroom API] All fetch attempts failed");
  return [];
}

// ─── Industry news ────────────────────────────────────────────────────────────

const INDUSTRY_API = "https://api.blockchainwire.io/website/read-partners-feed";
const INDUSTRY_CACHE_TTL = 600000; // 10 minutes
const INDUSTRY_ALL_CACHE_KEY = "industry_news_all_v4";

interface RawSource {
  industry_news_id: string;
  industry_news_name: string;
  industry_news_image: string;
  industry_news_url: string;
  industry_news_status?: number;
}

interface IndustrySourceFull extends IndustryNewsSource {
  url: string;
}

function rssUrlWithHigherLimit(url: string): string {
  // GlobeNewswire limits results with /Max/N — raise the cap
  return url.replace(/\/Max\/\d+$/, "/Max/50");
}

async function fetchSourceRss(source: IndustrySourceFull): Promise<IndustryNewsItem[]> {
  const feedUrl = rssUrlWithHigherLimit(source.url);
  // Try proxies first — partner feeds don't allow CORS from browser origins
  const attempts = [
    "https://corsproxy.io/?url=" + encodeURIComponent(feedUrl),
    "https://api.allorigins.win/raw?url=" + encodeURIComponent(feedUrl),
    feedUrl,
  ];

  for (const url of attempts) {
    try {
      console.log(`[Industry RSS] ${source.name}: trying ${url.slice(0, 60)}`);
      const res = await fetch(url, {
        headers: { Accept: "application/rss+xml, application/xml, text/xml" },
      });
      if (!res.ok) {
        console.warn(`[Industry RSS] ${source.name}: HTTP ${res.status}`);
        continue;
      }
      const xml = await res.text();
      const newsItems = parseRssXml(xml);
      if (newsItems.length > 0) {
        return newsItems.map((item) => ({
          title: item.title,
          link: item.link,
          isoDate: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
          pubDate: item.pubDate,
          contentSnippet: item.description.slice(0, 280).trim(),
          feedTitle: source.name,
          feedDefaultImage: source.image,
          creator: item.creator,
          categories: item.category ? [item.category] : [],
          image: item.image ?? null,
        }));
      }
    } catch (err) {
      console.warn(`[Industry RSS] ${source.name}: failed ${url.slice(0, 60)}`, err instanceof Error ? err.message : err);
      continue;
    }
  }
  console.error(`[Industry RSS] ${source.name}: all attempts failed`);
  return [];
}

async function fetchIndustrySources(): Promise<IndustrySourceFull[]> {
  const cacheKey = "industry_sources";
  const cached = getCached(cacheKey);
  if (cached) return cached as IndustrySourceFull[];

  const response = await fetch(INDUSTRY_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ page: 1 }),
  });
  if (!response.ok) throw new Error(`Industry sources API returned ${response.status}`);
  const json = await response.json();

  const sources: IndustrySourceFull[] = (json.industryNews ?? [])
    .filter((s: RawSource) => s.industry_news_status !== 0 && s.industry_news_url)
    .map((s: RawSource) => ({
      id: s.industry_news_id,
      name: s.industry_news_name,
      image: s.industry_news_image,
      url: s.industry_news_url,
    }));

  setCached(cacheKey, sources, INDUSTRY_CACHE_TTL);
  return sources;
}

export async function fetchAllIndustryNews(): Promise<{
  items: IndustryNewsItem[];
  sources: IndustryNewsSource[];
}> {
  const cached = getCached(INDUSTRY_ALL_CACHE_KEY);
  if (cached) return cached as { items: IndustryNewsItem[]; sources: IndustryNewsSource[] };

  const sources = await fetchIndustrySources();
  const batches = await Promise.all(sources.map(fetchSourceRss));

  const seen = new Set<string>();
  const allItems = batches
    .flat()
    .filter((item) => {
      const key = item.link || item.title.slice(0, 100);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime());

  const result = {
    items: allItems,
    sources: sources.map((s) => ({ id: s.id, name: s.name, image: s.image })),
  };
  setCached(INDUSTRY_ALL_CACHE_KEY, result, INDUSTRY_CACHE_TTL);
  return result;
}

