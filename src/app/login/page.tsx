// src/app/login/page.tsx
'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/utils/supabase/client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.replace('/app')
    })
  }, [router, supabase])

  return (
    <main className="min-h-screen grid place-items-center p-8">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-4 text-center">Sign in to Campos AI</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}                 // <-- no OAuth providers yet
          onlyThirdPartyProviders={false}
          view="sign_in"
          redirectTo="https://camposai.com/app/chat"
        />
      </div>
    </main>
  )
}
