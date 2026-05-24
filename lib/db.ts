import { createClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ProjectRow, PostRow } from "@/lib/types";

/**
 * Anonymous client safe to call at build time (generateStaticParams) —
 * does not touch cookies. Only reads published data through RLS.
 */
function anonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}

export async function listPublishedProjectSlugs(): Promise<string[]> {
  const { data, error } = await anonClient().from("projects").select("slug").eq("published", true);
  if (error) { console.error("[db] listPublishedProjectSlugs:", error.message); return []; }
  return (data ?? []).map((r) => r.slug);
}

export async function listPublishedPostSlugs(): Promise<string[]> {
  const { data, error } = await anonClient().from("posts").select("slug").eq("published", true);
  if (error) { console.error("[db] listPublishedPostSlugs:", error.message); return []; }
  return (data ?? []).map((r) => r.slug);
}

/** For sitemap. Anon client + RLS so it works at build time without cookies. */
export async function listPublishedProjectsForSitemap(): Promise<{ slug: string; updated_at: string | null }[]> {
  const { data, error } = await anonClient()
    .from("projects")
    .select("slug, updated_at")
    .eq("published", true);
  if (error) { console.error("[db] listPublishedProjectsForSitemap:", error.message); return []; }
  return data ?? [];
}

export async function listPublishedPostsForSitemap(): Promise<{ slug: string; updated_at: string | null }[]> {
  const { data, error } = await anonClient()
    .from("posts")
    .select("slug, updated_at")
    .eq("published", true);
  if (error) { console.error("[db] listPublishedPostsForSitemap:", error.message); return []; }
  return data ?? [];
}

export async function getPublishedProjects(): Promise<ProjectRow[]> {
  const sb = createSupabaseServerClient();
  const { data, error } = await sb
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("year", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[db] getPublishedProjects:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getProjectBySlug(slug: string): Promise<ProjectRow | null> {
  const sb = createSupabaseServerClient();
  const { data, error } = await sb
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) {
    console.error("[db] getProjectBySlug:", error.message);
    return null;
  }
  return data;
}

export async function getPublishedPosts(): Promise<PostRow[]> {
  const sb = createSupabaseServerClient();
  const { data, error } = await sb
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[db] getPublishedPosts:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getPostBySlug(slug: string): Promise<PostRow | null> {
  const sb = createSupabaseServerClient();
  const { data, error } = await sb
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) {
    console.error("[db] getPostBySlug:", error.message);
    return null;
  }
  return data;
}

export function formatPostDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
