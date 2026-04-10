# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server at http://localhost:3050
npm run build        # Production build → dist/
npm run preview      # Preview production build
npm run lint         # TypeScript type check (tsc --noEmit)
npm run clean        # Remove dist/
```

There are no automated tests in this project.

## Architecture

This is a **static SPA marketing site** for BlockchainWire (Web3 PR distribution platform). It uses React 19 + TypeScript + Vite + Tailwind CSS 4. There is no backend, no API, and no database — all content is hard-coded.

### Routing

A custom client-side router lives in `src/App.tsx`. It intercepts link clicks, uses the History API, and renders pages based on `window.location.pathname`. There is no React Router or similar library.

Routes resolve in this priority order:
1. **Static routes** — hard-coded path-to-component mappings at the top of App.tsx
2. **Dynamic routes** — prefix matching (e.g. `/products/:id`, `/solutions/:id`) handled inside each page file
3. **SITEMAP routes** — paths defined in `src/data/site.ts` render via `GenericPage`
4. **Fallback** — 404 page

### Key Files

- `src/App.tsx` — router, global layout (Header, Footer, floating CTA), loading screen
- `src/data/site.ts` — centralized data: `SITEMAP`, `NAV_ITEMS`, `MEGA_MENU`, `DEFAULT_SEO`, `BRAND_NAME`
- `src/lib/seo.ts` — `applySeo(pathname)` updates `<title>` and `<meta>` tags on each route change
- `src/components/ui.tsx` — shared UI components: `CtaLink`, `Section`, `Card`, `Badge`, `PageHero`, etc.
- `src/components/layout.tsx` — `Header` (sticky, mega-menu, mobile hamburger) and `Footer`
- `src/pages/` — page-level components; detail pages (Products, Solutions, etc.) define their own data arrays and filter by URL slug

### Adding a Page

To add a new page:
1. Add the route to the static or dynamic routing block in `src/App.tsx`
2. Add SEO metadata to `src/data/site.ts` (SITEMAP or per-page) so `applySeo()` picks it up
3. If it belongs in navigation, add it to `NAV_ITEMS` / `MEGA_MENU` in `src/data/site.ts`

### Styling

- Tailwind CSS 4 (configured via `@tailwindcss/vite`, no separate config file)
- Custom utilities in `src/index.css`: `.glass`, `.glass-dark`, `.text-glow`, `.btn-glow`, `.noise`, and keyframe animations
- Design tokens: primary cyan `#35bacf`, ink `#0a0a0a`, paper `#fcfcfc`
- Font stack: DM Sans (body), Hanken Grotesk (display), Cormorant Garamond (serif), JetBrains Mono (mono) — loaded via Google Fonts in `index.html`
- See `DESIGN-ANALYSIS.md` for the full design system reference

### Build & Deployment

- Deployed to **Vercel** — config in `vercel.json` (builds with `npm run build`, serves `dist/`, SPA rewrites all paths to `index.html`)
- Vite chunks output into three bundles: `react-vendor`, `motion`, `icons`
- Path alias `@` maps to the project root (`src/` is not the alias root)
