import type { LanguageCode } from './types'

export interface LanguageMetadata {
  code: LanguageCode
  name: string
  flag: string
}

export const languageMetadata: LanguageMetadata[] = [
  { code: 'en', name: 'English',   flag: '🇬🇧' },
  { code: 'tr', name: 'Türkçe',    flag: '🇹🇷' },
  { code: 'de', name: 'Deutsch',   flag: '🇩🇪' },
  { code: 'es', name: 'Español',   flag: '🇪🇸' },
  { code: 'fr', name: 'Français',  flag: '🇫🇷' },
  { code: 'ar', name: 'العربية',   flag: '🇦🇪' },
  { code: 'zh', name: '中文',       flag: '🇨🇳' },
  { code: 'ru', name: 'Русский',   flag: '🇷🇺' },
  { code: 'ja', name: '日本語',     flag: '🇯🇵' },
  { code: 'pt', name: 'Português', flag: '🇵🇹/🇧🇷' },
  { code: 'ko', name: '한국어',     flag: '🇰🇷' },
  { code: 'hi', name: 'हिन्दी',     flag: '🇮🇳' },
]
