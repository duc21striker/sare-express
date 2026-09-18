import CountUp from './CountUp';
import './Stats.css';

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="stats-inner container">
        <span className="chapter">06 — Numbers</span>
        <div className="stats-grid">
          <div className="stat-block">
            <span className="stat-num">
              <CountUp end={12000} suffix="+" />
            </span>
            <span className="stat-cap">Orders delivered</span>
          </div>
          <div className="stat-block">
            <span className="stat-num">
              <CountUp end={842} />
            </span>
            <span className="stat-cap">Active riders</span>
          </div>
          <div className="stat-block">
            <span className="stat-num">
              <CountUp end={98} suffix="%" />
            </span>
            <span className="stat-cap">On-time delivery</span>
          </div>
          <div className="stat-block">
            <span className="stat-num">
              <CountUp end={48} suffix="hr" />
            </span>
            <span className="stat-cap">Rider onboarding</span>
          </div>
        </div>
      </div>
    </section>
  );
}