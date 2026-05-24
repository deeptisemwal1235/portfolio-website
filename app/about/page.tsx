import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getSettings } from "@/lib/settings";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About · Deepti Semwal",
  description:
    "Deepti Semwal — Energy Policy & Regulations Expert. Bio, experience, education, and certifications.",
};

export default async function AboutPage() {
  const s = await getSettings();
  return (
    <>
      <Navbar home={false} />

      <header className="about-hero">
        <div className="container">
          <div className="about-hero-grid">
            <div className="about-hero-text">
              <span className="eyebrow">§ About</span>
              <h1 className="display">
                Hi, I&apos;m<br /><em>Deepti.</em>
              </h1>
              <div
                className="about-intro prose-block"
                dangerouslySetInnerHTML={{ __html: s.about_intro_html }}
              />
            </div>
            <div className="about-hero-portrait">
              <Image
                src={s.hero_image_url}
                alt="Deepti Semwal"
                fill
                priority
                sizes="(max-width: 820px) 70vw, 360px"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="about-body">
        <div className="container">
          <Section html={s.about_experience_html} />
          <Section html={s.about_education_html} />
          <Section html={s.about_certifications_html} />
          <Section html={s.about_skills_html} />

          <div className="about-cta">
            <p className="lede">
              If any of this overlaps with what you&apos;re working on — regulation, market design,
              a financing model, a tariff strategy — I&apos;d like to hear about it.
            </p>
            <div className="hero-actions" style={{ marginTop: 20 }}>
              <a className="btn btn-primary" href="/#contact">Send a note ↗</a>
              <a className="btn btn-ghost" href="/#projects">See selected work</a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

function Section({ html }: { html: string }) {
  if (!html?.trim()) return null;
  return (
    <section
      className="about-section prose-block"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
