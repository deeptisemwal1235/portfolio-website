"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const BUCKET = "portfolio-media";

export async function uploadImageToStorage(file: File): Promise<string> {
  const sb = createSupabaseBrowserClient();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const key = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await sb.storage.from(BUCKET).upload(key, file, {
    cacheControl: "31536000",
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw new Error(error.message);
  const { data } = sb.storage.from(BUCKET).getPublicUrl(key);
  return data.publicUrl;
}
