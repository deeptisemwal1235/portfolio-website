import Link from "next/link";
import { getPublishedProjects } from "@/lib/db";
import { PROJECT_THUMB_SVG, thumbClassFor } from "@/lib/svgMap";

export default async function Projects() {
  const projects = await getPublishedProjects();

  return (
    <section className="s projects" id="projects">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-num">§ 03 — Selected Work</span>
            <h2>Projects <em>&</em> research.</h2>
          </div>
          <p className="lede">
            Selected academic and consulting projects — from microgrid economics to MPPT control. Click any card for the full write-up.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((p, i) => {
            const thumbClass = thumbClassFor(p.slug, i);
            const svg = PROJECT_THUMB_SVG[p.slug];
            return (
              <Link className="project reveal" href={`/projects/${p.slug}`} key={p.slug}>
                <div className="project-thumb">
                  {p.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.cover_image_url}
                      alt={p.title}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
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
      </div>
    </section>
  );
}
