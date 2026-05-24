import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <section className="s contact" id="contact">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-num">§ 05 — Get in touch</span>
            <h2>Let&apos;s<br /><em>collaborate.</em></h2>
          </div>
          <p className="lede">
            Working on a regulatory filing, a market-entry brief, or just want a sanity-check on a tariff strategy? Send a note — I read every message.
          </p>
        </div>

        <div className="contact-grid">
          <aside className="contact-info">
            <div className="info-row">
              <span className="label">Email</span>
              <span className="value"><a href="mailto:deeptisemwal1235@gmail.com">deeptisemwal1235@gmail.com</a></span>
            </div>
            <div className="info-row">
              <span className="label">Based in</span>
              <span className="value">Noida, India · IST</span>
            </div>
            <div className="info-row">
              <span className="label">Availability</span>
              <span className="value">Open to consultations &amp; advisory roles</span>
            </div>
            <div className="info-row">
              <span className="label">Response time</span>
              <span className="value">Within 48 hours</span>
            </div>
          </aside>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
