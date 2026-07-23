/**
 * Site-wide configuration.
 *
 * To swap in a new demo recording without touching any component code,
 * update DEMO_VIDEO_URL below. Set it to an empty string to hide the
 * video section entirely until a real recording is ready.
 *
 * Supported values:
 *   - A YouTube privacy-enhanced embed URL
 *     e.g. "https://www.youtube-nocookie.com/embed/<VIDEO_ID>?autoplay=1&mute=1&..."
 *   - A direct video file URL (mp4, webm, etc.) — use a <video> tag instead of iframe
 *   - An empty string "" — hides the Demo Video section
 */
export const DEMO_VIDEO_URL = "/demo.mp4";

/** URL of Odyssey's own branded download page (hides the raw Expo build URL from the QR code/buttons) */
export const APP_URL = "https://odyssey-website-omega.vercel.app/download";
