-- DiziGroww client project ledger — Supabase schema
-- Paste this whole file into your project's SQL Editor and run it once.
-- (Supabase dashboard → SQL Editor → New query → paste → Run)
-- This is the same pattern as invoices_schema.sql — a separate table for
-- the "full project cost vs advance received" ledger.

create table if not exists public.client_projects (
  id                text primary key,
  client_name       text,
  currency          text,
  project_cost      numeric,
  advance_received  numeric,
  data              jsonb not null,          -- full record (source of truth)
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists client_projects_client_name_idx on public.client_projects (client_name);
create index if not exists client_projects_created_at_idx  on public.client_projects (created_at desc);

-- Row Level Security — same rule as invoices: only logged-in (authenticated)
-- users can read/write. The anon key shipped in the browser bundle cannot
-- touch this table without a valid Supabase Auth session.

alter table public.client_projects enable row level security;

drop policy if exists "authenticated full access to client_projects" on public.client_projects;
create policy "authenticated full access to client_projects"
  on public.client_projects
  for all
  to authenticated
  using (true)
  with check (true);
