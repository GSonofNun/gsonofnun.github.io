// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Deploy target is host-agnostic static output. Set SITE_URL at build time
// (e.g. SITE_URL=https://joshuagrzybowski.dev) so canonical/OG/sitemap URLs are
// absolute. Falls back to a placeholder that is safe for local builds.
const site = process.env.SITE_URL ?? 'https://joshuagrzybowski.dev';

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
