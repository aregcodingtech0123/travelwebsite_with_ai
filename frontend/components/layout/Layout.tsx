'use client'

import { SessionProvider } from 'next-auth/react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 pt-[6.5rem] md:pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </SessionProvider>
  )
}
