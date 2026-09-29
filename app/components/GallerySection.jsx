"use client";

import Image from "next/image";

const product = {
  id: 1,
  title: "Premium Vacuum Storage Bags Set",
  subtitle: "(+ Hand Pump)",
  image: "/images/featured-product.jpg",
  price: "249 د.م",
  oldPrice: "399 د.م",
  madPrice: 249,
};

const packItems = [
  "3x Sacs (40 × 60 cm)",
  "3x Sacs (50 × 70 cm)",
  "2x Sacs (60 × 80 cm)",
  "2x Sacs (80 × 100 cm)",
  "1x Pompe à main manuelle",
];

const technicalSpecs = [
  {
    title: "Gain de place",
    desc: "Réduit le volume jusqu'à 80%.",
  },
  {
    title: "Protection complète",
    desc: "Étanche, protège contre poussière, humidité et acariens.",
  },
  {
    title: "Matériau renforcé",
    desc: "Plastique plus épais à fermetures double zip.",
  },
  {
    title: "Compatibilité",
    desc: "Utilisable avec pompe ou aspirateur classique.",
  },
];

export default function ProductsSection({ onAddToCart }) {
  return (
    <section id="products" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Section Header ─── */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-10 h-[1.5px] bg-[#C59B3F] inline-block" />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#C59B3F]">
              Our Product
            </span>
            <span className="w-10 h-[1.5px] bg-[#C59B3F] inline-block" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-serif font-bold text-[#0B1B34] tracking-tight mb-2">
            Choose Your Perfect Set
          </h2>

          <p className="text-gray-500 text-sm sm:text-base">
            High quality vacuum storage bags for a more organized home.
          </p>
        </div>

        {/* ─── Single Column Centered Layout (Content BELOW Image) ─── */}
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-[#C59B3F] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-xs">
            <span>✨</span>
            <span>العرض الحصري</span>
          </div>

          {/* Title & Subtitle */}
          <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#0B1B34] leading-tight text-center mb-1">
            {product.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-500 font-medium text-center mb-6">
            {product.subtitle}
          </p>

          {/* ─── Product Image ─── */}
          <div className="w-full relative rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-gray-100 group mb-8">
            <Image
              src={product.image}
              alt={product.title}
              width={1024}
              height={576}
              className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>

          {/* ─── ALL CONTENT BELOW THE IMAGE ─── */}
          <div className="w-full flex flex-col items-center">
            {/* Price */}
            <div className="flex items-baseline justify-center gap-3 mb-4">
              <span className="text-4xl sm:text-5xl font-extrabold text-[#0B1B34]">
                {product.price}
              </span>
              <span className="text-base sm:text-lg text-gray-400 line-through">
                {product.oldPrice}
              </span>
              <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
                -38% Réduction
              </span>
            </div>

            {/* Intro Paragraph */}
            <p className="text-gray-600 text-sm sm:text-base text-center leading-relaxed max-w-2xl mb-6">
              Sacs de compression étanches pour vêtements, couettes et textiles, conçus pour optimiser considérablement l&apos;espace dans les armoires et les valises.
            </p>

            {/* Boxed Section: Composition du pack */}
            <div className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-2xs">
              <h4 className="text-sm sm:text-base font-bold text-[#0B1B34] mb-3.5 flex items-center gap-2">
                <span>📦 Composition du pack :</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#0B1B34]">
                {packItems.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 bg-white/70 border border-gray-200/60 rounded-xl px-3.5 py-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#C59B3F] flex-shrink-0" />
                    <span className="font-semibold">{item}</span>
                  </div>
                ))}
                {/* Hand pump spanning full width */}
                <div className="sm:col-span-2 flex items-center justify-between bg-white border border-[#C59B3F]/30 rounded-xl px-4 py-3 text-[#0B1B34] shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#C59B3F] flex-shrink-0" />
                    <span className="font-bold text-[#0B1B34]">
                      {packItems[4]}
                    </span>
                  </div>
                  <span className="text-xs bg-[#C59B3F]/15 text-[#0B1B34] px-3 py-1 rounded-full font-bold">
                    Offerte 🎁
                  </span>
                </div>
              </div>
            </div>

            {/* Features List: Fiche technique */}
            <div className="w-full space-y-3 mb-8 text-xs sm:text-sm text-gray-700 bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-2xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Fiche Technique
              </h4>
              {technicalSpecs.map((spec, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#C59B3F]/15 text-[#C59B3F] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="leading-relaxed">
                    <strong className="text-[#0B1B34] font-semibold">
                      {spec.title} :
                    </strong>{" "}
                    <span className="text-gray-600">{spec.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ─── Large Navy Blue CTA Button directly below list ─── */}
            <button
              type="button"
              onClick={() => onAddToCart && onAddToCart(product)}
              className="group relative w-full max-w-lg bg-[#0B1834] hover:bg-[#132B4F] active:scale-[0.98] text-white py-4 sm:py-5 px-6 sm:px-8 rounded-2xl flex items-center justify-center gap-3 font-bold text-base sm:text-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#C59B3F]/40 hover:border-[#C59B3F]/80 cursor-pointer"
              id="add-to-cart-main"
            >
              {/* Cart Icon with Gold Glow */}
              <div className="relative flex-shrink-0">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#C59B3F] group-hover:text-[#E8C872] transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <div className="absolute -inset-1 bg-[#C59B3F] rounded-full opacity-0 group-hover:opacity-40 blur-xs transition-opacity duration-300" />
              </div>

              <span>أطلب الآن - Commandez Maintenant</span>

              {/* Arrow */}
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#C59B3F] group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
