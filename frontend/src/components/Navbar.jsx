import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <Link to="/" className="navbar__logo" aria-label="Global Top Group home">
        <div className="navbar__logo-icon" aria-hidden="true">🌐</div>
        <div className="navbar__logo-text">
          Global Top <span>Group</span>
        </div>
      </Link>

      <div className="navbar__nav">
        {location.pathname === '/' && (
          <>
            <button
              className="navbar__link"
              onClick={() => scrollToSection('products')}
              aria-label="Scroll to products section"
            >
              Products
            </button>
            <button
              className="navbar__link"
              onClick={() => scrollToSection('ecosystem')}
              aria-label="Scroll to ecosystem section"
            >
              Ecosystem
            </button>
          </>
        )}
        <button
          className="navbar__cta"
          onClick={() => scrollToSection('products')}
          aria-label="View product demos"
        >
          View Demos →
        </button>
      </div>
    </nav>
  );
}
