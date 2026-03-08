'use client'

import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { useLanguage } from '@/app/contexts/LanguageContext'

export function AIEmotionSection() {
  const { t } = useLanguage()

  return (
    <section 
      className="py-24 px-6 md:px-12 lg:px-16 bg-white"
      data-testid="ai-emotion-section"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Image */}
        <div className="flex-shrink-0 w-full lg:w-1/2 max-w-lg">
          <img
            src="https://images.unsplash.com/photo-1530482054429-cc491f61333b?w=800&q=80"
            alt="AI travel planning"
            className="w-full rounded-2xl shadow-2xl object-cover aspect-[4/3]"
          />
        </div>

        {/* Content */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t('aiEmotion.title')}
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
            {t('aiEmotion.text')}
          </p>
          <Link
            href="/chat"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white bg-brand hover:bg-brand/90 shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/35 transition-all duration-300 hover:scale-105"
            data-testid="ai-emotion-cta-button"
          >
            <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
            {t('aiEmotion.cta')}
          </Link>
        </div>
      </div>
    </section>
  )
}
