import type { LanguageCode } from './types'
import { translations } from './translations'

export function useTranslation(language: LanguageCode) {
  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key
  }

  return { t }
}
