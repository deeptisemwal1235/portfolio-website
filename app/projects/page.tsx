import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getPublishedProjects } from "@/lib/db";
import { PROJECT_THUMB_SVG, thumbClassFor } from "@/lib/svgMap";
import { SITE_URL } from "@/lib/jsonLd";

export const revalidate = 60;

const PROJECTS_URL = `${SITE_URL}/projects`;

export const metadata: Metadata = {
  title: "Projects · Deepti Semwal",
  description: "Selected academic and consulting projects across wind, storage, solar, and grid economics.",
  alternates: {
    canonical: PROJECTS_URL,
    languages: { "en-IN": PROJECTS_URL, "x-default": PROJECTS_URL },
  },
};

export default async function ProjectsIndex() {
  const projects = await getPublishedProjects();
  return (
    <>
      <Navbar home={false} />
      <header className="index-hero">
        <div className="container">
          <span className="eyebrow">§ All projects</span>
          <h1 className="display">
            Projects <em>&</em> research.
          </h1>
          <p className="lede">
            Selected academic and consulting projects — from microgrid economics to MPPT control.
            Each card opens the full write-up.
          </p>
        </div>
      </header>

      <section className="s">
        <div className="container">
          {projects.length === 0 ? (
            <p className="lede">No projects published yet.</p>
          ) : (
            <div className="project-grid">
              {projects.map((p, i) => {
                const thumbClass = thumbClassFor(p.slug, i);
                const svg = PROJECT_THUMB_SVG[p.slug];
                return (
                  <Link className="project" href={`/projects/${p.slug}`} key={p.slug}>
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
                      {!p.cover_image_url && <span className="scene-label">[ project cover ]</span>}
                    </div>
                    <div className="project-meta">
                      <h3 className="project-title">{p.title}</h3>
                      {p.tags && p.tags.length > 0 && (
                        <div className="project-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
