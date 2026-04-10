import { DEFAULT_SEO, SITEMAP } from "../data/site";

export function getSeoForPath(pathname: string): {
  title: string;
  description: string;
} {
  if (pathname === "/") {
    return {
      title: DEFAULT_SEO.title,
      description: DEFAULT_SEO.description,
    };
  }

  if (pathname === "/company/legal") {
    return {
      title: "Legal | BlockchainWire",
      description:
        "Review BlockchainWire legal documents, including privacy policy and terms and conditions.",
    };
  }

  const route = SITEMAP[pathname];
  if (!route) {
    return {
      title: "Page Not Found | BlockchainWire",
      description:
        "The requested page could not be found. Explore BlockchainWire solutions, products, pricing, and resources.",
    };
  }

  return {
    title: route.seoTitle ?? `${route.title} | BlockchainWire`,
    description:
      route.seoDescription ??
      `${route.title} page on BlockchainWire. ${route.intro}`,
  };
}

export function applySeo(pathname: string): void {
  const seo = getSeoForPath(pathname);
  document.title = seo.title;

  let descriptionTag = document.querySelector(
    'meta[name="description"]',
  ) as HTMLMetaElement | null;

  if (!descriptionTag) {
    descriptionTag = document.createElement("meta");
    descriptionTag.name = "description";
    document.head.appendChild(descriptionTag);
  }

  descriptionTag.content = seo.description;
}

