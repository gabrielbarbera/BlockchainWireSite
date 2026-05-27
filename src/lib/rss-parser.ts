import { XMLParser } from "fast-xml-parser";
import type { NewsItem } from "../types/newsroom";

interface MediaContent {
  "@_url"?: string;
  "@_medium"?: string;
}

interface RssItem {
  title?: string;
  link?: string;
  pubDate?: string;
  description?: string;
  "content:encoded"?: string;
  "dc:creator"?: string;
  category?: string | { "#text": string }[] | string[];
  guid?: string | { "#text": string };
  "media:content"?: MediaContent | MediaContent[];
  "media:thumbnail"?: MediaContent;
  enclosure?: MediaContent;
}

interface RssFeed {
  rss?: {
    channel?: {
      item?: RssItem | RssItem[];
    };
  };
}

export function parseRssXml(xml: string): NewsItem[] {
  try {
    const parser = new XMLParser({
      ignoreAttributes: false,
      parseTagValue: true,
    });

    const parsed = parser.parse(xml) as RssFeed;
    const items = parsed.rss?.channel?.item;

    if (!items) return [];

    const itemsArray = Array.isArray(items) ? items : [items];
    return itemsArray
      .map((item, index) => normalizeItem(item, index))
      .filter((item): item is NewsItem => item !== null);
  } catch (error) {
    console.error("[RSS Parser] Failed to parse RSS XML:", error);
    return [];
  }
}

function normalizeItem(item: RssItem, index: number): NewsItem | null {
  if (!item.title || !item.link) return null;

  const creator = item["dc:creator"]?.trim() || "";
  let category = "Press Release";

  if (item.category) {
    if (typeof item.category === "string") {
      category = item.category.trim();
    } else if (Array.isArray(item.category)) {
      const firstCategory = item.category[0];
      if (typeof firstCategory === "string") {
        category = firstCategory.trim();
      } else if (typeof firstCategory === "object" && firstCategory && "#text" in firstCategory) {
        category = String(firstCategory["#text"]).trim();
      }
    }
  }

  const title = String(item.title).trim();
  const link = String(item.link).trim();
  const fullDescription = item.description ? String(item.description) : "";
  const fullContent = item["content:encoded"] ? String(item["content:encoded"]) : fullDescription;

  let guid = "";
  if (item.guid) {
    if (typeof item.guid === "string") {
      guid = item.guid;
    } else if (typeof item.guid === "object" && "#text" in item.guid) {
      guid = String(item.guid["#text"]);
    }
  }

  const slug = extractSlug(link, title);
  const organization = extractOrganization(title, fullDescription) || "";
  const rawImage =
    extractFirstImage(fullContent) ||
    extractFirstImage(fullDescription) ||
    extractMediaImage(item);
  const image = rawImage ? upgradeImageUrl(rawImage) : undefined;

  return {
    id: `bw-${index}`,
    title,
    link,
    pubDate: item.pubDate ? String(item.pubDate).trim() : new Date().toISOString(),
    description: stripHtml(fullDescription),
    content: fullContent,
    creator,
    category,
    organization,
    guid: guid || link,
    slug,
    image: image ?? null,
  };
}

function extractOrganization(title: string, description: string): string | undefined {
  return extractOrganizationFromTitle(title) || extractOrganizationFromDescription(description);
}

function extractOrganizationFromTitle(title: string): string | undefined {
  const normalized = title.replace(/\s+/g, " ").trim();
  const boundary =
    /\s(?:Launches|Launching|Marks|Names|Provides|Executes|Appoints|Rebrands|Releases|Announces|Announce|Announced|Introduces|Introducing|Unveils|Unveiling|Opens|Expands|Closes|Completes|Acquires|Partners|Highlights|Founder|Joins|Reports|Refutes|Welcomes|Adds|Adopts|Reveals|Hits|Surpasses|Becomes|Sets|Plans|Selects|Confirms|Files|Appoints|Wins|Raises|Secures|Receives|Delivers|Posts)\b/i;
  const colonSplit = normalized.split(":");
  const beforeColon = colonSplit[0].trim();

  // If title has a colon and second part starts with org keyword, use second part
  if (colonSplit.length > 1) {
    const afterColon = colonSplit.slice(1).join(":").trim();
    const afterMatch = afterColon.match(boundary);
    if (afterMatch) {
      const candidate = afterColon.slice(0, afterMatch.index).trim();
      if (candidate && candidate.length < 60) {
        return cleanOrganization(candidate);
      }
    }
  }

  const match = beforeColon.match(boundary);
  let candidate = match ? beforeColon.slice(0, match.index).trim() : undefined;

  // Drop trailing prepositions like "of", "for", etc.
  if (candidate) {
    candidate = candidate.replace(/\s+(?:of|for|to|with|and|in|on|at)$/i, "").trim();
  }

  if (candidate && candidate.length < 60) {
    return cleanOrganization(candidate);
  }
  return undefined;
}

function extractOrganizationFromDescription(html: string): string | undefined {
  const anchorMatch = html.match(/<a\b[^>]*>([\s\S]*?)<\/a>/i);
  if (!anchorMatch) return undefined;
  const text = anchorMatch[1].replace(/<[^>]+>/g, "").trim();
  return cleanOrganization(text);
}

function cleanOrganization(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const cleaned = value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&#x27;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8211;|&#8212;/g, "–")
    .replace(/\s+/g, " ")
    .replace(/^[\s,;:–—-]+|[\s,;:–—-]+$/g, "")
    .trim();

  if (!cleaned || cleaned.length < 2 || cleaned.length > 60) return undefined;
  if (/^about\b/i.test(cleaned) || /^media contact\b/i.test(cleaned)) return undefined;
  if (/^[\w.-]+\.[a-z]{2,}$/i.test(cleaned) || cleaned.includes("@")) return undefined;
  if (/^https?:/i.test(cleaned)) return undefined;
  return cleaned;
}

function extractSlug(link: string, title: string): string {
  try {
    const urlSlug = link.split("/").pop()?.split("?")[0] ?? "";
    if (urlSlug && urlSlug.length > 0 && urlSlug !== "feed-rss.xml") {
      return urlSlug;
    }
  } catch {
    // fall through
  }
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 100);
}

function upgradeImageUrl(url: string): string {
  // GlobeNewswire CDN: /tiny/ is hotlink-blocked; /medium/ resolves correctly
  return url.replace(/(ml\.globenewswire\.com\/media\/[^/]+\/)tiny\//i, "$1medium/");
}

function extractMediaImage(item: RssItem): string | undefined {
  const mc = item["media:content"];
  if (mc) {
    const first = Array.isArray(mc) ? mc[0] : mc;
    if (first?.["@_url"]) return first["@_url"];
    const nested = (first as Record<string, unknown>)?.["media:thumbnail"];
    if (nested && typeof nested === "object" && "@_url" in nested) {
      return (nested as Record<string, unknown>)["@_url"] as string;
    }
  }
  if (item["media:thumbnail"]?.["@_url"]) return item["media:thumbnail"]["@_url"];
  if (item.enclosure?.["@_url"]) return item.enclosure["@_url"];
  return undefined;
}

function extractFirstImage(html: string): string | undefined {
  const match = html.match(/<img\b[^>]+src=["']([^"']+)["']/i);
  return match?.[1];
}

function stripHtml(html: string): string {
  try {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || "";
    return text.slice(0, 300).trim() + (text.length > 300 ? "..." : "");
  } catch {
    return html.slice(0, 300);
  }
}
