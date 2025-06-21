import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { environment } from '@/environment'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value

  if (!token && !request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  if (token) {
    const secret = new TextEncoder().encode(environment.jwtSecret)

    return jwtVerify(token, secret)
      .then(() => NextResponse.next())
      .catch(() => {
        return NextResponse.redirect(new URL('/auth', request.url))
      })
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|auth).*)'],
}
