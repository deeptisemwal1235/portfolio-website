import ContactForm from "@/components/ContactForm";
import { getSettings } from "@/lib/settings";

export default async function Contact() {
  const s = await getSettings();
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
            {s.contact_email && (
              <div className="info-row">
                <span className="label">Email</span>
                <span className="value"><a href={`mailto:${s.contact_email}`}>{s.contact_email}</a></span>
              </div>
            )}
            {s.contact_location && (
              <div className="info-row">
                <span className="label">Based in</span>
                <span className="value">{s.contact_location}</span>
              </div>
            )}
            {s.contact_availability && (
              <div className="info-row">
                <span className="label">Availability</span>
                <span className="value">{s.contact_availability}</span>
              </div>
            )}
            {s.contact_response_time && (
              <div className="info-row">
                <span className="label">Response time</span>
                <span className="value">{s.contact_response_time}</span>
              </div>
            )}
          </aside>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
