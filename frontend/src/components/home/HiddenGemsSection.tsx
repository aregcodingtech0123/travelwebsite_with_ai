'use client'

import { useState } from 'react'
import { hiddenGems } from '@/src/data/hiddenGems'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/app/contexts/LanguageContext'

export function HiddenGemsSection() {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(hiddenGems.length / itemsPerPage)
  const current = hiddenGems.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  )

  return (
    <section 
      className="relative py-24 px-6 md:px-12 lg:px-16 bg-gradient-to-b from-slate-50 via-white to-slate-50"
      data-testid="hidden-gems-section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {t('hiddenGems.title')}
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            {t('hiddenGems.subtitle')}
          </p>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => setCurrentIndex((p) => (p - 1 + totalPages) % totalPages)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 hover:shadow-xl hover:scale-110 hover:border-brand transition-all duration-300 flex items-center justify-center group"
            aria-label={t('hiddenGems.prev')}
            data-testid="hidden-gems-prev-button"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600 group-hover:text-brand transition-colors" />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {current.map((gem, idx) => (
              <Link
                key={gem.id}
                href={`/destinations/${gem.slug}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] shadow-lg hover:shadow-2xl transition-all duration-500 block"
                style={{
                  animation: `fadeIn 0.5s ease-out ${idx * 0.1}s both`,
                }}
                data-testid={`hidden-gem-card-${gem.id}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${gem.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-brand/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{gem.name}</h3>
                  <p className="text-base md:text-lg text-white/90 leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-24 transition-all duration-500 overflow-hidden">
                    {gem.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => setCurrentIndex((p) => (p + 1) % totalPages)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 hover:shadow-xl hover:scale-110 hover:border-brand transition-all duration-300 flex items-center justify-center group"
            aria-label={t('hiddenGems.next')}
            data-testid="hidden-gems-next-button"
          >
            <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-brand transition-colors" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'bg-brand w-8'
                  : 'bg-slate-300 w-2.5 hover:bg-slate-400'
              }`}
              aria-label={`${t('hiddenGems.page')} ${i + 1}`}
              data-testid={`hidden-gems-page-${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
