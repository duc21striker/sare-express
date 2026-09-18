import './BuiltFor.css';

export default function BuiltFor() {
  return (
    <section id="built-for" className="built">
      <span className="chapter">04 — Cargo</span>
      <h2>Built for what you sell</h2>
      <div className="panels">
        <div className="panel panel-mint reveal">
          <div className="panel-icon" style={{ background: 'rgba(31,164,99,0.1)', color: 'var(--green)' }}>🌿</div>
          <h3>Herbal products</h3>
          <ul>
            <li>Moisture-safe packaging</li>
            <li>Fragile bottle handling</li>
            <li>Same-day dispatch</li>
          </ul>
        </div>
        <div className="panel panel-blush reveal">
          <div className="panel-icon" style={{ background: 'rgba(255,79,121,0.1)', color: 'var(--coral)' }}>💄</div>
          <h3>Cosmetics & beauty</h3>
          <ul>
            <li>Temperature-aware transit</li>
            <li>Tamper-evident seals</li>
            <li>White-glove doorstep handoff</li>
          </ul>
        </div>
      </div>
    </section>
  );
}