/**
 * Single source of truth for site-wide metadata.
 *
 * Values here are injected into index.html (Open Graph, Twitter Card, JSON-LD)
 * via Vite's %VITE_*% HTML replacement in vite.config.ts.
 * Changing any field here automatically propagates to every meta tag and the
 * structured-data block — no manual HTML edits required.
 */
export const siteConfig = {
  /** Short product name used in JSON-LD and og:site_name */
  appName: "Odyssey",

  /** Full page <title> and og:title / twitter:title */
  appTitle: "Odyssey — AI Speech Companion for Children with Speaking Difficulties",

  /** Meta description, og:description, twitter:description, JSON-LD description */
  appDescription:
    "Odyssey is a magical AI-powered companion that helps children with speaking difficulties build communication confidence through adventure, games, and personalized AI speech feedback.",

  /** Comma-separated list of supported platforms for JSON-LD operatingSystem */
  appOS: "iOS, Android",

  /** JSON-LD audience age range */
  audienceMinAge: "4",
  audienceMaxAge: "12",

  /** Twitter handle (leave empty string if not yet active) */
  twitterSite: "",
} as const;
