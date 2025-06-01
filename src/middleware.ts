import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  if (url.pathname === "/") {
    return NextResponse.redirect(new URL('/blogs', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/blogs', 
    '/profile',
  ],
};
