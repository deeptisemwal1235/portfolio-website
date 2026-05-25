import { createClient } from "@supabase/supabase-js";

/**
 * Every key we recognise + its fallback. Footer / Hero / Contact / About all
 * read through getSettings(); if a row is missing the fallback ships, so the
 * page never breaks while the user is mid-edit (or before the migration runs).
 */
export const SETTING_DEFAULTS = {
  // ---- footer social ----
  social_linkedin_url: "https://www.linkedin.com/in/deeptisemwal1235",
  social_twitter_url: "https://x.com/deeptis736860",
  social_github_url: "",

  // ---- hero ----
  hero_eyebrow: "Deepti Semwal · est. portfolio 2025",
  hero_headline_html: "Energy<br>Policy <em>&</em><br>Regulations<br><em>Expert.</em>",
  hero_bio:
    "I help startups, regulators, and developers navigate India's energy transition — turning tariff orders, carbon markets, and power-sector rules into clear, executable strategy.",
  hero_pill_1: "● Available for consultation",
  hero_pill_2: "Masters · IIT Gandhinagar",
  hero_pill_3: "Noida, India",
  hero_cta_primary_label: "View work ↗",
  hero_cta_primary_href: "#projects",
  hero_cta_secondary_label: "Get in touch",
  hero_cta_secondary_href: "#contact",
  hero_image_url:
    "https://brtymmjustqesyworyav.supabase.co/storage/v1/object/public/portfolio-media/hero/deepti-headshot.jpeg",

  // ---- ticker (separator-delimited list) ----
  ticker_words: "Tariff Orders · ARR · Power Markets · Carbon Credits · Green Hydrogen · CBG · Regulations",

  // ---- section heads ----
  section_skills_eyebrow: "§ 01 — Capabilities",
  section_skills_title_html: "Areas of <em>expertise.</em>",
  section_skills_lede: "Six core domains where I work — drawn from coursework at IIT Gandhinagar and applied across consultations for startups, policy think-tanks and energy developers.",
  section_services_eyebrow: "§ 02 — Engagement",
  section_services_title_html: "How I <em>help.</em>",
  section_services_lede: "Four service tracks I run for clients — from one-off regulatory reads to month-long strategy retainers. Each engagement is scoped against your decision deadline, not the other way around.",
  section_projects_eyebrow: "§ 03 — Selected Work",
  section_projects_title_html: "Projects <em>&</em> research.",
  section_projects_lede: "Selected academic and consulting projects — from microgrid economics to MPPT control. Click any card for the full write-up.",
  section_analysis_eyebrow: "§ 04 — Writing",
  section_analysis_title_html: "My <em>analysis.</em>",
  section_analysis_lede: "Short reads on India's energy sector — tariff moves, market design, and what new policy notifications mean for the people actually building things.",
  section_contact_eyebrow: "§ 05 — Get in touch",
  section_contact_title_html: "Let's<br><em>collaborate.</em>",
  section_contact_lede: "Working on a regulatory filing, a market-entry brief, or just want a sanity-check on a tariff strategy? Send a note — I read every message.",

  // ---- skills (6 cards, glyph stays hardcoded by index) ----
  skill_1_title: "Energy Regulations",
  skill_1_desc: "CERC / SERC frameworks, Electricity Act provisions, regulatory filings and compliance advisory.",
  skill_2_title: "Power Markets",
  skill_2_desc: "Day-ahead, real-time and term-ahead markets across IEX & HPX. Bid strategy and clearing-price analytics.",
  skill_3_title: "Tariff Order & ARR",
  skill_3_desc: "Aggregate revenue requirement modelling, true-up petitions, and tariff design for distribution licensees.",
  skill_4_title: "Carbon Markets",
  skill_4_desc: "India CCTS, voluntary carbon credits, baselines & MRV. Compliance pathways under PAT & beyond.",
  skill_5_title: "CBG — Compressed Bio-Gas",
  skill_5_desc: "SATAT scheme, feedstock economics, off-take pricing and project finance for CBG developers.",
  skill_6_title: "Green H₂ & Power Derivatives",
  skill_6_desc: "National Green Hydrogen Mission, electrolyser bid design, and emerging electricity derivative contracts.",

  // ---- services (4 rows) ----
  service_1_title: "Energy Regulations Consultation",
  service_1_desc: "Decode tariff orders, CERC / SERC notifications, and PPA terms. Written opinions, redlines, and stakeholder briefings — turnaround in days, not weeks.",
  service_2_title: "Strategy & New-Initiative Ideation",
  service_2_desc: "For energy startups: market-entry strategy, regulatory moats, and pricing playbooks across power, carbon, hydrogen, and bio-gas.",
  service_3_title: "Energy Consumption Analysis",
  service_3_desc: "Load profiling, tariff arbitrage and demand-side optimisation for industrial and commercial consumers — quantified bill-savings before you sign.",
  service_4_title: "Income Projection in Renewables",
  service_4_desc: "Bankable revenue models for solar, wind and hybrid plants — capturing GTAM, RTC, RECs and emerging green-attribute markets.",

  // ---- contact ----
  contact_email: "deeptisemwal1235@gmail.com",
  contact_location: "Noida, India · IST",
  contact_availability: "Open to consultations & advisory roles",
  contact_response_time: "Within 48 hours",

  // ---- about page (HTML from Tiptap) ----
  about_intro_html:
    "<p>I'm Deepti Semwal — an energy policy and regulations specialist based in Noida, focused on India's energy transition. I work with startups, regulators, and developers to make sense of tariff orders, carbon markets, and power-sector rules.</p><p>This page is the long version of my work. The short version lives on the <a href=\"/\">home page</a>.</p>",
  about_experience_html:
    "<h2>Experience</h2><ul><li><strong>Independent Consultant — Energy Policy &amp; Regulations</strong> (2024 – present). Advisory engagements for energy startups and policy think-tanks across tariff design, CCTS, CBG, and green hydrogen.</li><li><strong>Research Assistant — IIT Gandhinagar</strong> (2022 – 2024). M.Tech research on distributed energy economics and market design.</li></ul><p><em>Edit this section in /admin/settings → About with your full LinkedIn experience.</em></p>",
  about_education_html:
    "<h2>Education</h2><ul><li><strong>M.Tech, Energy Policy &amp; Regulations</strong> — Indian Institute of Technology Gandhinagar (2022 – 2024)</li><li><strong>B.Tech</strong> — undergraduate degree (year). <em>Add details here.</em></li></ul>",
  about_certifications_html:
    "<h2>Certifications &amp; affiliations</h2><ul><li><em>Add your certifications, training, or memberships here.</em></li></ul>",
  about_skills_html:
    "<h2>Core expertise</h2><ul><li>CERC / SERC regulations, tariff orders, ARR filings</li><li>India CCTS, voluntary carbon credits, PAT scheme</li><li>SATAT / CBG project economics</li><li>National Green Hydrogen Mission, SECI tender analysis</li><li>Power markets (DAM / TAM / RTM) and emerging derivatives</li><li>RE income projection, P90 revenue scenarios</li></ul>",

  // ---- FAQ (about page + FAQPage JSON-LD) ----
  faq_1_q: "What does Deepti consult on?",
  faq_1_a: "Energy regulations (CERC / SERC), tariff orders and ARR filings, power-market strategy (DAM / TAM / RTM), carbon markets (India CCTS, voluntary credits), CBG project economics, and Green Hydrogen tender analysis.",
  faq_2_q: "Where is she based?",
  faq_2_a: "Noida, India — and works with clients across India and overseas. Remote engagements are the default; on-site visits available for retainer clients.",
  faq_3_q: "What does a typical engagement look like?",
  faq_3_a: "Anything from a one-off written opinion on a tariff order (turnaround in days) to a month-long retainer covering market-entry strategy, regulatory moats, and pricing playbooks for an energy startup.",
  faq_4_q: "Who does she work with?",
  faq_4_a: "Energy startups, regulators, project developers, policy think-tanks, and investors evaluating India's power, carbon, hydrogen, and bio-gas sectors.",
  faq_5_q: "How do we start?",
  faq_5_a: "Send a short note via the contact form describing your project, timeline, and what you'd like to discuss. Replies usually go out within 48 hours.",
} as const;

export type SettingKey = keyof typeof SETTING_DEFAULTS;
export const SETTING_KEYS = Object.keys(SETTING_DEFAULTS) as SettingKey[];
export type Settings = Record<SettingKey, string>;

function anon() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}

/**
 * Fetched server-side. Safe at build time; uses anon + public RLS read.
 * Always returns every key — missing rows fall back to SETTING_DEFAULTS so
 * components don't need null checks for the common case.
 */
export async function getSettings(): Promise<Settings> {
  const out: Settings = { ...SETTING_DEFAULTS };
  const { data, error } = await anon().from("site_settings").select("key, value");
  if (error) {
    console.error("[settings] read:", error.message);
    return out;
  }
  (data ?? []).forEach((r) => {
    if ((SETTING_KEYS as readonly string[]).includes(r.key) && r.value) {
      out[r.key as SettingKey] = r.value;
    }
  });
  return out;
}
