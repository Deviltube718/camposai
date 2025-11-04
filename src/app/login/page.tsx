'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [msg, setMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null); setMsg(null); setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) setError(error.message)
    else router.replace('/dashboard')
  }

  const signUp = async () => {
    setError(null); setMsg(null); setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/auth/callback` }
    })
    setLoading(false)
    if (error) setError(error.message)
    else setMsg('Check your email to confirm your account.')
  }

  const signInWithGoogle = async () => {
    setError(null); setMsg(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` }
    })
    if (error) setError(error.message)
  }

  return (
    <main className="max-w-sm mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <form onSubmit={signIn} className="space-y-3">
        <input className="w-full border p-2 rounded" placeholder="Email"
               value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Password" type="password"
               value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        {msg && <p className="text-sm text-green-600">{msg}</p>}
        <button disabled={loading} className="w-full border p-2 rounded">
          {loading ? 'Working…' : 'Sign in'}
        </button>
      </form>

      <button onClick={signUp} className="w-full border p-2 rounded">Create account</button>
      <button onClick={signInWithGoogle} className="w-full border p-2 rounded">Continue with Google</button>
    </main>
  )
}
