import './Testimonials.css';

const testimonials = [
  {
    quote: "We ship 40 orders a day now and I haven't had a single complaint about a broken bottle. The riders actually know how to handle extracts.",
    name: 'Adaeze Okonkwo',
    role: 'Founder, Adaeze Naturals',
    city: 'Lagos',
    initials: 'AO',
  },
  {
    quote: "Same-day delivery used to be a fantasy for us. Now customers order in the morning and their lip kits are at their door before dinner.",
    name: 'Tomi Adeyemi',
    role: 'CEO, Velvet Skin Co.',
    city: 'Abuja',
    initials: 'TA',
  },
  {
    quote: "What got me was the tracking. My customers see where their package is, so I don't get the 'where is my order' calls anymore.",
    name: 'Kunle Balogun',
    role: "Owner, Kunle's Herbal House",
    city: 'Port Harcourt',
    initials: 'KB',
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials container">
      <div className="testimonials-head">
        <span className="chapter">05 — Voices</span>
        <h2>What sellers say.</h2>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <figure key={i} className="testimonial reveal">
            <span className="testimonial-mark" aria-hidden="true">“</span>
            <blockquote className="testimonial-quote">{t.quote}</blockquote>
            <figcaption className="testimonial-author">
              <span className="testimonial-avatar">{t.initials}</span>
              <div>
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-role">{t.role} · {t.city}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}