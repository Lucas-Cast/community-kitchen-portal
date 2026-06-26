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
    // Intentionally runs only on navigation (pathname change).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return <>{children}</>
}
