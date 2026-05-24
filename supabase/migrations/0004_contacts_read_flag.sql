-- Admin /admin/messages needs to mark messages as read and delete them.
-- Adds a "read" flag (default false) + the missing RLS policies for
-- authenticated update and delete on the contacts table.
-- Run once in Supabase SQL editor.

alter table contacts add column if not exists read boolean default false;

drop policy if exists "contacts auth update" on contacts;
create policy "contacts auth update" on contacts
  for update to authenticated using (true) with check (true);

drop policy if exists "contacts auth delete" on contacts;
create policy "contacts auth delete" on contacts
  for delete to authenticated using (true);
