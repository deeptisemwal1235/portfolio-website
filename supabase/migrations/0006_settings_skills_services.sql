-- 6 skills + 4 services become editable from /admin/settings.
-- Glyphs stay hardcoded by index (1..6) — only the title + 1-line desc
-- per card are stored as settings. Idempotent.

insert into site_settings (key, value) values
  ('skill_1_title', 'Energy Regulations'),
  ('skill_1_desc',  'CERC / SERC frameworks, Electricity Act provisions, regulatory filings and compliance advisory.'),
  ('skill_2_title', 'Power Markets'),
  ('skill_2_desc',  'Day-ahead, real-time and term-ahead markets across IEX & HPX. Bid strategy and clearing-price analytics.'),
  ('skill_3_title', 'Tariff Order & ARR'),
  ('skill_3_desc',  'Aggregate revenue requirement modelling, true-up petitions, and tariff design for distribution licensees.'),
  ('skill_4_title', 'Carbon Markets'),
  ('skill_4_desc',  'India CCTS, voluntary carbon credits, baselines & MRV. Compliance pathways under PAT & beyond.'),
  ('skill_5_title', 'CBG — Compressed Bio-Gas'),
  ('skill_5_desc',  'SATAT scheme, feedstock economics, off-take pricing and project finance for CBG developers.'),
  ('skill_6_title', 'Green H₂ & Power Derivatives'),
  ('skill_6_desc',  'National Green Hydrogen Mission, electrolyser bid design, and emerging electricity derivative contracts.'),

  ('service_1_title', 'Energy Regulations Consultation'),
  ('service_1_desc',  'Decode tariff orders, CERC / SERC notifications, and PPA terms. Written opinions, redlines, and stakeholder briefings — turnaround in days, not weeks.'),
  ('service_2_title', 'Strategy & New-Initiative Ideation'),
  ('service_2_desc',  'For energy startups: market-entry strategy, regulatory moats, and pricing playbooks across power, carbon, hydrogen, and bio-gas.'),
  ('service_3_title', 'Energy Consumption Analysis'),
  ('service_3_desc',  'Load profiling, tariff arbitrage and demand-side optimisation for industrial and commercial consumers — quantified bill-savings before you sign.'),
  ('service_4_title', 'Income Projection in Renewables'),
  ('service_4_desc',  'Bankable revenue models for solar, wind and hybrid plants — capturing GTAM, RTC, RECs and emerging green-attribute markets.')
on conflict (key) do nothing;
