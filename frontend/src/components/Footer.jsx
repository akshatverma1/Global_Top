import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo" aria-label="Site footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__brand-icon" aria-hidden="true">🌐</div>
          Global Top Group
        </div>

        <nav className="footer__links" aria-label="Footer product links">
          {PRODUCTS.map((product) => (
            <Link
              key={product.id}
              to={`/demo/${product.id}`}
              className="footer__link"
              aria-label={`Go to ${product.name} demo`}
            >
              {product.name}
            </Link>
          ))}
        </nav>

        <p className="footer__copy">
          © {year} Global Top Group. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
