import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const res = NextResponse.redirect(new URL('/dashboard', url.origin))

  if (!code) return res

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get: (name) => undefined,
        set: (name, value, options) => { res.cookies.set({ name, value, ...options }) },
        remove: (name, options) => { res.cookies.set({ name, value: '', ...options, maxAge: 0 }) },
      },
    }
  )

  await supabase.auth.exchangeCodeForSession(code)
  return res
}
