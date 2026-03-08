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
      className="py-24 px-6 md:px-12 lg:px-16 bg-slate-50"
      data-testid="incentives-section"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-16">
          {t('incentives.title')}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {items.map(({ icon: Icon, textKey }, idx) => (
            <div
              key={textKey}
              className="group p-8 rounded-2xl text-center bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 hover:border-brand/30"
              data-testid={`incentive-card-${idx + 1}`}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-slate-100 text-slate-500 group-hover:bg-brand group-hover:text-white transition-all duration-300">
                <Icon className="w-8 h-8" />
              </div>
              <p className="text-slate-700 font-medium leading-relaxed">
                {t(textKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
