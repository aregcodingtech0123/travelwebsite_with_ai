'use client'

import Link from 'next/link'

const COPY = `Tell our AI how you feel and what you dream of—adventure, relaxation, culture, or something unexpected. We'll craft a journey that matches your mood and desires.`

export function AIEmotionSection() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-16 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-shrink-0 w-full lg:w-1/2 max-w-lg">
          <img
            src="https://images.unsplash.com/photo-1530482054429-cc491f61333b?w=800&q=80"
            alt="AI travel planning"
            className="w-full rounded-2xl shadow-xl object-cover aspect-[4/3]"
          />
        </div>
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Share Your Feelings with AI
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
            {COPY}
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: 'rgb(0, 191, 165)' }}
          >
            Go to AI Chat
          </Link>
        </div>
      </div>
    </section>
  )
}
