import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_ORIGIN = "https://www.drdubay.in";
const LEGACY_HOSTS = new Set([
  "drdubay.in",
  "ortho.drdubay.in",
  "jointsreplacementsurgeon.in",
  "www.jointsreplacementsurgeon.in",
]);

// WordPress → canonical route map derived from the 29 Aug 2026 WXR export of
// jointsreplacementsurgeon.in. Keep each useful legacy URL pointed at the
// closest live Dr Dubay page instead of blanket-redirecting the domain to the
// homepage. That preserves topical relevance for users, backlinks and crawlers.
const LEGACY_WORDPRESS_ROUTES: Record<string, string> = {
  "/": "/",
  "/home": "/",
  "/new-home": "/",
  "/about-us": "/about",
  "/contact-us": "/contact",
  "/services": "/services",
  "/blog": "/blogs",
  "/achievements": "/achievements",
  "/joint-replacement-surgery-jaipur-india": "/joint-replacement-surgeon-jaipur",

  // The old WordPress install retained template-like slugs for two otherwise
  // relevant knee-replacement articles. Route by article intent, not by slug.
  "/get-the-home-care-and-nursing-service": "/blogs/joint-replacement-recovery-tips",
  "/top-mistakes-after-knee-replacement": "/blogs/joint-replacement-recovery-tips",
  "/dental-or-implant-what-is-the-best": "/blogs/total-knee-replacement",
};

// The old homepage/blog template also linked content through WordPress query
// URLs such as /?post_type=post&p=5832. These IDs come from the WXR export and
// must resolve before pathname mapping so old links do not collapse to /.
const LEGACY_WORDPRESS_IDS: Record<string, string> = {
  "5832": "/blogs/joint-replacement-recovery-tips",
  "5835": "/blogs/joint-replacement-recovery-tips",
  "5838": "/blogs/total-knee-replacement",
  "7801": "/",
  "7953": "/",
  "8033": "/about",
  "8074": "/services",
  "8088": "/contact",
  "8089": "/blogs",
  "8133": "/joint-replacement-surgeon-jaipur",
  "8385": "/achievements",
};

const WORDPRESS_ROUTING_QUERY_KEYS = [
  "p",
  "page_id",
  "post_type",
  "attachment_id",
  "preview",
  "preview_id",
  "preview_nonce",
];

const PRIVATE_PREFIXES = [
  "/admin",
  "/api/csv",
  "/api/patients",
  "/api/payment",
  "/api/r2/get-signed-url",
];

function hiddenResponse() {
  return new NextResponse("Not Found", {
    status: 404,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
    },
  });
}

function normalisePath(pathname: string) {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "") || "/";
}

function legacyWordPressDestination(
  pathname: string,
  searchParams: URLSearchParams,
) {
  const legacyId = searchParams.get("p") || searchParams.get("page_id");
  if (legacyId && LEGACY_WORDPRESS_IDS[legacyId]) {
    return LEGACY_WORDPRESS_IDS[legacyId];
  }

  const normalised = normalisePath(pathname);
  const exact = LEGACY_WORDPRESS_ROUTES[normalised];
  if (exact) return exact;

  // Keep any unexpected WordPress descendants on a semantically useful hub.
  // Known posts from the WXR export are handled explicitly above.
  if (normalised.startsWith("/blog/")) return "/blogs";
  if (normalised.startsWith("/services/")) return "/services";

  // Preserve any other path. If a matching route already exists on the new
  // site it keeps its equity; genuinely unknown URLs remain honest 404s rather
  // than being blanket-redirected to the homepage (a potential soft 404).
  return pathname;
}

function legacyWordPressSearch(searchParams: URLSearchParams) {
  const cleaned = new URLSearchParams(searchParams);
  WORDPRESS_ROUTING_QUERY_KEYS.forEach((key) => cleaned.delete(key));

  // Preserve useful campaign/tracking parameters while removing WordPress-only
  // routing parameters from the canonical destination.
  const value = cleaned.toString();
  return value ? `?${value}` : "";
}

export function middleware(request: NextRequest) {
  const { pathname, search, hostname, searchParams } = request.nextUrl;

  if (LEGACY_HOSTS.has(hostname)) {
    let destinationPath = pathname;
    let destinationSearch = search;

    if (
      hostname === "jointsreplacementsurgeon.in" ||
      hostname === "www.jointsreplacementsurgeon.in"
    ) {
      destinationPath = legacyWordPressDestination(pathname, searchParams);
      destinationSearch = legacyWordPressSearch(searchParams);
    }

    if (hostname === "ortho.drdubay.in") {
      destinationPath =
        pathname === "/best-orthopedic-surgeon-in-india"
          ? "/joint-replacement-surgeon-jaipur"
          : pathname === "/"
            ? "/"
            : "/locations";
    }

    const destination = new URL(destinationPath, CANONICAL_ORIGIN);
    destination.search = destinationSearch;
    // Use 301 for domain-migration redirects. Google Search supports both 301
    // and 308 as permanent redirects, while Search Console's Change of Address
    // pre-check explicitly checks sample source URLs for 301 redirects.
    return NextResponse.redirect(destination, 301);
  }

  if (PRIVATE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return hiddenResponse();
  }

  // The public site may read closed dates and videos, but their legacy write
  // endpoints belong exclusively in the authenticated admin application.
  if (
    request.method !== "GET" &&
    (pathname.startsWith("/api/days/closed/") || pathname.startsWith("/api/youtube"))
  ) {
    return hiddenResponse();
  }

  const response = NextResponse.next();

  if (
    pathname.startsWith("/booking") ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up")
  ) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  return response;
}

export const config = {
  matcher: ["/((?!.*\\..*|_next/static|_next/image).*)"],
};
