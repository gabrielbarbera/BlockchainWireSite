import { XMLParser } from "fast-xml-parser";
import type { NewsItem } from "../types/newsroom";

interface RssItem {
  title?: string;
  link?: string;
  pubDate?: string;
  description?: string;
  "dc:creator"?: string;
  category?: string | { "#text": string }[] | string[];
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

  return {
    id: `bw-${index}`,
    title: String(item.title).trim(),
    link: String(item.link).trim(),
    pubDate: item.pubDate ? String(item.pubDate).trim() : new Date().toISOString(),
    description: item.description ? stripHtml(String(item.description)) : "",
    creator,
    category,
  };
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
