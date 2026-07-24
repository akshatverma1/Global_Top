import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';

export default function Demo() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const iframeRef = useRef(null);
  const [iframeError, setIframeError] = useState(false);
  const [loading, setLoading] = useState(true);

  const product = PRODUCTS.find((p) => p.id === productId);

  useEffect(() => {
    if (!product) {
      navigate('/');
      return;
    }
    document.title = `${product.name} Demo – Global Top Group`;
    window.scrollTo(0, 0);

    // Reset state on product change
    setIframeError(false);
    setLoading(true);
  }, [productId, product, navigate]);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleIframeError = () => {
    setLoading(false);
    setIframeError(true);
  };

  // Safety: if iframe takes too long, show fallback after 8s
  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => {
      // Check if iframe actually loaded by trying to access contentDocument
      try {
        const iframe = iframeRef.current;
        if (iframe && (!iframe.contentDocument || iframe.contentDocument.body?.innerHTML === '')) {
          setIframeError(true);
        }
        setLoading(false);
      } catch {
        // Cross-origin — iframe may have loaded (cross-origin restriction)
        setLoading(false);
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, [loading, productId]);

  if (!product) return null;

  // Other products for the switcher bar
  const otherProducts = PRODUCTS.filter((p) => p.id !== productId);

  return (
    <div className="demo-page" aria-label={`${product.name} demo`}>
      {/* Top Bar */}
      <div className="demo-topbar" role="banner">
        <div className="demo-topbar__left">
          <button
            id="demo-back-btn"
            className="demo-topbar__back"
            onClick={() => navigate('/')}
            aria-label="Back to Global Top Group home"
          >
            ← Back
          </button>

          <div className="demo-topbar__title" aria-label={`Currently viewing: ${product.name}`}>
            <span style={{ fontSize: '1.1rem' }} aria-hidden="true">{product.icon}</span>
            {product.name}
            <span className="demo-topbar__badge">Live Demo</span>
          </div>
        </div>

        <div className="demo-topbar__right" role="navigation" aria-label="Switch between products">
          {/* Product switcher */}
          {otherProducts.map((p) => (
            <button
              key={p.id}
              id={`switch-to-${p.id}`}
              className="demo-topbar__back"
              onClick={() => navigate(`/demo/${p.id}`)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              aria-label={`Switch to ${p.name} demo`}
            >
              <span aria-hidden="true">{p.icon}</span>
              <span style={{ display: 'none' }}>{p.name}</span>
            </button>
          ))}

          <a
            id="demo-open-fullscreen-btn"
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="demo-topbar__open"
            aria-label={`Open ${product.name} in a new tab`}
          >
            <span aria-hidden="true">↗</span> Open Full Screen
          </a>
        </div>
      </div>

      {/* Iframe Container */}
      <div className="demo-iframe-container" aria-label={`${product.name} embedded application`}>
        {/* Loading state */}
        {loading && (
          <div
            className="demo-iframe-fallback"
            role="status"
            aria-live="polite"
            aria-label="Loading product demo"
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '14px',
                background: product.iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                animation: 'pulse 1.5s ease infinite',
              }}
              aria-hidden="true"
            >
              {product.icon}
            </div>
            <p className="demo-iframe-fallback__title">Loading {product.name}…</p>
            <p className="demo-iframe-fallback__subtitle" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Please wait while the demo loads.
            </p>
          </div>
        )}

        {/* Iframe */}
        {!iframeError && (
          <iframe
            ref={iframeRef}
            src={product.url}
            className="demo-iframe"
            title={`${product.name} live demo`}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            allow="camera; microphone; fullscreen"
            style={{ display: loading ? 'none' : 'block' }}
            aria-label={`${product.name} application`}
          />
        )}

        {/* Fallback if iframe is blocked */}
        {iframeError && (
          <div
            className="demo-iframe-fallback"
            role="alert"
            aria-live="assertive"
            aria-label="Demo requires opening in full screen"
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '20px',
                background: product.iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                marginBottom: '8px',
                boxShadow: `0 8px 30px ${product.iconShadow}`,
              }}
              aria-hidden="true"
            >
              {product.icon}
            </div>

            <div
              style={{
                padding: '6px 16px',
                borderRadius: '99px',
                background: product.tagBg,
                color: product.tagColor,
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
              aria-label={`Product category: ${product.category}`}
            >
              {product.category}
            </div>

            <h2 className="demo-iframe-fallback__title">{product.name}</h2>
            <p className="demo-iframe-fallback__subtitle">{product.description}</p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a
                id="fallback-open-btn"
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  background: product.gradient,
                  boxShadow: `0 4px 20px ${product.iconShadow}`,
                }}
                aria-label={`Open ${product.name} in a new tab for full experience`}
              >
                Open {product.name} ↗
              </a>
              <button
                id="fallback-back-btn"
                className="btn-secondary"
                onClick={() => navigate('/')}
                aria-label="Go back to the home page"
              >
                ← Back to Home
              </button>
            </div>

            {/* Features list in fallback */}
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                justifyContent: 'center',
                marginTop: '32px',
                maxWidth: '500px',
              }}
              aria-label={`${product.name} key features`}
            >
              {product.features.map((f, i) => (
                <li
                  key={i}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '99px',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-card)',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
