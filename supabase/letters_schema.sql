-- DiziGroww offer letters + internship letters — Supabase schema
-- Paste this whole file into your project's SQL Editor and run it once.
-- (Supabase dashboard → SQL Editor → New query → paste → Run)
--
-- Both letter kinds share one table, distinguished by `kind`
-- ('offer' | 'internship'), mirroring how ./invoices_schema.sql stores
-- invoices — the full record lives in `data` (jsonb), the flat columns
-- exist for indexing / querying / dashboards.

create table if not exists public.letters (
  id             text primary key,
  kind           text not null check (kind in ('offer', 'internship')),
  number         text,
  status         text,
  issue_date     date,
  candidate_name text,
  data           jsonb not null,          -- full letter object (source of truth)
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists letters_kind_idx           on public.letters (kind);
create index if not exists letters_number_idx         on public.letters (number);
create index if not exists letters_status_idx         on public.letters (status);
create index if not exists letters_issue_date_idx     on public.letters (issue_date);
create index if not exists letters_created_at_idx     on public.letters (created_at desc);

-- Row Level Security.
-- Access is restricted to LOGGED-IN (authenticated) users only, same as the
-- invoices table — the public anon key shipped in the browser bundle CANNOT
-- read or write this table without a valid Supabase Auth session.
--
-- Create your admin login in the Supabase dashboard:
--   Authentication → Users → Add user  (set a password, enable "Auto Confirm")

alter table public.letters enable row level security;

drop policy if exists "authenticated full access to letters" on public.letters;
create policy "authenticated full access to letters"
  on public.letters
  for all
  to authenticated
  using (true)
  with check (true);
