import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

import { cloudEnabled, supabase } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";

// ----------------------------------------------------------------------------
// Shared admin login gate — used by every admin page (Invoices, Offer
// Letters, Internship Letters). When Supabase is configured, requires a real
// logged-in session (data is locked to authenticated users at the database
// level). Otherwise falls back to a local password gate so local dev without
// Supabase still works.
//
// Password gate. Set VITE_ADMIN_PASSWORD in .env to override.
// ----------------------------------------------------------------------------
export const ADMIN_PASSWORD =
  (import.meta as any).env?.VITE_ADMIN_PASSWORD ||
  (import.meta as any).env?.VITE_INVOICE_PASSWORD ||
  "dizi-admin";

export const ADMIN_PASS_STORAGE_KEY = "dizi_invoice_auth_v1";

export function AdminAuthGate({
  title = "DiziGroww Admin",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Keep every admin page out of search engines regardless of auth outcome.
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  if (cloudEnabled()) return <SupabaseAuthGate title={title}>{children}</SupabaseAuthGate>;
  return <LocalPasswordGate title={title}>{children}</LocalPasswordGate>;
}

// ----------------------------------------------------------------------------
// Supabase auth gate — real server-side authentication
// ----------------------------------------------------------------------------
function SupabaseAuthGate({ title, children }: { title: string; children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    supabase!.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase!.auth.onAuthStateChange((_evt, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 text-sm">
        Loading…
      </div>
    );
  }
  if (!session) return <LoginForm title={title} />;
  return <>{children}</>;
}

function LoginForm({ title }: { title: string }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.title = `${title} · DiziGroww`;
  }, [title]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const { error } = await supabase!.auth.signInWithPassword({ email, password: pw });
    setBusy(false);
    if (error) setErr(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
            <Lock className="w-5 h-5 text-slate-600" />
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-3">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@dizigroww.in"
                required
              />
            </div>
            <div>
              <Label htmlFor="pw">Password</Label>
              <Input
                id="pw"
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            {err && <p className="text-sm text-red-600">{err}</p>}
            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? "Signing in…" : "Sign in"}
            </Button>
            <p className="text-xs text-slate-500 text-center">
              Access is restricted to authorized DiziGroww accounts.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Local password gate — fallback only when Supabase isn't configured
// ----------------------------------------------------------------------------
function LocalPasswordGate({ title, children }: { title: string; children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean>(
    typeof window !== "undefined" &&
      localStorage.getItem(ADMIN_PASS_STORAGE_KEY) === "yes"
  );

  if (!authed) return <PasswordGate title={title} onPass={() => setAuthed(true)} />;
  return <>{children}</>;
}

function PasswordGate({ title, onPass }: { title: string; onPass: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    document.title = `${title} · DiziGroww`;
  }, [title]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      localStorage.setItem(ADMIN_PASS_STORAGE_KEY, "yes");
      onPass();
    } else {
      setErr("Wrong password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
            <Lock className="w-5 h-5 text-slate-600" />
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-3">
            <Label htmlFor="pw">Password</Label>
            <Input
              id="pw"
              type="password"
              autoFocus
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Enter password"
            />
            {err && <p className="text-sm text-red-600">{err}</p>}
            <Button type="submit" className="w-full">Unlock</Button>
            <p className="text-xs text-slate-500 text-center">
              Default password is set in code. Override with VITE_ADMIN_PASSWORD.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
