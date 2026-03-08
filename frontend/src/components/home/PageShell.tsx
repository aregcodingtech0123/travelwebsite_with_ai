import type { LanguageCode } from "@/src/i18n/types"

interface PageShellProps {
  children: React.ReactNode
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  isLoading: boolean
}

export const PageShell = ({ 
  children, 
  language, 
  setLanguage, 
  isLoading 
}: PageShellProps) => {
  // Language selector is now in the Navbar
  return <>{children}</>
}
