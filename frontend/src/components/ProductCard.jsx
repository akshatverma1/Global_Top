import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleLaunchDemo = () => {
    navigate(`/demo/${product.id}`);
  };

  return (
    <article
      ref={cardRef}
      className="product-card"
      id={`product-card-${product.id}`}
      style={{
        '--card-gradient': product.gradient,
        '--card-accent': product.cardAccent,
        '--card-border': product.cardBorder,
        '--card-shadow': product.cardShadow,
        '--card-icon-bg': product.iconBg,
        '--card-icon-shadow': product.iconShadow,
        '--card-tag-bg': product.tagBg,
        '--card-tag-color': product.tagColor,
        '--card-accent-color': product.accentColor,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease, border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease',
      }}
      aria-label={`${product.name} product card`}
    >
      {/* Top accent bar */}
      <div className="product-card__top-bar" aria-hidden="true" />

      {/* Icon */}
      <div className="product-card__icon-wrapper" aria-hidden="true">
        {product.icon}
      </div>

      {/* Category Tag */}
      <span className="product-card__tag" aria-label={`Category: ${product.category}`}>
        <span aria-hidden="true">◆</span> {product.category}
      </span>

      {/* Title & Description */}
      <h3 className="product-card__title">{product.name}</h3>
      <p className="product-card__description">{product.description}</p>

      {/* Features */}
      <ul className="product-card__features" aria-label={`${product.name} features`}>
        {product.features.map((feature, i) => (
          <li key={i} className="product-card__feature">
            <span className="product-card__feature-dot" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="product-card__actions">
        <button
          id={`launch-demo-${product.id}`}
          className="product-card__btn-primary"
          onClick={handleLaunchDemo}
          aria-label={`Launch ${product.name} demo`}
        >
          <span aria-hidden="true">▶</span> Launch Demo
        </button>
        <a
          id={`open-tab-${product.id}`}
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="product-card__btn-secondary"
          aria-label={`Open ${product.name} in new tab`}
        >
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}
