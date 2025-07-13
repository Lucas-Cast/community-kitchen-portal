'use client'

import PageContainer from '@/components/PageContainer'
import { SignIn } from '@/components/SignIn'
import { SignUp } from '@/components/SignUp'
import { useState } from 'react'

export default function Page() {
  const [isSignUp, setIsSignUp] = useState(false)
  return (
    <PageContainer>
      {isSignUp ? <SignUp setIsSignUp={setIsSignUp} /> : <SignIn setIsSignUp={setIsSignUp} />}
    </PageContainer>
  )
}
