/**
 * One-shot seed: inserts the 3 projects + 6 posts from the prototype
 * into Supabase. Idempotent — uses upsert on (slug).
 *
 * Run once after creating the schema:
 *   npx tsx scripts/seed.ts
 *
 * Reads NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY from .env.local
 */

import { createClient } from "@supabase/supabase-js";
import * as fs from "node:fs";
import * as path from "node:path";
import { PROJECTS } from "../lib/content/projects";
import { POSTS } from "../lib/content/posts";

function loadEnv() {
  const file = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const sb = createClient(url, key, { auth: { persistSession: false } });

async function main() {
  for (const p of PROJECTS) {
    const row = {
      slug: p.slug,
      title: p.title,
      excerpt: p.standfirst,
      content: p.contentHtml.trim(),
      cover_image_url: null,
      year: p.year,
      category: p.meta.cat,
      tags: p.tags,
      read_time: p.meta.readTime,
      published: true,
    };
    const { error } = await sb.from("projects").upsert(row, { onConflict: "slug" });
    if (error) { console.error("projects", p.slug, error.message); process.exit(1); }
    console.log("✓ project", p.slug);
  }

  for (const p of POSTS) {
    const row = {
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.contentHtml.trim(),
      cover_image_url: null,
      category: p.category,
      tags: null,
      read_time: `${p.readTime} read`,
      published_at: new Date(`${p.date} 01`).toISOString(),
      published: true,
    };
    const { error } = await sb.from("posts").upsert(row, { onConflict: "slug" });
    if (error) { console.error("posts", p.slug, error.message); process.exit(1); }
    console.log("✓ post", p.slug);
  }

  console.log("Seed complete.");
}

main();
