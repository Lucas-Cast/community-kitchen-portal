'use client'

import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { UserProvider } from '@/shared/contexts/UserContext'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { usePathname } from 'next/navigation'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
          <SidebarProvider>
            {pathname !== '/auth' && <AppSidebar />}
            <SidebarInset>
              {pathname !== '/auth' && <SidebarTrigger />}

              {children}
            </SidebarInset>
          </SidebarProvider>
        </UserProvider>
      </body>
    </html>
  )
}
