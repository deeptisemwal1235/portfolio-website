import { getSettings } from "@/lib/settings";

export default async function Services() {
  const s = await getSettings();
  const nums = [1, 2, 3, 4] as const;
  const rows = nums.map((n) => ({
    num: `/${String(n).padStart(2, "0")}`,
    title: s[`service_${n}_title`],
    desc: s[`service_${n}_desc`],
  }));

  return (
    <section className="s" id="services">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-num">{s.section_services_eyebrow}</span>
            <h2 dangerouslySetInnerHTML={{ __html: s.section_services_title_html }} />
          </div>
          <p className="lede">{s.section_services_lede}</p>
        </div>
        <div className="services-list">
          {rows.map((r) => (
            <a className="service reveal" href="#contact" key={r.num}>
              <span className="service-num">{r.num}</span>
              <h3 className="service-title">{r.title}</h3>
              <p className="service-desc">{r.desc}</p>
              <span className="service-arr">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
