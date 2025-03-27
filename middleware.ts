import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Redirigir rutas antiguas al home
  if (request.nextUrl.pathname.startsWith('/components/') || 
      request.nextUrl.pathname.startsWith('/icons/')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/components/:path*',
    '/icons/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 