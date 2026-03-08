'use client'

import { useLanguage } from '@/app/contexts/LanguageContext'

export function BenefitsSection() {
  const { t } = useLanguage()

  return (
    <section 
      className="py-24 px-6 md:px-12 lg:px-16 bg-white"
      data-testid="benefits-section"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Image */}
        <div className="relative flex-shrink-0 w-full lg:w-1/2 max-w-lg">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"
              alt="Travel benefits"
              className="w-full h-full object-cover"
            />
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 border-brand rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-brand rounded-br-2xl" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-brand mb-8">
            {t('benefits.title')}
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed text-slate-600 max-w-xl mx-auto lg:mx-0 font-serif italic">
            {t('benefits.text')}
          </p>
        </div>
      </div>
    </section>
  )
}
