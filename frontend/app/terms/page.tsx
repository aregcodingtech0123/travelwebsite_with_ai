'use client'

import { FileText } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function TermsPage() {
  const { t } = useLanguage()

  return (
    <div 
      className="min-h-[60vh] px-4 py-24 max-w-3xl mx-auto"
      data-testid="terms-page"
    >
      <div className="flex items-center gap-3 mb-8">
        <FileText className="w-8 h-8 text-brand" />
        <h1 className="text-4xl font-bold text-brand" data-testid="terms-title">
          {t('terms.title')}
        </h1>
      </div>
      <p className="text-lg text-slate-600 leading-relaxed">
        {t('terms.text')}
      </p>
    </div>
  )
}
