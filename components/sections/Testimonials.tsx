import { getSettings } from "@/lib/settings";

export default async function Testimonials() {
  const s = await getSettings();

  const items = [1, 2, 3]
    .map((i) => ({
      text: s[`testimonial_${i}_text` as keyof typeof s],
      author: s[`testimonial_${i}_author` as keyof typeof s],
      role: s[`testimonial_${i}_role` as keyof typeof s],
    }))
    .filter((q) => q.text && q.text.trim());

  // Don't render the section at all until at least one quote exists.
  if (items.length === 0) return null;

  return (
    <section className="s testimonials" id="testimonials">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-num">{s.section_testimonials_eyebrow}</span>
            <h2 dangerouslySetInnerHTML={{ __html: s.section_testimonials_title_html }} />
          </div>
        </div>
        <div className={`testimonials-grid count-${items.length}`}>
          {items.map((q, i) => (
            <figure className="testimonial reveal" key={i}>
              <blockquote>
                <span className="quote-mark" aria-hidden="true">“</span>
                {q.text}
              </blockquote>
              {(q.author || q.role) && (
                <figcaption>
                  {q.author && <span className="t-author">{q.author}</span>}
                  {q.role && <span className="t-role">{q.role}</span>}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
