import { NextRequest, NextResponse } from 'next/server'
import { environment } from '@/environment'
import { TokenValidateResponse } from './shared/types/auth'
import { createAxiosClient } from './shared/factories/axios-client'
import { Routes } from './shared/enums/routes'

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken')?.value
  const { post } = createAxiosClient(environment.userControllerApiUri, authToken)

  return await post<TokenValidateResponse>(Routes.TOKEN_VALIDATE)
    .then(() => NextResponse.next())
    .catch(() => NextResponse.redirect(new URL('/auth', request.url)))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|auth).*)'],
}
