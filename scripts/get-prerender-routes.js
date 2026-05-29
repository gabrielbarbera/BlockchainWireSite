// @ts-check
/**
 * Generate press release routes for prerendering
 * This script fetches all press releases and returns their slugs
 */

const RSS_URL = "https://api.blockchainwire.io/feed-rss.xml";

async function fetchNewsroomFeed() {
  const FALLBACK_URLS = [
    RSS_URL,
    "https://corsproxy.io/?url=" + encodeURIComponent(RSS_URL),
    "https://api.allorigins.win/raw?url=" + encodeURIComponent(RSS_URL),
  ];

  for (const url of FALLBACK_URLS) {
    try {
      console.log("[Prerender] Fetching from:", url.split("?")[0] || url);
      const response = await fetch(url, {
        headers: {
          Accept: "application/rss+xml, application/xml, text/xml",
        },
      });

      if (!response.ok) {
        console.warn(`[Prerender] HTTP ${response.status}`);
        continue;
      }

      const text = await response.text();
      
      // Simple XML parsing to extract items with slugs
      const itemRegex = /<item>([\s\S]*?)<\/item>/g;
      const items = [];
      let match;
      
      while ((match = itemRegex.exec(text)) !== null) {
        const itemContent = match[1];
        
        // Extract slug from link
        const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
        const link = linkMatch ? linkMatch[1] : '';
        
        // Extract slug from URL (e.g., /press-release/slug)
        const slugMatch = link.match(/\/press-release\/([^\/]+)/);
        const slug = slugMatch ? slugMatch[1] : '';
        
        if (slug) {
          items.push({
            slug: slug,
            link: link
          });
        }
      }
      
      if (items.length > 0) {
        console.log(`[Prerender] Found ${items.length} press releases`);
        return items;
      }
    } catch (error) {
      console.warn(`[Prerender] Failed to fetch:`, error.message);
    }
  }

  console.error("[Prerender] All fetch attempts failed");
  return [];
}

async function getPrerenderRoutes() {
  console.log('Fetching press release slugs for prerendering...');
  
  try {
    const posts = await fetchNewsroomFeed();
    
    if (!posts || posts.length === 0) {
      console.warn('No press releases found');
      return ['/'];
    }
    
    const routes = posts
      .filter(post => post.slug)
      .map(post => `/press-release/${post.slug}`);
    
    console.log(`Generated ${routes.length} prerender routes`);
    
    // Also include some key pages
    const staticRoutes = [
      '/',
      '/solutions',
      '/products',
      '/pricing',
      '/resources/newsroom',
      '/company/about',
    ];
    
    return [...staticRoutes, ...routes];
  } catch (error) {
    console.error('Failed to fetch press release slugs:', error);
    // Fallback to static routes only
    return [
      '/',
      '/solutions',
      '/products',
      '/pricing',
      '/resources/newsroom',
      '/company/about',
    ];
  }
}

// Run the function and log results
getPrerenderRoutes().then(routes => {
  console.log('Routes to prerender:');
  routes.slice(0, 10).forEach(route => console.log('  -', route));
  if (routes.length > 10) {
    console.log(`  ... and ${routes.length - 10} more`);
  }
}).catch(error => {
  console.error('Error:', error);
  process.exit(1);
});

export { getPrerenderRoutes };