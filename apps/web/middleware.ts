import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  // Get the session token from cookies (Auth.js stores it as "authjs.se")
  const sessionToken = req.cookies.get("authjs.session-token")?.value;

  // Define protected and public routes
  const protectedRoutes = ["/dashboard"];
  const publicRoutes = ["/signin", "/signup"];

  const pathname = req.nextUrl.pathname;

  // If NOT authenticated and trying to access a protected route -> Redirect to /signin
  if (!sessionToken && protectedRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl.origin));
  }

  // If authenticated and trying to access a public route -> Redirect to /dashboard
  if (sessionToken && publicRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

  // Allow request to proceed
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup"], // Middleware applies only to these routes
};
