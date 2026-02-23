import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // On Vercel (production), serve the landing page as homepage
  // Locally, serve the dashboard as-is
  if (request.nextUrl.pathname === '/') {
    const isVercel = process.env.VERCEL === '1';
    if (isVercel) {
      return NextResponse.rewrite(new URL('/landing', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
