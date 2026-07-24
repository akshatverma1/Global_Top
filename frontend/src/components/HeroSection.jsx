import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';

export default function HeroSection() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" ref={heroRef} aria-label="Hero section">
      <div className="hero__content">
        {/* Eyebrow */}
        <div className="hero__eyebrow" role="text" aria-label="Global Top Group product suite announcement">
          <span className="hero__eyebrow-dot" aria-hidden="true" />
          Global Top Group &nbsp;·&nbsp; AI Product Suite 2025
        </div>

        {/* Title */}
        <h1 className="hero__title">
          The AI Ecosystem<br />
          <span className="gradient-text">Powering Tomorrow's</span><br />
          Businesses
        </h1>

        {/* Subtitle */}
        <p className="hero__subtitle">
          Three powerful AI platforms — unified under one vision. From automated calling to 
          marketing intelligence to complete business operations, we've built the future.
        </p>

        {/* CTAs */}
        <div className="hero__actions">
          <button
            id="hero-explore-btn"
            className="btn-primary"
            onClick={scrollToProducts}
            aria-label="Explore all AI products"
          >
            <span aria-hidden="true">✦</span> Explore Products
          </button>
          <a
            href="mailto:contact@globaltopgroup.com"
            className="btn-secondary"
            id="hero-contact-btn"
            aria-label="Contact Global Top Group"
          >
            Contact Us
          </a>
        </div>

        {/* Product Badges */}
        <div className="hero__product-badges" role="list" aria-label="Our AI products">
          {PRODUCTS.map((product) => (
            <button
              key={product.id}
              id={`hero-badge-${product.id}`}
              className="hero__product-badge"
              role="listitem"
              onClick={() => navigate(`/demo/${product.id}`)}
              style={{
                '--badge-accent': product.accentColor,
              }}
              aria-label={`Launch ${product.name} demo`}
            >
              <span
                className="hero__product-badge-icon"
                style={{ background: product.iconBg }}
                aria-hidden="true"
              >
                {product.icon}
              </span>
              {product.name}
              <span style={{ color: product.accentLight, fontSize: '0.75rem' }} aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
