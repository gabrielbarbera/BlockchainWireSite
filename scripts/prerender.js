import { promises as fs } from "fs";
import path from "path";

import { SITEMAP } from "../src/data/site.ts";
import { parseRssXml } from "../src/lib/rss-parser.ts";

const BASE_URL = "https://blockchainwire.io";
const RSS_URL = "https://api.blockchainwire.io/feed-rss.xml";
const OUTPUT_DIR = "dist";
const TEMPLATE_PATH = path.join(OUTPUT_DIR, "index.html");
const PRESS_RELEASE_DIR = path.join(OUTPUT_DIR, "press-release");
const DEFAULT_OG_IMAGE = `${BASE_URL}/opengraph.png`;
const MAX_PRESS_RELEASES = 30;

const STATIC_ROUTES = Object.entries(SITEMAP)
  .filter(([, data]) => !data.robots?.includes("noindex"))
  .map(([route]) => route);

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function stripTags(value) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&#x27;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8211;|&#8212;/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(value, maxLength) {
  return value.length > maxLength ? `${value.slice(0, maxLength - 3).trim()}...` : value;
}

function routeOutputPath(route) {
  if (route === "/") {
    return path.join(OUTPUT_DIR, "index.html");
  }

  return path.join(OUTPUT_DIR, route.replace(/^\//, ""), "index.html");
}

function replaceTag(html, pattern, replacement) {
  return pattern.test(html) ? html.replace(pattern, replacement) : html.replace("</head>", `    ${replacement}\n  </head>`);
}

function setTitle(html, title) {
  return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
}

function setMetaName(html, name, content) {
  const tag = `<meta name="${name}" content="${escapeHtml(content)}">`;
  return replaceTag(html, new RegExp(`<meta\\s+name=["']${name}["'][^>]*>`, "i"), tag);
}

function setMetaProperty(html, property, content) {
  const tag = `<meta property="${property}" content="${escapeHtml(content)}">`;
  return replaceTag(html, new RegExp(`<meta\\s+property=["']${property}["'][^>]*>`, "i"), tag);
}

function setCanonical(html, url) {
  const tag = `<link rel="canonical" href="${escapeHtml(url)}">`;
  return replaceTag(html, /<link\s+rel=["']canonical["'][^>]*>/i, tag);
}

function removeStructuredData(html) {
  return html.replace(/\s*<script\s+type=["']application\/ld\+json["'][\s\S]*?<\/script>/gi, "");
}

function withRouteMetadata(template, route, data) {
  const url = `${BASE_URL}${route === "/" ? "" : route}`;
  const title = data.seoTitle || `${data.title} | BlockchainWire`;
  const description = data.seoDescription || data.intro;

  let html = setTitle(template, title);
  html = setMetaName(html, "title", title);
  html = setMetaName(html, "description", description);
  html = setMetaProperty(html, "og:type", "website");
  html = setMetaProperty(html, "og:url", url);
  html = setMetaProperty(html, "og:title", title);
  html = setMetaProperty(html, "og:description", description);
  html = setMetaProperty(html, "og:image", DEFAULT_OG_IMAGE);
  html = setMetaName(html, "twitter:url", url);
  html = setMetaName(html, "twitter:title", title);
  html = setMetaName(html, "twitter:description", description);
  html = setMetaName(html, "twitter:image", DEFAULT_OG_IMAGE);
  html = setCanonical(html, url);

  return html;
}

function buildArticleSchema(post, url, image, description) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description,
    image,
    datePublished: post.pubDate,
    dateModified: post.pubDate,
    url,
    mainEntityOfPage: url,
    publisher: {
      "@type": "Organization",
      name: "BlockchainWire",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/Logo Horizontal Color.svg`,
      },
    },
    author: {
      "@type": "Organization",
      name: post.organization || post.creator || "BlockchainWire",
    },
  };
}

function withPressReleaseMetadata(template, post) {
  const route = `/press-release/${post.slug}`;
  const url = `${BASE_URL}${route}`;
  const title = `${post.title} | BlockchainWire Newsroom`;
  const description = truncate(stripTags(post.description), 300);
  const image = post.image || DEFAULT_OG_IMAGE;
  const imageAlt = post.title;

  let html = removeStructuredData(template);
  html = setTitle(html, title);
  html = setMetaName(html, "title", title);
  html = setMetaName(html, "description", description);
  html = setMetaProperty(html, "og:type", "article");
  html = setMetaProperty(html, "og:url", url);
  html = setMetaProperty(html, "og:title", post.title);
  html = setMetaProperty(html, "og:description", description);
  html = setMetaProperty(html, "og:image", image);
  html = setMetaProperty(html, "og:image:alt", imageAlt);
  html = setMetaName(html, "twitter:url", url);
  html = setMetaName(html, "twitter:title", post.title);
  html = setMetaName(html, "twitter:description", description);
  html = setMetaName(html, "twitter:image", image);
  html = setMetaName(html, "twitter:image:alt", imageAlt);
  html = setCanonical(html, url);
  html = html.replace(
    "</head>",
    `    <script type="application/ld+json">${JSON.stringify(buildArticleSchema(post, url, image, description))}</script>\n  </head>`,
  );

  return html;
}

async function writeHtml(outputPath, html) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, html);
}

async function fetchPressReleases() {
  const response = await fetch(RSS_URL, {
    headers: { Accept: "application/rss+xml, application/xml, text/xml" },
  });

  if (!response.ok) {
    throw new Error(`RSS feed returned ${response.status}`);
  }

  return parseRssXml(await response.text()).slice(0, MAX_PRESS_RELEASES);
}

async function prerender() {
  console.log("Starting static prerendering...");

  const template = await fs.readFile(TEMPLATE_PATH, "utf8");
  let routeCount = 0;

  for (const route of STATIC_ROUTES) {
    await writeHtml(routeOutputPath(route), withRouteMetadata(template, route, SITEMAP[route]));
    routeCount++;
  }

  console.log(`Generated ${routeCount} static route shells`);

  const posts = await fetchPressReleases();
  await fs.mkdir(PRESS_RELEASE_DIR, { recursive: true });

  for (const post of posts) {
    await writeHtml(
      path.join(PRESS_RELEASE_DIR, post.slug, "index.html"),
      withPressReleaseMetadata(template, post),
    );
  }

  console.log(`Generated ${posts.length} press release pages`);
  console.log("✅ Static prerendering complete!");
}

prerender().catch((error) => {
  console.error("Prerendering failed:", error);
  process.exit(1);
});
