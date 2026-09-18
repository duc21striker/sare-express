import './BuiltFor.css';

export default function BuiltFor() {
  return (
    <section id="built-for" className="cargo">
      {/* Decorative radial ticks top-right */}
      <div className="cargo-ticks" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} style={{ transform: `rotate(${i * 15}deg)` }} />
        ))}
      </div>

      <div className="cargo-inner">
        {/* Header */}
        <div className="cargo-head">
          <span className="cargo-pill">04 — Cargo</span>
          <h2 className="cargo-title">Built for what you sell</h2>
        </div>

        {/* Cards */}
        <div className="cargo-grid">
          {/* LEFT — Herbal */}
          <article className="cargo-card cargo-card-light">
            <div className="cargo-icon-wrap">
              <svg className="cargo-icon-ticks" viewBox="0 0 120 120" aria-hidden="true">
                {Array.from({ length: 32 }).map((_, i) => (
                  <line
                    key={i}
                    x1="60"
                    y1="6"
                    x2="60"
                    y2={i % 4 === 0 ? 14 : 10}
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    transform={`rotate(${i * 11.25} 60 60)`}
                  />
                ))}
              </svg>
              <div className="cargo-icon cargo-icon-herb">
                {/* Minimal botanical line-art */}
                <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 34 V14" />
                  <path d="M20 22 C 12 22, 8 18, 8 12 C 14 12, 20 16, 20 22 Z" />
                  <path d="M20 16 C 26 16, 30 12, 32 6 C 26 6, 20 10, 20 16 Z" />
                  <circle cx="20" cy="34" r="1.6" fill="currentColor" stroke="none" />
                </svg>
              </div>
            </div>

            <h3 className="cargo-card-title">Herbal products</h3>

            <ul className="cargo-list">
              <li>
                <span className="cargo-check cargo-check-green" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5 L6.5 12 L13 4" /></svg>
                </span>
                <span>Moisture-safe packaging</span>
              </li>
              <li>
                <span className="cargo-check cargo-check-green" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5 L6.5 12 L13 4" /></svg>
                </span>
                <span>Fragile bottle handling</span>
              </li>
              <li>
                <span className="cargo-check cargo-check-green" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5 L6.5 12 L13 4" /></svg>
                </span>
                <span>Same-day dispatch</span>
              </li>
            </ul>
          </article>

          {/* RIGHT — Cosmetics (dark navy) */}
          <article className="cargo-card cargo-card-dark">
            <div className="cargo-icon-wrap">
              <svg className="cargo-icon-ticks" viewBox="0 0 120 120" aria-hidden="true">
                {Array.from({ length: 32 }).map((_, i) => (
                  <line
                    key={i}
                    x1="60"
                    y1="6"
                    x2="60"
                    y2={i % 4 === 0 ? 14 : 10}
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    transform={`rotate(${i * 11.25} 60 60)`}
                  />
                ))}
              </svg>
              <div className="cargo-icon cargo-icon-cosmetic">
                {/* Minimal luxury bottle silhouette */}
                <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 6 H24 V12 L27 16 V32 A2 2 0 0 1 25 34 H15 A2 2 0 0 1 13 32 V16 L16 12 Z" />
                  <path d="M15 22 H25" />
                  <path d="M15 27 H22" />
                </svg>
              </div>
            </div>

            <h3 className="cargo-card-title">Cosmetics &amp; beauty</h3>

            <ul className="cargo-list">
              <li>
                <span className="cargo-check cargo-check-violet" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5 L6.5 12 L13 4" /></svg>
                </span>
                <span>Temperature-aware transit</span>
              </li>
              <li>
                <span className="cargo-check cargo-check-violet" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5 L6.5 12 L13 4" /></svg>
                </span>
                <span>Tamper-evident seals</span>
              </li>
              <li>
                <span className="cargo-check cargo-check-violet" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5 L6.5 12 L13 4" /></svg>
                </span>
                <span>White-glove doorstep handoff</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}