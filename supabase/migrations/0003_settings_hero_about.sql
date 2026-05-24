-- Expand site_settings with hero/contact/about keys. Idempotent — re-running
-- is a no-op (on conflict do nothing keeps any value you've already edited).
-- Run once in Supabase SQL editor.

insert into site_settings (key, value) values
  -- hero
  ('hero_eyebrow',              'Deepti Semwal · est. portfolio 2025'),
  ('hero_bio',                  'I help startups, regulators, and developers navigate India''s energy transition — turning tariff orders, carbon markets, and power-sector rules into clear, executable strategy.'),
  ('hero_pill_1',               '● Available for consultation'),
  ('hero_pill_2',               'Masters · IIT Gandhinagar'),
  ('hero_pill_3',               'Noida, India'),
  ('hero_cta_primary_label',    'View work ↗'),
  ('hero_cta_primary_href',     '#projects'),
  ('hero_cta_secondary_label',  'Get in touch'),
  ('hero_cta_secondary_href',   '#contact'),
  ('hero_image_url',            'https://brtymmjustqesyworyav.supabase.co/storage/v1/object/public/portfolio-media/hero/deepti-headshot.jpeg'),

  -- contact
  ('contact_email',             'deeptisemwal1235@gmail.com'),
  ('contact_location',          'Noida, India · IST'),
  ('contact_availability',      'Open to consultations & advisory roles'),
  ('contact_response_time',     'Within 48 hours'),

  -- about page (placeholder HTML; replace via /admin/settings → About)
  ('about_intro_html',          '<p>I''m Deepti Semwal — an energy policy and regulations specialist based in Noida, focused on India''s energy transition. I work with startups, regulators, and developers to make sense of tariff orders, carbon markets, and power-sector rules.</p><p>This page is the long version of my work. The short version lives on the <a href="/">home page</a>.</p>'),
  ('about_experience_html',     '<h2>Experience</h2><ul><li><strong>Independent Consultant — Energy Policy &amp; Regulations</strong> (2024 – present). Advisory engagements for energy startups and policy think-tanks across tariff design, CCTS, CBG, and green hydrogen.</li><li><strong>Research Assistant — IIT Gandhinagar</strong> (2022 – 2024). M.Tech research on distributed energy economics and market design.</li></ul><p><em>Edit this section in /admin/settings → About with your full LinkedIn experience.</em></p>'),
  ('about_education_html',      '<h2>Education</h2><ul><li><strong>M.Tech, Energy Policy &amp; Regulations</strong> — Indian Institute of Technology Gandhinagar (2022 – 2024)</li><li><strong>B.Tech</strong> — undergraduate degree (year). <em>Add details here.</em></li></ul>'),
  ('about_certifications_html', '<h2>Certifications &amp; affiliations</h2><ul><li><em>Add your certifications, training, or memberships here.</em></li></ul>'),
  ('about_skills_html',         '<h2>Core expertise</h2><ul><li>CERC / SERC regulations, tariff orders, ARR filings</li><li>India CCTS, voluntary carbon credits, PAT scheme</li><li>SATAT / CBG project economics</li><li>National Green Hydrogen Mission, SECI tender analysis</li><li>Power markets (DAM / TAM / RTM) and emerging derivatives</li><li>RE income projection, P90 revenue scenarios</li></ul>')
on conflict (key) do nothing;
