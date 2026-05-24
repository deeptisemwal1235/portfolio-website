/**
 * One-off: upload the hero portrait to Supabase Storage and print its public URL.
 * Usage: npx tsx scripts/upload-headshot.ts <localPath>
 */
import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import { basename, extname } from "node:path";

async function main() {
  const local = process.argv[2];
  if (!local) {
    console.error("Usage: npx tsx scripts/upload-headshot.ts <localPath>");
    process.exit(1);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }

  const sb = createClient(url, key, { auth: { persistSession: false } });
  const bytes = await readFile(local);
  const ext = extname(local).toLowerCase().replace(".", "") || "jpg";
  const contentType = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";
  const objectPath = `hero/${basename(local)}`;

  const { error } = await sb.storage
    .from("portfolio-media")
    .upload(objectPath, bytes, { contentType, upsert: true, cacheControl: "31536000" });
  if (error) {
    console.error("Upload failed:", error.message);
    process.exit(1);
  }

  const { data } = sb.storage.from("portfolio-media").getPublicUrl(objectPath);
  console.log(data.publicUrl);
}

main();
