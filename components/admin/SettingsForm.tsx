"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { SETTING_KEYS, type Settings } from "@/lib/settings";

const LABELS: Record<(typeof SETTING_KEYS)[number], { label: string; placeholder: string }> = {
  social_linkedin_url: { label: "LinkedIn URL", placeholder: "https://www.linkedin.com/in/…" },
  social_twitter_url: { label: "X / Twitter URL", placeholder: "https://x.com/…" },
  social_github_url: { label: "GitHub URL", placeholder: "https://github.com/…" },
};

export default function SettingsForm({ initial }: { initial: Settings }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [form, setForm] = useState<Settings>(initial);

  function update(key: (typeof SETTING_KEYS)[number], value: string) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  async function save() {
    start(async () => {
      const sb = createSupabaseBrowserClient();
      const rows = SETTING_KEYS.map((k) => ({ key: k, value: (form[k] ?? "").trim() }));
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
    <div className="admin-form">
      {SETTING_KEYS.map((k) => (
        <div key={k}>
          <label>{LABELS[k].label}</label>
          <input
            type="url"
            value={form[k] ?? ""}
            onChange={(e) => update(k, e.target.value)}
            placeholder={LABELS[k].placeholder}
          />
        </div>
      ))}
      <div className="actions">
        <button type="button" className="btn-primary-cta" onClick={save} disabled={pending}>
          {pending ? "Saving…" : "Save settings"}
        </button>
      </div>
    </div>
  );
}
