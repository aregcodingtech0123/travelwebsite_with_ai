"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type LanguageCode = 'en' | 'tr' | 'de' | 'es' | 'fr'

interface LanguageContextType {
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    // Return defaults for SSG/SSR pages not wrapped in provider
    return {
      language: 'en' as LanguageCode,
      setLanguage: () => {},
      t: (key: string) => translations.en[key] || key
    }
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
}

const STORAGE_KEY = 'ai-traveller-language'

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<LanguageCode>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as LanguageCode | null
    if (stored && ['en', 'tr', 'de', 'es', 'fr'].includes(stored)) {
      setLanguageState(stored)
    }
    setMounted(true)
  }, [])

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang)
    localStorage.setItem(STORAGE_KEY, lang)
  }

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Complete translations for all pages
export const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Site
    'site.name': 'AI Traveller Planner',
    
    // Navbar
    'nav.about': 'About',
    'nav.destinations': 'Destinations',
    'nav.chat': 'AI Chat',
    'nav.contact': 'Contact',
    'nav.login': 'Log In',
    'nav.signup': 'Sign Up',
    'nav.profile': 'Profile',
    'nav.logout': 'Logout',
    'nav.menu.open': 'Open menu',
    'nav.menu.user': 'User menu',
    
    // Footer
    'footer.tagline': 'Plan your perfect journey with AI',
    'footer.contact': 'Contact',
    'footer.about': 'About',
    'footer.destinations': 'Destinations',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.social.instagram': 'Follow us on Instagram',
    'footer.social.facebook': 'Follow us on Facebook',
    'footer.copyright': '© 2024 AI Traveller Planner. All rights reserved.',
    
    // Sidebar
    'sidebar.newChat': 'New Chat',
    'sidebar.pastChats': 'Past Chats',
    'sidebar.noChats': 'No chats yet',
    'sidebar.home': 'Home',
    'sidebar.close': 'Close sidebar',
    
    // Hero Section
    'hero.badge': 'AI-Powered Planning',
    'hero.title.line1': 'Discover',
    'hero.title.line2': 'Your Journey',
    'hero.subtitle': 'Intelligent travel planning tailored to your dreams. Let AI craft the perfect itinerary for your next adventure.',
    'hero.cta': 'Start with AI Chat',
    'hero.feature1': 'Personalized Routes',
    'hero.feature2': 'Local Insights',
    'hero.feature3': 'Multi-language',
    
    // Popular Destinations
    'destinations.popular.title': 'Popular Destinations',
    'destinations.popular.subtitle': 'Discover the world\'s most captivating cities',
    'destinations.popular.prev': 'Previous destinations',
    'destinations.popular.next': 'Next destinations',
    'destinations.popular.page': 'Go to page',
    'destinations.seeMore': 'See All Destinations',
    
    // Hidden Gems
    'hiddenGems.title': 'Hidden Gems',
    'hiddenGems.subtitle': 'Beautiful places beyond the usual tourist trails',
    'hiddenGems.prev': 'Previous',
    'hiddenGems.next': 'Next',
    'hiddenGems.page': 'Page',
    'hiddenGems.seeMore': 'Explore More Gems',
    
    // Benefits
    'benefits.title': 'Benefits of Travel',
    'benefits.text': 'Travel opens your mind, boosts creativity, and creates memories that last a lifetime. Whether you\'re exploring a new city or relaxing by the sea, every journey brings new perspectives and a sense of wonder. Let the world inspire you.',
    
    // Incentives (Why Choose Us)
    'incentives.title': 'Why Choose Us',
    'incentives.item1': 'Discover personalized routes tailored to your interests.',
    'incentives.item2': 'Get the best flight and stay recommendations.',
    'incentives.item3': 'Navigate like a local with AI-powered tips.',
    'incentives.item4': 'Explore the world with confidence and ease.',
    
    // AI Emotion Section
    'aiEmotion.title': 'Share Your Feelings with AI',
    'aiEmotion.text': 'Tell our AI how you feel and what you dream of—adventure, relaxation, culture, or something unexpected. We\'ll craft a journey that matches your mood and desires.',
    'aiEmotion.cta': 'Go to AI Chat',
    
    // Language Selector
    'language.select': 'Select language',
    'language.en': 'English',
    'language.tr': 'Turkish',
    'language.de': 'German',
    'language.es': 'Spanish',
    'language.fr': 'French',
    
    // Login Page
    'login.title': 'Log In',
    'login.email': 'Email',
    'login.email.placeholder': 'you@example.com',
    'login.password': 'Password',
    'login.password.placeholder': '••••••••',
    'login.submit': 'Log In',
    'login.loading': 'Signing in...',
    'login.google': 'Login with Google',
    'login.noAccount': 'Don\'t have an account?',
    'login.register': 'Register from here',
    'login.error.invalid': 'Invalid email or password',
    'login.error.generic': 'Something went wrong',
    
    // Register Page
    'register.title': 'Sign Up',
    'register.email': 'Email',
    'register.email.placeholder': 'you@example.com',
    'register.password': 'Password',
    'register.password.placeholder': '••••••••',
    'register.confirmPassword': 'Confirm Password',
    'register.submit': 'Sign Up',
    'register.loading': 'Creating account...',
    'register.google': 'Sign up with Google',
    'register.hasAccount': 'Already have an account?',
    'register.login': 'Login from here',
    'register.error.mismatch': 'Passwords do not match',
    'register.error.failed': 'Registration failed',
    'register.error.generic': 'Something went wrong',
    
    // Chat Page
    'chat.title': 'AI Chat',
    'chat.slogan': 'Tell us how you feel—we\'ll plan your perfect journey.',
    'chat.placeholder': 'Describe your dream trip, mood, or destination...',
    'chat.generate': 'Generate',
    
    // Profile Page
    'profile.title': 'Profile',
    'profile.credit': 'Credit Amount',
    'profile.email': 'Email',
    'profile.name': 'Name',
    'profile.surname': 'Surname',
    'profile.save': 'Save',
    'profile.saving': 'Saving...',
    'profile.loading': 'Loading...',
    'profile.loginRequired': 'Please log in to view your profile.',
    'profile.updated': 'Profile updated',
    'profile.updateFailed': 'Update failed',
    
    // Payment Page
    'payment.title': 'Add Credit',
    'payment.cardNumber': 'Card Number',
    'payment.cardNumber.placeholder': '1234 5678 9012 3456',
    'payment.expiry': 'Expiry (MM/YY)',
    'payment.expiry.placeholder': 'MM/YY',
    'payment.cvv': 'CVV',
    'payment.cvv.placeholder': '123',
    'payment.amount': 'Amount',
    'payment.pay': 'Pay',
    'payment.processing': 'Processing...',
    'payment.loading': 'Loading...',
    'payment.loginRequired': 'Please log in to make a payment.',
    'payment.success': 'Payment successful',
    'payment.failed': 'Payment failed',
    'payment.invalidAmount': 'Enter a valid amount',
    
    // About Page
    'about.title': 'About AI Traveller Planner',
    'about.text': 'We help you plan the perfect trip using AI. Tell us your mood and dreams, and we\'ll suggest destinations and itineraries tailored to you.',
    
    // Contact Page
    'contact.title': 'Contact',
    'contact.intro': 'Get in touch with us for support or partnership inquiries.',
    'contact.email': 'Email',
    
    // Destinations Page
    'destinations.title': 'Destinations',
    
    // Privacy Policy
    'privacy.title': 'Privacy Policy',
    'privacy.text': 'Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information when you use AI Traveller Planner. We collect only the data necessary to provide our services and never share your information with third parties without your consent. For questions about our privacy practices, please contact us.',
    
    // Terms of Service
    'terms.title': 'Terms of Service',
    'terms.text': 'By using AI Traveller Planner, you agree to these terms. Our service provides AI-powered travel planning suggestions for informational purposes. We strive for accuracy but cannot guarantee all recommendations. Users are responsible for verifying travel information and making their own decisions. We reserve the right to modify these terms at any time.',
    
    // Form validation
    'form.title': 'Start Planning',
    'form.description': 'Tell us where you want to go, and we\'ll create your perfect itinerary',
    'form.destination.label': 'Destination',
    'form.destination.placeholder': 'Paris, Tokyo, New York...',
    'form.language.label': 'Language',
    'form.button.submit': 'Generate Travel Plan',
    'form.button.loading': 'Creating your journey...',
    'form.error.empty': 'Please enter a city name',
    'form.error.failed': 'Failed to generate travel plan',
    'results.subtitle': 'Your personalized journey awaits',
    'results.day': 'Day',
  },
  
  tr: {
    // Site
    'site.name': 'AI Seyahat Planlayıcı',
    
    // Navbar
    'nav.about': 'Hakkımızda',
    'nav.destinations': 'Destinasyonlar',
    'nav.chat': 'AI Sohbet',
    'nav.contact': 'İletişim',
    'nav.login': 'Giriş Yap',
    'nav.signup': 'Kayıt Ol',
    'nav.profile': 'Profil',
    'nav.logout': 'Çıkış Yap',
    'nav.menu.open': 'Menüyü aç',
    'nav.menu.user': 'Kullanıcı menüsü',
    
    // Footer
    'footer.tagline': 'AI ile mükemmel yolculuğunuzu planlayın',
    'footer.contact': 'İletişim',
    'footer.about': 'Hakkımızda',
    'footer.destinations': 'Destinasyonlar',
    'footer.privacy': 'Gizlilik Politikası',
    'footer.terms': 'Kullanım Şartları',
    'footer.social.instagram': 'Instagram\'da takip edin',
    'footer.social.facebook': 'Facebook\'ta takip edin',
    'footer.copyright': '© 2024 AI Seyahat Planlayıcı. Tüm hakları saklıdır.',
    
    // Sidebar
    'sidebar.newChat': 'Yeni Sohbet',
    'sidebar.pastChats': 'Geçmiş Sohbetler',
    'sidebar.noChats': 'Henüz sohbet yok',
    'sidebar.home': 'Ana Sayfa',
    'sidebar.close': 'Kenar çubuğunu kapat',
    
    // Hero Section
    'hero.badge': 'Yapay Zeka Destekli Planlama',
    'hero.title.line1': 'Keşfet',
    'hero.title.line2': 'Yolculuğunu',
    'hero.subtitle': 'Hayallerinize özel akıllı seyahat planlaması. Yapay zekanın bir sonraki maceranız için mükemmel rotayı oluşturmasına izin verin.',
    'hero.cta': 'AI Sohbet ile Başla',
    'hero.feature1': 'Kişiselleştirilmiş Rotalar',
    'hero.feature2': 'Yerel İçgörüler',
    'hero.feature3': 'Çoklu Dil',
    
    // Popular Destinations
    'destinations.popular.title': 'Popüler Destinasyonlar',
    'destinations.popular.subtitle': 'Dünyanın en büyüleyici şehirlerini keşfedin',
    'destinations.popular.prev': 'Önceki destinasyonlar',
    'destinations.popular.next': 'Sonraki destinasyonlar',
    'destinations.popular.page': 'Sayfaya git',
    'destinations.seeMore': 'Tüm Destinasyonları Gör',
    
    // Hidden Gems
    'hiddenGems.title': 'Gizli Hazineler',
    'hiddenGems.subtitle': 'Turist rotalarının ötesindeki güzel yerler',
    'hiddenGems.prev': 'Önceki',
    'hiddenGems.next': 'Sonraki',
    'hiddenGems.page': 'Sayfa',
    'hiddenGems.seeMore': 'Daha Fazla Keşfet',
    
    // Benefits
    'benefits.title': 'Seyahatin Faydaları',
    'benefits.text': 'Seyahat zihninizi açar, yaratıcılığınızı artırır ve ömür boyu sürecek anılar yaratır. İster yeni bir şehir keşfedin ister deniz kenarında dinlenin, her yolculuk yeni bakış açıları ve hayranlık duygusu getirir. Dünyanın size ilham vermesine izin verin.',
    
    // Incentives (Why Choose Us)
    'incentives.title': 'Neden Bizi Seçmelisiniz',
    'incentives.item1': 'İlgi alanlarınıza göre kişiselleştirilmiş rotalar keşfedin.',
    'incentives.item2': 'En iyi uçuş ve konaklama önerilerini alın.',
    'incentives.item3': 'AI destekli ipuçlarıyla yerel gibi gezin.',
    'incentives.item4': 'Dünyayı güven ve kolaylıkla keşfedin.',
    
    // AI Emotion Section
    'aiEmotion.title': 'Duygularınızı AI ile Paylaşın',
    'aiEmotion.text': 'AI\'mıza nasıl hissettiğinizi ve neler hayal ettiğinizi söyleyin—macera, rahatlama, kültür veya beklenmedik bir şey. Ruh halinize ve isteklerinize uygun bir yolculuk oluşturacağız.',
    'aiEmotion.cta': 'AI Sohbete Git',
    
    // Language Selector
    'language.select': 'Dil seçin',
    'language.en': 'İngilizce',
    'language.tr': 'Türkçe',
    'language.de': 'Almanca',
    'language.es': 'İspanyolca',
    'language.fr': 'Fransızca',
    
    // Login Page
    'login.title': 'Giriş Yap',
    'login.email': 'E-posta',
    'login.email.placeholder': 'ornek@email.com',
    'login.password': 'Şifre',
    'login.password.placeholder': '••••••••',
    'login.submit': 'Giriş Yap',
    'login.loading': 'Giriş yapılıyor...',
    'login.google': 'Google ile Giriş Yap',
    'login.noAccount': 'Hesabınız yok mu?',
    'login.register': 'Buradan kayıt olun',
    'login.error.invalid': 'Geçersiz e-posta veya şifre',
    'login.error.generic': 'Bir şeyler ters gitti',
    
    // Register Page
    'register.title': 'Kayıt Ol',
    'register.email': 'E-posta',
    'register.email.placeholder': 'ornek@email.com',
    'register.password': 'Şifre',
    'register.password.placeholder': '••••••••',
    'register.confirmPassword': 'Şifre Tekrar',
    'register.submit': 'Kayıt Ol',
    'register.loading': 'Hesap oluşturuluyor...',
    'register.google': 'Google ile Kayıt Ol',
    'register.hasAccount': 'Zaten hesabınız var mı?',
    'register.login': 'Buradan giriş yapın',
    'register.error.mismatch': 'Şifreler eşleşmiyor',
    'register.error.failed': 'Kayıt başarısız',
    'register.error.generic': 'Bir şeyler ters gitti',
    
    // Chat Page
    'chat.title': 'AI Sohbet',
    'chat.slogan': 'Bize nasıl hissettiğinizi söyleyin—mükemmel yolculuğunuzu planlayalım.',
    'chat.placeholder': 'Hayalinizdeki geziyi, ruh halinizi veya destinasyonu tanımlayın...',
    'chat.generate': 'Oluştur',
    
    // Profile Page
    'profile.title': 'Profil',
    'profile.credit': 'Kredi Miktarı',
    'profile.email': 'E-posta',
    'profile.name': 'Ad',
    'profile.surname': 'Soyad',
    'profile.save': 'Kaydet',
    'profile.saving': 'Kaydediliyor...',
    'profile.loading': 'Yükleniyor...',
    'profile.loginRequired': 'Profilinizi görmek için giriş yapın.',
    'profile.updated': 'Profil güncellendi',
    'profile.updateFailed': 'Güncelleme başarısız',
    
    // Payment Page
    'payment.title': 'Kredi Ekle',
    'payment.cardNumber': 'Kart Numarası',
    'payment.cardNumber.placeholder': '1234 5678 9012 3456',
    'payment.expiry': 'Son Kullanma (AA/YY)',
    'payment.expiry.placeholder': 'AA/YY',
    'payment.cvv': 'CVV',
    'payment.cvv.placeholder': '123',
    'payment.amount': 'Miktar',
    'payment.pay': 'Öde',
    'payment.processing': 'İşleniyor...',
    'payment.loading': 'Yükleniyor...',
    'payment.loginRequired': 'Ödeme yapmak için giriş yapın.',
    'payment.success': 'Ödeme başarılı',
    'payment.failed': 'Ödeme başarısız',
    'payment.invalidAmount': 'Geçerli bir miktar girin',
    
    // About Page
    'about.title': 'AI Seyahat Planlayıcı Hakkında',
    'about.text': 'AI kullanarak mükemmel geziyi planlamanıza yardımcı oluyoruz. Bize ruh halinizi ve hayallerinizi söyleyin, size özel destinasyonlar ve güzergahlar önerelim.',
    
    // Contact Page
    'contact.title': 'İletişim',
    'contact.intro': 'Destek veya iş birliği talepleri için bizimle iletişime geçin.',
    'contact.email': 'E-posta',
    
    // Destinations Page
    'destinations.title': 'Destinasyonlar',
    
    // Privacy Policy
    'privacy.title': 'Gizlilik Politikası',
    'privacy.text': 'Gizliliğiniz bizim için önemlidir. Bu politika, AI Seyahat Planlayıcı\'yı kullandığınızda kişisel bilgilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklar. Hizmetlerimizi sağlamak için yalnızca gerekli verileri toplar ve izniniz olmadan bilgilerinizi üçüncü taraflarla paylaşmayız. Gizlilik uygulamalarımız hakkında sorularınız için lütfen bize ulaşın.',
    
    // Terms of Service
    'terms.title': 'Kullanım Şartları',
    'terms.text': 'AI Seyahat Planlayıcı\'yı kullanarak bu şartları kabul etmiş olursunuz. Hizmetimiz bilgilendirme amaçlı AI destekli seyahat planlama önerileri sunar. Doğruluk için çalışıyoruz ancak tüm önerileri garanti edemeyiz. Kullanıcılar seyahat bilgilerini doğrulamak ve kendi kararlarını vermekle sorumludur. Bu şartları herhangi bir zamanda değiştirme hakkımızı saklı tutarız.',
    
    // Form validation
    'form.title': 'Planlamaya Başla',
    'form.description': 'Nereye gitmek istediğinizi söyleyin, size mükemmel rotayı oluşturalım',
    'form.destination.label': 'Varış Noktası',
    'form.destination.placeholder': 'Paris, Tokyo, New York...',
    'form.language.label': 'Dil',
    'form.button.submit': 'Seyahat Planı Oluştur',
    'form.button.loading': 'Yolculuğunuz oluşturuluyor...',
    'form.error.empty': 'Lütfen bir şehir adı girin',
    'form.error.failed': 'Seyahat planı oluşturulamadı',
    'results.subtitle': 'Kişiselleştirilmiş yolculuğunuz sizi bekliyor',
    'results.day': 'Gün',
  },
  
  de: {
    // Site
    'site.name': 'AI Reiseplaner',
    
    // Navbar
    'nav.about': 'Über uns',
    'nav.destinations': 'Reiseziele',
    'nav.chat': 'AI Chat',
    'nav.contact': 'Kontakt',
    'nav.login': 'Anmelden',
    'nav.signup': 'Registrieren',
    'nav.profile': 'Profil',
    'nav.logout': 'Abmelden',
    'nav.menu.open': 'Menü öffnen',
    'nav.menu.user': 'Benutzermenü',
    
    // Footer
    'footer.tagline': 'Planen Sie Ihre perfekte Reise mit AI',
    'footer.contact': 'Kontakt',
    'footer.about': 'Über uns',
    'footer.destinations': 'Reiseziele',
    'footer.privacy': 'Datenschutzrichtlinie',
    'footer.terms': 'Nutzungsbedingungen',
    'footer.social.instagram': 'Folgen Sie uns auf Instagram',
    'footer.social.facebook': 'Folgen Sie uns auf Facebook',
    'footer.copyright': '© 2024 AI Reiseplaner. Alle Rechte vorbehalten.',
    
    // Sidebar
    'sidebar.newChat': 'Neuer Chat',
    'sidebar.pastChats': 'Vergangene Chats',
    'sidebar.noChats': 'Noch keine Chats',
    'sidebar.home': 'Startseite',
    'sidebar.close': 'Seitenleiste schließen',
    
    // Hero Section
    'hero.badge': 'KI-gestützte Planung',
    'hero.title.line1': 'Entdecke',
    'hero.title.line2': 'Deine Reise',
    'hero.subtitle': 'Intelligente Reiseplanung nach Ihren Träumen. Lassen Sie KI die perfekte Reiseroute für Ihr nächstes Abenteuer erstellen.',
    'hero.cta': 'Mit AI Chat starten',
    'hero.feature1': 'Personalisierte Routen',
    'hero.feature2': 'Lokale Einblicke',
    'hero.feature3': 'Mehrsprachig',
    
    // Popular Destinations
    'destinations.popular.title': 'Beliebte Reiseziele',
    'destinations.popular.subtitle': 'Entdecken Sie die faszinierendsten Städte der Welt',
    'destinations.popular.prev': 'Vorherige Reiseziele',
    'destinations.popular.next': 'Nächste Reiseziele',
    'destinations.popular.page': 'Zur Seite gehen',
    'destinations.seeMore': 'Alle Reiseziele anzeigen',
    
    // Hidden Gems
    'hiddenGems.title': 'Geheimtipps',
    'hiddenGems.subtitle': 'Schöne Orte abseits der üblichen Touristenpfade',
    'hiddenGems.prev': 'Zurück',
    'hiddenGems.next': 'Weiter',
    'hiddenGems.page': 'Seite',
    'hiddenGems.seeMore': 'Mehr entdecken',
    
    // Benefits
    'benefits.title': 'Vorteile des Reisens',
    'benefits.text': 'Reisen öffnet Ihren Geist, steigert die Kreativität und schafft Erinnerungen, die ein Leben lang halten. Ob Sie eine neue Stadt erkunden oder am Meer entspannen, jede Reise bringt neue Perspektiven und ein Gefühl des Staunens. Lassen Sie sich von der Welt inspirieren.',
    
    // Incentives (Why Choose Us)
    'incentives.title': 'Warum uns wählen',
    'incentives.item1': 'Entdecken Sie personalisierte Routen nach Ihren Interessen.',
    'incentives.item2': 'Erhalten Sie die besten Flug- und Unterkunftsempfehlungen.',
    'incentives.item3': 'Navigieren Sie wie ein Einheimischer mit KI-gestützten Tipps.',
    'incentives.item4': 'Erkunden Sie die Welt mit Zuversicht und Leichtigkeit.',
    
    // AI Emotion Section
    'aiEmotion.title': 'Teilen Sie Ihre Gefühle mit AI',
    'aiEmotion.text': 'Sagen Sie unserer KI, wie Sie sich fühlen und wovon Sie träumen—Abenteuer, Entspannung, Kultur oder etwas Unerwartetes. Wir werden eine Reise gestalten, die Ihrer Stimmung und Ihren Wünschen entspricht.',
    'aiEmotion.cta': 'Zum AI Chat',
    
    // Language Selector
    'language.select': 'Sprache wählen',
    'language.en': 'Englisch',
    'language.tr': 'Türkisch',
    'language.de': 'Deutsch',
    'language.es': 'Spanisch',
    'language.fr': 'Französisch',
    
    // Login Page
    'login.title': 'Anmelden',
    'login.email': 'E-Mail',
    'login.email.placeholder': 'beispiel@email.de',
    'login.password': 'Passwort',
    'login.password.placeholder': '••••••••',
    'login.submit': 'Anmelden',
    'login.loading': 'Wird angemeldet...',
    'login.google': 'Mit Google anmelden',
    'login.noAccount': 'Noch kein Konto?',
    'login.register': 'Hier registrieren',
    'login.error.invalid': 'Ungültige E-Mail oder Passwort',
    'login.error.generic': 'Etwas ist schiefgelaufen',
    
    // Register Page
    'register.title': 'Registrieren',
    'register.email': 'E-Mail',
    'register.email.placeholder': 'beispiel@email.de',
    'register.password': 'Passwort',
    'register.password.placeholder': '••••••••',
    'register.confirmPassword': 'Passwort bestätigen',
    'register.submit': 'Registrieren',
    'register.loading': 'Konto wird erstellt...',
    'register.google': 'Mit Google registrieren',
    'register.hasAccount': 'Bereits ein Konto?',
    'register.login': 'Hier anmelden',
    'register.error.mismatch': 'Passwörter stimmen nicht überein',
    'register.error.failed': 'Registrierung fehlgeschlagen',
    'register.error.generic': 'Etwas ist schiefgelaufen',
    
    // Chat Page
    'chat.title': 'AI Chat',
    'chat.slogan': 'Sagen Sie uns, wie Sie sich fühlen—wir planen Ihre perfekte Reise.',
    'chat.placeholder': 'Beschreiben Sie Ihre Traumreise, Stimmung oder Ihr Ziel...',
    'chat.generate': 'Generieren',
    
    // Profile Page
    'profile.title': 'Profil',
    'profile.credit': 'Guthaben',
    'profile.email': 'E-Mail',
    'profile.name': 'Vorname',
    'profile.surname': 'Nachname',
    'profile.save': 'Speichern',
    'profile.saving': 'Wird gespeichert...',
    'profile.loading': 'Wird geladen...',
    'profile.loginRequired': 'Bitte melden Sie sich an, um Ihr Profil anzuzeigen.',
    'profile.updated': 'Profil aktualisiert',
    'profile.updateFailed': 'Aktualisierung fehlgeschlagen',
    
    // Payment Page
    'payment.title': 'Guthaben hinzufügen',
    'payment.cardNumber': 'Kartennummer',
    'payment.cardNumber.placeholder': '1234 5678 9012 3456',
    'payment.expiry': 'Ablauf (MM/JJ)',
    'payment.expiry.placeholder': 'MM/JJ',
    'payment.cvv': 'CVV',
    'payment.cvv.placeholder': '123',
    'payment.amount': 'Betrag',
    'payment.pay': 'Bezahlen',
    'payment.processing': 'Wird verarbeitet...',
    'payment.loading': 'Wird geladen...',
    'payment.loginRequired': 'Bitte melden Sie sich an, um eine Zahlung zu tätigen.',
    'payment.success': 'Zahlung erfolgreich',
    'payment.failed': 'Zahlung fehlgeschlagen',
    'payment.invalidAmount': 'Geben Sie einen gültigen Betrag ein',
    
    // About Page
    'about.title': 'Über AI Reiseplaner',
    'about.text': 'Wir helfen Ihnen, die perfekte Reise mit KI zu planen. Erzählen Sie uns Ihre Stimmung und Träume, und wir schlagen Ihnen maßgeschneiderte Reiseziele und Routen vor.',
    
    // Contact Page
    'contact.title': 'Kontakt',
    'contact.intro': 'Kontaktieren Sie uns für Support oder Partnerschaftsanfragen.',
    'contact.email': 'E-Mail',
    
    // Destinations Page
    'destinations.title': 'Reiseziele',
    
    // Privacy Policy
    'privacy.title': 'Datenschutzrichtlinie',
    'privacy.text': 'Ihre Privatsphäre ist uns wichtig. Diese Richtlinie beschreibt, wie wir Ihre persönlichen Daten sammeln, verwenden und schützen, wenn Sie AI Reiseplaner nutzen. Wir sammeln nur die für unsere Dienste notwendigen Daten und teilen Ihre Informationen niemals ohne Ihre Zustimmung mit Dritten. Bei Fragen zu unseren Datenschutzpraktiken kontaktieren Sie uns bitte.',
    
    // Terms of Service
    'terms.title': 'Nutzungsbedingungen',
    'terms.text': 'Durch die Nutzung von AI Reiseplaner stimmen Sie diesen Bedingungen zu. Unser Service bietet KI-gestützte Reiseplanungsvorschläge zu Informationszwecken. Wir bemühen uns um Genauigkeit, können aber nicht alle Empfehlungen garantieren. Benutzer sind für die Überprüfung von Reiseinformationen und ihre eigenen Entscheidungen verantwortlich. Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern.',
    
    // Form validation
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
    // Site
    'site.name': 'AI Planificador de Viajes',
    
    // Navbar
    'nav.about': 'Sobre nosotros',
    'nav.destinations': 'Destinos',
    'nav.chat': 'Chat AI',
    'nav.contact': 'Contacto',
    'nav.login': 'Iniciar sesión',
    'nav.signup': 'Registrarse',
    'nav.profile': 'Perfil',
    'nav.logout': 'Cerrar sesión',
    'nav.menu.open': 'Abrir menú',
    'nav.menu.user': 'Menú de usuario',
    
    // Footer
    'footer.tagline': 'Planifica tu viaje perfecto con AI',
    'footer.contact': 'Contacto',
    'footer.about': 'Sobre nosotros',
    'footer.destinations': 'Destinos',
    'footer.privacy': 'Política de privacidad',
    'footer.terms': 'Términos de servicio',
    'footer.social.instagram': 'Síguenos en Instagram',
    'footer.social.facebook': 'Síguenos en Facebook',
    'footer.copyright': '© 2024 AI Planificador de Viajes. Todos los derechos reservados.',
    
    // Sidebar
    'sidebar.newChat': 'Nuevo Chat',
    'sidebar.pastChats': 'Chats anteriores',
    'sidebar.noChats': 'Sin chats aún',
    'sidebar.home': 'Inicio',
    'sidebar.close': 'Cerrar barra lateral',
    
    // Hero Section
    'hero.badge': 'Planificación con IA',
    'hero.title.line1': 'Descubre',
    'hero.title.line2': 'Tu Viaje',
    'hero.subtitle': 'Planificación de viajes inteligente adaptada a tus sueños. Deja que la IA cree el itinerario perfecto para tu próxima aventura.',
    'hero.cta': 'Comenzar con Chat AI',
    'hero.feature1': 'Rutas Personalizadas',
    'hero.feature2': 'Conocimientos Locales',
    'hero.feature3': 'Multiidioma',
    
    // Popular Destinations
    'destinations.popular.title': 'Destinos Populares',
    'destinations.popular.subtitle': 'Descubre las ciudades más cautivadoras del mundo',
    'destinations.popular.prev': 'Destinos anteriores',
    'destinations.popular.next': 'Siguientes destinos',
    'destinations.popular.page': 'Ir a página',
    'destinations.seeMore': 'Ver todos los destinos',
    
    // Hidden Gems
    'hiddenGems.title': 'Joyas Ocultas',
    'hiddenGems.subtitle': 'Lugares hermosos más allá de las rutas turísticas habituales',
    'hiddenGems.prev': 'Anterior',
    'hiddenGems.next': 'Siguiente',
    'hiddenGems.page': 'Página',
    'hiddenGems.seeMore': 'Explorar más joyas',
    
    // Benefits
    'benefits.title': 'Beneficios de Viajar',
    'benefits.text': 'Viajar abre tu mente, aumenta la creatividad y crea recuerdos que duran toda la vida. Ya sea explorando una nueva ciudad o relajándote junto al mar, cada viaje trae nuevas perspectivas y una sensación de asombro. Deja que el mundo te inspire.',
    
    // Incentives (Why Choose Us)
    'incentives.title': 'Por qué elegirnos',
    'incentives.item1': 'Descubre rutas personalizadas según tus intereses.',
    'incentives.item2': 'Obtén las mejores recomendaciones de vuelos y alojamiento.',
    'incentives.item3': 'Navega como un local con consejos de IA.',
    'incentives.item4': 'Explora el mundo con confianza y facilidad.',
    
    // AI Emotion Section
    'aiEmotion.title': 'Comparte tus sentimientos con AI',
    'aiEmotion.text': 'Dile a nuestra IA cómo te sientes y qué sueñas—aventura, relajación, cultura o algo inesperado. Crearemos un viaje que coincida con tu estado de ánimo y deseos.',
    'aiEmotion.cta': 'Ir al Chat AI',
    
    // Language Selector
    'language.select': 'Seleccionar idioma',
    'language.en': 'Inglés',
    'language.tr': 'Turco',
    'language.de': 'Alemán',
    'language.es': 'Español',
    'language.fr': 'Francés',
    
    // Login Page
    'login.title': 'Iniciar sesión',
    'login.email': 'Correo electrónico',
    'login.email.placeholder': 'ejemplo@email.com',
    'login.password': 'Contraseña',
    'login.password.placeholder': '••••••••',
    'login.submit': 'Iniciar sesión',
    'login.loading': 'Iniciando sesión...',
    'login.google': 'Iniciar con Google',
    'login.noAccount': '¿No tienes cuenta?',
    'login.register': 'Regístrate aquí',
    'login.error.invalid': 'Correo o contraseña inválidos',
    'login.error.generic': 'Algo salió mal',
    
    // Register Page
    'register.title': 'Registrarse',
    'register.email': 'Correo electrónico',
    'register.email.placeholder': 'ejemplo@email.com',
    'register.password': 'Contraseña',
    'register.password.placeholder': '••••••••',
    'register.confirmPassword': 'Confirmar contraseña',
    'register.submit': 'Registrarse',
    'register.loading': 'Creando cuenta...',
    'register.google': 'Registrarse con Google',
    'register.hasAccount': '¿Ya tienes cuenta?',
    'register.login': 'Inicia sesión aquí',
    'register.error.mismatch': 'Las contraseñas no coinciden',
    'register.error.failed': 'Registro fallido',
    'register.error.generic': 'Algo salió mal',
    
    // Chat Page
    'chat.title': 'Chat AI',
    'chat.slogan': 'Cuéntanos cómo te sientes—planificaremos tu viaje perfecto.',
    'chat.placeholder': 'Describe tu viaje soñado, estado de ánimo o destino...',
    'chat.generate': 'Generar',
    
    // Profile Page
    'profile.title': 'Perfil',
    'profile.credit': 'Cantidad de crédito',
    'profile.email': 'Correo electrónico',
    'profile.name': 'Nombre',
    'profile.surname': 'Apellido',
    'profile.save': 'Guardar',
    'profile.saving': 'Guardando...',
    'profile.loading': 'Cargando...',
    'profile.loginRequired': 'Inicia sesión para ver tu perfil.',
    'profile.updated': 'Perfil actualizado',
    'profile.updateFailed': 'Actualización fallida',
    
    // Payment Page
    'payment.title': 'Agregar crédito',
    'payment.cardNumber': 'Número de tarjeta',
    'payment.cardNumber.placeholder': '1234 5678 9012 3456',
    'payment.expiry': 'Vencimiento (MM/AA)',
    'payment.expiry.placeholder': 'MM/AA',
    'payment.cvv': 'CVV',
    'payment.cvv.placeholder': '123',
    'payment.amount': 'Cantidad',
    'payment.pay': 'Pagar',
    'payment.processing': 'Procesando...',
    'payment.loading': 'Cargando...',
    'payment.loginRequired': 'Inicia sesión para realizar un pago.',
    'payment.success': 'Pago exitoso',
    'payment.failed': 'Pago fallido',
    'payment.invalidAmount': 'Ingresa una cantidad válida',
    
    // About Page
    'about.title': 'Sobre AI Planificador de Viajes',
    'about.text': 'Te ayudamos a planificar el viaje perfecto usando IA. Cuéntanos tu estado de ánimo y sueños, y te sugeriremos destinos e itinerarios personalizados.',
    
    // Contact Page
    'contact.title': 'Contacto',
    'contact.intro': 'Contáctanos para soporte o consultas de colaboración.',
    'contact.email': 'Correo electrónico',
    
    // Destinations Page
    'destinations.title': 'Destinos',
    
    // Privacy Policy
    'privacy.title': 'Política de privacidad',
    'privacy.text': 'Tu privacidad es importante para nosotros. Esta política describe cómo recopilamos, usamos y protegemos tu información personal cuando usas AI Planificador de Viajes. Solo recopilamos los datos necesarios para proporcionar nuestros servicios y nunca compartimos tu información con terceros sin tu consentimiento. Para preguntas sobre nuestras prácticas de privacidad, contáctanos.',
    
    // Terms of Service
    'terms.title': 'Términos de servicio',
    'terms.text': 'Al usar AI Planificador de Viajes, aceptas estos términos. Nuestro servicio proporciona sugerencias de planificación de viajes con IA con fines informativos. Nos esforzamos por la precisión pero no podemos garantizar todas las recomendaciones. Los usuarios son responsables de verificar la información de viaje y tomar sus propias decisiones. Nos reservamos el derecho de modificar estos términos en cualquier momento.',
    
    // Form validation
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
    // Site
    'site.name': 'AI Planificateur de Voyage',
    
    // Navbar
    'nav.about': 'À propos',
    'nav.destinations': 'Destinations',
    'nav.chat': 'Chat AI',
    'nav.contact': 'Contact',
    'nav.login': 'Connexion',
    'nav.signup': 'Inscription',
    'nav.profile': 'Profil',
    'nav.logout': 'Déconnexion',
    'nav.menu.open': 'Ouvrir le menu',
    'nav.menu.user': 'Menu utilisateur',
    
    // Footer
    'footer.tagline': 'Planifiez votre voyage parfait avec l\'IA',
    'footer.contact': 'Contact',
    'footer.about': 'À propos',
    'footer.destinations': 'Destinations',
    'footer.privacy': 'Politique de confidentialité',
    'footer.terms': 'Conditions d\'utilisation',
    'footer.social.instagram': 'Suivez-nous sur Instagram',
    'footer.social.facebook': 'Suivez-nous sur Facebook',
    'footer.copyright': '© 2024 AI Planificateur de Voyage. Tous droits réservés.',
    
    // Sidebar
    'sidebar.newChat': 'Nouveau Chat',
    'sidebar.pastChats': 'Chats précédents',
    'sidebar.noChats': 'Pas encore de chats',
    'sidebar.home': 'Accueil',
    'sidebar.close': 'Fermer la barre latérale',
    
    // Hero Section
    'hero.badge': 'Planification par IA',
    'hero.title.line1': 'Découvrez',
    'hero.title.line2': 'Votre Voyage',
    'hero.subtitle': 'Planification de voyage intelligente adaptée à vos rêves. Laissez l\'IA créer l\'itinéraire parfait pour votre prochaine aventure.',
    'hero.cta': 'Commencer avec Chat AI',
    'hero.feature1': 'Itinéraires Personnalisés',
    'hero.feature2': 'Aperçus Locaux',
    'hero.feature3': 'Multilingue',
    
    // Popular Destinations
    'destinations.popular.title': 'Destinations Populaires',
    'destinations.popular.subtitle': 'Découvrez les villes les plus captivantes du monde',
    'destinations.popular.prev': 'Destinations précédentes',
    'destinations.popular.next': 'Destinations suivantes',
    'destinations.popular.page': 'Aller à la page',
    'destinations.seeMore': 'Voir toutes les destinations',
    
    // Hidden Gems
    'hiddenGems.title': 'Trésors Cachés',
    'hiddenGems.subtitle': 'De beaux endroits hors des sentiers battus',
    'hiddenGems.prev': 'Précédent',
    'hiddenGems.next': 'Suivant',
    'hiddenGems.page': 'Page',
    'hiddenGems.seeMore': 'Découvrir plus de trésors',
    
    // Benefits
    'benefits.title': 'Avantages du Voyage',
    'benefits.text': 'Voyager ouvre votre esprit, stimule la créativité et crée des souvenirs qui durent toute une vie. Que vous exploriez une nouvelle ville ou vous détendiez au bord de la mer, chaque voyage apporte de nouvelles perspectives et un sentiment d\'émerveillement. Laissez le monde vous inspirer.',
    
    // Incentives (Why Choose Us)
    'incentives.title': 'Pourquoi nous choisir',
    'incentives.item1': 'Découvrez des itinéraires personnalisés selon vos intérêts.',
    'incentives.item2': 'Obtenez les meilleures recommandations de vols et d\'hébergement.',
    'incentives.item3': 'Naviguez comme un local avec des conseils IA.',
    'incentives.item4': 'Explorez le monde avec confiance et facilité.',
    
    // AI Emotion Section
    'aiEmotion.title': 'Partagez vos émotions avec l\'IA',
    'aiEmotion.text': 'Dites à notre IA comment vous vous sentez et ce dont vous rêvez—aventure, détente, culture ou quelque chose d\'inattendu. Nous créerons un voyage qui correspond à votre humeur et vos désirs.',
    'aiEmotion.cta': 'Aller au Chat AI',
    
    // Language Selector
    'language.select': 'Sélectionner la langue',
    'language.en': 'Anglais',
    'language.tr': 'Turc',
    'language.de': 'Allemand',
    'language.es': 'Espagnol',
    'language.fr': 'Français',
    
    // Login Page
    'login.title': 'Connexion',
    'login.email': 'E-mail',
    'login.email.placeholder': 'exemple@email.com',
    'login.password': 'Mot de passe',
    'login.password.placeholder': '••••••••',
    'login.submit': 'Se connecter',
    'login.loading': 'Connexion en cours...',
    'login.google': 'Se connecter avec Google',
    'login.noAccount': 'Pas de compte ?',
    'login.register': 'Inscrivez-vous ici',
    'login.error.invalid': 'E-mail ou mot de passe invalide',
    'login.error.generic': 'Une erreur s\'est produite',
    
    // Register Page
    'register.title': 'Inscription',
    'register.email': 'E-mail',
    'register.email.placeholder': 'exemple@email.com',
    'register.password': 'Mot de passe',
    'register.password.placeholder': '••••••••',
    'register.confirmPassword': 'Confirmer le mot de passe',
    'register.submit': 'S\'inscrire',
    'register.loading': 'Création du compte...',
    'register.google': 'S\'inscrire avec Google',
    'register.hasAccount': 'Déjà un compte ?',
    'register.login': 'Connectez-vous ici',
    'register.error.mismatch': 'Les mots de passe ne correspondent pas',
    'register.error.failed': 'Échec de l\'inscription',
    'register.error.generic': 'Une erreur s\'est produite',
    
    // Chat Page
    'chat.title': 'Chat AI',
    'chat.slogan': 'Dites-nous comment vous vous sentez—nous planifierons votre voyage parfait.',
    'chat.placeholder': 'Décrivez votre voyage de rêve, votre humeur ou votre destination...',
    'chat.generate': 'Générer',
    
    // Profile Page
    'profile.title': 'Profil',
    'profile.credit': 'Montant du crédit',
    'profile.email': 'E-mail',
    'profile.name': 'Prénom',
    'profile.surname': 'Nom',
    'profile.save': 'Enregistrer',
    'profile.saving': 'Enregistrement...',
    'profile.loading': 'Chargement...',
    'profile.loginRequired': 'Veuillez vous connecter pour voir votre profil.',
    'profile.updated': 'Profil mis à jour',
    'profile.updateFailed': 'Échec de la mise à jour',
    
    // Payment Page
    'payment.title': 'Ajouter du crédit',
    'payment.cardNumber': 'Numéro de carte',
    'payment.cardNumber.placeholder': '1234 5678 9012 3456',
    'payment.expiry': 'Expiration (MM/AA)',
    'payment.expiry.placeholder': 'MM/AA',
    'payment.cvv': 'CVV',
    'payment.cvv.placeholder': '123',
    'payment.amount': 'Montant',
    'payment.pay': 'Payer',
    'payment.processing': 'Traitement...',
    'payment.loading': 'Chargement...',
    'payment.loginRequired': 'Veuillez vous connecter pour effectuer un paiement.',
    'payment.success': 'Paiement réussi',
    'payment.failed': 'Échec du paiement',
    'payment.invalidAmount': 'Entrez un montant valide',
    
    // About Page
    'about.title': 'À propos d\'AI Planificateur de Voyage',
    'about.text': 'Nous vous aidons à planifier le voyage parfait grâce à l\'IA. Parlez-nous de votre humeur et de vos rêves, et nous vous suggérerons des destinations et des itinéraires personnalisés.',
    
    // Contact Page
    'contact.title': 'Contact',
    'contact.intro': 'Contactez-nous pour du support ou des demandes de partenariat.',
    'contact.email': 'E-mail',
    
    // Destinations Page
    'destinations.title': 'Destinations',
    
    // Privacy Policy
    'privacy.title': 'Politique de confidentialité',
    'privacy.text': 'Votre vie privée est importante pour nous. Cette politique décrit comment nous collectons, utilisons et protégeons vos informations personnelles lorsque vous utilisez AI Planificateur de Voyage. Nous ne collectons que les données nécessaires à nos services et ne partageons jamais vos informations avec des tiers sans votre consentement. Pour toute question concernant nos pratiques de confidentialité, veuillez nous contacter.',
    
    // Terms of Service
    'terms.title': 'Conditions d\'utilisation',
    'terms.text': 'En utilisant AI Planificateur de Voyage, vous acceptez ces conditions. Notre service fournit des suggestions de planification de voyage par IA à titre informatif. Nous nous efforçons d\'être précis mais ne pouvons garantir toutes les recommandations. Les utilisateurs sont responsables de vérifier les informations de voyage et de prendre leurs propres décisions. Nous nous réservons le droit de modifier ces conditions à tout moment.',
    
    // Form validation
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
}

// Language metadata with flag icons
export const languageMetadata = [
  { code: 'en' as LanguageCode, name: 'English', flag: 'https://cdn-icons-png.flaticon.com/512/197/197374.png' },
  { code: 'tr' as LanguageCode, name: 'Türkçe', flag: 'https://cdn-icons-png.flaticon.com/512/197/197518.png' },
  { code: 'de' as LanguageCode, name: 'Deutsch', flag: 'https://cdn-icons-png.flaticon.com/512/197/197571.png' },
  { code: 'es' as LanguageCode, name: 'Español', flag: 'https://cdn-icons-png.flaticon.com/512/197/197593.png' },
  { code: 'fr' as LanguageCode, name: 'Français', flag: 'https://cdn-icons-png.flaticon.com/512/197/197560.png' },
]
