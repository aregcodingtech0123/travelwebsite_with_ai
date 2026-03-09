'use client'

import { useState } from 'react'

interface LocationSelectorProps {
  value: string
  onChange: (value: string) => void
  label?: string
}

export function LocationSelector({
  value,
  onChange,
  label = 'Location',
}: LocationSelectorProps) {
  const [detecting, setDetecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDetectLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return
    }

    setError(null)
    setDetecting(true)

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          )
          if (!res.ok) {
            throw new Error('Failed to resolve location')
          }
          const data = await res.json()
          const city = data.address?.city || data.address?.town || data.address?.village || ''
          const country = data.address?.country || ''
          const combined = [city, country].filter(Boolean).join(', ')
          if (combined) {
            onChange(combined)
          } else {
            setError('Could not determine city/country from your location.')
          }
        } catch (err) {
          console.error('Location lookup failed', err)
          setError('Could not detect your location. Please type it manually.')
        } finally {
          setDetecting(false)
        }
      },
      (geoError) => {
        console.warn('Geolocation permission/error:', geoError)
        setError('Location access was denied. Please type your location manually.')
        setDetecting(false)
      },
      { enableHighAccuracy: false, timeout: 10000 },
    )
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
          placeholder="City, Country"
        />
        <button
          type="button"
          onClick={handleDetectLocation}
          disabled={detecting}
          className="px-3 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          {detecting ? 'Detecting…' : 'Detect my location'}
        </button>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

