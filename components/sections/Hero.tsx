import Image from "next/image";
import { getSettings } from "@/lib/settings";

export default async function Hero() {
  const s = await getSettings();

  return (
    <header className="hero" id="top">
      <div className="container">
        <div className="hero-grid">
          <div>
            <span className="eyebrow reveal">{s.hero_eyebrow}</span>
            <h1 className="reveal" style={{ marginTop: 22 }}>
              Energy<br />
              Policy <em>&</em><br />
              Regulations<br />
              <em>Expert.</em>
            </h1>
            <div className="hero-meta reveal">
              {s.hero_pill_1 && <PillFromString text={s.hero_pill_1} />}
              {s.hero_pill_2 && <PillFromString text={s.hero_pill_2} />}
              {s.hero_pill_3 && <PillFromString text={s.hero_pill_3} />}
            </div>
          </div>
          <aside className="hero-aside reveal">
            <div className="hero-portrait" aria-label="Portrait of Deepti Semwal">
              <Image
                src={s.hero_image_url}
                alt="Deepti Semwal"
                fill
                priority
                sizes="(max-width: 640px) 320px, (max-width: 820px) 60vw, 420px"
              />
            </div>
            <p style={{ marginTop: 28 }}>{s.hero_bio}</p>
            <div className="hero-actions">
              {s.hero_cta_primary_label && (
                <a className="btn btn-primary" href={s.hero_cta_primary_href || "#projects"}>
                  {s.hero_cta_primary_label}
                </a>
              )}
              {s.hero_cta_secondary_label && (
                <a className="btn btn-ghost" href={s.hero_cta_secondary_href || "#contact"}>
                  {s.hero_cta_secondary_label}
                </a>
              )}
            </div>
          </aside>
        </div>
      </div>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>Tariff Orders <span className="sep"></span> ARR <span className="sep"></span> Power Markets <span className="sep"></span> Carbon Credits <span className="sep"></span> Green Hydrogen <span className="sep"></span> CBG <span className="sep"></span> Regulations <span className="sep"></span></span>
          <span>Tariff Orders <span className="sep"></span> ARR <span className="sep"></span> Power Markets <span className="sep"></span> Carbon Credits <span className="sep"></span> Green Hydrogen <span className="sep"></span> CBG <span className="sep"></span> Regulations <span className="sep"></span></span>
        </div>
      </div>
    </header>
  );
}

/**
 * "● Available for consultation" → pill with the leading bullet styled as
 * the existing .dot. Any pill that doesn't start with ● renders as plain text.
 */
function PillFromString({ text }: { text: string }) {
  if (text.startsWith("●")) {
    const rest = text.slice(1).trim();
    return (
      <span className="pill">
        <span className="dot"></span>
        {rest}
      </span>
    );
  }
  return <span className="pill">{text}</span>;
}
