'use client'

import { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useLanguage } from '../../contexts/LanguageContext'

interface ImageResult {
  id: string
  url: string
  alt: string
}

function formatLocation(raw: string): string {
  if (!raw) return ''
  return raw
    .split(/[-_]/g)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export default function DestinationPage() {
  const params = useParams<{ locationName?: string }>()
  const rawLocation = (params?.locationName as string | undefined) ?? ''
  const decodedLocation = rawLocation ? decodeURIComponent(rawLocation) : ''

  const [article, setArticle] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [images, setImages] = useState<ImageResult[]>([])
  const [displayLocation, setDisplayLocation] = useState(decodedLocation)
  const [cityName, setCityName] = useState(formatLocation(decodedLocation))
  const [countryName, setCountryName] = useState('')
  const router = useRouter()
  const { language, t } = useLanguage()

  const resolvedCity = useMemo(
    () => cityName || formatLocation(decodedLocation) || 'this city',
    [cityName, decodedLocation],
  )

  const askMoreLabel = useMemo(
    () => t('askMoreButton').replace('{location}', resolvedCity),
    [t, resolvedCity],
  )

  useEffect(() => {
    if (!decodedLocation) {
      setError(t('destination.error.noLocation'))
      setStreaming(false)
      return
    }

    const controller = new AbortController()
    const baseUrl =
      process.env.NEXT_PUBLIC_AI_SERVICE_URL ?? 'http://localhost:5000'
    const url = `${baseUrl}/api/destination-stream?location=${encodeURIComponent(
      decodedLocation,
    )}&language=${encodeURIComponent(language)}`

    setStreaming(true)
    setError(null)
    setArticle('')

    ;(async () => {
      try {
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok || !res.body) {
          setError(t('destination.error.loadFailed'))
          setStreaming(false)
          return
        }

        const reader = res.body.getReader()
        const decoder = new TextDecoder()

        while (true) {
          const { value, done } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          if (!chunk) continue
          setArticle((prev) => (prev ? prev + chunk : chunk))
        }
      } catch (err) {
        if ((err as any).name !== 'AbortError') {
          console.error('Destination stream failed', err)
          setError(t('destination.error.loadFailed'))
        }
      } finally {
        setStreaming(false)
      }
    })()

    return () => {
      controller.abort()
    }
  }, [decodedLocation, language, t])

  useEffect(() => {
    if (!decodedLocation) return
    const fetchImages = async () => {
      try {
        const res = await fetch(
          `/api/location-images?location=${encodeURIComponent(decodedLocation)}`,
        )
        if (!res.ok) return
        const data = (await res.json()) as ImageResult[]
        setImages(data)
      } catch (err) {
        console.error('Failed to fetch images for destination', err)
      }
    }
    fetchImages()
  }, [decodedLocation])

  // Resolve city + country for a nicer title
  useEffect(() => {
    if (!decodedLocation) return

    const fetchTitle = async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          decodedLocation,
        )}&addressdetails=1&limit=1`
        const res = await fetch(url, {
          headers: { 'Accept-Language': language },
        })
        if (!res.ok) {
          setDisplayLocation(formatLocation(decodedLocation))
          return
        }
        const data: any[] = await res.json()
        if (!data.length) {
          setDisplayLocation(formatLocation(decodedLocation))
          return
        }
        const item = data[0]
        const city =
          item.address?.city ||
          item.address?.town ||
          item.address?.village ||
          ''
        const country = item.address?.country || ''
        setCityName(city || formatLocation(decodedLocation))
        setCountryName(country || '')
        const label = [city || formatLocation(decodedLocation), country]
          .filter(Boolean)
          .join(', ')
        setDisplayLocation(label || formatLocation(decodedLocation))
      } catch {
        const formatted = formatLocation(decodedLocation)
        setCityName(formatted)
        setCountryName('')
        setDisplayLocation(formatted)
      }
    }

    fetchTitle()
  }, [decodedLocation, language])

  const handleAskMoreClick = () => {
    const template = t('chatPrefill')
    const prefill = template.replace('{location}', resolvedCity)
    router.push(`/chat?prefill=${encodeURIComponent(prefill)}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-emerald-50">
      <main className="max-w-5xl mx-auto px-4 pt-32 pb-16">
        <header className="mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 bg-clip-text text-transparent">
            {cityName || t('destinations.title')}
          </h1>
          {countryName && (
            <p className="text-sm md:text-base text-slate-500">
              {cityName ? `${cityName}, ${countryName}` : countryName}
            </p>
          )}
          <p className="mt-2 text-slate-600 text-sm md:text-base">
            {t('destinationSubtitle')}
          </p>
          <div className="mt-4">
            <button
              type="button"
              onClick={handleAskMoreClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand text-white text-xs md:text-sm font-semibold shadow-sm hover:bg-brand/90 transition-colors"
            >
              <span className="text-base">✨</span>
              <span>{askMoreLabel}</span>
            </button>
          </div>
        </header>

        {images.length > 0 && (
          <section className="mb-10 grid gap-4 md:grid-cols-2">
            {images.map((img) => (
              <figure
                key={img.id}
                className="relative rounded-2xl overflow-hidden shadow-md bg-slate-100"
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </figure>
            ))}
          </section>
        )}

        <section className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 md:p-10">
          {error && (
            <p className="text-sm text-red-600 mb-4">
              {error}
            </p>
          )}

          {article.trim().length === 0 && !error && (
            <p className="text-slate-500 text-sm">
              {streaming
                ? t('destination.loadingStreaming')
                : t('destination.loadingInitial')}
            </p>
          )}

          <div className="prose prose-lg md:prose-xl prose-emerald max-w-4xl mx-auto leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article}
            </ReactMarkdown>
          </div>

          {streaming && (
            <p className="mt-4 text-xs text-slate-400 animate-pulse">
              {t('destination.streamingIndicator')}
            </p>
          )}

          {!streaming && article.trim().length > 0 && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={handleAskMoreClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white text-xs md:text-sm font-semibold shadow hover:bg-emerald-500 transition-colors"
              >
                <span className="text-base">💬</span>
                <span>{askMoreLabel}</span>
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

