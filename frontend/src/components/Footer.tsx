import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer id="contact" className="footer container">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src="/logo.svg" alt="Sare Express" width={40} height={40} />
          <p>Sare Express connects herbal and cosmetics sellers with vetted riders across Nigeria.</p>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <a href="#how-it-works">How it works</a>
          <a href="#built-for">For herbs & beauty</a>
          <a href="#coverage">Coverage</a>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <a href="mailto:hello@sareexpress.ng">hello@sareexpress.ng</a>
          <a href="tel:+2348000000000">+234 800 000 0000</a>
        </div>
        <div className="footer-col">
          <h4>Cities</h4>
          <span>Lagos</span>
          <span>Abuja</span>
          <span>Port Harcourt</span>
        </div>
        <div className="footer-col">
          <h4>Riders</h4>
          <Link to="/apply">Apply now</Link>
          <Link to="/status">Check status</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Sare Express. All rights reserved.</p>
      </div>
    </footer>
  );
}