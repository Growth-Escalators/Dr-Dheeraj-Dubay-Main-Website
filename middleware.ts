import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_ORIGIN = "https://www.drdubay.in";
const LEGACY_HOSTS = new Set([
  "drdubay.in",
  "ortho.drdubay.in",
  "jointsreplacementsurgeon.in",
  "www.jointsreplacementsurgeon.in",
]);

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

export function middleware(request: NextRequest) {
  const { pathname, search, hostname } = request.nextUrl;

  if (LEGACY_HOSTS.has(hostname)) {
    let destinationPath = pathname;

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
