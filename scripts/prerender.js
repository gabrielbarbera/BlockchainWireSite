import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const BASE_URL = 'http://127.0.0.1:4173';
const OUTPUT_DIR = 'dist';
const PRESS_RELEASE_DIR = path.join(OUTPUT_DIR, 'press-release');
const DEFAULT_WAIT_MS = 500;
const SERVER_START_TIMEOUT_MS = 30000;

const ROUTES_TO_PRERENDER = [
  '/',
  '/solutions',
  '/products', 
  '/pricing',
  '/resources/newsroom',
  '/company/about',
];

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function isPreviewServerRunning() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const response = await fetch(BASE_URL, { 
      signal: controller.signal,
      headers: { 'User-Agent': 'prerender-script/1.0' }
    });
    
    clearTimeout(timeoutId);
    return response.ok || response.status === 404; // 404 is OK, means server is running
  } catch {
    return false;
  }
}

async function waitForPreviewServer() {
  const startedAt = Date.now();
  let attempts = 0;

  while (Date.now() - startedAt < SERVER_START_TIMEOUT_MS) {
    attempts++;
    console.log(`Waiting for preview server... (attempt ${attempts})`);
    
    if (await isPreviewServerRunning()) {
      console.log('✅ Preview server is ready');
      return;
    }

    await wait(1000); // Wait 1 second between attempts
  }

  throw new Error(`Preview server did not start at ${BASE_URL} after ${SERVER_START_TIMEOUT_MS}ms`);
}

async function startPreviewServer() {
  if (await isPreviewServerRunning()) {
    console.log(`Using existing preview server at ${BASE_URL}`);
    return null;
  }

  console.log('Starting preview server...');
  
  const server = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173'], {
    cwd: process.cwd(),
    stdio: 'pipe',
    shell: process.platform === 'win32',
    env: {
      ...process.env,
      BROWSER: 'none',
      NODE_ENV: 'production',
    },
  });

  server.stdout.on('data', data => {
    const output = data.toString();
    if (output.includes('Local') || output.includes('http')) {
      console.log('Preview server output:', output.trim());
    }
  });
  
  server.stderr.on('data', data => {
    console.error('Preview server error:', data.toString());
  });

  server.on('error', (error) => {
    console.error('Failed to start preview server:', error);
    throw error;
  });

  await waitForPreviewServer();
  return server;
}

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
    
    await page.goto(BASE_URL + route, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    await wait(3000);
    
    const html = await page.content();
    
    let outputPath;
    if (route === '/') {
      outputPath = path.join(OUTPUT_DIR, 'index.html');
    } else if (route.startsWith('/press-release/')) {
      const slug = route.replace('/press-release/', '');
      outputPath = path.join(PRESS_RELEASE_DIR, slug, 'index.html');
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
    } else {
      const routePath = route.replace(/^\//, '').replace(/\/$/, '');
      outputPath = path.join(OUTPUT_DIR, routePath, 'index.html');
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
    }
    
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
  
  let previewServer = null;
  
  try {
    // Start preview server if not running
    previewServer = await startPreviewServer();

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    
    try {
      console.log('Fetching press release slugs...');
      const slugs = await getPressReleaseSlugs();
      console.log(`Found ${slugs.length} press releases to prerender`);
      
      const allRoutes = [
        ...ROUTES_TO_PRERENDER,
        ...slugs.map(slug => `/press-release/${slug}`)
      ];
      
      console.log(`Total routes to prerender: ${allRoutes.length}`);
      
      for (const route of allRoutes) {
        await prerenderRoute(browser, route);
      }
      
      console.log('✅ Prerendering complete!');
      
    } finally {
      await browser.close();
    }
    
  } catch (error) {
    console.error('❌ Prerendering failed:', error);
    throw error;
  } finally {
    if (previewServer) {
      console.log('Stopping preview server...');
      previewServer.kill('SIGTERM');
      // Give server time to shut down gracefully
      await wait(1000);
      previewServer.kill('SIGKILL');
    }
  }
}

prerender().catch(error => {
  console.error('Prerendering failed:', error);
  process.exit(1);
});
