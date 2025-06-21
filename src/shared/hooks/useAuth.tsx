import { useCallback, useMemo } from 'react'
import Cookies from 'js-cookie'

import { environment } from '@/environment'

import { useApiService } from './useApiService'
import { SignInRequest, SignInResponse } from '../types/auth'
import { useRouter } from 'next/navigation'
import { useUserContext } from '../contexts/UserContext'

export function useAuth() {
  const { post } = useApiService(environment.userControllerApiUri)
  const { setUser } = useUserContext()
  const router = useRouter()

  const signIn = useCallback(
    async (request: SignInRequest) => {
      await post<SignInResponse>('/auth/login', request)
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
    [post, router]
  )
  return useMemo(
    () => ({
      signIn,
    }),
    [signIn]
  )
}
