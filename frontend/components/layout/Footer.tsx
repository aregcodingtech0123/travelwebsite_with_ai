'use client'

import Link from 'next/link'
import { Instagram, Facebook, MapPin, Mail } from 'lucide-react'
import { useLanguage } from '@/app/contexts/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  const footerLinks = [
    { href: '/about', labelKey: 'footer.about' },
    { href: '/destinations', labelKey: 'footer.destinations' },
    { href: '/contact', labelKey: 'footer.contact' },
    { href: '/privacy', labelKey: 'footer.privacy' },
    { href: '/terms', labelKey: 'footer.terms' },
  ]

  return (
    <footer
      className="mt-auto text-white"
      style={{ backgroundColor: 'rgb(0, 191, 165)' }}
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-flex items-center gap-2 mb-3">
              <MapPin className="w-6 h-6" />
              <span className="font-bold text-xl">{t('site.name')}</span>
            </Link>
            <p className="text-white/80 text-sm max-w-xs mx-auto md:mx-0">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/90 hover:text-white text-sm font-medium transition-colors hover:underline underline-offset-4"
                  data-testid={`footer-link-${link.labelKey.split('.')[1]}`}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social & Contact */}
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end gap-4 mb-3">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label={t('footer.social.instagram')}
                data-testid="social-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label={t('footer.social.facebook')}
                data-testid="social-facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <a 
              href="mailto:contact@ai-traveller-planner.example.com"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>contact@ai-traveller-planner.example.com</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-6">
          <p className="text-center text-white/70 text-sm">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
