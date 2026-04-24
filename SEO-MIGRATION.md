# SEO & Domain Migration Guide

## Current Setup: Preview Domain Protection

This project is configured to **prevent search engine indexing** on all Vercel preview domains and development environments. Only the production domain (`blockchainwire.io`) will be indexed.

### How It Works

We use a **multi-layered approach** to ensure preview domains are never indexed:

1. **Dynamic Noindex Meta Tag** (Primary)
   - Inline script in `index.html` checks hostname on page load
   - Injects `<meta name="robots" content="noindex, nofollow">` on non-production domains
   - Runs before React loads for instant protection

2. **React-Level Noindex** (Secondary)
   - `applySeo()` function in `src/lib/seo.ts` enforces noindex during navigation
   - Updates robots meta tag on every route change
   - Provides backup protection for SPA navigation

3. **robots.txt** (Tertiary)
   - `public/robots.txt` blocks crawlers on preview domains
   - Disallows auth, dashboard, and affiliate pages
   - Note: This is a backup, not the primary protection

### What Gets Blocked

All of these domains will have **noindex** applied:
- `*.vercel.app` (Vercel preview deployments)
- `localhost` (local development)
- Any custom domain NOT `blockchainwire.io` or `www.blockchainwire.io`

Only these domains will be **indexed**:
- `https://blockchainwire.io`
- `https://www.blockchainwire.io`

---

## When Launching Production Domain

### Step 1: Update robots.txt

Replace `public/robots.txt` with the production version:

```bash
# Backup current robots.txt (preview version)
mv public/robots.txt public/robots-preview.txt

# Deploy production robots.txt
cp robots-production.txt public/robots.txt
```

### Step 2: Verify robots.txt

After deploying to production, verify:
```
https://blockchainwire.io/robots.txt
```

It should show:
```
User-agent: *
Allow: /
Disallow: /auth/
Disallow: /dashboard/
Disallow: /affiliate
Sitemap: https://blockchainwire.io/sitemap.xml
```

### Step 3: Test Noindex Removal

1. Open browser DevTools on production domain
2. Check Console for: `[SEO] Indexing enabled for production domain`
3. Verify NO `<meta name="robots" content="noindex, nofollow">` in `<head>`
4. Use Google Rich Results Test: https://search.google.com/test/rich-results

### Step 4: Submit to Search Engines

**Google Search Console:**
1. Add property: `https://blockchainwire.io`
2. Verify ownership (HTML file or DNS)
3. Submit sitemap: `https://blockchainwire.io/sitemap.xml`
4. Request indexing: `https://blockchainwire.io/`

**Bing Webmaster Tools:**
1. Add site: `https://blockchainwire.io`
2. Verify ownership
3. Submit sitemap

---

## Verification Commands

### Check if noindex is applied:
```javascript
// Run in browser console
console.log(document.querySelector('meta[name="robots"]')?.content);
// Should show "noindex, nofollow" on preview domains
// Should be null or "index, follow" on production
```

### Check current hostname:
```javascript
console.log(window.location.hostname);
```

### View robots.txt:
```bash
curl https://blockchainwire.io/robots.txt
```

---

## Files Modified

1. **index.html** - Added dynamic noindex script
2. **src/lib/seo.ts** - Added noindex enforcement in applySeo()
3. **public/robots.txt** - Blocks preview domains
4. **robots-production.txt** - Production robots.txt (use when launching)
5. **vercel.json** - Added security headers (no X-Robots-Tag needed due to HTML implementation)

---

## Why This Approach?

### ✅ Pros
- **Fail-safe**: Multiple layers ensure preview domains are never indexed
- **Automatic**: No manual config needed per deployment
- **Performance**: Client-side check adds <1ms overhead
- **Future-proof**: Works regardless of Vercel config changes

### ❌ Alternative Approaches Rejected

**X-Robots-Tag Header via vercel.json**
- Requires conditional headers based on environment
- Vercel doesn't support environment-specific headers easily
- More complex to maintain

**Build-time Environment Variables**
- Would require separate builds for preview/production
- Adds complexity to CI/CD pipeline
- Client-side hostname check is simpler

**Server-side Noindex**
- Requires serverless function or Next.js
- Overkill for static site
- Current approach works for static SPA

---

## Troubleshooting

### Preview domain is indexed
1. Check browser console for `[SEO] NOINDEX enabled` message
2. View page source and verify meta robots tag exists
3. Clear browser cache and reload
4. Check if overriding the hostname logic

### Production domain not indexed
1. Verify hostname is exactly `blockchainwire.io` or `www.blockchainwire.io`
2. Check for noindex meta tag in production (should not exist)
3. Ensure robots.txt allows indexing
4. Submit to Google Search Console

### Want to test a different production domain
Update the `isProduction` check in:
- `index.html` (inline script)
- `src/lib/seo.ts` (applySeo function)

Change:
```javascript
const isProduction = hostname === 'blockchainwire.io' || hostname === 'www.blockchainwire.io';
```

To:
```javascript
const isProduction = hostname === 'your-domain.com' || hostname === 'www.your-domain.com';
```
