import { NextResponse } from "next/server";
import { isAuthenticated } from "./lib/auth";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated && request.nextUrl.pathname.startsWith("/posts")) {
    return NextResponse.rewrite(new URL("/not-authorized", request.url));
  }

  if (isUserAuthenticated && request.nextUrl.pathname.startsWith("/sign-in")) {
    return NextResponse.redirect(new URL("/posts", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/posts/:path*",
    "/sign-in",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
