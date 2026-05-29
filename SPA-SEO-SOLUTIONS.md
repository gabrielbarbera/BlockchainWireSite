# Solution: SPA OpenGraph Meta Tags

## Problem
Your `index.html` has hardcoded global meta tags. Social media crawlers see these before JavaScript runs, so they always show:
- Global title instead of post title
- Global OG image instead of post featured image

## Why This Happens
1. Crawler requests `/press-release/alpha-compute-corp-completes-majority-acquisition-of-gamee`
2. Server serves `index.html` (same HTML for ALL routes)
3. `index.html` has hardcoded global meta tags
4. JavaScript later updates them (but crawlers never execute JS)

## Solutions

### Option 1: Pre-rendering (RECOMMENDED)
Generate static HTML files for each press release at build time.

**Pros:**
- ✅ Correct meta tags in initial HTML
- ✅ Fast page loads
- ✅ Works with all crawlers
- ✅ Better SEO

**Cons:**
- ❌ Build time increases
- ❌ Need to rebuild when posts are added

**Implementation:**
```bash
# Install prerender plugin
npm install --save-dev vite-plugin-prerender puppeteer
```

Update `vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { prerender } from 'vite-plugin-prerender';

export default defineConfig({
  plugins: [
    react(),
    prerender({
      // Prerender press release routes
      routes: async () => {
        const response = await fetch('https://admin.blockchainwire.io/api/press-releases');
        const posts = await response.json();
        return posts.map(post => `/press-release/${post.slug}`);
      }
    })
  ]
});
```

### Option 2: Dynamic OG Image Service (QUICKEST)
Use Vercel OG or similar to generate dynamic OG images.

**Pros:**
- ✅ No build changes
- ✅ Works immediately
- ✅ Images are always up-to-date

**Cons:**
- ❌ Only fixes OG image (not title/description)
- ❌ Depends on external service

**Implementation with Vercel OG:**
```typescript
// api/og-image.tsx
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  // Fetch post data
  const post = await fetchPostBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fff',
        }}
      >
        <img src={post.image} style={{ width: '100%', height: '100%' }} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

Then update `index.html`:
```html
<meta property="og:image" content="https://blockchainwire.io/api/og-image?slug={slug}" />
```

### Option 3: Accept Limitation
Keep current setup. Understand that SPAs without SSR/SSG can't have perfect social sharing.

**Pros:**
- ✅ No changes needed
- ✅ Simple architecture

**Cons:**
- ❌ Social media previews show global content
- ❌ Lower engagement on social shares

## Recommendation

**For immediate fix:** Use Option 2 (Dynamic OG Image Service)

**For best long-term solution:** Use Option 1 (Pre-rendering)

**Current status:**
- ✅ Updated `src/lib/seo.ts` to skip press-release routes
- ✅ `NewsroomPostPage` sets correct meta tags via JS
- ❌ Social crawlers still see global tags from `index.html`

## Testing

Test your changes with:
- https://www.opengraph.xyz
- https://developers.facebook.com/tools/debug/
- https://cards-dev.twitter.com/validator

**Important:** Clear crawler cache after making changes:
- Facebook: "Scrape Again" button
- Twitter: Wait ~7 days or contact support
- LinkedIn: "Clear Cache" button