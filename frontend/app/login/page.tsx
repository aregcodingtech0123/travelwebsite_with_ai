'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLanguage } from '../contexts/LanguageContext'

function LoginForm() {
  const { t } = useLanguage()
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
        setError(t('login.error.invalid'))
        return
      }
      router.push(callbackUrl)
      router.refresh()
    } catch {
      setError(t('login.error.generic'))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = () => {
    signIn('google', { callbackUrl })
  }

  return (
    <div className="w-full max-w-md">
      <h1 
        className="text-3xl font-bold text-center mb-8 text-brand"
        data-testid="login-title"
      >
        {t('auth.login.title')}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6" data-testid="login-form">
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            {t('auth.email')}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
            placeholder={t('auth.placeholders.email')}
            data-testid="login-email-input"
          />
        </div>
        
        <div>
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            {t('auth.password')}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
            placeholder={t('auth.placeholders.password')}
            data-testid="login-password-input"
          />
        </div>
        
        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg" data-testid="login-error">
            {error}
          </p>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl font-semibold text-white bg-brand hover:bg-brand/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="login-submit-button"
        >
          {loading ? t('login.loading') : t('login.submit')}
        </button>
        
        <button
          type="button"
          onClick={handleGoogle}
          className="w-full py-3.5 rounded-xl font-semibold border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
          data-testid="login-google-button"
        >
          {t('auth.googleLogin')}
        </button>
      </form>
      
      <p className="mt-8 text-center text-slate-600">
        {t('auth.noAccount')}{' '}
        <Link 
          href="/register" 
          className="font-semibold text-brand hover:underline"
          data-testid="login-register-link"
        >
          {t('auth.haveAccount')}
        </Link>
      </p>
    </div>
  )
}

export default function LoginPage() {
  const { t } = useLanguage()
  
  return (
    <div 
      className="min-h-[80vh] flex items-center justify-center px-4 py-12"
      data-testid="login-page"
    >
      <Suspense fallback={<div className="text-center text-slate-600">{t('profile.loading')}</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
