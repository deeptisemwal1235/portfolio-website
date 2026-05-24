import { getSettings } from "@/lib/settings";

const GLYPHS = [
  <path key="g1" d="M4 18h16M4 14h16M4 10h16M4 6h16" />,
  <>
    <path key="g2a" d="M3 17l5-6 4 4 8-10" />
    <path key="g2b" d="M14 5h7v7" />
  </>,
  <>
    <path key="g3a" d="M5 4h14v16H5z" />
    <path key="g3b" d="M9 9h6M9 13h6M9 17h3" />
  </>,
  <>
    <circle key="g4a" cx="12" cy="12" r="8" />
    <path key="g4b" d="M9 14c1 1.2 2 1.6 3 1.6s2-.4 3-1.6M8 10h.01M16 10h.01" />
  </>,
  <path key="g5" d="M12 3c-3 4-5 7-5 10a5 5 0 0 0 10 0c0-3-2-6-5-10z" />,
  <path key="g6" d="M5 12h4l2-7 4 14 2-7h2" />,
];

export default async function Skills() {
  const s = await getSettings();
  const nums = [1, 2, 3, 4, 5, 6] as const;
  const cards = nums.map((n) => ({
    num: String(n).padStart(2, "0"),
    title: s[`skill_${n}_title`],
    desc: s[`skill_${n}_desc`],
    glyph: GLYPHS[n - 1],
  }));

  return (
    <section className="s skills" id="skills">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-num">{s.section_skills_eyebrow}</span>
            <h2 dangerouslySetInnerHTML={{ __html: s.section_skills_title_html }} />
          </div>
          <p className="lede">{s.section_skills_lede}</p>
        </div>

        <div className="skills-grid">
          {cards.map((c) => (
            <article className="skill reveal" key={c.num}>
              <div>
                <span className="skill-num">{c.num}</span>
                <svg className="glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {c.glyph}
                </svg>
                <h3>{c.title}</h3>
              </div>
              <p>{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
