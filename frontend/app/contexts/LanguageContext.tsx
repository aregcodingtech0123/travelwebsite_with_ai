// contexts/LanguageContext.tsx
"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

export type LanguageCode = 'en' | 'tr' | 'de' | 'es' | 'fr' | 'pt' | 'ar' | 'jp' | 'ch' | 'kr' | 'it' | 'ru'

interface LanguageContextType {
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<LanguageCode>('en')

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// lib/translations.ts - Translation Dictionary
export const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Hero Section
    'hero.badge': 'AI-Powered Planning',
    'hero.title.line1': 'Discover',
    'hero.title.line2': 'Your Journey',
    'hero.subtitle': 'Intelligent travel planning tailored to your dreams. Let AI craft the perfect itinerary for your next adventure.',
    'hero.feature1': 'Personalized Routes',
    'hero.feature2': 'Local Insights',
    'hero.feature3': 'Multi-language',
    
    // Form
    'form.title': 'Start Planning',
    'form.description': 'Tell us where you want to go, and we\'ll create your perfect itinerary',
    'form.destination.label': 'Destination',
    'form.destination.placeholder': 'Paris, Tokyo, New York...',
    'form.language.label': 'Language',
    'form.button.submit': 'Generate Travel Plan',
    'form.button.loading': 'Creating your journey...',
    'form.error.empty': 'Please enter a city name',
    'form.error.failed': 'Failed to generate travel plan',
    
    // Results
    'results.subtitle': 'Your personalized journey awaits',
    'results.day': 'Day',
  },
  
  tr: {
    // Hero Section
    'hero.badge': 'Yapay Zeka Destekli Planlama',
    'hero.title.line1': 'Keşfet',
    'hero.title.line2': 'Yolculuğunu',
    'hero.subtitle': 'Hayallerinize özel akıllı seyahat planlaması. Yapay zekanın bir sonraki maceranız için mükemmel rotayı oluşturmasına izin verin.',
    'hero.feature1': 'Kişiselleştirilmiş Rotalar',
    'hero.feature2': 'Yerel İçgörüler',
    'hero.feature3': 'Çoklu Dil',
    
    // Form
    'form.title': 'Planlamaya Başla',
    'form.description': 'Nereye gitmek istediğinizi söyleyin, size mükemmel rotayı oluşturalım',
    'form.destination.label': 'Varış Noktası',
    'form.destination.placeholder': 'Paris, Tokyo, New York...',
    'form.language.label': 'Dil',
    'form.button.submit': 'Seyahat Planı Oluştur',
    'form.button.loading': 'Yolculuğunuz oluşturuluyor...',
    'form.error.empty': 'Lütfen bir şehir adı girin',
    'form.error.failed': 'Seyahat planı oluşturulamadı',
    
    // Results
    'results.subtitle': 'Kişiselleştirilmiş yolculuğunuz sizi bekliyor',
    'results.day': 'Gün',
  },
  
  de: {
    'hero.badge': 'KI-gestützte Planung',
    'hero.title.line1': 'Entdecke',
    'hero.title.line2': 'Deine Reise',
    'hero.subtitle': 'Intelligente Reiseplanung nach Ihren Träumen. Lassen Sie KI die perfekte Reiseroute erstellen.',
    'hero.feature1': 'Personalisierte Routen',
    'hero.feature2': 'Lokale Einblicke',
    'hero.feature3': 'Mehrsprachig',
    'form.title': 'Planung Starten',
    'form.description': 'Sagen Sie uns, wohin Sie möchten, und wir erstellen Ihre perfekte Reiseroute',
    'form.destination.label': 'Reiseziel',
    'form.destination.placeholder': 'Paris, Tokio, New York...',
    'form.language.label': 'Sprache',
    'form.button.submit': 'Reiseplan Erstellen',
    'form.button.loading': 'Ihre Reise wird erstellt...',
    'form.error.empty': 'Bitte geben Sie einen Städtenamen ein',
    'form.error.failed': 'Reiseplan konnte nicht erstellt werden',
    'results.subtitle': 'Ihre personalisierte Reise erwartet Sie',
    'results.day': 'Tag',
  },
  
  es: {
    'hero.badge': 'Planificación con IA',
    'hero.title.line1': 'Descubre',
    'hero.title.line2': 'Tu Viaje',
    'hero.subtitle': 'Planificación de viajes inteligente adaptada a tus sueños. Deja que la IA cree el itinerario perfecto.',
    'hero.feature1': 'Rutas Personalizadas',
    'hero.feature2': 'Conocimientos Locales',
    'hero.feature3': 'Multiidioma',
    'form.title': 'Comenzar Planificación',
    'form.description': 'Dinos a dónde quieres ir y crearemos tu itinerario perfecto',
    'form.destination.label': 'Destino',
    'form.destination.placeholder': 'París, Tokio, Nueva York...',
    'form.language.label': 'Idioma',
    'form.button.submit': 'Generar Plan de Viaje',
    'form.button.loading': 'Creando tu viaje...',
    'form.error.empty': 'Por favor ingresa un nombre de ciudad',
    'form.error.failed': 'No se pudo generar el plan de viaje',
    'results.subtitle': 'Tu viaje personalizado te espera',
    'results.day': 'Día',
  },
  
  fr: {
    'hero.badge': 'Planification par IA',
    'hero.title.line1': 'Découvrez',
    'hero.title.line2': 'Votre Voyage',
    'hero.subtitle': 'Planification de voyage intelligente adaptée à vos rêves. Laissez l\'IA créer l\'itinéraire parfait.',
    'hero.feature1': 'Itinéraires Personnalisés',
    'hero.feature2': 'Aperçus Locaux',
    'hero.feature3': 'Multilingue',
    'form.title': 'Commencer la Planification',
    'form.description': 'Dites-nous où vous voulez aller et nous créerons votre itinéraire parfait',
    'form.destination.label': 'Destination',
    'form.destination.placeholder': 'Paris, Tokyo, New York...',
    'form.language.label': 'Langue',
    'form.button.submit': 'Générer le Plan de Voyage',
    'form.button.loading': 'Création de votre voyage...',
    'form.error.empty': 'Veuillez entrer un nom de ville',
    'form.error.failed': 'Impossible de générer le plan de voyage',
    'results.subtitle': 'Votre voyage personnalisé vous attend',
    'results.day': 'Jour',
  },
  
  // Minimal implementations for other languages (expand as needed)
  pt: { ...({} as any) }, // Portuguese
  ar: { ...({} as any) }, // Arabic
  jp: { ...({} as any) }, // Japanese
  ch: { ...({} as any) }, // Chinese
  kr: { ...({} as any) }, // Korean
  it: { ...({} as any) }, // Italian
  ru: { ...({} as any) }, // Russian
}

// Helper: Get language metadata
export const languageMetadata = [
  { code: 'en' as LanguageCode, name: 'English', flag: '🇬🇧' },
  { code: 'tr' as LanguageCode, name: 'Turkish', flag: '🇹🇷' },
  { code: 'de' as LanguageCode, name: 'German', flag: '🇩🇪' },
  { code: 'es' as LanguageCode, name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr' as LanguageCode, name: 'French', flag: '🇫🇷' },
  { code: 'pt' as LanguageCode, name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ar' as LanguageCode, name: 'Arabic', flag: '🇦🇪' },
  { code: 'jp' as LanguageCode, name: 'Japanese', flag: '🇯🇵' },
  { code: 'ch' as LanguageCode, name: 'Chinese', flag: '🇨🇳' },
  { code: 'kr' as LanguageCode, name: 'Korean', flag: '🇰🇷' },
  { code: 'it' as LanguageCode, name: 'Italian', flag: '🇮🇹' },
  { code: 'ru' as LanguageCode, name: 'Russian', flag: '🇷🇺' },
]