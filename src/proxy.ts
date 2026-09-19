import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Hotlink deterrent for personal photos under /p/*.
// Allows same-origin requests and direct navigation (no referer),
// rejects requests referred from foreign origins or cross-site fetches.
export function proxy(request: NextRequest) {
  const referer = request.headers.get("referer");
  const secFetchSite = request.headers.get("sec-fetch-site");

  if (secFetchSite === "cross-site") {
    return new NextResponse("Forbidden", { status: 403 });
  }

  if (referer) {
    try {
      const ref = new URL(referer);
      if (ref.host !== request.nextUrl.host) {
        return new NextResponse("Forbidden", { status: 403 });
      }
    } catch {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/p/:path*",
};
