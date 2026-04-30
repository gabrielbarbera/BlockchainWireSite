import { XMLParser } from "fast-xml-parser";
import type { NewsItem } from "../types/newsroom";

interface RssItem {
  title?: string;
  link?: string;
  pubDate?: string;
  description?: string;
  "content:encoded"?: string;
  "dc:creator"?: string;
  category?: string | { "#text": string }[] | string[];
  guid?: string | { "#text": string };
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

  return {
    id: `bw-${index}`,
    title,
    link,
    pubDate: item.pubDate ? String(item.pubDate).trim() : new Date().toISOString(),
    description: stripHtml(fullDescription),
    content: fullContent,
    creator,
    category,
    guid: guid || link,
    slug,
  };
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
