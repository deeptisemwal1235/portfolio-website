-- Testimonials section between Services and Projects on home.
-- 3 quote slots; the section auto-hides if all are blank.
-- Defaults match lib/settings.ts SETTING_DEFAULTS — re-running is a no-op.

insert into site_settings (key, value) values
  ('section_testimonials_eyebrow', '§ — Trust'),
  ('section_testimonials_title_html', 'What clients <em>say.</em>'),
  ('testimonial_1_text', ''),
  ('testimonial_1_author', ''),
  ('testimonial_1_role', ''),
  ('testimonial_2_text', ''),
  ('testimonial_2_author', ''),
  ('testimonial_2_role', ''),
  ('testimonial_3_text', ''),
  ('testimonial_3_author', ''),
  ('testimonial_3_role', '')
on conflict (key) do nothing;
