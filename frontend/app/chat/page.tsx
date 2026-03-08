'use client'

import { useState } from 'react'
import { Send, Sparkles } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function ChatPage() {
  const { t } = useLanguage()
  const [prompt, setPrompt] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return
    // TODO: call API to generate response and show in chat UI
    setPrompt('')
  }

  return (
    <div 
      className="min-h-[80vh] flex flex-col items-center px-4 py-12"
      data-testid="chat-page"
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
      
      <p className="text-slate-600 mb-12 text-center max-w-md text-lg">
        {t('chat.slogan')}
      </p>
      
      <form onSubmit={handleSubmit} className="w-full max-w-2xl" data-testid="chat-form">
        <div className="relative rounded-2xl border-2 border-slate-200 bg-white shadow-lg overflow-hidden focus-within:border-brand transition-colors">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t('chat.placeholder')}
            rows={4}
            className="w-full px-6 py-4 bg-transparent text-slate-900 placeholder-slate-400 resize-none focus:outline-none text-lg"
            data-testid="chat-input"
          />
          <div className="flex justify-end px-4 pb-4">
            <button
              type="submit"
              disabled={!prompt.trim()}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-brand hover:bg-brand/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="chat-submit-button"
            >
              <Send className="w-5 h-5" />
              {t('chat.generate')}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
