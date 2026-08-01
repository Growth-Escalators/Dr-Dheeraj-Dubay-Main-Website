// Normalises image URLs coming out of the DB before they reach next/image.
//
// Some Achievement records were saved from the admin panel with the admin
// app's *image optimizer* URL rather than the underlying file URL, e.g.
//
//   https://drdubey-admin-v2.vercel.app/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F...&w=384&q=75
//
// next/image throws on those ("hostname ... is not configured under images"),
// and because the render happens on the server that throw takes the whole
// page down with a 500 — one bad record breaks the homepage. Unwrapping the
// `url` query param recovers the real utfs.io link, which next.config.js
// already allows.
// Hostnames next.config.js allows next/image to fetch from. Kept in sync by
// hand — the config isn't importable from app code (it's CommonJS and loaded
// by the framework, not the bundle).
const ALLOWED_IMAGE_HOSTS = [
  "utfs.io",
  "uploadthing.com",
  "placehold.co",
  "i.ibb.co",
  "cdn.tuk.dev",
];

const ALLOWED_IMAGE_HOST_PATTERNS = [
  /\.r2\.cloudflarestorage\.com$/,
  /^pub-.*\.r2\.dev$/,
];

export function normalizeImageUrl(src: string | null | undefined): string {
  if (!src) return "";

  // Only /_next/image?url=... wrappers need unwrapping.
  if (!src.includes("/_next/image")) return src;

  try {
    const inner = new URL(src, "https://placeholder.invalid").searchParams.get(
      "url",
    );
    if (!inner) return src;
    // Nested wrappers are possible if a URL round-tripped twice.
    return normalizeImageUrl(decodeURIComponent(inner));
  } catch {
    return src;
  }
}

// Returns a src that next/image can definitely render: the normalised URL if
// its host is configured, otherwise `fallback`.
//
// next/image throws on an unconfigured hostname, and in a server component
// that throw becomes a 500 for the whole page. Achievement images are pasted
// in through the admin panel and have landed on hosts nobody allow-listed
// (an EdgeOne bucket, the admin app's own optimizer), so one bad record was
// enough to take the homepage down. Fall back instead of crashing.
export function safeImageUrl(
  src: string | null | undefined,
  fallback: string,
): string {
  const normalized = normalizeImageUrl(src);
  if (!normalized) return fallback;

  // Local/relative paths are always fine.
  if (normalized.startsWith("/")) return normalized;

  try {
    const { hostname } = new URL(normalized);
    const allowed =
      ALLOWED_IMAGE_HOSTS.includes(hostname) ||
      ALLOWED_IMAGE_HOST_PATTERNS.some((re) => re.test(hostname));
    return allowed ? normalized : fallback;
  } catch {
    return fallback;
  }
}
