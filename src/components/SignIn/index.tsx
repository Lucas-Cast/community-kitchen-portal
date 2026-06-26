'use client'

import { Label } from '@radix-ui/react-label'
import { Button } from '../ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from '../ui/card'
import { Input } from '../ui/input'
import { useAuth } from '@/shared/hooks/useAuth'

interface SignInProps {
  setIsSignUp: (value: boolean) => void
}

export function SignIn({ setIsSignUp }: SignInProps) {
  const { signIn } = useAuth()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')?.toString().trim() ?? ''
    const password = formData.get('password')?.toString() ?? ''

    signIn({ email, senha: password })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login na sua conta</CardTitle>
          <CardDescription>Digite seu email abaixo para acessar sua conta</CardDescription>
          <CardAction>
            <Button variant="link" onClick={() => setIsSignUp(true)}>
              Cadastrar-se
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form id="sign-in-form" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" form="sign-in-form" className="w-full">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
