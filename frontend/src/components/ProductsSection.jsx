import React from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';

export default function ProductsSection() {
  return (
    <section
      id="products"
      className="products-section"
      aria-label="Our AI products"
    >
      <div className="section-header">
        <p className="section-eyebrow">Our Product Suite</p>
        <h2 className="section-title">
          Three Products,{' '}
          <span className="gradient-text">One Vision</span>
        </h2>
        <p className="section-subtitle">
          Each platform solves a distinct business problem — together they form a 
          complete AI-powered operating system for modern enterprises.
        </p>
      </div>

      <div
        className="products-grid"
        role="list"
        aria-label="Product cards"
      >
        {PRODUCTS.map((product, i) => (
          <div
            key={product.id}
            role="listitem"
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
