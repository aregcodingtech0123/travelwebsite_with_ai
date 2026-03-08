'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from './contexts/LanguageContext'
import { HeroSection } from '@/src/components/home/HeroSection'
import { PopularDestinations } from '@/src/components/home/PopularDestinations'
import { HiddenGemsSection } from '@/src/components/home/HiddenGemsSection'
import { BenefitsSection } from '@/src/components/home/BenefitsSection'
import { IncentivesSection } from '@/src/components/home/IncentivesSection'
import { AIEmotionSection } from '@/src/components/home/AIEmotionSection'
import { GlobalBackground } from '@/src/components/home/GlobalBackground'

export default function HomePage() {
  const { language, t } = useLanguage()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20"
      data-testid="home-page"
    >
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
  )
}
