-- DiziGroww invoices — Supabase schema
-- Paste this whole file into your project's SQL Editor and run it once.
-- (Supabase dashboard → SQL Editor → New query → paste → Run)

create table if not exists public.invoices (
  id          text primary key,
  number      text,
  status      text,
  issue_date  date,
  to_name     text,
  to_company  text,
  currency    text,
  data        jsonb not null,          -- full invoice object (source of truth)
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists invoices_number_idx      on public.invoices (number);
create index if not exists invoices_status_idx      on public.invoices (status);
create index if not exists invoices_issue_date_idx  on public.invoices (issue_date);
create index if not exists invoices_created_at_idx  on public.invoices (created_at desc);

-- Row Level Security.
-- Access is restricted to LOGGED-IN (authenticated) users only. The public
-- anon key shipped in the browser bundle CANNOT read or write this table —
-- a valid Supabase Auth session is required. This is what prevents invoice
-- data (client names, addresses, GSTINs) from leaking to anyone who finds
-- the anon key.
--
-- Create your admin login in the Supabase dashboard:
--   Authentication → Users → Add user  (set a password, enable "Auto Confirm")

alter table public.invoices enable row level security;

-- Remove any older, insecure anon policy if it exists.
drop policy if exists "anon full access to invoices" on public.invoices;

drop policy if exists "authenticated full access to invoices" on public.invoices;
create policy "authenticated full access to invoices"
  on public.invoices
  for all
  to authenticated
  using (true)
  with check (true);
