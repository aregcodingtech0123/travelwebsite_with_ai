'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

const SITE_NAME = 'AI Traveller Planner'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      if (res?.error) {
        setError('Invalid email or password')
        return
      }
      router.push(callbackUrl)
      router.refresh()
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = () => {
    signIn('google', { callbackUrl })
  }

  return (
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
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity disabled:opacity-50"
          style={{ backgroundColor: 'rgb(0, 191, 165)' }}
        >
          {loading ? 'Signing in...' : 'Log In'}
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
        Don&apos;t you have an account?{' '}
        <Link href="/register" className="font-medium underline" style={{ color: 'rgb(0, 191, 165)' }}>
          Register from here
        </Link>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="text-center text-slate-600">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
