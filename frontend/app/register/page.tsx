'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../contexts/LanguageContext'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

export default function RegisterPage() {
  const { t } = useLanguage()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasUppercase, setHasUppercase] = useState(false)
  const [hasNumber, setHasNumber] = useState(false)
  const [hasSymbol, setHasSymbol] = useState(false)
  const [acceptedPolicy, setAcceptedPolicy] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError(t('register.error.mismatch'))
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        if (res.status === 409) {
          setError(t('register.error.emailExists'))
        } else {
          setError(data.error ?? t('register.error.failed'))
        }
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
      setError(t('register.error.generic'))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = () => {
    signIn('google', { callbackUrl: '/' })
  }

  return (
    <div 
      className="min-h-[80vh] flex items-center justify-center px-4 py-12"
      data-testid="register-page"
    >
      <div className="w-full max-w-md">
        <h1 
          className="text-3xl font-bold text-center mb-8 text-brand"
          data-testid="register-title"
        >
          {t('auth.register.title')}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6" data-testid="register-form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                {t('auth.firstName')}
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                data-testid="register-firstname-input"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                {t('auth.lastName')}
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                data-testid="register-lastname-input"
              />
            </div>
          </div>
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
              data-testid="register-email-input"
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
              onChange={(e) => {
                const val = e.target.value
                setPassword(val)
                setHasUppercase(/[A-Z]/.test(val))
                setHasNumber(/[0-9]/.test(val))
                setHasSymbol(/[!@#$%^&*(),.?":{}|<>]/.test(val))
              }}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
              placeholder={t('auth.placeholders.password')}
              data-testid="register-password-input"
            />
            <ul className="mt-2 text-xs space-y-1">
              <li
                className={
                  hasUppercase ? 'text-emerald-600' : 'text-slate-500'
                }
              >
                {hasUppercase ? '✓' : '•'} {t('auth.rules.uppercase')}
              </li>
              <li
                className={
                  hasNumber ? 'text-emerald-600' : 'text-slate-500'
                }
              >
                {hasNumber ? '✓' : '•'} {t('auth.rules.number')}
              </li>
              <li
                className={
                  hasSymbol ? 'text-emerald-600' : 'text-slate-500'
                }
              >
                {hasSymbol ? '✓' : '•'} {t('auth.rules.symbol')}
              </li>
            </ul>
          </div>
          
          <div>
            <label 
              htmlFor="confirmPassword" 
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              {t('register.confirmPassword')}
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
              placeholder={t('register.password.placeholder')}
              data-testid="register-confirm-password-input"
            />
          </div>
          
          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg" data-testid="register-error">
              {error}
            </p>
          )}
          
          <div className="flex items-start gap-2 text-xs text-slate-600">
            <input
              id="policyAccepted"
              type="checkbox"
              checked={acceptedPolicy}
              onChange={(e) => setAcceptedPolicy(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand"
            />
            <label htmlFor="policyAccepted" className="cursor-pointer">
              {t('register.policyText')}
            </label>
          </div>
          
          <button
            type="submit"
            disabled={
              loading ||
              !hasUppercase ||
              !hasNumber ||
              !hasSymbol ||
              !acceptedPolicy
            }
            className="w-full py-3.5 rounded-xl font-semibold text-white bg-brand hover:bg-brand/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="register-submit-button"
            >
              {loading ? t('register.loading') : t('register.submit')}
          </button>
          
          <button
            type="button"
            onClick={handleGoogle}
            className="w-full py-3.5 rounded-xl font-semibold border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
            data-testid="register-google-button"
          >
            {t('register.google')}
          </button>
        </form>
        
        <p className="mt-8 text-center text-slate-600">
          {t('register.hasAccount')}{' '}
          <Link 
            href="/login" 
            className="font-semibold text-brand hover:underline"
            data-testid="register-login-link"
          >
            {t('register.login')}
          </Link>
        </p>
      </div>
    </div>
  )
}
