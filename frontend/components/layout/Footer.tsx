'use client'

import Link from 'next/link'
import { Instagram, Facebook, MapPin, Mail, Plane } from 'lucide-react'
import { useLanguage } from '@/app/contexts/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  const quickLinks = [
    { href: '/about', labelKey: 'footer.about' },
    { href: '/destinations', labelKey: 'footer.destinations' },
    { href: '/contact', labelKey: 'footer.contact' },
  ]

  const legalLinks = [
    { href: '/privacy', labelKey: 'footer.privacy' },
    { href: '/terms', labelKey: 'footer.terms' },
  ]

  return (
    <footer
      className="mt-auto text-white"
      style={{ backgroundColor: 'rgb(0, 191, 165)' }}
      data-testid="footer"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <Plane className="w-7 h-7" />
              <span className="font-heading font-bold text-2xl">{t('site.name')}</span>
            </Link>
            <p className="font-body text-white/80 text-base max-w-md leading-relaxed">
              {t('footer.tagline')}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white hover:text-brand transition-all duration-300"
                aria-label={t('footer.social.instagram')}
                data-testid="social-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white hover:text-brand transition-all duration-300"
                aria-label={t('footer.social.facebook')}
                data-testid="social-facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    data-testid={`footer-link-${link.labelKey.split('.')[1]}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-white transition-colors" />
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal & Contact */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3 mb-6">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    data-testid={`footer-link-${link.labelKey.split('.')[1]}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-white transition-colors" />
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
            
            <a 
              href="mailto:contact@aeroute.example.com"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors font-body"
            >
              <Mail className="w-4 h-4" />
              <span>contact@aeroute.example.com</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <p className="text-center text-white/70 text-sm font-body">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
