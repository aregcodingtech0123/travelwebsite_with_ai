'use client'

import { useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { CreditCard } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

export default function PaymentPage() {
  const { t } = useLanguage()
  const { data: session, status } = useSession()
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const formatCardNumber = (v: string) => v.replace(/\D/g, '').slice(0, 16)
  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`
    return digits
  }
  const formatCvv = (v: string) => v.replace(/\D/g, '').slice(0, 3)

  const handleCardChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value))
  }, [])

  const handleExpiryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiry(formatExpiry(e.target.value))
  }, [])

  const handleCvvChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCvv(formatCvv(e.target.value))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    if (!session?.user?.id) {
      setMessage(t('payment.loginRequired'))
      return
    }
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      setMessage(t('payment.invalidAmount'))
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: (session.user as { id?: string }).id,
          amount: numAmount,
          cardLast4: cardNumber.slice(-4),
          status: 'completed',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error ?? t('payment.failed'))
      setMessage(t('payment.success'))
      setCardNumber('')
      setExpiry('')
      setCvv('')
      setAmount('')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : t('payment.failed'))
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-slate-600">{t('payment.loading')}</p>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-slate-600">{t('payment.loginRequired')}</p>
      </div>
    )
  }

  return (
    <div 
      className="min-h-[80vh] px-4 py-12 max-w-md mx-auto"
      data-testid="payment-page"
    >
      <div className="flex items-center gap-3 mb-8">
        <CreditCard className="w-8 h-8 text-brand" />
        <h1 className="text-3xl font-bold text-brand" data-testid="payment-title">
          {t('payment.title')}
        </h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6" data-testid="payment-form">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {t('payment.cardNumber')}
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={cardNumber}
            onChange={handleCardChange}
            placeholder={t('payment.cardNumber.placeholder')}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
            data-testid="payment-card-input"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t('payment.expiry')}
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={expiry}
              onChange={handleExpiryChange}
              placeholder={t('payment.expiry.placeholder')}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
              data-testid="payment-expiry-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t('payment.cvv')}
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={cvv}
              onChange={handleCvvChange}
              placeholder={t('payment.cvv.placeholder')}
              maxLength={3}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
              data-testid="payment-cvv-input"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {t('payment.amount')}
          </label>
          <input
            type="number"
            min="1"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
            data-testid="payment-amount-input"
          />
        </div>
        
        {message && (
          <p 
            className={`text-sm px-4 py-2 rounded-lg ${
              message.includes(t('payment.success')) 
                ? 'text-green-700 bg-green-50' 
                : 'text-red-600 bg-red-50'
            }`}
            data-testid="payment-message"
          >
            {message}
          </p>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl font-semibold text-white bg-brand hover:bg-brand/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="payment-submit-button"
        >
          {loading ? t('payment.processing') : t('payment.pay')}
        </button>
      </form>
    </div>
  )
}
