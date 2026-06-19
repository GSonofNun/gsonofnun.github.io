# Joshua Grzybowski — Portfolio

A static, fast portfolio for a native Windows systems engineer. The site is itself
an argument: minimal JavaScript, hand-tuned rendering, no trackers — built the way
the software it showcases is built.

- **Stack:** [Astro](https://astro.build) 5 (zero-JS-by-default islands) · TypeScript (strict) · [three.js](https://threejs.org) for one lazy hero scene
- **Output:** plain static `dist/` — deployable to any host (GitHub Pages, Cloudflare Pages, Netlify, a bucket). No backend, no SSR adapter.
- **No** analytics, cookies, tracking, or third-party requests at runtime.

---

## Develop

```bash
npm install
npm run dev          # http://localhost:4321
```

## Build & preview

```bash
npm run build        # -> dist/  (also re-encodes all screenshots to AVIF/WebP)
npm run preview      # serve dist/ locally
```

Set the canonical/OG/sitemap origin at build time:

```bash
# bash
SITE_URL=https://your-domain.dev npm run build
# PowerShell
$env:SITE_URL="https://your-domain.dev"; npm run build
```

If unset it defaults to `https://joshuagrzybowski.dev` (safe for local builds).

## Deploy

`dist/` is fully static. Pick one:

| Host | How |
|------|-----|
| **Cloudflare Pages / Netlify** | Build command `npm run build`, output dir `dist`. Set `SITE_URL` env var. |
| **GitHub Pages** | Run the build in CI, publish `dist/`. If serving from a sub-path, also set Astro's `base`. |
| **Any bucket/CDN** | Upload `dist/` as-is. |

---

## Architecture

```
public/screenshots/   raw screenshots (source of truth; also kept for the Sefer .webm)
src/
  assets/screenshots/  optimized copies — Astro re-encodes these at build time
  data/projects.ts     the project catalogue + copy (single source of content)
  lib/images.ts        resolves "<Project>/<File>" keys to build-time ImageMetadata
  layouts/Base.astro   <head>, SEO/OG, JSON-LD, no-flash theme script
  components/           Hero, Work, ProjectCard, ProjectModal, Approach, About, Contact, header/footer, ThemeToggle
  scripts/lattice.ts   the three.js "Structure" hero scene (lazy chunk)
  styles/global.css    design tokens (light/dark), reset, type scale, grain, buttons
```

### The hero scene ("Structure")

A 3D wireframe lattice of precise lines and node-lights on a tilted plane, displaced
by a smooth evolving field and parallaxing to the cursor. It is **progressive
enhancement only**:

- The hero ships a **deterministic, build-time SVG lattice** that is the complete
  baseline — visible with JavaScript off and used as the reduced-motion fallback.
- three.js is **dynamically imported** (its own ~117 KB gz chunk, excluded from
  initial JS) and only when: motion is allowed, the screen is not small / coarse-pointer,
  and WebGL is present. Loading is deferred to idle time and never blocks first paint.
- The render loop is **zero-allocation** (topology + base coords precomputed; per-frame
  work writes vertex Z into a pooled `Float32Array`; two draw calls total) and **pauses**
  when the hero is offscreen or the tab is hidden. The renderer is disposed cleanly.

### Theming

Light ("Paper") / dark ("Graphite") via a `data-theme` attribute. The initial theme is
resolved **before first paint** by an inline script in `<head>` (system preference by
default, user choice persisted in `localStorage`) so there is no flash of the wrong theme.
The toggle only flips + persists. The 3D scene re-reads its colours on theme change.

### Images

Every screenshot is re-encoded to **AVIF + WebP with a raster fallback**, in responsive
widths, with explicit dimensions (no layout shift) and `loading="lazy"`. Sefer's
theme-change clip ships as `.webm` with a poster and is only loaded on play.

---

## Performance / accessibility budget (met)

- **Initial JS** (excluding the lazy 3D chunk): ~2 KB gz (theme toggle + dialog
  controller + the loader guard). The three.js scene is a separate lazy chunk.
- HTML ~22 KB gz, CSS ~22 KB gz, only latin font subsets shipped.
- Semantic HTML, skip link, keyboard navigation, visible focus rings, real `alt` text
  on every screenshot, AA contrast in both themes, `prefers-reduced-motion` honored.
- Project detail uses a native `<dialog>` (platform focus-trap, ESC, focus restore);
  detail content is in the DOM so the page degrades gracefully.

Run a local audit:

```bash
npm run build && npm run preview
npx lighthouse http://localhost:4321 --view
```

---

## Assumptions & decisions made during the build

1. **Projects included:** Jericode (flagship), Sefer, JeriRead/FastReader, GitSmarter,
   Verity, Finstry, VibeSonic, and ObserVIEW. **Conversa was omitted** per request.
2. **Screenshots:** taken from `public/screenshots/<Project>/`. The first shot in each
   project's list is the card cover; order is editorial.
3. **ObserVIEW** is employer work. Its copy is drawn from the **cleared public product
   description** (real-time DSP, C++ engine bridged to .NET/WPF, GPU charting to 1,000+
   channels) — no proprietary internals.
4. **Engineering details / metrics** (e.g. the 127 ms → 0.2 ms tile-cache figure, the
   Treiber-stack queue, the Cooley-Tukey FFT) were pulled from each project's README and
   reconciled with the brief; the brief is authoritative where they differed (e.g. Sefer's
   "Atelier" palette, JeriRead's "Lumen" palette).
5. **Identity:** name "Joshua Grzybowski"; contact email `sonofnun@outlook.com`;
   GitHub `github.com/GSonofNun`. Hero positioning: "native Windows craftsman".
6. **Contact links** are all live: Email, GitHub (`GSonofNun`), X (`@sonofnun`),
   LinkedIn (`in/jbgrzybowski`), and a Microsoft Store publisher search. The component
   still supports a `href`-less "link pending" chip if a future channel needs one.
7. **Default theme:** dark ("Graphite"); system preference still respected on first visit.
8. **`SITE_URL`** defaults to `https://joshuagrzybowski.dev`. Change it (env var) to your
   real domain before deploying so canonical/OG/sitemap URLs are correct.
9. **OG share image** (`public/og.png`, 1200×630) is pre-generated. If you change your
   name/tagline, regenerate it (the source layout used is in the build notes / can be
   re-rendered from an HTML template).
10. **Fonts:** Fraunces (display) · Hanken Grotesk (body) · JetBrains Mono (labels),
    self-hosted and subset via `@fontsource`.
```
