"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ onOpenCart, cartCount = 0 }) {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";
  const isContact = pathname === "/contact";

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-xs">
      {/* ─── Main Navbar ─── */}
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="flex flex-col group flex-shrink-0" id="logo-link">
            <div className="flex items-center">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0B1B34]">
                Vacuum
              </span>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#C59B3F] relative ml-0.5">
                Store
                <span className="absolute -top-1.5 right-1 w-2 h-2 text-[#C59B3F]">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5">
                    <path d="M12 2L2 12h3v8h14v-8h3L12 2z" />
                  </svg>
                </span>
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-gray-400 -mt-0.5 sm:-mt-1">
              Smart Storage Solutions
            </span>
          </Link>

          {/* Navigation Links: ALWAYS visible on Mobile and Desktop */}
          <div className="flex items-center gap-4 sm:gap-8 md:gap-10">
            {/* Home with dynamic active indicator */}
            <div className="relative py-1">
              <Link
                href="/"
                className={`text-sm sm:text-base transition-colors px-1 py-1 ${
                  isHome
                    ? "font-extrabold text-[#0B1B34]"
                    : "font-medium text-gray-600 hover:text-[#0B1B34]"
                }`}
                id="nav-home"
              >
                Home
              </Link>
              {isHome && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] sm:h-[3px] bg-[#C59B3F] rounded-full" />
              )}
            </div>

            {/* Contact with dynamic active indicator */}
            <div className="relative py-1">
              <Link
                href="/contact"
                className={`text-sm sm:text-base transition-colors px-1 py-1 ${
                  isContact
                    ? "font-extrabold text-[#0B1B34]"
                    : "font-medium text-gray-600 hover:text-[#0B1B34]"
                }`}
                id="nav-contact"
              >
                Contact
              </Link>
              {isContact && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] sm:h-[3px] bg-[#C59B3F] rounded-full" />
              )}
            </div>
          </div>

          {/* Right Icons: Cart */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Cart Icon with Gold Badge */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[#0B1B34] hover:bg-gray-50 border border-gray-100 transition-colors cursor-pointer"
              aria-label="Cart"
              id="nav-cart-btn"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121 0 2.09-.773 2.349-1.872l1.584-6.732H6.106M17.25 17.25a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-9 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C59B3F] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
