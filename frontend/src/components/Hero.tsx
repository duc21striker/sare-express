import { useEffect, useRef } from 'react';
import './Hero.css';

type TrackingStep = {
  icon: string;
  title: string;
  subtitle: string;
  time: string;
};

const ALL_STEPS: TrackingStep[] = [
  {
    icon: '🌿',
    title: 'Packed at Ilé Botanicals',
    subtitle: 'Bitter leaf bundle, insulated bag',
    time: '9 min ago',
  },
  {
    icon: '🏍️',
    title: 'Rider Ebuka is on the way',
    subtitle: '11 minutes to GRA Phase 2',
    time: '2 min ago',
  },
  {
    icon: '✓',
    title: 'Delivered to Grace N.',
    subtitle: 'Confirmed by customer',
    time: 'just now',
  },
];

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef(0);

  useEffect(() => {
    document.body.classList.add('hero-loaded');

    // Trigger mask reveal on mount
    requestAnimationFrame(() => {
      document.querySelectorAll('.hero-title .mask-line').forEach((el, i) => {
        setTimeout(() => el.classList.add('is-visible'), 150 + i * 120);
      });
    });

    const card = cardRef.current;
    if (!card) return;

    // Cycle the tracking timeline
    const interval = setInterval(() => {
      if (document.visibilityState === 'hidden') return;
      stageRef.current = (stageRef.current + 1) % 3;

      const rows = card.querySelectorAll('.timeline-row');
      rows.forEach((row, i) => {
        row.classList.remove('is-done', 'is-active', 'is-pending');
        if (i < stageRef.current) row.classList.add('is-done');
        else if (i === stageRef.current) row.classList.add('is-active');
        else row.classList.add('is-pending');
      });
    }, 4500);

    // Tilt on hover (desktop only)
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (mq.matches) {
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        card.style.setProperty('--rx', `${-y / 30}deg`);
        card.style.setProperty('--ry', `${x / 30}deg`);
      };
      const onLeave = () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      return () => {
        clearInterval(interval);
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      };
    }
    return () => clearInterval(interval);
  }, []);

  const innerIcons = ['🌿', '💄', '📦', '🏍️'];
  const outerIcons = ['💬', '💳', '📍', '🗺️'];

  return (
    <section className="hero">
      <div className="hero-rings" aria-hidden="true">
        <div className="hero-glow" />
        <div className="orbit-ring ring-1">
          {innerIcons.map((icon, i) => (
            <span key={i} className={`orbit-icon orbit-icon-${i + 1}`}>
              <span className="orbit-icon-inner">{icon}</span>
            </span>
          ))}
        </div>
        <div className="orbit-ring ring-2">
          {outerIcons.map((icon, i) => (
            <span key={i} className={`orbit-icon orbit-icon-${i + 1}`}>
              <span className="orbit-icon-inner">{icon}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="hero-layout container">
        {/* LEFT — editorial stack */}
        <div className="hero-left">
          <span className="chapter">01 — Arrival</span>

          <h1 className="hero-title">
            <span className="mask-line"><span>Herbs and beauty,</span></span>
            <span className="mask-line"><span>
              <span className="serif-italic">delivered</span> same day.
            </span></span>
          </h1>

          <p className="hero-sub">
            Sare Express connects herbal and cosmetics sellers with vetted
            riders across Lagos, Abuja and Port Harcourt — every order tracked
            from pickup to doorstep.
          </p>

          <div className="hero-actions">
            <a href="#book" className="btn btn-accent">Book a rider</a>
            <a href="#how-it-works" className="btn btn-outline">See how it works →</a>
          </div>

          <div className="hero-meta">
            <div className="hero-meta-item">
              <span className="meta-value">4.8</span>
              <span className="meta-label">Average rider rating</span>
            </div>
            <div className="hero-meta-divider" />
            <div className="hero-meta-item">
              <span className="meta-value">10,000+</span>
              <span className="meta-label">Orders delivered</span>
            </div>
            <div className="hero-meta-divider" />
            <div className="hero-meta-item">
              <span className="meta-value">3</span>
              <span className="meta-label">Cities live</span>
            </div>
          </div>
        </div>

        {/* RIGHT — tracking card */}
        <div className="hero-right">
          <div className="tracking-card" ref={cardRef}>
            <div className="tracking-head">
              <div className="tracking-live">
                <span className="live-dot" />
                <span>Live tracking</span>
              </div>
              <span className="tracking-order">Order #2402</span>
            </div>

            <div className="timeline">
              {ALL_STEPS.map((step, i) => (
                <div
                  key={i}
                  className={`timeline-row ${
                    i === 0 ? 'is-done' : i === 1 ? 'is-active' : 'is-pending'
                  }`}
                >
                  <div className="timeline-icon">
                    <span>{step.icon}</span>
                  </div>
                  <div className="timeline-body">
                    <div className="timeline-title">{step.title}</div>
                    <div className="timeline-sub">{step.subtitle}</div>
                  </div>
                  <div className="timeline-time">{step.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}