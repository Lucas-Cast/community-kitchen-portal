'use client'

import PageContainer from '@/components/PageContainer'
import { useAuth } from '@/shared/hooks/useAuth'
import { useEffect } from 'react'

export default function Home() {
  const { tokenValidate } = useAuth()

  useEffect(() => {
    tokenValidate()
  }, [])

  return (
    <PageContainer>
      <div></div>
    </PageContainer>
  )
}
