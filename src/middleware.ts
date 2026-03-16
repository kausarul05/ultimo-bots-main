import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // Check if user is authenticated (you can check for token in cookies)
    const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true';
    
    const { pathname } = request.nextUrl;
    
    // Define protected routes
    const isDashboardRoute = pathname.startsWith('/dashboard');
    const isLoginRoute = pathname === '/login';
    
    // If trying to access dashboard without auth, redirect to login
    if (isDashboardRoute && !isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // If already logged in and trying to access login, redirect to dashboard
    if (isLoginRoute && isAuthenticated) {
        return NextResponse.redirect(new URL('/dashboard/my-bots', request.url));
    }
    
    // Allow request to continue
    return NextResponse.next();
}

// Configure middleware to run on specific paths
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
        '/((?!api|_next/static|_next/image|favicon.ico|images|videos).*)',
    ],
};