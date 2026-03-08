'use client'

import Link from 'next/link'
import { useState, useEffect, useMemo } from 'react'

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
    <section className="relative h-[62vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 z-0 overflow-hidden"
        style={{ height: 'calc(50% + 5rem)' }}
      >
        {backgroundType === 'video' ? (
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={backgroundSrc} type="video/mp4" />
          </video>
        ) : (
          <img src={backgroundSrc} alt="Hero Background" className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8 mb-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight min-h-[1.2em]">
            <span className="text-white inline mr-3">
              <TypewriterEffect text={line1Text} />
            </span>
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent inline">
              <TypewriterEffect text={line2Text} delay={line1Duration} />
            </span>
          </h1>
          <div
            className="text-xl sm:text-2xl text-white font-semibold leading-relaxed max-w-3xl mx-auto"
            style={{ minHeight: calculateMinHeight(subtitleText) }}
          >
            <p className="m-0">
              <TypewriterEffect text={subtitleText} delay={subtitleDelay} />
            </p>
          </div>
          <div className="pt-4">
            <Link
              href="/chat"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300"
              style={{ backgroundColor: 'rgb(0, 191, 165)' }}
            >
              Start with AI Chat
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
