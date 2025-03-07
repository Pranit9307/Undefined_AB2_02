import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define which routes require authentication
const protectedRoutes = ['/createui', '/profile', '/layouts'];

export function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const { pathname } = request.nextUrl;
  
  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute) {
    // Get the token from cookies
    const token = request.cookies.get('auth_token')?.value;
    
    // If no token exists, redirect to signin
    if (!token) {
      console.log(`Middleware: Redirecting from ${pathname} to signin (no auth token)`);
      const url = new URL('/signin', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
    
    // We don't verify the token here because jsonwebtoken uses Node.js crypto
    // which is not supported in the Edge Runtime
    // The actual verification will happen in the API routes and client components
    console.log(`Middleware: User has token, allowing access to ${pathname}`);
  }
  
  return NextResponse.next();
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 