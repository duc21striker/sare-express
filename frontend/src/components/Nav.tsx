import { Link } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
  return (
    <nav className="nav container">
      <div className="nav-inner pill">
        <Link to="/" className="nav-brand"><img src={`${import.meta.env.BASE_URL}logo.svg`} alt="Sare Express" width={32} height={32} />
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="Sare Express" width={32} height={32} />
          <span>Sare Express</span>
        </Link>
        <div className="nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#built-for">For herbs & beauty</a>
          <a href="#become-rider">Become a rider</a>
          <a href="#coverage">Coverage</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-actions">
          <Link to="/admin" className="btn btn-ghost">Sign in</Link>
          <Link to="/apply" className="btn btn-primary">Get started</Link>
        </div>
      </div>
    </nav>
  );
}