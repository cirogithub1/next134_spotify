import './globals.css'

import { ReactNode } from 'react'
import { Figtree } from 'next/font/google'

import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUser from '@/actions/getSongsByUser'

const figtree = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Next Spotity',
  description: 'Listen and enjoy',
}

export const revalidte = 0

export default async function RootLayout({ children }:{ children: ReactNode }) {
  const userSongs = await getSongsByUser()

  return (
    <html lang="en">
      <body className={figtree.className}>
        <ToasterProvider />
        
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />

            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}