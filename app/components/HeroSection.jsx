"use client";

import Image from "next/image";

export default function HeroSection({ onBuyNow }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (onBuyNow) {
      onBuyNow();
    } else {
      const checkoutEl =
        document.getElementById("checkout") ||
        document.getElementById("products");
      if (checkoutEl) {
        checkoutEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="hero" className="bg-white pt-4 pb-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner with overlaid interactive Desktop button */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          <Image
            src="/images/hero-banner.png"
            alt="More Space. Better Living. — Premium Vacuum Storage Bags"
            width={1920}
            height={720}
            priority
            className="w-full h-auto block"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />

          {/* Desktop/Tablet: Real functional button over the image button area with luxurious gold neon glow */}
          <button
            type="button"
            onClick={handleClick}
            className="hidden sm:inline-flex items-center justify-center gap-2.5 absolute left-[5.4%] top-[72.6%] w-[17.5%] h-[11%] min-w-[150px] max-w-[240px] bg-gradient-to-r from-[#B58525] via-[#DFB758] to-[#C59B3F] hover:from-[#c4922c] hover:to-[#dfb758] text-white font-bold text-xs md:text-sm lg:text-base rounded-full shadow-[0_0_16px_rgba(197,155,63,0.65),0_0_32px_rgba(197,155,63,0.3)] hover:shadow-[0_0_24px_rgba(223,183,88,0.9),0_0_48px_rgba(197,155,63,0.45)] hover:scale-105 active:scale-95 transition-all duration-300 border border-[#FFE7B3]/60 cursor-pointer z-10"
            id="hero-shop-now-desktop"
            aria-label="اشتري الآن — Shop Now"
          >
            <span>اشتري الآن — Shop Now</span>
            <span className="text-sm lg:text-base transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        {/* Mobile: Prominent, perfectly organized Golden Neon button right below the banner */}
        <div className="sm:hidden mt-4 px-1 text-center">
          <button
            type="button"
            onClick={handleClick}
            className="w-full py-4 px-6 bg-gradient-to-r from-[#B58525] via-[#DFB758] to-[#C59B3F] active:scale-95 text-white font-bold text-base rounded-2xl shadow-[0_0_18px_rgba(197,155,63,0.65),0_0_35px_rgba(197,155,63,0.3)] border border-[#FFE7B3]/50 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
            id="hero-shop-now-mobile"
          >
            <span className="text-lg">🛒</span>
            <span>اشتري الآن — Commander Maintenant</span>
            <span className="text-xl leading-none">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
