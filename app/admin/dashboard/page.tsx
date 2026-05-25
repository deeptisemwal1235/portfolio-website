import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import DeleteRowButton from "@/components/admin/DeleteRowButton";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const sb = createSupabaseServerClient();

  const { data: projects } = await sb.from("projects").select("id, title, slug, year, published, updated_at").order("year", { ascending: false }).order("updated_at", { ascending: false });
  const { data: posts } = await sb.from("posts").select("id, title, slug, category, published_at, published, updated_at").order("published_at", { ascending: false, nullsFirst: false }).order("updated_at", { ascending: false });

  return (
    <>
      <AdminNav />
      <main className="admin-main">
        <h1>Dashboard</h1>
        <div className="subtitle">Manage portfolio content</div>

        <section className="admin-card">
          <div className="admin-card-head">
            <h2>Projects</h2>
            <div style={{ display: "flex", gap: 10 }}>
              <Link className="btn-link" href="/admin/projects/order">Reorder</Link>
              <Link className="btn-primary-cta" href="/admin/projects/new">+ New project</Link>
            </div>
          </div>
          {!projects || projects.length === 0 ? (
            <p>No projects yet.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr><th>Title</th><th>Year</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id}>
                    <td className="title">{p.title}</td>
                    <td>{p.year ?? "—"}</td>
                    <td><span className={`status-pill ${p.published ? "published" : "draft"}`}>{p.published ? "Published" : "Draft"}</span></td>
                    <td style={{ textAlign: "right" }}>
                      <a
                        className="btn-link"
                        href={p.published ? `/projects/${p.slug}` : `/admin/preview/projects/${p.slug}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {p.published ? "View" : "Preview"} ↗
                      </a>
                      <Link className="btn-link" href={`/admin/projects/${p.id}`}>Edit</Link>
                      <DeleteRowButton table="projects" id={p.id} label={p.title} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="admin-card">
          <div className="admin-card-head">
            <h2>Analysis</h2>
            <div style={{ display: "flex", gap: 10 }}>
              <Link className="btn-link" href="/admin/analysis/order">Reorder</Link>
              <Link className="btn-primary-cta" href="/admin/analysis/new">+ New article</Link>
            </div>
          </div>
          {!posts || posts.length === 0 ? (
            <p>No articles yet.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr><th>Title</th><th>Category</th><th>Date</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.id}>
                    <td className="title">{p.title}</td>
                    <td>{p.category ?? "—"}</td>
                    <td>{p.published_at ? new Date(p.published_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "—"}</td>
                    <td><span className={`status-pill ${p.published ? "published" : "draft"}`}>{p.published ? "Published" : "Draft"}</span></td>
                    <td style={{ textAlign: "right" }}>
                      <a
                        className="btn-link"
                        href={p.published ? `/analysis/${p.slug}` : `/admin/preview/analysis/${p.slug}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {p.published ? "View" : "Preview"} ↗
                      </a>
                      <Link className="btn-link" href={`/admin/analysis/${p.id}`}>Edit</Link>
                      <DeleteRowButton table="posts" id={p.id} label={p.title} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </>
  );
}
