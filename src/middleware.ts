import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Legacy capitalized tour slugs — redirect to lowercase canonical URLs.
// Moved here from next.config.ts so they run before the locale rewrite below.
const LEGACY_REDIRECTS: Record<string, string> = {
  "/tours/Isla-Piedra": "/tours/isla-piedra",
  "/tours/Isla-Venados": "/tours/isla-venados",
  "/tours/Cuatrimotos-Veranos": "/tours/cuatrimotos-veranos",
  "/tours/Catamaran-Sensation": "/tours/catamaran-sensation",
  "/tours/Speed-Boats": "/tours/speed-boats",
};

/*
 * Spanish is the default locale and stays unprefixed in the URL bar
 * (e.g. /tours), while English is explicitly prefixed (e.g. /en/tours).
 * Internally, both are rewritten to the [lang] route segment so every
 * page has its own crawlable, indexable URL per language.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const legacyTarget = LEGACY_REDIRECTS[pathname];
  if (legacyTarget) {
    return NextResponse.redirect(new URL(legacyTarget + search, request.url), 308);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  const target = pathname === "/" ? "/es" : `/es${pathname}`;
  return NextResponse.rewrite(new URL(target + search, request.url));
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
