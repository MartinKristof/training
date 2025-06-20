import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Add custom headers to all responses
  const response = NextResponse.next();
  response.headers.set('x-middleware-cache', 'no-cache');
  response.headers.set('x-powered-by', 'Next.js 15');

  // Log all requests (in production, you'd use a proper logging service)
  // eslint-disable-next-line no-console
  console.log(`[${new Date().toISOString()}] ${request.method} ${path}`);

  // Example: Authentication check for protected routes
  if (path.startsWith('/dashboard')) {
    const authToken = request.cookies.get('auth-token');

    if (!authToken) {
      // Redirect to login page if no auth token
      const loginUrl = new URL('/middleware-demo', request.url);
      loginUrl.searchParams.set('redirect', path);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Example: Rate limiting (simplified)
  const currentRequests = parseInt(request.headers.get('x-request-count') || '0');

  if (currentRequests > 100) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  // Add request count header
  response.headers.set('x-request-count', (currentRequests + 1).toString());

  // Example: A/B testing for specific routes
  if (path === '/') {
    const userAgent = request.headers.get('user-agent') || '';
    const isMobile = /mobile/i.test(userAgent);

    if (isMobile) {
      response.headers.set('x-experiment', 'mobile-optimized');
    } else {
      response.headers.set('x-experiment', 'desktop-optimized');
    }
  }

  // Example: Custom response for specific paths
  if (path === '/middleware-demo') {
    const demoResponse = NextResponse.next();
    demoResponse.headers.set('x-middleware-demo', 'true');
    demoResponse.headers.set('x-user-agent', request.headers.get('user-agent') || 'unknown');
    return demoResponse;
  }

  return response;
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
