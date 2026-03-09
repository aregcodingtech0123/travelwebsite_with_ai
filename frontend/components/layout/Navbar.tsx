'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Menu, User, LogOut, Globe, ChevronDown, Plane, Search } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Sidebar } from './Sidebar'
import { useLanguage, languageMetadata, LanguageCode } from '@/app/contexts/LanguageContext'

export function Navbar() {
  const { data: session, status } = useSession()
  const { language, setLanguage, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<
    { label: string; value: string }[]
  >([])
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Debounced location search
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults([])
      return
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(async () => {
      try {
        setSearchLoading(true)
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery.trim(),
        )}&addressdetails=1&limit=5`
        const res = await fetch(url, {
          signal: controller.signal,
          headers: {
            // Nominatim requires an identifying header; this is a simple app identifier
            'Accept-Language': language,
          },
        })
        if (!res.ok) {
          setSearchResults([])
          return
        }
        const data: any[] = await res.json()
        const mapped = data.map((item) => {
          const city =
            item.address?.city ||
            item.address?.town ||
            item.address?.village ||
            ''
          const country = item.address?.country || ''
          const label = [city, country].filter(Boolean).join(', ') || item.display_name
          return {
            label,
            value: label,
          }
        })
        setSearchResults(mapped)
        setSearchOpen(true)
      } catch (err) {
        if ((err as any).name !== 'AbortError') {
          console.error('Location search failed', err)
        }
        setSearchResults([])
      } finally {
        setSearchLoading(false)
      }
    }, 300)

    return () => {
      controller.abort()
      clearTimeout(timeoutId)
    }
  }, [searchQuery, language])

  const handleSelectLocation = (value: string) => {
    const slug = encodeURIComponent(value)
    setSearchQuery('')
    setSearchResults([])
    setSearchOpen(false)
    router.push(`/destination/${slug}`)
  }

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

            {/* Right - Search, Language & Auth */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Location Search */}
              <div className="relative hidden md:block">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 focus-within:bg-white/20 transition-colors">
                  <Search className="w-4 h-4 text-white/80" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('destinations.searchPlaceholder') ?? 'Search a city or country'}
                    className="bg-transparent text-xs text-white placeholder:text-white/60 focus:outline-none w-40"
                  />
                </div>
                {searchOpen && searchResults.length > 0 && (
                  <div className="absolute mt-1 w-full max-w-xs bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-[60]">
                    {searchResults.map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => handleSelectLocation(item.value)}
                        className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
                {searchLoading && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/80">
                    …
                  </div>
                )}
              </div>
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
                        {lang.code === 'pt' ? (
                          <span className="relative w-5 h-5 rounded-full overflow-hidden border border-slate-200">
                            <span
                              className="absolute inset-y-0 left-0 w-1/2 bg-cover bg-center"
                              style={{
                                backgroundImage:
                                  "url('https://cdn-icons-png.flaticon.com/512/197/197463.png')",
                              }}
                            />
                            <span
                              className="absolute inset-y-0 right-0 w-1/2 bg-cover bg-center"
                              style={{
                                backgroundImage:
                                  "url('https://cdn-icons-png.flaticon.com/512/197/197386.png')",
                              }}
                            />
                          </span>
                        ) : (
                          <img 
                            src={lang.flag} 
                            alt={`${lang.name} flag`}
                            className="w-5 h-5 rounded-full object-cover"
                            loading="lazy"
                          />
                        )}
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
