import type { Metadata } from 'next'
import { Montserrat, Playfair_Display } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from './contexts/LanguageContext'
import { Layout } from '@/components/layout/Layout'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'AeRoute - Your AI Travel Concierge',
    template: '%s | AeRoute'
  },
  description: 'AeRoute is your AI travel concierge. Plan your perfect trip with smart recommendations, popular destinations, hidden gems, and personalized itineraries tailored to your travel style and preferences.',
  keywords: ['AI travel planner', 'travel planning', 'trip planner', 'vacation planning', 'travel recommendations', 'AI itinerary', 'destination guide', 'hidden gems', 'travel assistant'],
  authors: [{ name: 'AeRoute' }],
  creator: 'AeRoute',
  publisher: 'AeRoute',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aeroute.com',
    siteName: 'AeRoute',
    title: 'AeRoute - Your AI Travel Concierge',
    description: 'AeRoute is your AI-powered travel concierge for destinations, hidden gems, and tailored itineraries.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AeRoute - Your AI Travel Concierge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AeRoute - Your AI Travel Concierge',
    description: 'Plan your perfect trip with AeRoute, your AI travel concierge for destinations and hidden gems.',
    images: ['/og-image.jpg'],
    creator: '@aitravelplanner',
  },
  alternates: {
    canonical: 'https://aeroute.com',
    languages: {
      'en-US': 'https://aeroute.com/en',
      'tr-TR': 'https://aeroute.com/tr',
      'de-DE': 'https://aeroute.com/de',
      'es-ES': 'https://aeroute.com/es',
      'fr-FR': 'https://aeroute.com/fr',
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
  category: 'travel',
}

// Schema.org structured data for TravelAgency
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'AeRoute',
  description: 'AeRoute is an AI-powered travel concierge that helps you discover destinations, plan itineraries, and create memorable journeys with personalized recommendations.',
  url: 'https://aeroute.com',
  logo: 'https://aeroute.com/logo.png',
  image: 'https://aeroute.com/og-image.jpg',
  telephone: '+1-800-TRAVEL',
  email: 'contact@aeroute.example.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
  sameAs: [
    'https://www.instagram.com/aeroute',
    'https://www.facebook.com/aeroute',
    'https://twitter.com/aeroute',
  ],
  priceRange: '$$',
  openingHours: 'Mo-Su 00:00-24:00',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '1250',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Travel Planning Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI-Powered Itinerary Planning',
          description: 'Get personalized travel itineraries created by AI based on your preferences and travel style.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Destination Discovery',
          description: 'Explore popular destinations and hidden gems curated by travel experts and AI.',
        },
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#00bfa5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={montserrat.className}>
        <LanguageProvider>
          <Layout>{children}</Layout>
        </LanguageProvider>
      </body>
    </html>
  )
}
