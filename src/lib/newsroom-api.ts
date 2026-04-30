import { getCached, setCached } from "./cache";
import { parseRssXml } from "./rss-parser";
import type { NewsItem } from "../types/newsroom";

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
