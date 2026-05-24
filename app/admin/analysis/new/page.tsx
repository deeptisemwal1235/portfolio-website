import AdminNav from "@/components/admin/AdminNav";
import ContentEditor from "@/components/admin/ContentEditor";

export default function NewArticlePage() {
  return (
    <>
      <AdminNav />
      <main className="admin-main">
        <h1>New article</h1>
        <div className="subtitle">Create a blog / analysis post</div>
        <ContentEditor
          mode="create"
          kind="posts"
          initial={{
            title: "", slug: "", excerpt: "", content: "", cover_image_url: null,
            category: "", tags: "", read_time: "", published_at: null, published: false,
          }}
        />
      </main>
    </>
  );
}
