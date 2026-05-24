import { getSettings } from "@/lib/settings";

const SKILLS = [
  {
    num: "01",
    title: ["Energy", "Regulations"],
    desc: "CERC / SERC frameworks, Electricity Act provisions, regulatory filings and compliance advisory.",
    glyph: <path d="M4 18h16M4 14h16M4 10h16M4 6h16" />,
  },
  {
    num: "02",
    title: ["Power", "Markets"],
    desc: "Day-ahead, real-time and term-ahead markets across IEX & HPX. Bid strategy and clearing-price analytics.",
    glyph: (
      <>
        <path d="M3 17l5-6 4 4 8-10" />
        <path d="M14 5h7v7" />
      </>
    ),
  },
  {
    num: "03",
    title: ["Tariff Order", "& ARR"],
    desc: "Aggregate revenue requirement modelling, true-up petitions, and tariff design for distribution licensees.",
    glyph: (
      <>
        <path d="M5 4h14v16H5z" />
        <path d="M9 9h6M9 13h6M9 17h3" />
      </>
    ),
  },
  {
    num: "04",
    title: ["Carbon", "Markets"],
    desc: "India CCTS, voluntary carbon credits, baselines & MRV. Compliance pathways under PAT & beyond.",
    glyph: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M9 14c1 1.2 2 1.6 3 1.6s2-.4 3-1.6M8 10h.01M16 10h.01" />
      </>
    ),
  },
  {
    num: "05",
    title: ["CBG —", "Compressed Bio-Gas"],
    desc: "SATAT scheme, feedstock economics, off-take pricing and project finance for CBG developers.",
    glyph: <path d="M12 3c-3 4-5 7-5 10a5 5 0 0 0 10 0c0-3-2-6-5-10z" />,
  },
  {
    num: "06",
    title: ["Green H₂ &", "Power Derivatives"],
    desc: "National Green Hydrogen Mission, electrolyser bid design, and emerging electricity derivative contracts.",
    glyph: <path d="M5 12h4l2-7 4 14 2-7h2" />,
  },
];

export default async function Skills() {
  const s = await getSettings();
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
          {SKILLS.map((s) => (
            <article className="skill reveal" key={s.num}>
              <div>
                <span className="skill-num">{s.num}</span>
                <svg className="glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {s.glyph}
                </svg>
                <h3>
                  {s.title[0]}<br />{s.title[1]}
                </h3>
              </div>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
