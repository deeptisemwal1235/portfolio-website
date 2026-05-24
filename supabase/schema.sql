-- ============================================================
-- Deepti Semwal Portfolio — Supabase schema + RLS
-- Run in Supabase SQL Editor (Project → SQL → New query → paste → Run)
-- ============================================================

-- Tables ------------------------------------------------------

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  cover_image_url text,
  year int,
  category text,
  tags text[],
  read_time text,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  cover_image_url text,
  category text,
  tags text[],
  read_time text,
  published_at timestamptz,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz default now()
);

-- updated_at trigger ----------------------------------------------------

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_projects_updated on projects;
create trigger trg_projects_updated before update on projects
  for each row execute function set_updated_at();

drop trigger if exists trg_posts_updated on posts;
create trigger trg_posts_updated before update on posts
  for each row execute function set_updated_at();

-- RLS ---------------------------------------------------------

alter table projects enable row level security;
alter table posts    enable row level security;
alter table contacts enable row level security;

-- Public read of published rows; authenticated full access.
drop policy if exists "projects public read" on projects;
create policy "projects public read" on projects
  for select using (published = true);

drop policy if exists "projects auth all" on projects;
create policy "projects auth all" on projects
  for all to authenticated using (true) with check (true);

drop policy if exists "posts public read" on posts;
create policy "posts public read" on posts
  for select using (published = true);

drop policy if exists "posts auth all" on posts;
create policy "posts auth all" on posts
  for all to authenticated using (true) with check (true);

-- Contacts: anyone can insert; only authenticated can read.
drop policy if exists "contacts public insert" on contacts;
create policy "contacts public insert" on contacts
  for insert with check (true);

drop policy if exists "contacts auth read" on contacts;
create policy "contacts auth read" on contacts
  for select to authenticated using (true);

-- Storage bucket ------------------------------------------------------
-- Run this AFTER creating the bucket via Dashboard → Storage → New bucket
-- (name: portfolio-media, Public bucket: ON). The policies below allow
-- public read and authenticated write.

drop policy if exists "portfolio-media public read" on storage.objects;
create policy "portfolio-media public read" on storage.objects
  for select using (bucket_id = 'portfolio-media');

drop policy if exists "portfolio-media auth write" on storage.objects;
create policy "portfolio-media auth write" on storage.objects
  for insert to authenticated with check (bucket_id = 'portfolio-media');

drop policy if exists "portfolio-media auth update" on storage.objects;
create policy "portfolio-media auth update" on storage.objects
  for update to authenticated using (bucket_id = 'portfolio-media');

drop policy if exists "portfolio-media auth delete" on storage.objects;
create policy "portfolio-media auth delete" on storage.objects
  for delete to authenticated using (bucket_id = 'portfolio-media');
