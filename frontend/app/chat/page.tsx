'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Send, Sparkles } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

type ChatRole = 'user' | 'assistant' | 'system'

interface DestinationSnippet {
  name: string
  country: string
  why_recommended: string
  estimated_daily_budget_usd?: string | null
  insider_tip?: string | null
}

interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  destinations?: DestinationSnippet[]
}

const GUEST_PROMPT_KEY = 'guest_prompt_count_v1'
const MAX_GUEST_PROMPTS = 3

export default function ChatPage() {
  const { t, language } = useLanguage()
  const { status } = useSession()

  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [guestCount, setGuestCount] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const prefillAppliedRef = useRef(false)

  const isAuthenticated = status === 'authenticated'
  const guestLimitReached = !isAuthenticated && guestCount >= MAX_GUEST_PROMPTS

  // Hydrate guest prompt count from localStorage (for unauthenticated users)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (isAuthenticated) {
      setGuestCount(0)
      return
    }

    const stored = window.localStorage.getItem(GUEST_PROMPT_KEY)
    const parsed = stored ? parseInt(stored, 10) : 0
    if (!Number.isNaN(parsed)) {
      setGuestCount(parsed)
    }
  }, [isAuthenticated])

  // Apply prefill from URL query (?prefill=...) once on mount
  useEffect(() => {
    if (prefillAppliedRef.current) return
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const prefill = params.get('prefill')
    if (prefill && prefill.trim().length > 0) {
      setPrompt(prefill)
      prefillAppliedRef.current = true
    }
  }, [])

  const chatHistoryForApi = useMemo(() => {
    // Map local messages into the backend's conversation_history format
    return messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : m.role,
      content: m.content,
    }))
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const trimmed = prompt.trim()
    if (!trimmed) return

    // Guest trial gate
    if (guestLimitReached) {
      // Do not call API, just ensure UX wall is visible
      return
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
    }

    setMessages((prev) => [...prev, userMessage])
    setPrompt('')
    setIsLoading(true)

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? ''
      const res = await fetch(`${baseUrl}/api/ai-travel-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: trimmed,
          conversation_history: chatHistoryForApi,
          language,
        }),
      })

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
      }

      const data = await res.json()
      const assistantContent: string =
        typeof data?.assistant_message === 'string'
          ? data.assistant_message
          : t('chat.error.generic')

      const destinations: DestinationSnippet[] = Array.isArray(data?.destinations)
        ? (data.destinations as any[])
            .filter(
              (d) =>
                d &&
                typeof d.name === 'string' &&
                typeof d.country === 'string' &&
                typeof d.why_recommended === 'string'
            )
            .map((d) => ({
              name: d.name,
              country: d.country,
              why_recommended: d.why_recommended,
              estimated_daily_budget_usd: d.estimated_daily_budget_usd ?? null,
              insider_tip: d.insider_tip ?? null,
            }))
        : []

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: assistantContent,
        destinations,
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Only increment guest counter on successful responses for unauthenticated users
      if (!isAuthenticated && typeof window !== 'undefined') {
        const nextCount = guestCount + 1
        setGuestCount(nextCount)
        window.localStorage.setItem(GUEST_PROMPT_KEY, String(nextCount))
      }
      const followUps: string[] = Array.isArray(data?.follow_up_questions)
        ? (data.follow_up_questions as any[]).filter((q) => typeof q === 'string')
        : []

      if (followUps.length > 0) {
        setMessages((prev) => {
          const last = prev[prev.length - 1]
          const updated = [...prev.slice(0, -1), last]
          updated[updated.length - 1] = {
            ...assistantMessage,
            // @ts-expect-error extend shape at runtime
            follow_up_questions: followUps,
          }
          return updated
        })
      }
    } catch (err) {
      console.error('AI chat request failed', err)
      setError(t('chat.error.requestFailed'))
    } finally {
      setIsLoading(false)
    }
  }

  const isInputDisabled = isLoading || guestLimitReached

  return (
    <div
      className="min-h-[80vh] flex flex-col items-center px-4 py-12"
      data-testid="chat-page"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="w-8 h-8 text-brand" />
        <h1
          className="text-3xl font-bold text-brand"
          data-testid="chat-title"
        >
          {t('chat.title')}
        </h1>
      </div>

      <p className="text-slate-600 mb-6 text-center max-w-md text-lg">
        {t('chat.subtitle')}
      </p>

      {/* Guest trial progress (only for unauthenticated users) */}
      {!isAuthenticated && (
        <p className="mb-6 text-sm text-slate-500">
          {t('chat.trialInfoPrefix')}{' '}
          {guestCount}/{MAX_GUEST_PROMPTS}{' '}
          {t('chat.trialInfoSuffix')}
        </p>
      )}

      {/* Simple chat transcript */}
      <div className="w-full max-w-2xl mb-6 space-y-4">
        {messages.map((msg) => {
          const followUps: string[] = (msg as any).follow_up_questions || []
          return (
          <div key={msg.id} className="space-y-2">
            <div
              className={`w-full flex ${
                msg.role === 'user'
                  ? 'justify-end'
                  : msg.role === 'assistant'
                  ? 'justify-start'
                  : 'justify-center'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm md:text-base shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-brand text-white'
                    : msg.role === 'assistant'
                    ? 'bg-white text-slate-900 border border-slate-200'
                    : 'bg-amber-50 text-amber-900 border border-amber-200 text-center'
                }`}
              >
                {msg.content}
              </div>
            </div>

            {msg.role === 'assistant' &&
              msg.destinations &&
              msg.destinations.length > 0 && (
                <div className="w-full flex justify-start">
                  <div className="max-w-[90%] flex flex-col gap-3 pl-4">
                    {msg.destinations.map((dest, idx) => (
                      <div
                        key={`${msg.id}-dest-${idx}`}
                        className="rounded-2xl border border-slate-200 bg-white shadow-sm px-4 py-3 text-sm md:text-base"
                      >
                        <div className="flex items-baseline justify-between gap-3 mb-1">
                          <div className="font-semibold text-slate-900">
                            {dest.name}
                            {dest.country ? (
                              <span className="text-slate-500 text-xs ml-2">
                                · {dest.country}
                              </span>
                            ) : null}
                          </div>
                          {dest.estimated_daily_budget_usd && (
                            <div className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
                              {dest.estimated_daily_budget_usd} / day
                            </div>
                          )}
                        </div>
                        <p className="text-slate-700 text-sm">
                          {dest.why_recommended}
                        </p>
                        {dest.insider_tip && (
                          <div className="mt-2 text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 flex gap-2 items-start">
                            <span className="text-amber-500 text-base">💡</span>
                            <span>
                              <span className="font-semibold mr-1">Insider tip:</span>
                              {dest.insider_tip}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            {msg.role === 'assistant' && followUps.length > 0 && (
              <div className="w-full flex justify-start">
                <div className="max-w-[90%] flex flex-wrap gap-2 pl-4">
                  {followUps.map((q, idx) => (
                    <button
                      key={`${msg.id}-followup-${idx}`}
                      type="button"
                      onClick={() => setPrompt(q)}
                      className="px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-xs md:text-sm text-slate-700 hover:bg-slate-100 hover:border-brand/40 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )})}

        {/* Auth wall message when guest limit reached */}
        {guestLimitReached && (
          <div className="w-full flex justify-center">
            <div className="max-w-[85%] rounded-2xl px-4 py-4 text-sm md:text-base bg-amber-50 text-amber-900 border border-amber-200 shadow-sm text-center space-y-3">
              <p className="font-semibold">
                {t('chat.trial.title')}
              </p>
              <p>{t('chat.trial.description')}</p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-brand text-white font-semibold text-sm hover:bg-brand/90 transition-colors"
              >
                {t('chat.trial.button')}
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="mb-4 text-sm text-red-600" data-testid="chat-error">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl"
        data-testid="chat-form"
      >
        <div className="relative rounded-2xl border-2 border-slate-200 bg-white shadow-lg overflow-hidden focus-within:border-brand transition-colors">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              guestLimitReached
                ? t('chat.input.placeholder')
                : t('chat.placeholder')
            }
            rows={4}
            className="w-full px-6 py-4 bg-transparent text-slate-900 placeholder-slate-400 resize-none focus:outline-none text-lg disabled:bg-slate-50"
            data-testid="chat-input"
            disabled={isInputDisabled}
          />
          <div className="flex justify-end px-4 pb-4">
            <button
              type="submit"
              disabled={isInputDisabled || !prompt.trim()}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-brand hover:bg-brand/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="chat-submit-button"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  {t('chat.loading')}
                </span>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {t('chat.button.generate')}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
