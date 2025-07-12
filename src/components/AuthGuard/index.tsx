'use client'

import { useUserContext } from '@/shared/contexts/UserContext'
import { useAuth } from '@/shared/hooks/useAuth'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { tokenValidate } = useAuth()
  const { user } = useUserContext()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (pathname !== '/auth') {
      tokenValidate()
      return
    }

    if (!user) router.push('/auth')
  }, [pathname])

  return <>{children}</>
}
