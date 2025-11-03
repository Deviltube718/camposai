"use client";
import { supabaseBrowser } from "../../lib/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function LoginPage() {
  const supabase = supabaseBrowser();
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="max-w-sm w-full border rounded-xl p-4">
        <h1 className="text-xl font-semibold mb-3">Sign in to CamposAI</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}   // remove if email-only
          view="sign_in"
          onlyThirdPartyProviders={false}
        />
      </div>
    </div>
  );
}
