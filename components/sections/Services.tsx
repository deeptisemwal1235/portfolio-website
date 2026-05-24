const SERVICES = [
  {
    num: "/01",
    title: ["Energy Regulations", "Consultation"],
    desc: "Decode tariff orders, CERC / SERC notifications, and PPA terms. Written opinions, redlines, and stakeholder briefings — turnaround in days, not weeks.",
  },
  {
    num: "/02",
    title: ["Strategy & New-Initiative", "Ideation"],
    desc: "For energy startups: market-entry strategy, regulatory moats, and pricing playbooks across power, carbon, hydrogen, and bio-gas.",
  },
  {
    num: "/03",
    title: ["Energy Consumption", "Analysis"],
    desc: "Load profiling, tariff arbitrage and demand-side optimisation for industrial and commercial consumers — quantified bill-savings before you sign.",
  },
  {
    num: "/04",
    title: ["Income Projection", "in Renewables"],
    desc: "Bankable revenue models for solar, wind and hybrid plants — capturing GTAM, RTC, RECs and emerging green-attribute markets.",
  },
];

export default function Services() {
  return (
    <section className="s" id="services">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-num">§ 02 — Engagement</span>
            <h2>How I <em>help.</em></h2>
          </div>
          <p className="lede">
            Four service tracks I run for clients — from one-off regulatory reads to month-long strategy retainers. Each engagement is scoped against your decision deadline, not the other way around.
          </p>
        </div>
        <div className="services-list">
          {SERVICES.map((s) => (
            <a className="service reveal" href="#contact" key={s.num}>
              <span className="service-num">{s.num}</span>
              <h3 className="service-title">
                {s.title[0]}<br />{s.title[1]}
              </h3>
              <p className="service-desc">{s.desc}</p>
              <span className="service-arr">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
