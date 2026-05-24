import AdminNav from "@/components/admin/AdminNav";
import ContentEditor from "@/components/admin/ContentEditor";
import { listAllTags } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  const knownTags = await listAllTags("projects");
  return (
    <>
      <AdminNav />
      <main className="admin-main">
        <h1>New project</h1>
        <div className="subtitle">Create a project write-up</div>
        <ContentEditor
          mode="create"
          kind="projects"
          knownTags={knownTags}
          initial={{
            title: "", slug: "", excerpt: "", content: "", cover_image_url: null,
            category: "", tags: "", year: new Date().getFullYear(), read_time: "", published: false,
          }}
        />
      </main>
    </>
  );
}
