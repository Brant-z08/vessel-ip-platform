import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const authToken = request.cookies.get('auth_token')
  const isAuthenticated = authToken?.value === 'authenticated'
  const isLoginPage = request.nextUrl.pathname.startsWith('/login')

  // Not logged in and not on the login page → send to login
  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Already logged in and trying to visit /login → send to the main list
  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Run on all routes except Next.js internals and static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.svg$).*)'],
}
