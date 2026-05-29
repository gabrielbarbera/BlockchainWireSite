import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { prerender } from 'vite-plugin-prerender';

export default defineConfig({
  plugins: [
    react(),
    prerender({
      // Prerender all press release routes
      routes: async () => {
        // Fetch your press release slugs
        const response = await fetch('https://api.blockchainwire.io/press-releases');
        const posts = await response.json();
        return posts.map(post => `/press-release/${post.slug}`);
      },
      // Skip prerendering for other routes
      exclude: ['/dashboard/**', '/auth/**'],
      // Options for headless chrome
      rendererOptions: {
        timeout: 5000,
        maxConcurrent: 4
      }
    })
  ],
  server: {
    port: 3050,
    host: '0.0.0.0'
  }
});