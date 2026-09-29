"use client";

export default function CtaBanner({ onShopNow }) {
  return (
    <section className="bg-[#0B1B34] relative overflow-hidden py-10 sm:py-12 border-t border-[#122B52]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
          {/* Left: House Icon + Two Line Heading */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="w-13 h-13 border border-[#C59B3F]/70 rounded-lg p-2.5 flex items-center justify-center text-[#C59B3F]">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <div>
              <div className="text-white font-bold tracking-wider text-sm sm:text-base uppercase leading-tight">
                A Cleaner Home
              </div>
              <div className="text-white font-bold tracking-wider text-sm sm:text-base uppercase leading-tight">
                A Happier You
              </div>
            </div>
          </div>

          {/* Thin Vertical Divider (Desktop) */}
          <div className="hidden lg:block w-px h-12 bg-white/20 flex-shrink-0" />

          {/* Middle: Description */}
          <div className="max-w-xl text-center lg:text-left">
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
              Say goodbye to clutter and hello to more space. Our vacuum storage bags help you
              store more, save space and protect your belongings — effortlessly.
            </p>
          </div>

          {/* Right: Gold Order Now Button */}
          <div className="w-full sm:w-auto flex-shrink-0 text-center">
            <button
              type="button"
              onClick={onShopNow}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C59B3F] hover:bg-[#b58b32] text-[#0B1B34] font-bold text-sm sm:text-base px-9 py-3.5 rounded-full shadow-[0_0_16px_rgba(197,155,63,0.45)] hover:shadow-[0_0_26px_rgba(197,155,63,0.75)] transition-all duration-300 active:scale-95 cursor-pointer"
              id="banner-shop-now"
            >
              <span>طلب الان</span>
              <span className="text-lg leading-none">↑</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
