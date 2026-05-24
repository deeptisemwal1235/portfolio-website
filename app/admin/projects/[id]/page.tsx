import { notFound } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import ContentEditor from "@/components/admin/ContentEditor";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const sb = createSupabaseServerClient();
  const { data } = await sb.from("projects").select("*").eq("id", params.id).maybeSingle();
  if (!data) notFound();

  return (
    <>
      <AdminNav />
      <main className="admin-main">
        <h1>Edit project</h1>
        <div className="subtitle">{data.title}</div>
        <ContentEditor
          mode="edit"
          kind="projects"
          initial={{
            id: data.id,
            title: data.title ?? "",
            slug: data.slug ?? "",
            excerpt: data.excerpt ?? "",
            content: data.content ?? "",
            cover_image_url: data.cover_image_url,
            category: data.category ?? "",
            tags: (data.tags ?? []).join(", "),
            year: data.year,
            read_time: data.read_time ?? "",
            published: !!data.published,
          }}
        />
      </main>
    </>
  );
}
