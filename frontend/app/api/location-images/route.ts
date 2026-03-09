import { NextRequest, NextResponse } from 'next/server'

interface UnsplashPhoto {
  id: string
  urls: { regular: string }
  alt_description: string | null
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const location = searchParams.get('location') ?? ''
  if (!location.trim()) {
    return NextResponse.json([], { status: 200 })
  }

  const accessKey = process.env.UNSPLASH_ACCESS_KEY
  if (!accessKey) {
    // Fail silently in production if key is not configured
    return NextResponse.json([], { status: 200 })
  }

  try {
    const url = new URL('https://api.unsplash.com/search/photos')
    url.searchParams.set('query', location)
    url.searchParams.set('per_page', '12')
    url.searchParams.set('orientation', 'landscape')

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
      // Avoid caching so users see fresh images occasionally
      cache: 'no-store',
    })

    if (!res.ok) {
      return NextResponse.json([], { status: 200 })
    }

    const data = await res.json()
    const total: number = data.total ?? 0
    const results: UnsplashPhoto[] = data.results ?? []

    // Popularity heuristic: more images for very popular locations
    let maxImages = 2
    if (total > 1000) {
      maxImages = 6
    } else if (total > 200) {
      maxImages = 4
    }

    const images = results.slice(0, maxImages).map((photo) => ({
      id: photo.id,
      url: photo.urls.regular,
      alt: photo.alt_description || `${location} travel image`,
    }))

    return NextResponse.json(images)
  } catch (err) {
    console.error('Unsplash fetch failed', err)
    return NextResponse.json([], { status: 200 })
  }
}

