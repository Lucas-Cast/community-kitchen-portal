import { useCallback, useMemo } from 'react'

import { environment } from '@/environment'

import { useApiService } from './useApiService'
import { SignInRequest, SignInResponse } from '../types/auth'

export function useAuth() {
  const { post } = useApiService(environment.userControllerApiUri)

  const signIn = useCallback(
    async (request: SignInRequest) => {
      await post<SignInResponse>('/auth/login', request)
        .then(response => {
          const token = response.data.token
          if (token) {
            localStorage.setItem('authToken', token)
            sessionStorage.setItem('authToken', token)
          }
          return token
        })
        .catch(error => {
          console.error('Error during authentication:', error)
          throw error
        })
    },
    [post]
  )
  return useMemo(
    () => ({
      signIn,
    }),
    [signIn]
  )
}
