import './TrustStrip.css';

const brands = [
  'Adaeze Naturals',
  'Zuri Apothecary',
  'GlowRoot',
  'Ilé Botanicals',
  'Velvet Skin Co.',
  "Kunle's Herbal House",
];

export default function TrustStrip() {
  const doubled = [...brands, ...brands];

  return (
    <section className="trust">
      <div className="trust-header container">
        <span className="chapter">02 — Standing</span>
        <p className="trust-label">Trusted by herb and beauty sellers across Nigeria</p>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {doubled.map((b, i) => (
            <span key={i} className="marquee-item">
              {b}
              <span className="marquee-dot">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}