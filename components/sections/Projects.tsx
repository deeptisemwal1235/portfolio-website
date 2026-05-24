import Link from "next/link";
import { PROJECTS } from "@/lib/content/projects";

export default function Projects() {
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
          {PROJECTS.map((p) => (
            <Link className="project reveal" href={`/projects/${p.slug}`} key={p.slug}>
              <div className="project-thumb">
                <div className={`scene ${p.thumb}`}>{p.svg}</div>
                <span className="year">{p.year}</span>
                <span className="scene-label">{p.sceneLabel}</span>
              </div>
              <div className="project-meta">
                <h3 className="project-title">{p.title}</h3>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
