-- Site-wide editable settings (key/value singleton-ish).
-- Used by the footer to render social links, and a future "About" page.
-- Edit via /admin/settings.

create table if not exists site_settings (
  key text primary key,
  value text,
  updated_at timestamptz default now()
);

drop trigger if exists trg_site_settings_updated on site_settings;
create trigger trg_site_settings_updated before update on site_settings
  for each row execute function set_updated_at();

alter table site_settings enable row level security;

-- Public read so the footer can render without auth.
drop policy if exists "site_settings public read" on site_settings;
create policy "site_settings public read" on site_settings
  for select using (true);

-- Authenticated admin can write.
drop policy if exists "site_settings auth all" on site_settings;
create policy "site_settings auth all" on site_settings
  for all to authenticated using (true) with check (true);

-- Seed with the two URLs from chat. Re-running this is idempotent (upsert).
insert into site_settings (key, value) values
  ('social_linkedin_url', 'https://www.linkedin.com/in/deeptisemwal1235'),
  ('social_twitter_url',  'https://x.com/deeptis736860'),
  ('social_github_url',   '')
on conflict (key) do nothing;
