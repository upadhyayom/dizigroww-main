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
-- The app authenticates with the public "anon" key (no user login), so we
-- allow the anon role full access to this single table. The invoices page is
-- already gated behind a password (VITE_INVOICE_PASSWORD) in the UI.
--
-- NOTE: the anon key is shipped to the browser, so anyone who finds this table
-- name could read/write it. For a stricter setup, add Supabase Auth and
-- restrict these policies to authenticated users. For now this matches the
-- app's existing "shared admin password" security model.

alter table public.invoices enable row level security;

drop policy if exists "anon full access to invoices" on public.invoices;
create policy "anon full access to invoices"
  on public.invoices
  for all
  to anon
  using (true)
  with check (true);
