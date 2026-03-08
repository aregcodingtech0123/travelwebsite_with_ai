'use client'

import { useState } from 'react'
import Link from 'next/link'

const SITE_NAME = 'AI Traveller Planner'
const SLOGAN = 'Tell us how you feel—we\'ll plan your perfect journey.'

export default function ChatPage() {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return
    // TODO: call API to generate response and show in chat UI
    setPrompt('')
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center px-4 py-12">
      <Link href="/" className="text-2xl font-bold mb-2" style={{ color: 'rgb(0, 191, 165)' }}>
        {SITE_NAME}
      </Link>
      <p className="text-slate-600 dark:text-slate-400 mb-12 text-center max-w-md">
        {SLOGAN}
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <div className="relative rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg overflow-hidden focus-within:border-[rgb(0,191,165)] transition-colors">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your dream trip, mood, or destination..."
            rows={4}
            className="w-full px-6 py-4 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 resize-none focus:outline-none"
          />
          <div className="flex justify-end px-4 pb-4">
            <button
              type="submit"
              disabled={!prompt.trim()}
              className="px-6 py-3 rounded-xl font-semibold text-white transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: 'rgb(0, 191, 165)' }}
            >
              Generate
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
