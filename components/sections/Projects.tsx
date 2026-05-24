import Link from "next/link";
import Image from "next/image";
import { getPublishedProjects } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { PROJECT_THUMB_SVG, thumbClassFor } from "@/lib/svgMap";

export default async function Projects() {
  const [all, s] = await Promise.all([getPublishedProjects(), getSettings()]);
  const projects = all.slice(0, 3);
  const hasMore = all.length > 3;

  return (
    <section className="s projects" id="projects">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-num">{s.section_projects_eyebrow}</span>
            <h2 dangerouslySetInnerHTML={{ __html: s.section_projects_title_html }} />
          </div>
          <p className="lede">{s.section_projects_lede}</p>
        </div>

        <div className="project-grid">
          {projects.map((p, i) => {
            const thumbClass = thumbClassFor(p.slug, i);
            const svg = PROJECT_THUMB_SVG[p.slug];
            return (
              <Link className="project reveal" href={`/projects/${p.slug}`} key={p.slug}>
                <div className="project-thumb">
                  {p.cover_image_url ? (
                    <Image
                      src={p.cover_image_url}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div className={`scene ${thumbClass}`}>{svg}</div>
                  )}
                  {p.year !== null && <span className="year">{p.year}</span>}
                  {!p.cover_image_url && (
                    <span className="scene-label">[ project cover ]</span>
                  )}
                </div>
                <div className="project-meta">
                  <h3 className="project-title">{p.title}</h3>
                  {p.tags && p.tags.length > 0 && (
                    <div className="project-tags">
                      {p.tags.map((t) => <span key={t}>{t}</span>)}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
        {hasMore && (
          <div style={{ marginTop: 36, textAlign: "right" }}>
            <Link className="btn btn-ghost" href="/projects">See all projects ↗</Link>
          </div>
        )}
      </div>
    </section>
  );
}
