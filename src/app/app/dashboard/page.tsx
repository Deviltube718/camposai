import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Welcome, {user.email}</h1>
      <form action="/auth/signout" method="post">
        <button className="border p-2 rounded">Sign out</button>
      </form>
    </main>
  )
}
