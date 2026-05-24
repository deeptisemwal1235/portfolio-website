-- Hero headline, ticker, and every section eyebrow/title/lede become editable.
-- Idempotent — on conflict do nothing keeps any value you've already saved.

insert into site_settings (key, value) values
  -- hero
  ('hero_headline_html',           'Energy<br>Policy <em>&</em><br>Regulations<br><em>Expert.</em>'),

  -- ticker
  ('ticker_words',                 'Tariff Orders · ARR · Power Markets · Carbon Credits · Green Hydrogen · CBG · Regulations'),

  -- section heads
  ('section_skills_eyebrow',       '§ 01 — Capabilities'),
  ('section_skills_title_html',    'Areas of <em>expertise.</em>'),
  ('section_skills_lede',          'Six core domains where I work — drawn from coursework at IIT Gandhinagar and applied across consultations for startups, policy think-tanks and energy developers.'),

  ('section_services_eyebrow',     '§ 02 — Engagement'),
  ('section_services_title_html',  'How I <em>help.</em>'),
  ('section_services_lede',        'Four service tracks I run for clients — from one-off regulatory reads to month-long strategy retainers. Each engagement is scoped against your decision deadline, not the other way around.'),

  ('section_projects_eyebrow',     '§ 03 — Selected Work'),
  ('section_projects_title_html',  'Projects <em>&</em> research.'),
  ('section_projects_lede',        'Selected academic and consulting projects — from microgrid economics to MPPT control. Click any card for the full write-up.'),

  ('section_analysis_eyebrow',     '§ 04 — Writing'),
  ('section_analysis_title_html',  'My <em>analysis.</em>'),
  ('section_analysis_lede',        'Short reads on India''s energy sector — tariff moves, market design, and what new policy notifications mean for the people actually building things.'),

  ('section_contact_eyebrow',      '§ 05 — Get in touch'),
  ('section_contact_title_html',   'Let''s<br><em>collaborate.</em>'),
  ('section_contact_lede',         'Working on a regulatory filing, a market-entry brief, or just want a sanity-check on a tariff strategy? Send a note — I read every message.')
on conflict (key) do nothing;
