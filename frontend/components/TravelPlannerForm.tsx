"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface LanguageOption {
  code: string
  name: string
  flag?: string
}

export interface TravelPlannerFormData {
  city: string
  language: string
}

export interface TravelPlannerFormProps {
  onSubmit?: (data: TravelPlannerFormData) => void | Promise<void>
  isLoading?: boolean
  defaultLanguage?: string
  languages?: LanguageOption[]
  className?: string
}

const defaultLanguages: LanguageOption[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "tr", name: "Turkish", flag: "🇹🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
]

export function TravelPlannerForm({
  onSubmit,
  isLoading = false,
  defaultLanguage = "en",
  languages = defaultLanguages,
  className,
}: TravelPlannerFormProps) {
  const [city, setCity] = useState("")
  const [language, setLanguage] = useState(defaultLanguage)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    // Validate city input
    if (!city.trim()) {
      setError("Please enter a city name")
      return
    }

    const formData: TravelPlannerFormData = {
      city: city.trim(),
      language,
    }

    // Call onSubmit callback if provided
    if (onSubmit) {
      try {
        await onSubmit(formData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      }
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Start Planning</CardTitle>
        <CardDescription>
          Enter your destination and language preference
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* City Input Field */}
          <div className="space-y-2">
            <Label htmlFor="city">Destination City</Label>
            <Input
              id="city"
              type="text"
              placeholder="e.g., Paris, Tokyo, Barcelona"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={isLoading}
              required
              aria-describedby={error ? "city-error" : undefined}
              aria-invalid={error ? "true" : "false"}
            />
            {error && (
              <p
                id="city-error"
                className="text-sm text-destructive"
                role="alert"
                aria-live="polite"
              >
                {error}
              </p>
            )}
          </div>

          {/* Language Selector */}
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select
              value={language}
              onValueChange={setLanguage}
              disabled={isLoading}
            >
              <SelectTrigger id="language" aria-label="Select language">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">
                      {lang.flag && <span>{lang.flag}</span>}
                      <span>{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !city.trim()}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <span className="sr-only">Loading</span>
                Generating Travel Plan...
              </>
            ) : (
              "Generate Travel Plan"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
