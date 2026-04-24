import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  if (path.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (path.startsWith("/admin") && token) {
    try {
      // Check the payload
      const payloadBase64 = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));

      // If they are not an admin, kick them to the homepage
      if (decodedPayload.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      // If the token is malformed or tampered with, kick them to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 3. If they pass all checks, let them in!
  return NextResponse.next();
}

// 4. Tell the middleware to ONLY run on admin routes to keep the rest of the site fast
export const config = {
  matcher: ["/admin/:path*"],
};
