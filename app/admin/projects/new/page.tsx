import AdminNav from "@/components/admin/AdminNav";
import ContentEditor from "@/components/admin/ContentEditor";

export default function NewProjectPage() {
  return (
    <>
      <AdminNav />
      <main className="admin-main">
        <h1>New project</h1>
        <div className="subtitle">Create a project write-up</div>
        <ContentEditor
          mode="create"
          kind="projects"
          initial={{
            title: "", slug: "", excerpt: "", content: "", cover_image_url: null,
            category: "", tags: "", year: new Date().getFullYear(), read_time: "", published: false,
          }}
        />
      </main>
    </>
  );
}
