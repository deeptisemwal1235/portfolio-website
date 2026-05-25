-- Drag-to-reorder support for the analysis grid (mirrors 0001 for projects).
-- Run once in Supabase SQL editor.

alter table posts
  add column if not exists display_order int;

-- Backfill: keep the existing publish-date order as the starting rank.
with ranked as (
  select id, row_number() over (order by coalesce(published_at, created_at) desc) as rn
  from posts
  where display_order is null
)
update posts p
set display_order = r.rn
from ranked r
where p.id = r.id;

create index if not exists posts_display_order_idx
  on posts (display_order);
