import { NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export function createClientWithResponse(req: Request) {
  const url = new URL(req.url)
  const res = NextResponse.next() // or build your own response/redirect

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get: (name: string) => {
          const cookie = (req.headers.get('cookie') ?? '')
            .split(/;\s*/).find(c => c.startsWith(name+'='))
          return cookie ? decodeURIComponent(cookie.split('=').slice(1).join('=')) : null
        },
        set: (name: string, value: string, options: CookieOptions) => {
          res.cookies.set({ name, value, ...options })
        },
        remove: (name: string, options: CookieOptions) => {
          res.cookies.set({ name, value: '', ...options, maxAge: 0 })
        },
      },
    }
  )

  return { supabase, res, url }
}
