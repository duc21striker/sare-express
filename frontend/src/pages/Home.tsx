import { useEffect } from 'react';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import HowItWorks from '../components/HowItWorks';
import BuiltFor from '../components/BuiltFor';
import Coverage from '../components/Coverage';
import BecomeRider from '../components/BecomeRider';
import CtaBanner from '../components/CtaBanner';
import Footer from '../components/Footer';

export default function Home() {
  useEffect(() => {
    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <TrustStrip />
      <div className="chapter-rule" />
      <HowItWorks />
      <div className="chapter-rule" />
      <BuiltFor />
      <div className="chapter-rule" />
      <Coverage />
      <div className="chapter-rule" />
      <BecomeRider />
      <CtaBanner />
      <Footer />
    </>
  );
}