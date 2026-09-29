"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import CheckoutModal from "../components/CheckoutSection";

export default function ContactPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden">
      <Navbar onOpenCart={() => setIsCartOpen(true)} cartCount={0} />
      <ContactSection />
      <Footer />
      <CheckoutModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}
