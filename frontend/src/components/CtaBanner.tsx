import './CtaBanner.css';

export default function CtaBanner() {
  return (
    <section className="cta-banner container pattern-adire">
      <span className="chapter" style={{ color: 'rgba(255,255,255,0.7)' }}>07 — Departure</span>
      <h2>Ready to get your orders moving?</h2>
      <div className="cta-actions">
        <a href="#book" className="btn btn-accent">Book a rider</a>
        <a href="#contact" className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>Talk to our team</a>
      </div>
    </section>
  );
}