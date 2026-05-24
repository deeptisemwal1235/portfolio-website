-- Drag-to-reorder support for the projects grid.
-- Run once in Supabase SQL editor.

alter table projects
  add column if not exists display_order int;

-- Backfill: existing rows keep their current creation order, newest first
-- (matches the previous default sort by created_at desc).
with ranked as (
  select id, row_number() over (order by created_at asc) as rn
  from projects
  where display_order is null
)
update projects p
set display_order = r.rn
from ranked r
where p.id = r.id;

create index if not exists projects_display_order_idx
  on projects (display_order);
