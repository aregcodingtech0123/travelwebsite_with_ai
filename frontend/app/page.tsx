'use client'

import { useState, useEffect } from 'react'
import type { LanguageCode } from '@/src/i18n/types'
import { useTranslation } from '@/src/i18n/useTranslation'
import { HeroSection } from '@/src/components/home/HeroSection'
import { PopularDestinations } from '@/src/components/home/PopularDestinations'
import { HiddenGemsSection } from '@/src/components/home/HiddenGemsSection'
import { BenefitsSection } from '@/src/components/home/BenefitsSection'
import { IncentivesSection } from '@/src/components/home/IncentivesSection'
import { AIEmotionSection } from '@/src/components/home/AIEmotionSection'
import { GlobalBackground } from '@/src/components/home/GlobalBackground'
import { PageShell } from '@/src/components/home/PageShell'

export default function HomePage() {
  const [language, setLanguage] = useState<LanguageCode>('en')
  const [scrollY, setScrollY] = useState(0)
  const { t } = useTranslation(language)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <PageShell language={language} setLanguage={setLanguage} isLoading={false}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50/80 via-blue-50/30 to-cyan-50/20 dark:from-slate-950/80 dark:via-slate-900/80 dark:to-slate-950/80">
        <GlobalBackground scrollY={scrollY} />
        <HeroSection t={t} />
        <div className="relative z-10">
          <PopularDestinations language={language} t={t} />
        </div>
        <HiddenGemsSection />
        <BenefitsSection />
        <IncentivesSection />
        <AIEmotionSection />
      </div>
    </PageShell>
  )
}
