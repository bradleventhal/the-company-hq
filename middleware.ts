import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // The Company HQ — no rewrites, serve the office directly
  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
