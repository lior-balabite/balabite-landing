import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Rewrite pitch.balabite.ai/* -> /pitch/*
 * Runs at the edge before page resolution.
 */
export function middleware(request: NextRequest) {
  const hostname = (request.headers.get('host') || '').toLowerCase();
  const url = request.nextUrl.clone();

  // Case-insensitive alias for the NRA booklet QR. The printed booklet's QR is
  // locked to /NRA-booklet (PM-verified against book-final.pdf p.12); this
  // guards against any case mismatch in the QR — /nra-booklet, /NRA-BOOKLET,
  // etc. all redirect to the canonical /NRA-booklet so it can never 404.
  if (
    url.pathname.toLowerCase() === '/nra-booklet' &&
    url.pathname !== '/NRA-booklet'
  ) {
    url.pathname = '/NRA-booklet';
    return NextResponse.redirect(url);
  }

  const isPitchSubdomain =
    hostname === 'pitch.balabite.ai' ||
    hostname === 'pitch.balabite.ai:443' ||
    hostname.startsWith('pitch.balabite.ai');

  if (!isPitchSubdomain) {
    return NextResponse.next();
  }

  // Already under /pitch — let it through
  if (url.pathname === '/pitch' || url.pathname.startsWith('/pitch/')) {
    return NextResponse.next();
  }

  // Skip static files by extension (images, fonts, css, etc.)
  if (/\.[a-zA-Z0-9]+$/.test(url.pathname)) {
    return NextResponse.next();
  }

  // Rewrite pitch.balabite.ai/foo -> /pitch/foo
  url.pathname = url.pathname === '/' ? '/pitch' : `/pitch${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip _next/static, _next/image, favicon, api, and any file with extension
  matcher: ['/((?!_next/static|_next/image|favicon|api/|.*\\.[a-zA-Z0-9]+$).*)'],
};
