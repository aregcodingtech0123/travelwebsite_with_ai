import type { LanguageCode } from './types'

export interface LanguageMetadata {
  code: LanguageCode
  name: string
  flag: string
}

export const languageMetadata: LanguageMetadata[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
]
