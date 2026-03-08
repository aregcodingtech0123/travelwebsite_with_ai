'use client'

import { MapPin, Plane, Compass, Globe } from 'lucide-react'
import { useLanguage } from '@/app/contexts/LanguageContext'

export function IncentivesSection() {
  const { t } = useLanguage()

  const items = [
    { icon: MapPin, textKey: 'incentives.item1' },
    { icon: Plane, textKey: 'incentives.item2' },
    { icon: Compass, textKey: 'incentives.item3' },
    { icon: Globe, textKey: 'incentives.item4' },
  ]

  return (
    <section 
      className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-white"
      data-testid="incentives-section"
      aria-label="Why choose us"
    >
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16 md:mb-20">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900">
            {t('incentives.title')}
          </h2>
        </header>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {items.map(({ icon: Icon, textKey }, idx) => (
            <article
              key={textKey}
              className="group p-8 md:p-10 rounded-2xl text-center bg-slate-50 border border-slate-100 hover:bg-brand hover:border-brand transition-all duration-500 cursor-default transform hover:-translate-y-2 hover:shadow-xl"
              data-testid={`incentive-card-${idx + 1}`}
              style={{
                animationName: 'fadeInUp',
                animationDuration: '0.6s',
                animationTimingFunction: 'ease-out',
                animationFillMode: 'both',
                animationDelay: `${idx * 0.1}s`,
              }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl mb-6 bg-brand/10 text-brand group-hover:bg-white/20 group-hover:text-white transition-all duration-500">
                <Icon className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <p className="font-body text-slate-700 group-hover:text-white font-medium leading-relaxed transition-colors duration-500">
                {t(textKey)}
              </p>
            </article>
          ))}
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
