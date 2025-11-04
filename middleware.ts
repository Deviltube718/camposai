// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Attach Supabase cookies to refresh session on navigation
  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get: (name: string) => req.cookies.get(name)?.value ?? null,
        set: (name: string, value: string, options: any) => {
          // set on response so browser stores it
          res.cookies.set({ name, value, ...options })
        },
        remove: (name: string, options: any) => {
          res.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  return res
}

export const config = {
  // run on all routes except static assets
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
