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
import { useState } from 'react'

interface SignInProps {
  setIsSignUp: (value: boolean) => void
}

export function SignIn({ setIsSignUp }: SignInProps) {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            onClick={() => signIn({ email, senha: password })}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
