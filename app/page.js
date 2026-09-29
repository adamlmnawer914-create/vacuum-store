"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import ProductsSection from "./components/GallerySection";
import CtaBanner from "./components/BeforeAfterSection";
import Footer from "./components/Footer";
import CheckoutModal from "./components/CheckoutSection";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setCartCount((prev) => prev + 1);
    setIsCartOpen(true);
  };

  const handleScrollToProduct = () => {
    const productsEl = document.getElementById("products");
    if (productsEl) {
      const navOffset = 70;
      const elPosition = productsEl.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elPosition - navOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden">
      {/* 1. Top Bar & Navbar */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} cartCount={cartCount} />

      {/* 2. Hero Section */}
      <HeroSection onBuyNow={handleScrollToProduct} />

      {/* 3. Features Strip (3 Columns) */}
      <FeaturesSection />

      {/* 4. Product Grid (Our Products - 3 Cards) */}
      <ProductsSection onAddToCart={handleAddToCart} />

      {/* 5. Bottom CTA Banner */}
      <CtaBanner onShopNow={handleScrollToProduct} />

      {/* 6. Footer */}
      <Footer />

      {/* 7. Slide-over Fast Checkout Drawer */}
      <CheckoutModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        selectedProduct={selectedProduct}
      />
    </div>
  );
}
