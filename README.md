# Blockchain Wire Marketing Site

Welcome to the **Blockchain Wire** marketing site repository! 👋 This is a fast, statically-built React single-page application (SPA) crafted to serve as the high-authority PR distribution platform for Web3 and Digital Asset projects.

This project focuses heavily on **performance**, **modern aesthetics**, and **simplicity**.

## 🚀 Quick Start

To get the project running locally, follow these simple steps:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   *The site will be available at `http://localhost:3050`.*

## 🛠 Tech Stack

We've intentionally kept the stack light and modern:

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4 (configured via Vite)
- **Animations:** Framer Motion (page transitions and interactive elements)
- **Routing:** Custom lightweight client-side router (no external dependencies)

## 📁 Key Directories & Files

- `src/App.tsx` - The main application entry point, containing our custom router and global layout components.
- `src/data/site.ts` - The central hub for site configuration, navigation menus, default SEO, and sitemap definitions.
- `src/components/` - Shared UI components (buttons, cards, sections, layout wrappers).
- `src/pages/` - Individual page components containing hardcoded content arrays.
- `src/index.css` - Global CSS containing custom Tailwind utility classes like glassmorphism effects and custom animations.
- `docs/DESIGN-ANALYSIS.md` - A comprehensive guide to the site's design system and visual philosophy.
- `docs/HANDOFF.md` - An architectural overview and workflow guide for new developers.

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server on port 3050. |
| `npm run build` | Compiles TypeScript and builds the app for production into the `dist` directory. |
| `npm run preview` | Boots up a local server to preview the production build. |
| `npm run lint` | Runs TypeScript type-checking (`tsc --noEmit`). |
| `npm run clean` | Removes the `dist` directory. |

## 🌐 Deployment

This project is configured for seamless deployment on **Vercel**. 

- Pushing to the `main` branch will automatically trigger a build and deployment if connected.
- The `vercel.json` file handles SPA routing (rewriting all requests to `/index.html`).

---

*For an in-depth technical dive, refer to `docs/HANDOFF.md`.*