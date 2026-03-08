'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { CreditCard, User } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

export default function ProfilePage() {
  const { t } = useLanguage()
  const { data: session, status } = useSession()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [creditAmount, setCreditAmount] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const userId = (session?.user as { id?: string })?.id
    if (session?.user?.email) {
      setEmail(session.user.email ?? '')
      if (userId) {
        fetch(`${API_URL}/api/profile/${userId}`)
          .then((res) => res.ok ? res.json() : null)
          .then((data) => {
            if (data) {
              setName(data.name ?? '')
              setSurname(data.surname ?? '')
              setCreditAmount(data.creditAmount ?? 0)
            } else {
              setCreditAmount(0)
            }
          })
          .catch(() => setCreditAmount(0))
      } else {
        setCreditAmount(0)
      }
    }
  }, [session])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)
    const userId = (session?.user as { id?: string })?.id
    if (!userId) return
    try {
      const res = await fetch(`${API_URL}/api/profile/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, surname }),
      })
      if (!res.ok) throw new Error('Update failed')
      setMessage(t('profile.updated'))
    } catch {
      setMessage(t('profile.updateFailed'))
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-slate-600">{t('profile.loading')}</p>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-slate-600">{t('profile.loginRequired')}</p>
      </div>
    )
  }

  return (
    <div 
      className="min-h-[80vh] px-4 py-12 max-w-xl mx-auto"
      data-testid="profile-page"
    >
      <div className="flex items-center gap-3 mb-8">
        <User className="w-8 h-8 text-brand" />
        <h1 className="text-3xl font-bold text-brand" data-testid="profile-title">
          {t('profile.title')}
        </h1>
      </div>
      
      {creditAmount !== null && (
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-brand/10 to-brand/5 border border-brand/20" data-testid="profile-credit-section">
          <div className="flex items-center gap-3 mb-2">
            <CreditCard className="w-5 h-5 text-brand" />
            <p className="text-sm font-medium text-slate-600">{t('profile.credit')}</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">${creditAmount.toFixed(2)}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6" data-testid="profile-form">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {t('profile.email')}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
            data-testid="profile-email-input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {t('profile.name')}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
            data-testid="profile-name-input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {t('profile.surname')}
          </label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
            data-testid="profile-surname-input"
          />
        </div>
        
        {message && (
          <p 
            className={`text-sm px-4 py-2 rounded-lg ${
              message.includes(t('profile.updated')) 
                ? 'text-green-700 bg-green-50' 
                : 'text-red-600 bg-red-50'
            }`}
            data-testid="profile-message"
          >
            {message}
          </p>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl font-semibold text-white bg-brand hover:bg-brand/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="profile-save-button"
        >
          {loading ? t('profile.saving') : t('profile.save')}
        </button>
      </form>
    </div>
  )
}
