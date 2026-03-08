// import type { Metadata } from 'next'
// import './globals.css'

// export const metadata: Metadata = {
//   title: 'AI Travel Planner',
//   description: 'Plan your perfect trip with AI',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   )
// }

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from './contexts/LanguageContext'
import { Layout } from '@/components/layout/Layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Traveller Planner',
  description: 'Intelligent travel planning powered by AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LanguageProvider>
          <Layout>{children}</Layout>
        </LanguageProvider>
      </body>
    </html>
  )
}