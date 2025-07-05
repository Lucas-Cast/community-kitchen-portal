import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible'
import { Calendar, ChevronDown, Home, Inbox, Pizza, Search, UtensilsCrossed } from 'lucide-react'
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenu,
} from '../ui/sidebar'
import { useState } from 'react'

const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Dishes',
    url: '/dishes',
    icon: Inbox,
  },
  {
    title: 'Menu',
    icon: Calendar,
    subItems: [
      {
        title: 'Gerenciar Menus',
        url: '/menu',
        icon: Calendar,
      },
      {
        title: 'Daily Menus',
        url: '#',
        icon: UtensilsCrossed,
      },
    ],
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Comidas',
    url: '/foods',
    icon: Pizza,
  },
]

export const SidebarItems = () => {
  const [openMenus, setOpenMenus] = useState<string[]>([])

  const toggleMenu = (title: string) => {
    setOpenMenus(prev =>
      prev.includes(title) ? prev.filter(item => item !== title) : [...prev, title]
    )
  }
  return (
    <SidebarMenu>
      {items.map(item => {
        const isOpen = openMenus.includes(item.title)

        return item.subItems ? (
          <Collapsible key={item.title} open={isOpen} onOpenChange={() => toggleMenu(item.title)}>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="w-full">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                  <ChevronDown
                    className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.subItems.map(subItem => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <subItem.icon className="h-4 w-4" />
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ) : (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}
