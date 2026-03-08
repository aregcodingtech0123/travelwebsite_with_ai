'use client'

import Link from 'next/link'
import { Instagram, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer
      className="mt-auto text-white"
      style={{ backgroundColor: 'rgb(0, 191, 165)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
          </div>
          <Link
            href="/contact"
            className="font-medium hover:underline"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
