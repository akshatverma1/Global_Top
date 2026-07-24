import React from 'react';
import { useNavigate } from 'react-router-dom';

const PILLARS = [
  {
    icon: '🤖',
    title: 'AI-First Architecture',
    desc: 'Every product is built with artificial intelligence at its core — not bolted on as an afterthought.',
  },
  {
    icon: '🔗',
    title: 'Unified Ecosystem',
    desc: 'Three specialized products that work independently yet complement each other seamlessly.',
  },
  {
    icon: '📈',
    title: 'Enterprise-Grade Scale',
    desc: 'Built to handle thousands of users, millions of data points, and mission-critical workflows.',
  },
];

export default function EcosystemSection() {
  const navigate = useNavigate();

  return (
    <section id="ecosystem" className="ecosystem-section" aria-label="GTG ecosystem overview">
      <div className="ecosystem-inner">
        <p className="section-eyebrow">Why Global Top Group</p>
        <h2 className="ecosystem-title">
          One Group.{' '}
          <span className="gradient-text">Infinite Possibilities.</span>
        </h2>
        <p className="ecosystem-subtitle">
          We don't just build software — we build intelligent systems that think, adapt, 
          and grow with your business. This is the AI transformation you've been waiting for.
        </p>

        <div className="ecosystem-pillars" role="list" aria-label="Our core pillars">
          {PILLARS.map((pillar, i) => (
            <div
              key={i}
              className="ecosystem-pillar"
              role="listitem"
              aria-label={pillar.title}
            >
              <div className="ecosystem-pillar__icon" aria-hidden="true">{pillar.icon}</div>
              <h3 className="ecosystem-pillar__title">{pillar.title}</h3>
              <p className="ecosystem-pillar__desc">{pillar.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            id="ecosystem-explore-btn"
            className="btn-primary"
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Explore all our products"
          >
            Explore All Products →
          </button>
          <a
            href="mailto:contact@globaltopgroup.com"
            id="ecosystem-contact-btn"
            className="btn-secondary"
            aria-label="Get in touch with Global Top Group"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
