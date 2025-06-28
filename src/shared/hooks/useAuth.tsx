import { useCallback, useMemo } from 'react'
import Cookies from 'js-cookie'

import { SignInRequest } from '../types/auth'
import { useRouter } from 'next/navigation'
import { useUserContext } from '../contexts/UserContext'
import { userService } from '../services/user/user'

export function useAuth() {
  const { setUser } = useUserContext()
  const router = useRouter()

  const signIn = useCallback(
    async (request: SignInRequest) => {
      userService
        .signIn(request)
        .then(response => {
          const token = response.token

          Cookies.set('authToken', token, {
            expires: 1,
            secure: true,
            sameSite: 'Strict',
          })

          setUser(response.usuario)

          router.push('/')
        })
        .catch(error => {
          console.error('Error during authentication:', error)
          throw error
        })
    },
    [router, setUser]
  )

  const tokenValidate = useCallback(async () => {
    const tokenValidateResponse = await userService.tokenValidate()
    const userResponse = await userService.getUserById(tokenValidateResponse.user.id)
    setUser(userResponse)
  }, [setUser])

  return useMemo(
    () => ({
      signIn,
      tokenValidate,
    }),
    [signIn, tokenValidate]
  )
}
