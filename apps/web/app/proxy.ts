import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get('better-auth.session_token');

  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboardRoute && !sessionToken) {
    console.log('proxy activated 1');

    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["login", "/dashboard",'/dashboard/:path*'],
};
