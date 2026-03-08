'use client'

import Link from 'next/link'
import { useState, useEffect, useMemo } from 'react'
import { Sparkles } from 'lucide-react'

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

  return (
    <section 
      className="relative h-[65vh] min-h-[450px] flex items-center justify-center overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background */}
      <div
        className="absolute top-0 left-0 right-0 z-0 overflow-hidden"
        style={{ height: 'calc(55% + 5rem)' }}
      >
        {backgroundType === 'video' ? (
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={backgroundSrc} type="video/mp4" />
          </video>
        ) : (
          <img src={backgroundSrc} alt="Hero Background" className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight min-h-[1.2em]">
            <span className="text-white inline mr-3">
              <TypewriterEffect text={line1Text} />
            </span>
            <span className="bg-gradient-to-r from-brand via-emerald-400 to-cyan-400 bg-clip-text text-transparent inline">
              <TypewriterEffect text={line2Text} delay={line1Duration} />
            </span>
          </h1>

          {/* Subtitle */}
          <div
            className="text-xl sm:text-2xl text-white/90 font-medium leading-relaxed max-w-3xl mx-auto"
            style={{ minHeight: calculateMinHeight(subtitleText) }}
          >
            <p className="m-0">
              <TypewriterEffect text={subtitleText} delay={subtitleDelay} />
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <Link
              href="/chat"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg text-white bg-brand hover:bg-brand/90 shadow-lg shadow-brand/30 hover:shadow-xl hover:shadow-brand/40 transition-all duration-300 hover:scale-105"
              data-testid="hero-cta-button"
            >
              <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
              {t('hero.cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
