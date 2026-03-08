'use client'

import { Shield } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function PrivacyPage() {
  const { t } = useLanguage()

  return (
    <div 
      className="min-h-[60vh] px-4 py-24 max-w-3xl mx-auto"
      data-testid="privacy-page"
    >
      <div className="flex items-center gap-3 mb-8">
        <Shield className="w-8 h-8 text-brand" />
        <h1 className="text-4xl font-bold text-brand" data-testid="privacy-title">
          {t('privacy.title')}
        </h1>
      </div>
      <p className="text-lg text-slate-600 leading-relaxed">
        {t('privacy.text')}
      </p>
    </div>
  )
}
