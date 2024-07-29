import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/myUrls")) {
    const cookie = req.cookies.get("accessToken");
    const token = cookie?.value;

    if (!token) {
      // Redirect to login page if no token is found
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*", // Apply the middleware to all routes
};
