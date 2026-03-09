'use client'

import { useEffect } from 'react'
import { SessionProvider } from 'next-auth/react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { useLanguage } from '@/app/contexts/LanguageContext'

export function Layout({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage()

  useEffect(() => {
    if (typeof document === 'undefined') return
    const dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.dir = dir
    document.documentElement.lang = language
  }, [language])

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
