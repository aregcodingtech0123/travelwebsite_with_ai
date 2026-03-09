'use client'

import { Mail, MessageCircle } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function ContactPage() {
  const { t } = useLanguage()

  return (
    <div 
      className="min-h-[60vh] px-4 py-24 max-w-2xl mx-auto"
      data-testid="contact-page"
    >
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle className="w-8 h-8 text-brand" />
        <h1 className="text-4xl font-bold text-brand" data-testid="contact-title">
          {t('contact.title')}
        </h1>
      </div>
      
      <p className="text-lg text-slate-600 leading-relaxed mb-8">
        {t('contact.intro')}
      </p>
      
      <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
        <Mail className="w-5 h-5 text-brand" />
        <div>
          <p className="text-sm font-medium text-slate-500">{t('contact.email')}</p>
          <a 
            href="mailto:support@aeroute.ai"
            className="text-brand hover:underline"
          >
            support@aeroute.ai
          </a>
        </div>
      </div>
    </div>
  )
}
