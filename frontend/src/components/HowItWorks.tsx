import { useEffect, useRef, useState } from 'react';
import './HowItWorks.css';

const steps = [
  { num: '01', title: 'Order placed', desc: 'Seller books a rider via app or WhatsApp in under 30 seconds.' },
  { num: '02', title: 'Rider matched', desc: 'Nearest vetted rider accepts in seconds — you see their name and ETA.' },
  { num: '03', title: 'Careful handling', desc: 'Herbs insulated, cosmetics cushioned. Every item photographed at pickup.' },
  { num: '04', title: 'Tracked delivery', desc: 'Live updates until the customer signs off at the doorstep.' },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const triggerLine = window.innerHeight * 0.45; // 45% from top
      let current = 0;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Whichever step's top is closest to the trigger line
        if (rect.top <= triggerLine) current = i;
      });
      setActive(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToStep = (i: number) => {
    const el = stepRefs.current[i];
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <section id="how-it-works" className="how">
      <div className="how-inner container">
        <aside className="how-aside">
          <span className="chapter">03 — Method</span>
          <h2>How a Sare order moves.</h2>

          <div className="how-progress">
            {steps.map((s, i) => (
              <button
                key={i}
                type="button"
                className={`how-progress-item ${
                  i === active ? 'is-active' : i < active ? 'is-past' : ''
                }`}
                onClick={() => scrollToStep(i)}
                aria-label={`Go to step ${s.num}`}
              >
                <span className="how-progress-num">{s.num}</span>
                <span className="how-progress-line" />
              </button>
            ))}
          </div>
        </aside>

        <div className="how-steps">
          {steps.map((s, i) => (
            <article
              key={i}
              ref={(el) => { stepRefs.current[i] = el; }}
              className={`how-step ${
                i === active ? 'is-active' : i < active ? 'is-past' : ''
              }`}
            >
              <span className="how-step-num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}