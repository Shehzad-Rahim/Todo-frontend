import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const protectedRoutes = ["/tasks"];

// Routes that should redirect to /tasks if authenticated
const authRoutes = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for Better Auth session token
  const sessionToken = request.cookies.get("better-auth.session_token");
  const isAuthenticated = !!sessionToken?.value;

  // Redirect unauthenticated users from protected routes to login
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect authenticated users from auth routes to tasks
  if (authRoutes.includes(pathname)) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/tasks", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tasks/:path*", "/login", "/signup"],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(_: NextRequest) {
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/tasks/:path*", "/login", "/signup"],
// };
