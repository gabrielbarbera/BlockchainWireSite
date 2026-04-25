import { SITEMAP } from '../src/data/site.js';
import { writeFileSync } from 'fs';

const BASE_URL = 'https://blockchainwire.io';

const indexableUrls = Object.entries(SITEMAP)
  .filter(([path, data]) => !data.robots?.includes('noindex'));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexableUrls.map(([path, data]) => `  <url>
    <loc>${BASE_URL}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

writeFileSync('public/sitemap.xml', sitemap);
console.log('✅ sitemap.xml generated with', indexableUrls.length, 'indexable URLs');
