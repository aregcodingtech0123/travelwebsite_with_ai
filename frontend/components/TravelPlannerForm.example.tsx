/**
 * Example usage of TravelPlannerForm component
 * 
 * This file demonstrates how to use the TravelPlannerForm component
 * in your Next.js App Router pages.
 */

"use client"

import { TravelPlannerForm, type TravelPlannerFormData } from "./TravelPlannerForm"

export function ExampleUsage() {
  const handleSubmit = async (data: TravelPlannerFormData) => {
    console.log("Form submitted with:", data)
    
    // Example: Call your API
    // const response = await fetch("/api/travel-plan", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // })
    // const result = await response.json()
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <TravelPlannerForm
        onSubmit={handleSubmit}
        defaultLanguage="en"
        className="shadow-lg"
      />
    </div>
  )
}

/**
 * Example with custom languages
 */
export function ExampleWithCustomLanguages() {
  const customLanguages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "fr", name: "French", flag: "🇫🇷" },
  ]

  return (
    <TravelPlannerForm
      languages={customLanguages}
      defaultLanguage="en"
    />
  )
}

import { useState } from "react"

/**
 * Example with loading state management
 */
export function ExampleWithLoadingState() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: TravelPlannerFormData) => {
    setIsLoading(true)
    try {
      // Your API call here
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulated delay
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <TravelPlannerForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  )
}
