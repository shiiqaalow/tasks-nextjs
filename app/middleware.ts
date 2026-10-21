// middleware.ts
import { NextResponse, type NextRequest } from 'next/server'

const SESSION_COOKIE = 'session' // change to your actual cookie name

const publicRoutes = ['/login', '/signup', '/verify-email']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value)
  const isPublic = publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  // not logged in, trying to open a protected page
  if (!hasSession && !isPublic) {
    const url = new URL('/login', request.url)
    url.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(url)
  }

  // logged in, trying to open login/signup
  if (hasSession && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // run on everything except Next internals, API routes and static files
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}