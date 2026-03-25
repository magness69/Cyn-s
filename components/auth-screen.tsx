'use client'
import { supabase } from '@/lib/supabase'
import { useState } from 'react'
import { Mail, ArrowRight, Loader2, X } from 'lucide-react'
import { AppLogo } from './app-logo'

interface AuthScreenProps {
  onComplete: (user: { name: string; email: string; provider: string }) => void
  onSkip: () => void
}

export function AuthScreen({ onComplete, onSkip }: AuthScreenProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [step, setStep] = useState<'main' | 'email'>('main')
  const [loading, setLoading] = useState(false)

  const handleSocialLogin = async (provider: string) => {
    setLoading(true)

    if (provider === 'Google') {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          scopes: 'profile email',
          queryParams: {
            prompt: 'select_account',
            access_type: 'online',
          },
        },
      })

      if (error) {
        alert(error.message)
        setLoading(false)
      }
    }

      else if (provider === 'Instagram') {
        alert("Instagram login is not implemented yet. Please use Google or Email.")
        setLoading(false)
      }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) return

    setLoading(true)

    // SIGN UP (créer compte)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    })

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    alert("Account created 🔥 check your email")

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col">
      {/* Skip button */}
      <div className="absolute top-12 right-4 z-10">
        <button
          onClick={onSkip}
          className="flex items-center gap-1 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
        >
          Skip
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Logo area - uses AppLogo component */}
        <div className="mb-6">
          <AppLogo size="xl" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2 text-center">
          {step === 'main' ? 'Create Your Account' : 'Sign in with Email'}
        </h1>
        <p className="text-muted-foreground text-center mb-8 max-w-xs">
          {step === 'main' 
            ? 'Save your favorites, sync across devices, and track your healthy eating journey.'
            : 'Enter your details to continue'
          }
        </p>

        {step === 'main' ? (
          <div className="w-full max-w-sm space-y-3">
            {/* Google */}
            <button
              onClick={() => handleSocialLogin('Google')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-card border border-border py-4 px-6 rounded-xl font-medium text-card-foreground hover:bg-muted transition-colors disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </button>

            {/* Instagram */}
            <button
              onClick={() => handleSocialLogin('Instagram')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 py-4 px-6 rounded-xl font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Continue with Instagram
                </>
              )}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-muted-foreground">or</span>
              </div>
            </div>

            {/* Email */}
            <button
              onClick={() => setStep('email')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-muted py-4 px-6 rounded-xl font-medium text-foreground hover:bg-muted/80 transition-colors disabled:opacity-50"
            >
              <Mail className="w-5 h-5" />
              Continue with Email
            </button>
          </div>
        ) : (
          <form onSubmit={handleEmailSubmit} className="w-full max-w-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-muted border-0 py-4 px-4 rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-muted border-0 py-4 px-4 rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-muted border-0 py-4 px-4 rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
                required
               />
            </div>

            <button
              type="submit"
              disabled={loading || !email || !name}
              className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-xl hover:opacity-90 transition-opacity active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setStep('main')}
              className="w-full text-muted-foreground font-medium py-2 hover:text-foreground transition-colors"
            >
              Back to sign in options
            </button>
          </form>
        )}
      </div>

      {/* Terms */}
      <p className="text-center text-xs text-muted-foreground px-8 pb-10">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  )
}
