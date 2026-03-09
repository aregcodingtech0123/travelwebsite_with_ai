'use client'

import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { destinations } from '@/src/data/destinations'
import { useLanguage } from '../contexts/LanguageContext'

export default function DestinationsPage() {
  const { t } = useLanguage()

  return (
    <div 
      className="min-h-[60vh] px-4 py-24 max-w-6xl mx-auto"
      data-testid="destinations-page"
    >
      <div className="flex items-center gap-3 mb-12">
        <MapPin className="w-8 h-8 text-brand" />
        <h1 className="text-4xl font-bold text-brand" data-testid="destinations-title">
          {t('destinations.title')}
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((d) => (
          <Link
            key={d.id}
            href={`/destinations/${d.slug}`}
            className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            data-testid={`destination-link-${d.id}`}
          >
            <div
              className="aspect-[4/3] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url(${d.image})` }}
            />
            <div className="p-6 bg-white">
              <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand transition-colors">
                {d.name}
              </h2>
              <p className="text-slate-600 text-sm">
                {t('destinations.cards.' + d.id) || t('destinations.popular.card.' + d.id) || d.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
