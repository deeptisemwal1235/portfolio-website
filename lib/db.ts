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
  // display_order first (nullsFirst:false so unranked rows fall to the bottom),
  // then year desc, then created_at desc as final tiebreakers.
  const { data, error } = await sb
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("display_order", { ascending: true, nullsFirst: false })
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
    .order("display_order", { ascending: true, nullsFirst: false })
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

/** Admin-only: fetch a project by slug regardless of published status. */
export async function getProjectBySlugForAdmin(slug: string): Promise<ProjectRow | null> {
  const sb = createSupabaseServerClient();
  const { data, error } = await sb.from("projects").select("*").eq("slug", slug).maybeSingle();
  if (error) { console.error("[db] getProjectBySlugForAdmin:", error.message); return null; }
  return data;
}

/** Admin-only: fetch a post by slug regardless of published status. */
export async function getPostBySlugForAdmin(slug: string): Promise<PostRow | null> {
  const sb = createSupabaseServerClient();
  const { data, error } = await sb.from("posts").select("*").eq("slug", slug).maybeSingle();
  if (error) { console.error("[db] getPostBySlugForAdmin:", error.message); return null; }
  return data;
}

/** Distinct tags used across every row of a table. For editor autocomplete. */
export async function listAllTags(table: "projects" | "posts"): Promise<string[]> {
  const sb = createSupabaseServerClient();
  const { data, error } = await sb.from(table).select("tags");
  if (error) {
    console.error("[db] listAllTags:", error.message);
    return [];
  }
  const set = new Set<string>();
  (data ?? []).forEach((r) => {
    const tags = (r as { tags: string[] | null }).tags;
    if (Array.isArray(tags)) tags.forEach((t) => t && set.add(t));
  });
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/**
 * Top N other posts ranked by shared tags then same category. Excludes the
 * current slug. Used for "related reading" widget on article pages.
 */
export async function getRelatedPosts(
  current: { slug: string; category: string | null; tags: string[] | null },
  limit = 3
): Promise<PostRow[]> {
  const all = await getPublishedPosts();
  const others = all.filter((p) => p.slug !== current.slug);
  const tags = new Set((current.tags ?? []).map((t) => t.toLowerCase()));
  const scored = others.map((p) => {
    const ptags = (p.tags ?? []).map((t) => t.toLowerCase());
    const tagOverlap = ptags.filter((t) => tags.has(t)).length;
    const catMatch = current.category && p.category === current.category ? 1 : 0;
    return { p, score: tagOverlap * 2 + catMatch };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.p);
}

export function formatPostDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
