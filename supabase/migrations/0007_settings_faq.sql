-- FAQ block on /about — 5 Q&A pairs, also feeds FAQPage JSON-LD.
-- Defaults match lib/settings.ts SETTING_DEFAULTS. Falls back to defaults
-- in code if rows are missing, so this migration is optional.

insert into site_settings (key, value) values
  ('faq_1_q', 'What does Deepti consult on?'),
  ('faq_1_a', 'Energy regulations (CERC / SERC), tariff orders and ARR filings, power-market strategy (DAM / TAM / RTM), carbon markets (India CCTS, voluntary credits), CBG project economics, and Green Hydrogen tender analysis.'),
  ('faq_2_q', 'Where is she based?'),
  ('faq_2_a', 'Noida, India — and works with clients across India and overseas. Remote engagements are the default; on-site visits available for retainer clients.'),
  ('faq_3_q', 'What does a typical engagement look like?'),
  ('faq_3_a', 'Anything from a one-off written opinion on a tariff order (turnaround in days) to a month-long retainer covering market-entry strategy, regulatory moats, and pricing playbooks for an energy startup.'),
  ('faq_4_q', 'Who does she work with?'),
  ('faq_4_a', 'Energy startups, regulators, project developers, policy think-tanks, and investors evaluating India''s power, carbon, hydrogen, and bio-gas sectors.'),
  ('faq_5_q', 'How do we start?'),
  ('faq_5_a', 'Send a short note via the contact form describing your project, timeline, and what you''d like to discuss. Replies usually go out within 48 hours.')
on conflict (key) do nothing;
