// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Deploy target is host-agnostic static output. Set SITE_URL at build time
// to override the canonical origin (e.g. when a custom domain goes live).
// Defaults to the live GitHub Pages origin so canonical/OG/sitemap URLs are
// correct out of the box.
const site = process.env.SITE_URL ?? 'https://gsonofnun.github.io';

export default defineConfig({
  site,
  // Plain static build — no adapter, deployable to any bucket/CDN.
  output: 'static',
  integrations: [sitemap()],
  build: {
    // Single-page content site: inline ALL CSS into the HTML to remove the
    // render-blocking stylesheet request (faster FCP/LCP on slow links).
    inlineStylesheets: 'always',
  },
  image: {
    // Cap concurrency so sharp doesn't thrash on big PNG screenshots.
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  vite: {
    build: {
      // Keep the three.js island in its own lazy chunk, isolated from app JS.
      cssCodeSplit: true,
    },
  },
});
