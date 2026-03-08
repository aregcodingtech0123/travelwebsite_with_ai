'use client'

import { useLanguage } from './contexts/LanguageContext'
import { HeroSection } from '@/src/components/home/HeroSection'
import { PopularDestinations } from '@/src/components/home/PopularDestinations'
import { HiddenGemsSection } from '@/src/components/home/HiddenGemsSection'
import { BenefitsSection } from '@/src/components/home/BenefitsSection'
import { IncentivesSection } from '@/src/components/home/IncentivesSection'
import { AIEmotionSection } from '@/src/components/home/AIEmotionSection'

export default function HomePage() {
  const { language, t } = useLanguage()

  return (
    <main 
      className="min-h-screen"
      data-testid="home-page"
    >
      {/* Hero Section - Full viewport with CTA overlay */}
      <HeroSection t={t} />
      
      {/* Main Content Sections with Professional Background */}
      <div className="relative z-10 bg-professional">
        <PopularDestinations language={language} t={t} />
        <HiddenGemsSection />
        <BenefitsSection />
        <IncentivesSection />
        <AIEmotionSection />
      </div>
    </main>
  )
}
