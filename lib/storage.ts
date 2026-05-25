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

/**
 * List images already in the bucket so admins can pick a previously-uploaded
 * file instead of re-uploading. Returns newest first (up to 100).
 */
export async function listBucketImages(): Promise<{ name: string; url: string; createdAt: string | null }[]> {
  const sb = createSupabaseBrowserClient();
  const { data, error } = await sb.storage.from(BUCKET).list("", {
    limit: 100,
    sortBy: { column: "created_at", order: "desc" },
  });
  if (error) throw new Error(error.message);
  return (data ?? [])
    .filter((f) => f.name && !f.name.endsWith("/") && /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(f.name))
    .map((f) => ({
      name: f.name,
      url: sb.storage.from(BUCKET).getPublicUrl(f.name).data.publicUrl,
      createdAt: f.created_at ?? null,
    }));
}
