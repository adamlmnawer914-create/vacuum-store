"use client";

import { useState } from "react";
import Image from "next/image";

export default function CheckoutModal({ isOpen, onClose, selectedProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const product = selectedProduct || {
    title: "Premium Vacuum Storage Bags Set (+ Hand Pump)",
    priceNum: 249,
    oldPriceNum: 399,
    image: "/images/checkout-product.jpg",
  };

  const unitPrice = product.priceNum || product.madPrice || 249;
  const total = unitPrice * quantity;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0B1B34]/70 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[85vh] animate-[scaleIn_0.3s_ease-out]">
        {/* Gold accent top bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#C59B3F] via-[#E8C872] to-[#C59B3F] flex-shrink-0" />

        {/* Header */}
        <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-3 sm:pb-4 flex items-center justify-between border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0B1B34] flex items-center justify-center flex-shrink-0">
              <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#C59B3F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-[#0B1B34] text-sm sm:text-base leading-tight">
                Finaliser votre commande
              </h3>
              <p className="text-[11px] sm:text-xs text-[#C59B3F] rtl-text">
                تأكيد الطلب — الدفع عند الاستلام
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-[#0B1B34] transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {submitted ? (
          <div className="px-5 sm:px-7 pb-8 pt-6 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-5 bg-green-50 rounded-full flex items-center justify-center border-2 border-green-200">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B1B34] mb-2 rtl-text">
              تم استلام طلبك بنجاح!
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm mb-6 rtl-text">
              سيتصل بك فريقنا هاتفياً في أقرب وقت لتأكيد موعد التوصيل.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-[#0B1B34] text-white px-8 sm:px-10 py-3 rounded-xl font-bold text-sm hover:bg-[#162a50] transition-colors cursor-pointer active:scale-95"
            >
              Fermer
            </button>
          </div>
        ) : (
          <div className="px-4 sm:px-7 py-4 sm:pb-7 overflow-y-auto flex-1">
            {/* Product Summary */}
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 border border-gray-100 flex gap-3 sm:gap-4 items-center">
              <div className="w-18 h-18 sm:w-22 sm:h-22 relative bg-white rounded-xl border border-gray-200 overflow-hidden flex-shrink-0 shadow-md">
                <Image
                  src="/images/checkout-product.jpg"
                  alt={product.title}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-[#0B1B34] text-xs sm:text-sm truncate">
                  {product.title}
                </h4>
                <div className="text-[11px] sm:text-xs text-gray-500 mb-1.5 sm:mb-2">
                  🚚 Livraison gratuite partout au Maroc
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base sm:text-lg font-extrabold text-[#0B1B34]">
                    {unitPrice} MAD
                  </span>

                  {/* Quantity selector */}
                  <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 sm:px-3 py-0.5 sm:py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      −
                    </button>
                    <span className="px-2.5 sm:px-3 text-xs sm:text-sm font-bold text-[#0B1B34] border-x border-gray-200">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 sm:px-3 py-0.5 sm:py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 sm:mb-1.5">
                  Nom Complet / الاسم الكامل <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Mohamed Alami"
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl text-base sm:text-sm focus:border-[#C59B3F] focus:ring-2 focus:ring-[#C59B3F]/20 focus:bg-white outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 sm:mb-1.5">
                  Téléphone / رقم الهاتف <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="06XX XX XX XX"
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl text-base sm:text-sm focus:border-[#C59B3F] focus:ring-2 focus:ring-[#C59B3F]/20 focus:bg-white outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 sm:mb-1.5">
                  Ville / المدينة <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="Casablanca, Rabat, Marrakech..."
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl text-base sm:text-sm focus:border-[#C59B3F] focus:ring-2 focus:ring-[#C59B3F]/20 focus:bg-white outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 sm:mb-1.5">
                  Adresse complète / العنوان <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Quartier, rue, numéro..."
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl text-base sm:text-sm focus:border-[#C59B3F] focus:ring-2 focus:ring-[#C59B3F]/20 focus:bg-white outline-none transition-all"
                />
              </div>

              {/* Total Summary */}
              <div className="pt-3 sm:pt-4 border-t border-gray-200 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Livraison</span>
                  <span className="font-semibold text-green-600">Gratuite ✓</span>
                </div>
                <div className="flex justify-between text-[#0B1B34] font-bold text-base sm:text-lg pt-0.5">
                  <span>المجموع / Total</span>
                  <span className="text-xl sm:text-2xl text-[#0B1B34]">{total} MAD</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C59B3F] hover:bg-[#b58b32] text-[#0B1B34] font-bold py-3.5 sm:py-4 rounded-xl text-sm sm:text-base shadow-lg transition-all rtl-text mt-2 sm:mt-3 cursor-pointer disabled:opacity-60 active:scale-[0.98]"
              >
                {isSubmitting ? "جاري الإرسال..." : "✅ تأكيد الطلب الآن — الدفع عند الاستلام"}
              </button>

              <p className="text-center text-[10px] sm:text-[11px] text-gray-400 mt-1.5 sm:mt-2">
                🔒 Paiement à la réception. Aucun paiement en ligne requis.
              </p>
            </form>
          </div>
        )}
      </div>

      {/* Scale-in animation */}
      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
