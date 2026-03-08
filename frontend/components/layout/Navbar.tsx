'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, User, LogOut } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Sidebar } from '../layout/Sidebar'

const SITE_NAME = 'AI Traveller Planner'
const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/chat', label: 'AI Chat' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const { data: session, status } = useSession()
  const [scrolled, setScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const bg = scrolled ? 'rgb(0, 191, 165)' : 'transparent'
  const textColor = 'white'

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ backgroundColor: bg, color: textColor }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Left */}
            <div className="flex items-center gap-4">
              {status === 'authenticated' ? (
                <>
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label="Open menu"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                  <Link href="/" className="font-semibold text-lg hover:opacity-90">
                    {SITE_NAME}
                  </Link>
                </>
              ) : (
                <Link href="/" className="font-semibold text-lg hover:opacity-90">
                  {SITE_NAME}
                </Link>
              )}
            </div>

            {/* Middle - nav links */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/95 hover:text-white font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-2">
              {status === 'authenticated' ? (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button
                      type="button"
                      className="p-2 rounded-full hover:bg-white/10 transition-colors"
                      aria-label="User menu"
                    >
                      <User className="w-6 h-6" />
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="min-w-[180px] bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-[100]"
                      sideOffset={8}
                      align="end"
                    >
                      <DropdownMenu.Item asChild>
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 px-4 py-2 text-slate-800 hover:bg-slate-100 outline-none"
                        >
                          <User className="w-4 h-4" />
                          Profile
                        </Link>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        onSelect={() => signOut({ callbackUrl: '/' })}
                        className="flex items-center gap-2 px-4 py-2 text-slate-800 hover:bg-slate-100 cursor-pointer outline-none"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg font-medium text-white border border-white/60 hover:bg-white/10 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-lg font-medium bg-white text-[rgb(0,191,165)] hover:bg-white/90 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile nav - same links as dropdown below navbar on small screens */}
      <nav className="md:hidden fixed top-16 left-0 right-0 z-40 py-2 px-4 flex flex-wrap gap-2 justify-center transition-all duration-300" style={{ backgroundColor: scrolled ? 'rgb(0, 191, 165)' : 'transparent' }}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-white/95 hover:text-white text-sm font-medium px-3 py-1"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}
