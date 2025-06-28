import { NextRequest, NextResponse } from 'next/server'
import { userService } from './shared/services/user/user'

export async function middleware(request: NextRequest) {
  return await userService
    .tokenValidate()
    .then(() => NextResponse.next())
    .catch(() => NextResponse.redirect(new URL('/auth', request.url)))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|auth).*)'],
}
