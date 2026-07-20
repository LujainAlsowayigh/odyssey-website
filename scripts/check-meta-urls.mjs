/**
 * Post-build check: verify that social-preview meta tags in the built
 * index.html contain absolute URLs, not unreplaced %VITE_SITE_URL% placeholders.
 *
 * Run automatically after `vite build` via the "build" npm script.
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(__dirname, '..', 'dist', 'public', 'index.html');

let html;
try {
  html = readFileSync(htmlPath, 'utf-8');
} catch (err) {
  console.error(`[check-meta-urls] ERROR: Could not read ${htmlPath}`);
  console.error(`  ${err.message}`);
  process.exit(1);
}

// ─── Broad placeholder scan ──────────────────────────────────────────────────
// Vite replaces every %VITE_*% token in index.html during build. If any token
// survives it means an env var was undefined or the Vite pipeline was bypassed.

const remainingPlaceholders = [...html.matchAll(/%VITE_[A-Z0-9_]+%/g)].map(
  (m) => m[0],
);

if (remainingPlaceholders.length > 0) {
  const unique = [...new Set(remainingPlaceholders)];
  console.error(
    `[check-placeholders] FAIL: ${unique.length} unreplaced %VITE_*% placeholder(s) found in ${htmlPath}:`,
  );
  for (const placeholder of unique) {
    console.error(`  ${placeholder}`);
  }
  console.error(
    '\n[check-placeholders] Make sure all required VITE_* env vars are set before building,\n' +
    '  and that vite.config.ts populates them from site.config.ts.',
  );
  process.exit(1);
}

console.log('[check-placeholders] OK:  No unreplaced %VITE_*% placeholders found.');

// ─── URL-integrity checks ─────────────────────────────────────────────────────
/**
 * Each entry:
 *   selector – a substring that uniquely identifies the tag in the HTML
 *   label    – human-readable name for error messages
 */
const CHECKS = [
  { selector: 'property="og:url"',    attr: 'content', label: 'og:url' },
  { selector: 'property="og:image"',  attr: 'content', label: 'og:image' },
  { selector: 'name="twitter:image"', attr: 'content', label: 'twitter:image' },
];

/** Extract the value of an HTML attribute from a tag string. */
function extractAttr(tag, attr) {
  const re = new RegExp(`${attr}="([^"]*)"`, 'i');
  const m = tag.match(re);
  return m ? m[1] : null;
}

/** Extract the first <meta …> tag from html that contains the given selector. */
function findTag(html, selector) {
  const start = html.indexOf(selector);
  if (start === -1) return null;
  // Walk backwards to the opening '<'
  const tagStart = html.lastIndexOf('<', start);
  // Walk forwards to the closing '>'
  const tagEnd = html.indexOf('>', start);
  if (tagStart === -1 || tagEnd === -1) return null;
  return html.slice(tagStart, tagEnd + 1);
}

let failed = false;

for (const { selector, attr, label } of CHECKS) {
  const tag = findTag(html, selector);

  if (!tag) {
    console.error(`[check-meta-urls] FAIL: <meta ${selector}> not found in ${htmlPath}`);
    failed = true;
    continue;
  }

  const value = extractAttr(tag, attr);

  if (value === null) {
    console.error(`[check-meta-urls] FAIL: ${label} — attribute "${attr}" missing in tag: ${tag}`);
    failed = true;
    continue;
  }

  if (value.includes('%VITE_')) {
    console.error(
      `[check-meta-urls] FAIL: ${label} still contains an unreplaced placeholder: "${value}"\n` +
      `  Make sure VITE_SITE_URL is set before building, or check vite.config.ts for the default.`
    );
    failed = true;
    continue;
  }

  let url;
  try {
    url = new URL(value);
  } catch {
    console.error(
      `[check-meta-urls] FAIL: ${label} is not a valid absolute URL: "${value}"`
    );
    failed = true;
    continue;
  }

  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    console.error(
      `[check-meta-urls] FAIL: ${label} must use http(s), got: "${value}"`
    );
    failed = true;
    continue;
  }

  console.log(`[check-meta-urls] OK:   ${label} → ${value}`);
}

if (failed) {
  console.error('\n[check-meta-urls] One or more social-preview URL checks failed. Fix the issues above before deploying.');
  process.exit(1);
} else {
  console.log('\n[check-meta-urls] All social-preview URL checks passed.');
}

// ─── Image file existence check ───────────────────────────────────────────────
// Verify that the image file referenced by og:image actually exists in the
// build output. A missing or misnamed file would produce a broken social card
// even though the URL format is valid.
//
// Path-mapping note: VITE_SITE_URL already includes the Vite base path
// (e.g. "https://example.com/odyssey-website"), so og:image resolves to a
// pathname like "/odyssey-website/og-image.png". Vite's `public/` assets are
// emitted at the root of dist/public/ (not nested under the base path), so we
// must strip the base path prefix before resolving the file on disk.

const distPublicDir = resolve(__dirname, '..', 'dist', 'public');

// BASE_PATH is set by vite.config.ts (e.g. "/odyssey-website/" or "/").
// Normalise to a string with a leading slash and no trailing slash so we can
// strip it from URL pathnames reliably.
const rawBase = (process.env.BASE_PATH ?? '/').replace(/\/$/, '') || '/';
const basePath = rawBase === '/' ? '' : rawBase; // empty string → no prefix to strip

const ogImageTag = findTag(html, 'property="og:image"');
if (ogImageTag) {
  const ogImageUrl = extractAttr(ogImageTag, 'content');
  if (ogImageUrl) {
    let imagePath;
    try {
      imagePath = new URL(ogImageUrl).pathname;
    } catch {
      // URL already validated above; skip here.
    }

    if (imagePath) {
      // Strip the base path prefix to get the public/-relative path.
      const publicRelative = basePath && imagePath.startsWith(basePath)
        ? imagePath.slice(basePath.length)
        : imagePath;

      // Resolve against dist/public/, stripping any remaining leading slash.
      const imageFile = resolve(distPublicDir, publicRelative.replace(/^\//, ''));
      if (!existsSync(imageFile)) {
        console.error(
          `[check-meta-urls] FAIL: og:image file not found in build output.\n` +
          `  og:image URL : ${ogImageUrl}\n` +
          `  URL pathname : ${imagePath}\n` +
          `  Base path    : ${basePath || '/'}\n` +
          `  Expected file: ${imageFile}\n` +
          `  Make sure the image exists in public/ and is copied to dist/public/ during build.`
        );
        process.exit(1);
      }
      console.log(`[check-meta-urls] OK:   og:image file exists → ${imageFile}`);
    }
  }
}
