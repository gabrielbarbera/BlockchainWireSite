/**
 * Prerender press release pages for SEO
 * This script generates static HTML files for press releases after build
 */

import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:4173'; // Preview server URL
const OUTPUT_DIR = 'dist';
const PRESS_RELEASE_DIR = path.join(OUTPUT_DIR, 'press-release');

// Routes to prerender
const ROUTES_TO_PRERENDER = [
  '/',
  '/solutions',
  '/products', 
  '/pricing',
  '/resources/newsroom',
  '/company/about',
];

// Fetch press release slugs
async function getPressReleaseSlugs() {
  try {
    const response = await fetch('https://api.blockchainwire.io/feed-rss.xml');
    const xml = await response.text();
    
    // Extract slugs from RSS feed
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const slugs = [];
    let match;
    
    while ((match = itemRegex.exec(xml)) !== null) {
      const itemContent = match[1];
      const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
      const link = linkMatch ? linkMatch[1] : '';
      const slugMatch = link.match(/\/press-release\/([^\/]+)/);
      const slug = slugMatch ? slugMatch[1] : '';
      
      if (slug) {
        slugs.push(slug);
      }
    }
    
    return slugs.slice(0, 30); // Limit to 30 most recent
  } catch (error) {
    console.error('Failed to fetch press release slugs:', error);
    return [];
  }
}

async function prerenderRoute(browser, route) {
  const page = await browser.newPage();
  
  try {
    console.log(`Prerendering: ${route}`);
    
    // Navigate to the route
    await page.goto(BASE_URL + route, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    // Wait for additional time to ensure data is loaded
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Get the HTML
    const html = await page.content();
    
    // Determine output path
    let outputPath;
    if (route === '/') {
      outputPath = path.join(OUTPUT_DIR, 'index.html');
    } else if (route.startsWith('/press-release/')) {
      // Create press-release directory if it doesn't exist
      await fs.mkdir(PRESS_RELEASE_DIR, { recursive: true });
      const slug = route.replace('/press-release/', '');
      outputPath = path.join(PRESS_RELEASE_DIR, `${slug}.html`);
    } else {
      // Handle nested routes
      const routePath = route.replace(/^\//, '').replace(/\/$/, '');
      outputPath = path.join(OUTPUT_DIR, routePath, 'index.html');
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
    }
    
    // Write the HTML
    await fs.writeFile(outputPath, html);
    console.log(`✅ Generated: ${route}`);
    
  } catch (error) {
    console.error(`❌ Failed to prerender ${route}:`, error.message);
  } finally {
    await page.close();
  }
}

async function prerender() {
  console.log('Starting prerendering...');
  
  // Check if preview server is running
  try {
    await fetch(BASE_URL);
  } catch (error) {
    console.error(`Preview server not running at ${BASE_URL}`);
    console.error('Please run: npm run preview');
    process.exit(1);
  }
  
  // Launch browser
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    // Get press release slugs
    console.log('Fetching press release slugs...');
    const slugs = await getPressReleaseSlugs();
    console.log(`Found ${slugs.length} press releases to prerender`);
    
    // Generate all routes
    const allRoutes = [
      ...ROUTES_TO_PRERENDER,
      ...slugs.map(slug => `/press-release/${slug}`)
    ];
    
    console.log(`Total routes to prerender: ${allRoutes.length}`);
    
    // Prerender each route
    for (const route of allRoutes) {
      await prerenderRoute(browser, route);
    }
    
    console.log('✅ Prerendering complete!');
    
  } finally {
    await browser.close();
  }
}

prerender().catch(error => {
  console.error('Prerendering failed:', error);
  process.exit(1);
});