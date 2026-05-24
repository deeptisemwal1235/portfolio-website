export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="container">
        <div className="hero-grid">
          <div>
            <span className="eyebrow reveal">Deepti Semwal · est. portfolio 2025</span>
            <h1 className="reveal" style={{ marginTop: 22 }}>
              Energy<br />
              Policy <em>&</em><br />
              Regulations<br />
              <em>Expert.</em>
            </h1>
            <div className="hero-meta reveal">
              <span className="pill"><span className="dot"></span>Available for consultation</span>
              <span className="pill">Masters · IIT Gandhinagar</span>
              <span className="pill">Noida, India</span>
            </div>
          </div>
          <aside className="hero-aside reveal">
            <div className="hero-portrait" aria-label="Portrait of Deepti Semwal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/headshot.png" alt="Deepti Semwal" />
            </div>
            <p style={{ marginTop: 28 }}>
              I help startups, regulators, and developers navigate India&apos;s energy transition — turning tariff orders, carbon markets, and power-sector rules into clear, executable strategy.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#projects">View work <span className="arr">↗</span></a>
              <a className="btn btn-ghost" href="#contact">Get in touch</a>
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
