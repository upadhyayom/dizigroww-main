-- DiziGroww portfolio projects — Supabase schema
-- Paste into the SQL Editor and run once. Public site can READ; only logged-in
-- admins can add / edit / delete.

create table if not exists public.portfolio_projects (
  id          text primary key,
  title       text not null,
  type        text not null,
  stack       text,
  result      text,
  image       text,
  link        text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists portfolio_projects_sort_idx on public.portfolio_projects (sort_order);

alter table public.portfolio_projects enable row level security;

drop policy if exists "public read portfolio" on public.portfolio_projects;
create policy "public read portfolio"
  on public.portfolio_projects for select
  to anon, authenticated
  using (true);

drop policy if exists "authenticated write portfolio" on public.portfolio_projects;
create policy "authenticated write portfolio"
  on public.portfolio_projects for all
  to authenticated
  using (true)
  with check (true);
