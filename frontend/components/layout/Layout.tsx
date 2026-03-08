'use client'

import { SessionProvider } from 'next-auth/react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        {/* Main content with proper padding to account for sticky navbar */}
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </div>
    </SessionProvider>
  )
}
