import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';

import ProductsSection from '../components/ProductsSection';
import EcosystemSection from '../components/EcosystemSection';
import Footer from '../components/Footer';

export default function Home() {
  useEffect(() => {
    document.title = 'Global Top Group – AI Product Suite';
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Animated ambient background */}
      <div className="mesh-bg" aria-hidden="true" />

      <Navbar />

      <main id="main-content" aria-label="Main content">
        <HeroSection />

        <ProductsSection />
        <EcosystemSection />
      </main>

      <Footer />
    </>
  );
}
