import type { ImageMetadata } from 'astro';

/**
 * Eagerly glob every screenshot under src/assets so Astro can fingerprint and
 * re-encode them (AVIF/WebP/fallback) at build time. Keyed by the path suffix
 * "<Project>/<File>" used in the project data, so the data file stays free of
 * import statements.
 */
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/screenshots/**/*.{png,jpg,jpeg}',
  { eager: true },
);

const byKey = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(modules)) {
  // path -> "../assets/screenshots/Jericode/Code_Editor.png"
  const key = path.replace('../assets/screenshots/', '');
  byKey.set(key, mod.default);
}

/** Resolve a "<Project>/<File>" key to its build-time ImageMetadata. */
export function shot(key: string): ImageMetadata {
  const img = byKey.get(key);
  if (!img) {
    throw new Error(
      `Screenshot not found: "${key}". Available: ${[...byKey.keys()].join(', ')}`,
    );
  }
  return img;
}
