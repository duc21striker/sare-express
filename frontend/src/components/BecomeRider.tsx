import { Link } from 'react-router-dom';
import CountUp from './CountUp';
import './BecomeRider.css';

export default function BecomeRider() {
  return (
    <section id="become-rider" className="rider-section">
      <div className="rider-inner container">
        <span className="chapter">06 — Riders</span>

        <div className="rider-layout">
          <div className="rider-left">
            <h2>
              <span className="serif-italic">Ẹ káàbọ̀</span> —<br />
              ride with Sare Express.
            </h2>
            <p className="rider-sub">
              Set your own hours, deliver herbs and beauty products across your
              city, and get paid weekly.
            </p>

            <div className="requirements">
              <div className="req-item">
                <span className="req-check">✓</span>
                <span>Valid means of ID</span>
              </div>
              <div className="req-item">
                <span className="req-check">✓</span>
                <span>Roadworthy motorcycle or bicycle</span>
              </div>
              <div className="req-item">
                <span className="req-check">✓</span>
                <span>Smartphone for the rider app</span>
              </div>
            </div>

            <Link to="/apply" className="btn btn-accent">Apply now</Link>
          </div>

          <div className="rider-right">
            <div className="rider-stats">
              <div>
                <span className="rider-stat-value">
                  ₦<CountUp end={21} suffix="M" />
                </span>
                <span className="rider-stat-label">Paid to riders this month</span>
              </div>
              <div>
                <span className="rider-stat-value">
                  <CountUp end={842} />
                </span>
                <span className="rider-stat-label">Active riders across 3 cities</span>
              </div>
              <div>
                <span className="rider-stat-value">
                  <CountUp end={98} suffix="%" />
                </span>
                <span className="rider-stat-label">On-time delivery rate</span>
              </div>
            </div>

            <div className="process-strip">
              <div className="process-step">
                <span className="process-num">1</span>
                <span>Submit your details</span>
              </div>
              <div className="process-arrow">→</div>
              <div className="process-step">
                <span className="process-num">2</span>
                <span>We verify your documents</span>
              </div>
              <div className="process-arrow">→</div>
              <div className="process-step">
                <span className="process-num">3</span>
                <span>You're approved & onboarded</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}