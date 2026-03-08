'use client'

import { useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

export default function PaymentPage() {
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
      setMessage('Please log in')
      return
    }
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      setMessage('Enter a valid amount')
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
      if (!res.ok) throw new Error(data.error ?? 'Payment failed')
      setMessage('Payment successful')
      setCardNumber('')
      setExpiry('')
      setCvv('')
      setAmount('')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Payment failed')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-slate-600">Loading...</p>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-slate-600">Please log in to make a payment.</p>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] px-4 py-12 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-8" style={{ color: 'rgb(0, 191, 165)' }}>
        Add Credit
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Card Number</label>
          <input
            type="text"
            inputMode="numeric"
            value={cardNumber}
            onChange={handleCardChange}
            placeholder="1234 5678 9012 3456"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Expiry (MM/YY)</label>
            <input
              type="text"
              inputMode="numeric"
              value={expiry}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">CVV (3 digits)</label>
            <input
              type="text"
              inputMode="numeric"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="123"
              maxLength={3}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Amount</label>
          <input
            type="number"
            min="1"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>
        {message && (
          <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold text-white disabled:opacity-50"
          style={{ backgroundColor: 'rgb(0, 191, 165)' }}
        >
          {loading ? 'Processing...' : 'Pay'}
        </button>
      </form>
    </div>
  )
}
