'use client'

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'
import { User } from '../types/auth'

interface UserContextProps {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: (): User | null => null,
})

interface UserProviderProps {
  children: ReactNode
}

export function UserProvider({ children }: Readonly<UserProviderProps>) {
  const [user, setUser] = useState<User | null>(null)

  const value = useMemo(() => {
    return { user, setUser }
  }, [user, setUser])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext)
