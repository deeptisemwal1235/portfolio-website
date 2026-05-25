"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { SETTING_KEYS, type Settings, type SettingKey } from "@/lib/settings";
import RichTextEditor from "./RichTextEditor";
import ImageUpload from "./ImageUpload";
import { sanitizeHtml } from "@/lib/sanitize";

type FieldType = "text" | "url" | "textarea" | "html";

type Field = {
  key: SettingKey;
  label: string;
  help?: string;
  type: FieldType;
  placeholder?: string;
};

type Tab = { id: string; label: string; fields: Field[] };

const TABS: Tab[] = [
  {
    id: "hero",
    label: "Hero",
    fields: [
      { key: "hero_eyebrow", label: "Hero eyebrow", type: "text" },
      { key: "hero_headline_html", label: "Hero headline (HTML)", help: "Use <em>…</em> for italic accent and <br> for line breaks.", type: "textarea" },
      { key: "hero_bio", label: "Hero bio paragraph", type: "textarea" },
      { key: "hero_pill_1", label: "Hero pill 1", help: "Lead with ● for the green dot.", type: "text" },
      { key: "hero_pill_2", label: "Hero pill 2", type: "text" },
      { key: "hero_pill_3", label: "Hero pill 3", type: "text" },
      { key: "hero_cta_primary_label", label: "Primary CTA label", type: "text" },
      { key: "hero_cta_primary_href", label: "Primary CTA link", type: "text", placeholder: "#projects or /path" },
      { key: "hero_cta_secondary_label", label: "Secondary CTA label", type: "text" },
      { key: "hero_cta_secondary_href", label: "Secondary CTA link", type: "text" },
      { key: "ticker_words", label: "Ticker words", help: "Separated by ' · ' or ','", type: "textarea" },
    ],
  },
  {
    id: "skills",
    label: "Skills (6)",
    fields: [1, 2, 3, 4, 5, 6].flatMap((n) => [
      { key: `skill_${n}_title` as SettingKey, label: `Skill ${n} — title`, type: "text" as const },
      { key: `skill_${n}_desc` as SettingKey, label: `Skill ${n} — description`, type: "textarea" as const },
    ]),
  },
  {
    id: "services",
    label: "Services (4)",
    fields: [1, 2, 3, 4].flatMap((n) => [
      { key: `service_${n}_title` as SettingKey, label: `Service ${n} — title`, type: "text" as const },
      { key: `service_${n}_desc` as SettingKey, label: `Service ${n} — description`, type: "textarea" as const },
    ]),
  },
  {
    id: "sections",
    label: "Section heads",
    fields: [
      { key: "section_skills_eyebrow", label: "Skills eyebrow", type: "text" },
      { key: "section_skills_title_html", label: "Skills title (HTML)", type: "text" },
      { key: "section_skills_lede", label: "Skills lede", type: "textarea" },
      { key: "section_services_eyebrow", label: "Services eyebrow", type: "text" },
      { key: "section_services_title_html", label: "Services title (HTML)", type: "text" },
      { key: "section_services_lede", label: "Services lede", type: "textarea" },
      { key: "section_projects_eyebrow", label: "Projects eyebrow", type: "text" },
      { key: "section_projects_title_html", label: "Projects title (HTML)", type: "text" },
      { key: "section_projects_lede", label: "Projects lede", type: "textarea" },
      { key: "section_analysis_eyebrow", label: "Analysis eyebrow", type: "text" },
      { key: "section_analysis_title_html", label: "Analysis title (HTML)", type: "text" },
      { key: "section_analysis_lede", label: "Analysis lede", type: "textarea" },
      { key: "section_contact_eyebrow", label: "Contact eyebrow", type: "text" },
      { key: "section_contact_title_html", label: "Contact title (HTML)", type: "text" },
      { key: "section_contact_lede", label: "Contact lede", type: "textarea" },
    ],
  },
  {
    id: "hero-image",
    label: "Hero image",
    fields: [
      { key: "hero_image_url", label: "Hero portrait", help: "Upload a new image or paste any public URL.", type: "url" },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    fields: [
      { key: "contact_email", label: "Email", type: "text" },
      { key: "contact_location", label: "Based in", type: "text" },
      { key: "contact_availability", label: "Availability", type: "text" },
      { key: "contact_response_time", label: "Response time", type: "text" },
    ],
  },
  {
    id: "about",
    label: "About page",
    fields: [
      { key: "about_intro_html", label: "Intro", help: "First paragraph(s) on the About page.", type: "html" },
      { key: "about_experience_html", label: "Experience", type: "html" },
      { key: "about_education_html", label: "Education", type: "html" },
      { key: "about_certifications_html", label: "Certifications & affiliations", type: "html" },
      { key: "about_skills_html", label: "Core expertise", type: "html" },
    ],
  },
  {
    id: "testimonials",
    label: "Testimonials",
    fields: [
      { key: "section_testimonials_eyebrow", label: "Section eyebrow", type: "text" },
      { key: "section_testimonials_title_html", label: "Section title (HTML)", type: "text" },
      { key: "testimonial_1_text", label: "Quote 1 — text", help: "Leave blank to hide this slot.", type: "textarea" },
      { key: "testimonial_1_author", label: "Quote 1 — author", type: "text" },
      { key: "testimonial_1_role", label: "Quote 1 — role / company", type: "text" },
      { key: "testimonial_2_text", label: "Quote 2 — text", type: "textarea" },
      { key: "testimonial_2_author", label: "Quote 2 — author", type: "text" },
      { key: "testimonial_2_role", label: "Quote 2 — role / company", type: "text" },
      { key: "testimonial_3_text", label: "Quote 3 — text", type: "textarea" },
      { key: "testimonial_3_author", label: "Quote 3 — author", type: "text" },
      { key: "testimonial_3_role", label: "Quote 3 — role / company", type: "text" },
    ],
  },
  {
    id: "faq",
    label: "FAQ",
    fields: [
      { key: "faq_1_q", label: "Q1 — question", type: "text" },
      { key: "faq_1_a", label: "Q1 — answer", type: "textarea" },
      { key: "faq_2_q", label: "Q2 — question", type: "text" },
      { key: "faq_2_a", label: "Q2 — answer", type: "textarea" },
      { key: "faq_3_q", label: "Q3 — question", type: "text" },
      { key: "faq_3_a", label: "Q3 — answer", type: "textarea" },
      { key: "faq_4_q", label: "Q4 — question", type: "text" },
      { key: "faq_4_a", label: "Q4 — answer", type: "textarea" },
      { key: "faq_5_q", label: "Q5 — question", type: "text" },
      { key: "faq_5_a", label: "Q5 — answer", type: "textarea" },
    ],
  },
  {
    id: "social",
    label: "Social",
    fields: [
      { key: "social_linkedin_url", label: "LinkedIn URL", type: "url", placeholder: "https://www.linkedin.com/in/…" },
      { key: "social_twitter_url", label: "X / Twitter URL", type: "url", placeholder: "https://x.com/…" },
      { key: "social_github_url", label: "GitHub URL", type: "url", placeholder: "https://github.com/…" },
    ],
  },
];

export default function SettingsForm({ initial }: { initial: Settings }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [form, setForm] = useState<Settings>(initial);
  const [activeTab, setActiveTab] = useState(TABS[0]!.id);

  const tab = useMemo(() => TABS.find((t) => t.id === activeTab) ?? TABS[0]!, [activeTab]);

  function update(key: SettingKey, value: string) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  async function save() {
    start(async () => {
      const sb = createSupabaseBrowserClient();
      // Save every key — small payload, simplest to reason about.
      const rows = SETTING_KEYS.map((k) => {
        let value = (form[k] ?? "").toString();
        // Sanitize any HTML-bearing key before persistence.
        if (k.endsWith("_html")) value = sanitizeHtml(value);
        return { key: k, value };
      });
      const { error } = await sb.from("site_settings").upsert(rows, { onConflict: "key" });
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Settings saved");
      router.refresh();
    });
  }

  return (
    <div>
      <div className="settings-tabs" role="tablist" aria-label="Settings sections">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === activeTab}
            className={`settings-tab${t.id === activeTab ? " active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="admin-form" style={{ marginTop: 24 }}>
        {tab.fields.map((f) => (
          <FieldRow key={f.key} field={f} value={form[f.key] ?? ""} onChange={(v) => update(f.key, v)} />
        ))}
      </div>

      <div className="actions" style={{ marginTop: 20 }}>
        <button type="button" className="btn-primary-cta" onClick={save} disabled={pending}>
          {pending ? "Saving…" : "Save all settings"}
        </button>
      </div>
    </div>
  );
}

function FieldRow({ field, value, onChange }: { field: Field; value: string; onChange: (v: string) => void }) {
  if (field.key === "hero_image_url") {
    return (
      <div>
        <label>{field.label}</label>
        {field.help && <p className="field-help">{field.help}</p>}
        <ImageUpload value={value} onChange={(url) => onChange(url ?? "")} />
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="…or paste any public image URL"
          style={{ marginTop: 8 }}
        />
      </div>
    );
  }
  if (field.type === "html") {
    return (
      <div>
        <label>{field.label}</label>
        {field.help && <p className="field-help">{field.help}</p>}
        <RichTextEditor value={value} onChange={onChange} placeholder={field.placeholder} />
      </div>
    );
  }
  if (field.type === "textarea") {
    return (
      <div>
        <label>{field.label}</label>
        {field.help && <p className="field-help">{field.help}</p>}
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />
      </div>
    );
  }
  return (
    <div>
      <label>{field.label}</label>
      {field.help && <p className="field-help">{field.help}</p>}
      <input
        type={field.type === "url" ? "url" : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
      />
    </div>
  );
}
