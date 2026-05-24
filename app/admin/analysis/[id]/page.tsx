import { notFound } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import ContentEditor from "@/components/admin/ContentEditor";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { listAllTags } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const sb = createSupabaseServerClient();
  const [{ data }, knownTags] = await Promise.all([
    sb.from("posts").select("*").eq("id", params.id).maybeSingle(),
    listAllTags("posts"),
  ]);
  if (!data) notFound();

  return (
    <>
      <AdminNav />
      <main className="admin-main">
        <h1>Edit article</h1>
        <div className="subtitle">{data.title}</div>
        <ContentEditor
          mode="edit"
          kind="posts"
          knownTags={knownTags}
          initial={{
            id: data.id,
            title: data.title ?? "",
            slug: data.slug ?? "",
            excerpt: data.excerpt ?? "",
            content: data.content ?? "",
            cover_image_url: data.cover_image_url,
            category: data.category ?? "",
            tags: (data.tags ?? []).join(", "),
            read_time: data.read_time ?? "",
            published_at: data.published_at,
            published: !!data.published,
          }}
        />
      </main>
    </>
  );
}
