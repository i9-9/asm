import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Redirigir rutas no válidas al home
  if (request.nextUrl.pathname.startsWith('/components/')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/components/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 