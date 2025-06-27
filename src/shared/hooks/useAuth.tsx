import { useCallback, useMemo } from 'react'
import Cookies from 'js-cookie'

import { environment } from '@/environment'
import { SignInRequest, SignInResponse, TokenValidateResponse, User } from '../types/auth'
import { useRouter } from 'next/navigation'
import { useUserContext } from '../contexts/UserContext'
import { createAxiosClient } from '../factories/axios-client'
import { Routes } from '../enums/routes'

export function useAuth() {
  const { post, get } = createAxiosClient(environment.userControllerApiUri)
  const { setUser } = useUserContext()
  const router = useRouter()

  const signIn = useCallback(
    async (request: SignInRequest) => {
      await post<SignInResponse>(Routes.AUTH_LOGIN, request)
        .then(response => {
          const token = response.data.token

          Cookies.set('authToken', token, {
            expires: 1,
            secure: true,
            sameSite: 'Strict',
          })

          setUser(response.data.usuario)

          router.push('/')
        })
        .catch(error => {
          console.error('Error during authentication:', error)
          throw error
        })
    },
    [post, router, setUser]
  )

  const tokenValidate = useCallback(async () => {
    const tokenValidateResponse = await post<TokenValidateResponse>('/auth/validate')
    const userResponse = await get<User>(`usuarios/${tokenValidateResponse.data.user.id}`)
    setUser(userResponse.data)
  }, [post, setUser, get])

  return useMemo(
    () => ({
      signIn,
      tokenValidate,
    }),
    [signIn, tokenValidate]
  )
}
