'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const SITE_NAME = 'AI Traveller Planner'
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name: '', surname: '' }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error ?? 'Registration failed')
        return
      }
      const signInRes = await signIn('credentials', { email, password, redirect: false })
      if (signInRes?.error) {
        router.push('/login')
        return
      }
      router.push('/')
      router.refresh()
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = () => {
    signIn('google', { callbackUrl: '/' })
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8" style={{ color: 'rgb(0, 191, 165)' }}>
          {SITE_NAME}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[rgb(0,191,165)] focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[rgb(0,191,165)] focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[rgb(0,191,165)] focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white transition-opacity disabled:opacity-50"
            style={{ backgroundColor: 'rgb(0, 191, 165)' }}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
          <button
            type="button"
            onClick={handleGoogle}
            className="w-full py-3 rounded-lg font-semibold border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Login with Google
          </button>
        </form>
        <p className="mt-6 text-center text-slate-600 dark:text-slate-400">
          Do you have an account?{' '}
          <Link href="/login" className="font-medium underline" style={{ color: 'rgb(0, 191, 165)' }}>
            Login from here
          </Link>
        </p>
      </div>
    </div>
  )
}
