'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Menu, User, LogOut, Globe, ChevronDown, Plane } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Sidebar } from './Sidebar'
import { useLanguage, languageMetadata, LanguageCode } from '@/app/contexts/LanguageContext'

export function Navbar() {
  const { data: session, status } = useSession()
  const { language, setLanguage, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '/about', labelKey: 'nav.about' },
    { href: '/destinations', labelKey: 'nav.destinations' },
    { href: '/chat', labelKey: 'nav.chat' },
    { href: '/contact', labelKey: 'nav.contact' },
  ]

  const currentLang = languageMetadata.find(l => l.code === language)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-brand shadow-lg shadow-brand/20' 
            : 'bg-gradient-to-b from-black/40 via-black/20 to-transparent backdrop-blur-sm'
        }`}
        data-testid="navbar"
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Left - Logo/Menu */}
            <div className="flex items-center gap-3">
              {status === 'authenticated' && (
                <button
                  type="button"
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
                  aria-label={t('nav.menu.open')}
                  data-testid="menu-button"
                >
                  <Menu className="w-6 h-6" />
                </button>
              )}
              <Link 
                href="/" 
                className="flex items-center gap-2 font-heading font-bold text-xl md:text-2xl text-white hover:opacity-90 transition-opacity tracking-tight"
                data-testid="site-logo"
              >
                <Plane className="w-6 h-6 md:w-7 md:h-7 text-white" />
                <span className="hidden sm:inline">{t('site.name')}</span>
              </Link>
            </div>

            {/* Center - Nav Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="animated-underline px-4 py-2 text-white/90 hover:text-white font-medium transition-colors"
                  data-testid={`nav-link-${link.labelKey.split('.')[1]}`}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>

            {/* Right - Language & Auth */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Language Selector */}
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button
                    type="button"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 text-white border ${
                      scrolled 
                        ? 'bg-white/10 hover:bg-white/20 border-white/20' 
                        : 'bg-black/20 hover:bg-black/30 border-white/10'
                    }`}
                    aria-label={t('language.select')}
                    data-testid="language-selector"
                  >
                    <Globe className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm font-medium">{currentLang?.name}</span>
                    <ChevronDown className="w-4 h-4 opacity-70" />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="min-w-[160px] bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-[100] animate-fade-in-scale"
                    sideOffset={8}
                    align="end"
                  >
                    {languageMetadata.map((lang) => (
                      <DropdownMenu.Item
                        key={lang.code}
                        onSelect={() => setLanguage(lang.code)}
                        className={`flex items-center gap-3 px-4 py-2.5 outline-none cursor-pointer transition-colors ${
                          language === lang.code 
                            ? 'bg-brand/10 text-brand' 
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                        data-testid={`lang-option-${lang.code}`}
                      >
                        <img 
                          src={lang.flag} 
                          alt={`${lang.name} flag`}
                          className="w-5 h-5 rounded-full object-cover"
                          loading="lazy"
                        />
                        <span className="font-medium">{lang.name}</span>
                        {language === lang.code && (
                          <span className="ml-auto text-brand">✓</span>
                        )}
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>

              {/* Auth Buttons */}
              {status === 'authenticated' ? (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button
                      type="button"
                      className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                      aria-label={t('nav.menu.user')}
                      data-testid="user-menu-button"
                    >
                      <User className="w-6 h-6" />
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="min-w-[180px] bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-[100] animate-fade-in-scale"
                      sideOffset={8}
                      align="end"
                    >
                      <DropdownMenu.Item asChild>
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 outline-none transition-colors"
                          data-testid="nav-profile-link"
                        >
                          <User className="w-4 h-4" />
                          {t('nav.profile')}
                        </Link>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        onSelect={() => signOut({ callbackUrl: '/' })}
                        className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 cursor-pointer outline-none transition-colors"
                        data-testid="nav-logout-button"
                      >
                        <LogOut className="w-4 h-4" />
                        {t('nav.logout')}
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className={`px-4 py-2 rounded-lg font-medium text-white border transition-all duration-300 ${
                      scrolled 
                        ? 'border-white/40 hover:bg-white/10' 
                        : 'border-white/30 hover:bg-white/10'
                    }`}
                    data-testid="nav-login-button"
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-lg font-medium bg-white text-brand hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:shadow-white/20"
                    data-testid="nav-signup-button"
                  >
                    {t('nav.signup')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Links */}
      <nav 
        className={`lg:hidden fixed top-16 left-0 right-0 z-40 py-2 px-4 flex flex-wrap gap-1 justify-center transition-all duration-500 ${
          scrolled 
            ? 'bg-brand shadow-md' 
            : 'bg-gradient-to-b from-black/30 to-transparent backdrop-blur-sm'
        }`}
        data-testid="mobile-nav"
        role="navigation"
        aria-label="Mobile navigation"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-white/95 hover:text-white hover:bg-white/10 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
          >
            {t(link.labelKey)}
          </Link>
        ))}
      </nav>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}
