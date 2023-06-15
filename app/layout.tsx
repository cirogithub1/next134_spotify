import './globals.css'

import { ReactNode } from 'react'
import { Figtree } from 'next/font/google'

import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUser from '@/actions/getSongsByUser'
import Player from '@/components/Player'
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices'

const figtree = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Next Spotity',
  description: 'Listen and enjoy',
}

export const revalidte = 0

export default async function RootLayout({ children }:{ children: ReactNode }) {
  const userSongs = await getSongsByUser()
  const products = await getActiveProductsWithPrices()

  return (
    <html lang="en">
      <body className={figtree.className}>
        <ToasterProvider />
        
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />

            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>

            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}