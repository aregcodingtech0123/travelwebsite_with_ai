'use client'

import { useState } from 'react'
import { hiddenGems } from '@/src/data/hiddenGems'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
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
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-white"
      data-testid="hidden-gems-section"
      aria-label="Hidden gems destinations"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <header className="text-center mb-16 md:mb-20">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 md:mb-6">
            {t('hiddenGems.title')}
          </h2>
          <p className="font-body text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            {t('hiddenGems.subtitle')}
          </p>
        </header>

        <div className="relative">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => setCurrentIndex((p) => (p - 1 + totalPages) % totalPages)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl border border-slate-200 hover:shadow-2xl hover:scale-110 hover:border-brand transition-all duration-300 flex items-center justify-center group"
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
                className="card-animated-border group relative overflow-hidden rounded-2xl aspect-[4/5] shadow-lg hover:shadow-2xl transition-all duration-500 block transform hover:-translate-y-2"
                style={{
                  animationName: 'fadeInUp',
                  animationDuration: '0.6s',
                  animationTimingFunction: 'ease-out',
                  animationFillMode: 'both',
                  animationDelay: `${idx * 0.1}s`,
                }}
                data-testid={`hidden-gem-card-${gem.id}`}
                aria-label={`Discover ${gem.name}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${gem.image})` }}
                  role="img"
                  aria-label={`${gem.name} hidden gem destination`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-brand/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                  <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                    {gem.name}
                  </h3>
                  <p className="font-body text-base md:text-lg text-white/90 leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-24 transition-all duration-500 overflow-hidden">
                    {gem.description}
                  </p>
                  
                  {/* Animated line on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-emerald-400 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </Link>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => setCurrentIndex((p) => (p + 1) % totalPages)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl border border-slate-200 hover:shadow-2xl hover:scale-110 hover:border-brand transition-all duration-300 flex items-center justify-center group"
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
              aria-current={i === currentIndex ? 'true' : undefined}
              data-testid={`hidden-gems-page-${i + 1}`}
            />
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center mt-12 md:mt-16">
          <Link
            href="/destinations"
            className="see-more-btn font-body"
            data-testid="hidden-gems-see-more"
          >
            {t('hiddenGems.seeMore') || 'See More'}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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
