'use client'

import Link from 'next/link'
import { useState, useEffect, useMemo } from 'react'
import { Sparkles, MapPin, Compass, Globe } from 'lucide-react'

const TypewriterEffect = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startTyping, setStartTyping] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStartTyping(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (startTyping && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, delay, text, startTyping])

  return <span>{currentText}</span>
}

interface HeroSectionProps {
  t: (key: string) => string
  backgroundSrc?: string
  backgroundType?: 'image' | 'video'
}

export const HeroSection = ({
  t,
  backgroundSrc = '/background_main.jpg',
  backgroundType = 'image',
}: HeroSectionProps) => {
  const TYPING_SPEED = 50
  const line1Text = useMemo(() => t('hero.title.line1') + ' ', [t])
  const line2Text = useMemo(() => t('hero.title.line2'), [t])
  const subtitleText = useMemo(() => t('hero.subtitle'), [t])
  const line1Duration = line1Text.length * TYPING_SPEED
  const subtitleDelay = line1Duration + line2Text.length * TYPING_SPEED + 500

  const calculateMinHeight = (text: string) => {
    const avgCharsPerLine = 60
    const lineHeight = 1.8
    const fontSize = 1.25
    const estimatedLines = Math.ceil(text.length / avgCharsPerLine)
    return `${estimatedLines * fontSize * lineHeight}rem`
  }

  const features = [
    { icon: MapPin, key: 'hero.feature1' },
    { icon: Compass, key: 'hero.feature2' },
    { icon: Globe, key: 'hero.feature3' },
  ]

  return (
    <section 
      className="relative min-h-[90vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden"
      data-testid="hero-section"
      aria-label="Hero section"
    >
      {/* Full Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {backgroundType === 'video' ? (
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src={backgroundSrc} type="video/mp4" />
          </video>
        ) : (
          <img 
            src={backgroundSrc} 
            alt="Beautiful travel destination showcasing world exploration" 
            className="w-full h-full object-cover"
            loading="eager"
          />
        )}
        {/* Multi-layer gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        {/* Subtle brand color overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-brand/20 to-transparent" />
      </div>

      {/* Content - Positioned as overlay on the hero image */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-brand" />
            {t('hero.badge')}
          </div>

          {/* Main Title with Playfair Display */}
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] min-h-[1.2em] animate-fade-in-up delay-100">
            <span className="text-white inline mr-3 drop-shadow-lg">
              <TypewriterEffect text={line1Text} />
            </span>
            <span className="bg-gradient-to-r from-brand via-emerald-400 to-cyan-400 bg-clip-text text-transparent inline drop-shadow-lg">
              <TypewriterEffect text={line2Text} delay={line1Duration} />
            </span>
          </h1>

          {/* Subtitle */}
          <div
            className="text-lg sm:text-xl md:text-2xl text-white/90 font-body font-medium leading-relaxed max-w-3xl mx-auto animate-fade-in-up delay-200"
            style={{ minHeight: calculateMinHeight(subtitleText) }}
          >
            <p className="m-0 drop-shadow-md">
              <TypewriterEffect text={subtitleText} delay={subtitleDelay} />
            </p>
          </div>

          {/* CTA Button - Prominently positioned on the hero image */}
          <div className="pt-4 md:pt-8 animate-fade-in-up delay-300">
            <Link
              href="/chat"
              className="btn-animated group inline-flex items-center justify-center gap-3 px-10 py-5 md:px-12 md:py-6 rounded-full font-bold text-lg md:text-xl text-white bg-brand hover:bg-brand/90 shadow-2xl shadow-brand/40 hover:shadow-brand/50 transition-all duration-300 hover:scale-105"
              data-testid="hero-cta-button"
            >
              <Sparkles className="w-6 h-6 md:w-7 md:h-7 group-hover:animate-pulse" />
              {t('hero.cta')}
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 pt-6 animate-fade-in-up delay-400">
            {features.map(({ icon: Icon, key }) => (
              <div 
                key={key}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-sm font-medium"
              >
                <Icon className="w-4 h-4 text-brand" />
                {t(key)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
