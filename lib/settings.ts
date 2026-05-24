import { createClient } from "@supabase/supabase-js";

/** Keys we recognise. Add new ones here and in /admin/settings. */
export const SETTING_KEYS = [
  "social_linkedin_url",
  "social_twitter_url",
  "social_github_url",
] as const;
export type SettingKey = (typeof SETTING_KEYS)[number];
export type Settings = Partial<Record<SettingKey, string>>;

function anon() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}

/** Fetched server-side. Safe at build time; uses anon + public RLS read. */
export async function getSettings(): Promise<Settings> {
  const { data, error } = await anon().from("site_settings").select("key, value");
  if (error) {
    console.error("[settings] read:", error.message);
    return {};
  }
  const out: Settings = {};
  (data ?? []).forEach((r) => {
    if (SETTING_KEYS.includes(r.key as SettingKey) && r.value) {
      out[r.key as SettingKey] = r.value;
    }
  });
  return out;
}
