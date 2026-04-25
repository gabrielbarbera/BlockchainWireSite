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

  // Get route-specific robots meta tag
  const route = SITEMAP[pathname];
  const routeRobots = route?.robots;

  // Conditional noindex for preview/non-production domains
  const hostname = window.location.hostname;
  const isProduction = hostname === 'blockchainwire.io' || hostname === 'www.blockchainwire.io';
  
  let robotsTag = document.querySelector(
    'meta[name="robots"]',
  ) as HTMLMetaElement | null;

  // Priority: Route-specific robots > Preview domain check > Default allow
  if (routeRobots) {
    // Use route-specific robots (e.g., "noindex, nofollow" for auth/dashboard pages)
    if (!robotsTag) {
      robotsTag = document.createElement("meta");
      robotsTag.name = "robots";
      document.head.appendChild(robotsTag);
    }
    robotsTag.content = routeRobots;
  } else if (!isProduction) {
    // Add noindex for non-production domains
    if (!robotsTag) {
      robotsTag = document.createElement("meta");
      robotsTag.name = "robots";
      document.head.appendChild(robotsTag);
    }
    robotsTag.content = "noindex, nofollow";
  } else {
    // Production: remove robots tag if it was set for preview
    if (robotsTag && (robotsTag.content === "noindex, nofollow")) {
      robotsTag.remove();
    }
  }
}

