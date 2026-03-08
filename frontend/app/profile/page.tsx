'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

const SITE_NAME = 'AI Traveller Planner'
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

export default function ProfilePage() {
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
      setMessage('Profile updated')
    } catch {
      setMessage('Update failed')
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
        <p className="text-slate-600">Please log in to view your profile.</p>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] px-4 py-12 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-8" style={{ color: 'rgb(0, 191, 165)' }}>
        {SITE_NAME} — Profile
      </h1>
      {creditAmount !== null && (
        <div className="mb-8 p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">Credit Amount</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{creditAmount}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Surname</label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>
        {message && <p className="text-sm text-slate-600 dark:text-slate-400">{message}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold text-white disabled:opacity-50"
          style={{ backgroundColor: 'rgb(0, 191, 165)' }}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  )
}
