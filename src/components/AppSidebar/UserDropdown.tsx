import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu'
import { User2, ChevronUp } from 'lucide-react'
import { SidebarMenuButton } from '../ui/sidebar'
import { useUserContext } from '@/shared/contexts/UserContext'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export const UserDropdown = () => {
  const { user } = useUserContext()
  const { setUser } = useUserContext()
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <User2 /> {user?.nome ?? 'Not logged in'}
          <ChevronUp className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        align="end"
        className="
                    min-w-[180px]
                    border
                    border-[var(--color-popover-foreground)]
                    bg-[var(--color-popover)]
                    text-[var(--color-popover-foreground)]
                    rounded-[var(--radius-lg)]
                    shadow-lg
                    p-1
                    z-50
                    focus:outline-none"
      >
        <DropdownMenuItem
          className="
                    flex items-center gap-2
                    rounded-[var(--radius-md)]
                    transition-colors
                    text-[var(--color-accent-foreground)]
                    hover:bg-[var(--color-accent)]
                    focus:bg-[var(--color-accent)]
                    focus:text-[var(--color-accent-foreground)]
                    outline-none
                    "
        >
          {user?.nome ? (
            <input
              type="button"
              className="font-medium cursor-pointer py-1 w-full"
              onClick={() => {
                setUser(null)
                Cookies.remove('authToken')
                router.push('/auth')
              }}
              value={'Sign out'}
            />
          ) : (
            <input
              type="button"
              className="font-medium cursor-pointer py-1 w-full"
              onClick={() => router.push('/auth')}
              value={'Sign in'}
            />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
