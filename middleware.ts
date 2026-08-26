import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_ORIGIN = "https://www.drdubay.in";
const LEGACY_HOSTS = new Set([
  "drdubay.in",
  "ortho.drdubay.in",
  "jointsreplacementsurgeon.in",
  "www.jointsreplacementsurgeon.in",
]);

// Explicit WordPress → canonical-route mapping for the old
// jointsreplacementsurgeon.in site. These routes are publicly linked from
// the legacy navigation today, but their slugs do not match the Next.js site.
// Mapping them here prevents an authority-transfer cutover from turning known
// legacy pages into 404s when the old domain is pointed at this deployment.
const LEGACY_WORDPRESS_ROUTES: Record<string, string> = {
  "/": "/",
  "/about-us": "/about",
  "/contact-us": "/contact",
  "/services": "/services",
  "/blog": "/blogs",
};

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

function legacyWordPressDestination(pathname: string) {
  const normalised = normalisePath(pathname);
  const exact = LEGACY_WORDPRESS_ROUTES[normalised];
  if (exact) return exact;

  // Old posts/service-detail URLs were not all discoverable from the public
  // search index. Route descendants to the closest live content hub rather
  // than preserving a WordPress-only prefix that cannot exist on Next.js.
  if (normalised.startsWith("/blog/")) return "/blogs";
  if (normalised.startsWith("/services/")) return "/services";

  // Preserve any other path. If a matching route already exists on the new
  // site it keeps its equity; genuinely unknown URLs remain honest 404s rather
  // than being blanket-redirected to the homepage (which Google can treat as
  // a soft 404).
  return pathname;
}

export function middleware(request: NextRequest) {
  const { pathname, search, hostname } = request.nextUrl;

  if (LEGACY_HOSTS.has(hostname)) {
    let destinationPath = pathname;

    if (
      hostname === "jointsreplacementsurgeon.in" ||
      hostname === "www.jointsreplacementsurgeon.in"
    ) {
      destinationPath = legacyWordPressDestination(pathname);
    }

    if (hostname === "ortho.drdubay.in") {
      destinationPath =
        pathname === "/best-orthopedic-surgeon-in-india"
          ? "/joint-replacement-surgeon-jaipur"
          : pathname === "/"
            ? "/"
            : "/locations";
    }

    const destination = new URL(`${destinationPath}${search}`, CANONICAL_ORIGIN);
    return NextResponse.redirect(destination, 308);
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
