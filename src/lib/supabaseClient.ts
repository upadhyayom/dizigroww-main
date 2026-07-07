// Supabase client for invoice persistence.
// Reads credentials from Vite env vars. If they're not set, the app silently
// falls back to localStorage-only mode (cloudEnabled() === false), so nothing
// breaks in local/dev without a project configured.
//
// Set these in your .env (see .env.example):
//   VITE_SUPABASE_URL=https://<your-project>.supabase.co
//   VITE_SUPABASE_ANON_KEY=<anon public key>

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = (import.meta as any).env?.VITE_SUPABASE_URL as string | undefined;
const anonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase: SupabaseClient | null =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: false,
        },
      })
    : null;

export const cloudEnabled = (): boolean => supabase !== null;
