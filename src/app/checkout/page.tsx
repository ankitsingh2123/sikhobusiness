"use client";

import { useState } from "react";
import Image from "next/image";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [upiId, setUpiId] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = 4999;
  const discount = 4900;
  const total = subtotal - discount;

  return (
    <div className="min-h-screen bg-sb-bg text-white px-3 sm:px-6 md:px-10 py-6 md:py-10 pb-28 md:pb-12 overflow-x-hidden font-sans">
      <div className="max-w-[1200px] mx-auto min-w-0">

        {/* Page Title */}
        <div className="mb-6 md:mb-10 px-1">
          <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2">
            <span className="material-symbols-outlined text-[18px] md:text-[20px] text-gray-500">lock</span>
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight">Secure Checkout</h1>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base ml-7 md:ml-9 leading-relaxed">Select your preferred payment method to complete the purchase.</p>
        </div>

        <div className="flex flex-col-reverse xl:flex-row gap-6 md:gap-10 min-w-0">

          {/* LEFT: Payment Methods */}
          <div className="flex-1 space-y-3 sm:space-y-4 min-w-0">

            {/* UPI */}
            <div
              className={`rounded-xl sm:rounded-2xl border cursor-pointer transition-all duration-200 min-w-0 ${
                paymentMethod === "upi"
                  ? "border-[#FF7A00] bg-sb-bg-elevated"
                  : "border-white/8 bg-sb-surface hover:border-white/20"
              }`}
              onClick={() => setPaymentMethod("upi")}
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${paymentMethod === "upi" ? "border-[#FF7A00]" : "border-gray-500"}`}>
                      {paymentMethod === "upi" && <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF7A00]" />}
                    </div>
                    <span className="text-base sm:text-lg font-bold">UPI</span>
                  </div>
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] sm:text-xs font-bold text-gray-400">G</div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] sm:text-xs font-bold text-gray-400">P</div>
                  </div>
                </div>

                {paymentMethod === "upi" && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">Pay directly from your bank account using your UPI ID.</p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="Enter UPI ID (e.g., name@bank)"
                        className="flex-1 w-full bg-sb-bg border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-gray-600 outline-none focus:border-[#FF7A00]/50 transition-colors"
                      />
                      <button className="bg-sb-surface border border-white/10 text-white font-medium text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:bg-white/5 transition-colors shrink-0">
                        Verify
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Credit / Debit Card */}
            <div
              className={`rounded-xl sm:rounded-2xl border cursor-pointer transition-all duration-200 min-w-0 ${
                paymentMethod === "card"
                  ? "border-[#FF7A00] bg-sb-bg-elevated"
                  : "border-white/8 bg-sb-surface hover:border-white/20"
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${paymentMethod === "card" ? "border-[#FF7A00]" : "border-gray-500"}`}>
                      {paymentMethod === "card" && <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF7A00]" />}
                    </div>
                    <span className="text-base sm:text-lg font-bold">Credit / Debit Card</span>
                  </div>
                  <span className="material-symbols-outlined text-[20px] sm:text-[24px] text-gray-500">credit_card</span>
                </div>

                {paymentMethod === "card" && (
                  <div className="mt-4 sm:mt-5 space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div>
                      <label className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1.5 sm:mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full bg-sb-bg border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-gray-600 outline-none focus:border-[#FF7A00]/50 transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1.5 sm:mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM / YY"
                          className="w-full bg-sb-bg border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-gray-600 outline-none focus:border-[#FF7A00]/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1.5 sm:mb-2">CVV</label>
                        <input
                          type="text"
                          placeholder="•••"
                          className="w-full bg-sb-bg border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-gray-600 outline-none focus:border-[#FF7A00]/50 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1.5 sm:mb-2">Name on Card</label>
                      <input
                        type="text"
                        placeholder="Rahul Sharma"
                        className="w-full bg-sb-bg border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-gray-600 outline-none focus:border-[#FF7A00]/50 transition-colors"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Net Banking */}
            <div
              className={`rounded-xl sm:rounded-2xl border cursor-pointer transition-all duration-200 min-w-0 ${
                paymentMethod === "netbanking"
                  ? "border-[#FF7A00] bg-sb-bg-elevated"
                  : "border-white/8 bg-sb-surface hover:border-white/20"
              }`}
              onClick={() => setPaymentMethod("netbanking")}
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${paymentMethod === "netbanking" ? "border-[#FF7A00]" : "border-gray-500"}`}>
                      {paymentMethod === "netbanking" && <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF7A00]" />}
                    </div>
                    <span className="text-base sm:text-lg font-bold">Net Banking</span>
                  </div>
                  <span className="material-symbols-outlined text-[20px] sm:text-[24px] text-gray-500">account_balance</span>
                </div>

                {paymentMethod === "netbanking" && (
                  <div className="mt-4 sm:mt-5 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider block mb-2 sm:mb-3">Select Your Bank</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                      {["SBI", "HDFC", "ICICI", "Axis"].map((bank) => (
                        <button key={bank} className="bg-[#0A0A0A] border border-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 text-xs md:text-sm text-gray-300 hover:border-[#FF7A00]/50 hover:text-white transition-all">
                          {bank}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/5">
              {[
                { icon: "security", label: "256-bit SSL Encryption" },
                { icon: "verified_user", label: "Secure Payment" },
                { icon: "replay", label: "30-Day Refund" },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-gray-500 text-[11px] sm:text-xs font-medium">
                  <span className="material-symbols-outlined text-[14px] sm:text-[16px] text-[#3CE36A]">{badge.icon}</span>
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="w-full xl:w-[400px] shrink-0 min-w-0">
            <div className="bg-sb-bg-elevated border border-white/5 rounded-2xl sm:rounded-[28px] overflow-hidden xl:sticky xl:top-8 shadow-xl">
              {/* Header */}
              <div className="p-4 sm:p-6 md:p-8 border-b border-white/5">
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 tracking-tight">Order Summary</h2>

                {/* Course Info */}
                <div className="flex gap-3 sm:gap-4 items-center">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden shrink-0 bg-[#2A2A2A] border border-white/10">
                    <Image
                      src="https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg"
                      alt="Rich Dad Poor Dad"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] sm:text-[10px] font-bold text-[#FF7A00] uppercase tracking-widest mb-1 sm:mb-1.5">MASTERCLASS</div>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug mb-0.5 sm:mb-1 truncate">Rich Dad Poor Dad: Financial Literacy</h3>
                    <p className="text-[11px] sm:text-xs text-gray-500 font-medium">Lifetime Access</p>
                  </div>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="p-4 sm:p-6 md:p-8 border-b border-white/5">
                <label className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-widest block mb-2 sm:mb-3">Gift Card or Discount Code</label>
                <div className="flex gap-2 sm:gap-3">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="ENTER CODE"
                    className="flex-1 w-full bg-sb-bg border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-gray-700 outline-none focus:border-[#FF7A00]/50 transition-colors uppercase tracking-wider font-medium"
                  />
                  <button
                    onClick={() => coupon && setCouponApplied(true)}
                    className="bg-sb-surface border border-white/10 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 rounded-lg sm:rounded-xl hover:bg-white/5 hover:border-[#FF7A00]/40 transition-all shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-[#3CE36A] text-[10px] sm:text-xs font-medium mt-2.5 flex items-center gap-1 animate-in fade-in">
                    <span className="material-symbols-outlined text-[12px] sm:text-[14px]">check_circle</span>
                    Coupon applied successfully!
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="p-4 sm:p-6 md:p-8 border-b border-white/5 space-y-3 sm:space-y-4">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-gray-300 font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-[#FF7A00]">Special Discount</span>
                  <span className="text-[#FF7A00] font-medium">- ₹{discount.toLocaleString()}</span>
                </div>
              </div>

              {/* Total */}
              <div className="p-4 sm:p-6 md:p-8 pt-5 sm:pt-6 pb-4 sm:pb-6">
                <div className="flex items-baseline justify-between mb-0.5 sm:mb-1">
                  <span className="text-base sm:text-lg md:text-xl font-bold">Total</span>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">₹{total}</span>
                </div>
                <div className="text-right mb-5 sm:mb-8">
                  <span className="text-[10px] sm:text-xs text-gray-500">Including all taxes</span>
                </div>

                {/* Pay Button */}
                <button className="w-full bg-[#FF7A00] hover:bg-[#FF8F1F] text-[#3D1D00] font-bold text-base sm:text-lg py-3.5 sm:py-5 rounded-xl sm:rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 shadow-[0_8px_32px_rgba(255,122,0,0.25)] hover:shadow-[0_12px_40px_rgba(255,122,0,0.35)] hover:-translate-y-0.5 active:translate-y-0">
                  <span className="material-symbols-outlined text-[20px] sm:text-[24px]">lock</span>
                  Pay ₹{total} Now
                </button>

                <p className="text-center text-[10px] sm:text-xs text-gray-600 mt-3 sm:mt-4 flex items-center justify-center gap-1 sm:gap-1.5 font-medium">
                  <span className="material-symbols-outlined text-[12px] sm:text-[14px]">shield</span>
                  Secure encrypted transaction
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
