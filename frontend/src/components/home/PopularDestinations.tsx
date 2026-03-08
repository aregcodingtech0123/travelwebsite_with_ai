"use client"

import { useState } from "react"
import Link from "next/link"
import { destinations } from "@/src/data/destinations"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

interface PopularDestinationsProps {
  language: string
  t: (key: string) => string
}

export const PopularDestinations = ({ language, t }: PopularDestinationsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3

  const totalPages = Math.ceil(destinations.length / itemsPerPage)
  const currentDestinations = destinations.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  )

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const handleDestinationClick = (slug: string) => {
    window.location.href = `/destinations/${slug}`
  }

  return (
    <section 
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-professional"
      data-testid="popular-destinations-section"
      aria-label="Popular destinations"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <header className="text-center mb-16 md:mb-20">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 md:mb-6">
            {t('destinations.popular.title')}
          </h2>
          <p className="font-body text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            {t('destinations.popular.subtitle')}
          </p>
        </header>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl border border-slate-200 hover:shadow-2xl hover:scale-110 hover:border-brand transition-all duration-300 flex items-center justify-center group"
            aria-label={t('destinations.popular.prev')}
            data-testid="destinations-prev-button"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600 group-hover:text-brand transition-colors" />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {currentDestinations.map((destination, idx) => (
              <article
                key={destination.id}
                onClick={() => handleDestinationClick(destination.slug)}
                className="card-animated-border group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/5] shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{
                  animationName: 'fadeInUp',
                  animationDuration: '0.6s',
                  animationTimingFunction: 'ease-out',
                  animationFillMode: 'both',
                  animationDelay: `${idx * 0.1}s`,
                }}
                data-testid={`destination-card-${destination.id}`}
                role="button"
                tabIndex={0}
                aria-label={`Explore ${destination.name}`}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${destination.image})` }}
                  role="img"
                  aria-label={`${destination.name} destination image`}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-brand/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                  <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                    {destination.name}
                  </h3>
                  <p className="font-body text-base md:text-lg text-white/90 leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-24 transition-all duration-500 overflow-hidden">
                    {destination.description}
                  </p>
                  
                  {/* Animated line on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-emerald-400 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </article>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl border border-slate-200 hover:shadow-2xl hover:scale-110 hover:border-brand transition-all duration-300 flex items-center justify-center group"
            aria-label={t('destinations.popular.next')}
            data-testid="destinations-next-button"
          >
            <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-brand transition-colors" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'bg-brand w-8'
                  : 'bg-slate-300 w-2.5 hover:bg-slate-400'
              }`}
              aria-label={`${t('destinations.popular.page')} ${idx + 1}`}
              aria-current={idx === currentIndex ? 'true' : undefined}
              data-testid={`destinations-page-${idx + 1}`}
            />
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center mt-12 md:mt-16">
          <Link
            href="/destinations"
            className="see-more-btn font-body"
            data-testid="popular-destinations-see-more"
          >
            {t('destinations.seeMore') || 'See More'}
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
