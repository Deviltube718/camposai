// src/app/app/page.tsx (or wherever this file lives)

import { createClient } from "@/utils/supabase/server"; // ✅ new import
import Link from "next/link";

export default async function AppHome() {
  const supabase = await createClient(); // ✅ matches the import
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="min-h-screen grid place-items-center p-6">
        <div className="text-center">
          <p className="mb-3">You must sign in to continue.</p>
          <Link className="underline" href="/login">Go to login</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Welcome, {user.email}</h1>
      <form action="/auth/signout" method="post" className="mt-4">
        <button className="border rounded px-3 py-1">Sign out</button>
      </form>
      <p className="mt-2 text-slate-600">Auth works. Next: memory.</p>
    </main>
  );
}
