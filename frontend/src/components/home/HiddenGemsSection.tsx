'use client'

import { useState } from 'react'
import { hiddenGems } from '@/src/data/hiddenGems'
import Link from 'next/link'

export function HiddenGemsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(hiddenGems.length / itemsPerPage)
  const current = hiddenGems.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  )

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-16 bg-gradient-to-b from-white/70 via-slate-50/50 to-white/70 dark:from-slate-950/70 dark:via-slate-900/50 dark:to-slate-950/70">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Hidden Gems
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Beautiful places beyond the usual tourist trails
          </p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setCurrentIndex((p) => (p - 1 + totalPages) % totalPages)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 w-12 h-12 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-300/60 shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center"
            aria-label="Previous"
          >
            <svg className="w-6 h-6 text-slate-700 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {current.map((gem) => (
              <Link
                key={gem.id}
                href={`/destinations/${gem.slug}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] shadow-lg hover:shadow-2xl transition-shadow duration-500 block"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${gem.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{gem.name}</h3>
                  <p className="text-base md:text-lg text-white/90 leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500 overflow-hidden">
                    {gem.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setCurrentIndex((p) => (p + 1) % totalPages)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 w-12 h-12 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-300/60 shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center"
            aria-label="Next"
          >
            <svg className="w-6 h-6 text-slate-700 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'bg-slate-800 dark:bg-slate-200 w-8'
                  : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'
              }`}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
