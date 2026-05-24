import AdminNav from "@/components/admin/AdminNav";
import ContentEditor from "@/components/admin/ContentEditor";
import { listAllTags } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function NewArticlePage() {
  const knownTags = await listAllTags("posts");
  return (
    <>
      <AdminNav />
      <main className="admin-main">
        <h1>New article</h1>
        <div className="subtitle">Create a blog / analysis post</div>
        <ContentEditor
          mode="create"
          kind="posts"
          knownTags={knownTags}
          initial={{
            title: "", slug: "", excerpt: "", content: "", cover_image_url: null,
            category: "", tags: "", read_time: "", published_at: null, published: false,
          }}
        />
      </main>
    </>
  );
}
