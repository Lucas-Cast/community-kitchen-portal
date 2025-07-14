import { useCallback, useMemo } from 'react'
import Cookies from 'js-cookie'

import { SignInRequest, SignUpRequest } from '../types/auth'
import { useRouter } from 'next/navigation'
import { useUserContext } from '../contexts/UserContext'
import { userService } from '../services/user/user'
import { toast } from 'sonner'

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
          toast.success('Autenticado com sucesso!')
          router.push('/')
        })
        .catch(error => {
          toast.error('Erro ao fazer login. Verifique suas credenciais e tente novamente.')
          console.error('Error during authentication:', error)
          throw error
        })
    },
    [router, setUser]
  )

  const signUp = useCallback(
    async (request: SignUpRequest) => {
      userService
        .signUp(request)
        .then(async () => {
          await signIn({ email: request.email, senha: request.senha })
        })
        .catch(error => {
          toast.error('Erro ao criar usuário. Verifique os dados e tente novamente.')
          console.error('Error during authentication:', error)
          throw error
        })
    },
    [router]
  )

  const tokenValidate = useCallback(async () => {
    const tokenValidateResponse = await userService
      .tokenValidate()
      .catch(() => router.push('/auth'))
    const userResponse =
      tokenValidateResponse && (await userService.getUserById(tokenValidateResponse.user.id))
    setUser(userResponse ?? null)
  }, [setUser])

  return useMemo(
    () => ({
      signIn,
      tokenValidate,
      signUp,
    }),
    [signIn, tokenValidate, signUp]
  )
}
