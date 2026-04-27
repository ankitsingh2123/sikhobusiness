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
    <div className="min-h-screen bg-[#0A0A0A] text-white px-3 sm:px-6 md:px-10 py-6 md:py-10 pb-28 md:pb-12 overflow-hidden relative font-sans">
      {/* Ambient glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FF7A00]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF9A44]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">

        {/* Page Title */}
        <div className="mb-6 md:mb-10 px-1">
          <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2">
            <span className="material-symbols-outlined text-[18px] md:text-[20px] text-[#FF7A00]">lock</span>
            <h1 className="text-xl sm:text-2xl md:text-4xl font-black tracking-tight">Secure Checkout</h1>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base ml-7 md:ml-9 leading-relaxed">Select your preferred payment method to complete the purchase.</p>
        </div>

        <div className="flex flex-col-reverse xl:flex-row gap-6 md:gap-10 min-w-0">

          {/* LEFT: Payment Methods */}
          <div className="flex-1 space-y-3 sm:space-y-4 min-w-0">

            {/* UPI */}
            <div
              className={`rounded-[24px] border cursor-pointer transition-all duration-300 min-w-0 overflow-hidden relative group ${
                paymentMethod === "upi"
                  ? "border-[#FF7A00]/50 bg-[#111]/90 backdrop-blur-md shadow-[0_10px_30px_rgba(255,122,0,0.1)]"
                  : "border-white/5 bg-[#111]/40 backdrop-blur-sm hover:border-white/20 hover:bg-[#111]/60"
              }`}
              onClick={() => setPaymentMethod("upi")}
            >
              {paymentMethod === "upi" && <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A00]/5 to-transparent pointer-events-none" />}
              <div className="p-5 sm:p-6 relative z-10">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${paymentMethod === "upi" ? "border-[#FF7A00]" : "border-gray-500"}`}>
                      {paymentMethod === "upi" && <div className="w-2.5 h-2.5 rounded-full bg-[#FF7A00] animate-pulse" />}
                    </div>
                    <span className="text-lg font-bold">UPI</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400">G</div>
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400">P</div>
                  </div>
                </div>

                {paymentMethod === "upi" && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-sm text-gray-400 leading-relaxed">Pay directly from your bank account using your UPI ID.</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="Enter UPI ID (e.g., name@bank)"
                        className="flex-1 w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#FF7A00]/50 transition-colors shadow-inner"
                      />
                      <button className="bg-white/5 border border-white/10 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-white/10 hover:border-[#FF7A00]/30 transition-all shrink-0">
                        Verify
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Credit / Debit Card */}
            <div
              className={`rounded-[24px] border cursor-pointer transition-all duration-300 min-w-0 overflow-hidden relative group ${
                paymentMethod === "card"
                  ? "border-[#FF7A00]/50 bg-[#111]/90 backdrop-blur-md shadow-[0_10px_30px_rgba(255,122,0,0.1)]"
                  : "border-white/5 bg-[#111]/40 backdrop-blur-sm hover:border-white/20 hover:bg-[#111]/60"
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              {paymentMethod === "card" && <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A00]/5 to-transparent pointer-events-none" />}
              <div className="p-5 sm:p-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${paymentMethod === "card" ? "border-[#FF7A00]" : "border-gray-500"}`}>
                      {paymentMethod === "card" && <div className="w-2.5 h-2.5 rounded-full bg-[#FF7A00] animate-pulse" />}
                    </div>
                    <span className="text-lg font-bold">Credit / Debit Card</span>
                  </div>
                  <span className="material-symbols-outlined text-[24px] text-gray-500">credit_card</span>
                </div>

                {paymentMethod === "card" && (
                  <div className="mt-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div>
                      <label className="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#FF7A00]/50 transition-colors shadow-inner"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM / YY"
                          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#FF7A00]/50 transition-colors shadow-inner"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-2">CVV</label>
                        <input
                          type="text"
                          placeholder="•••"
                          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#FF7A00]/50 transition-colors shadow-inner"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-2">Name on Card</label>
                      <input
                        type="text"
                        placeholder="Rahul Sharma"
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#FF7A00]/50 transition-colors shadow-inner"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Net Banking */}
            <div
              className={`rounded-[24px] border cursor-pointer transition-all duration-300 min-w-0 overflow-hidden relative group ${
                paymentMethod === "netbanking"
                  ? "border-[#FF7A00]/50 bg-[#111]/90 backdrop-blur-md shadow-[0_10px_30px_rgba(255,122,0,0.1)]"
                  : "border-white/5 bg-[#111]/40 backdrop-blur-sm hover:border-white/20 hover:bg-[#111]/60"
              }`}
              onClick={() => setPaymentMethod("netbanking")}
            >
              {paymentMethod === "netbanking" && <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A00]/5 to-transparent pointer-events-none" />}
              <div className="p-5 sm:p-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${paymentMethod === "netbanking" ? "border-[#FF7A00]" : "border-gray-500"}`}>
                      {paymentMethod === "netbanking" && <div className="w-2.5 h-2.5 rounded-full bg-[#FF7A00] animate-pulse" />}
                    </div>
                    <span className="text-lg font-bold">Net Banking</span>
                  </div>
                  <span className="material-symbols-outlined text-[24px] text-gray-500">account_balance</span>
                </div>

                {paymentMethod === "netbanking" && (
                  <div className="mt-5 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-3">Select Your Bank</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {["SBI", "HDFC", "ICICI", "Axis"].map((bank) => (
                        <button key={bank} className="bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-sm text-gray-300 hover:border-[#FF7A00]/50 hover:text-white transition-all shadow-inner">
                          {bank}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 mt-6 pt-6 border-t border-white/5">
              {[
                { icon: "security", label: "256-bit SSL Encryption" },
                { icon: "verified_user", label: "Secure Payment" },
                { icon: "replay", label: "30-Day Refund" },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-gray-500 text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px] text-[#3CE36A]">{badge.icon}</span>
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="w-full xl:w-[420px] shrink-0 min-w-0">
            <div className="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden xl:sticky xl:top-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A00]/10 blur-[40px] pointer-events-none rounded-full" />
              
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-white/5 relative z-10">
                <h2 className="text-xl font-black mb-6 tracking-tight">Order Summary</h2>

                {/* Course Info */}
                <div className="flex gap-4 items-center">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#0A0A0A] border border-white/10">
                    <Image
                      src="https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg"
                      alt="Rich Dad Poor Dad"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-black text-[#FF7A00] uppercase tracking-widest mb-1.5">MASTERCLASS</div>
                    <h3 className="text-base font-bold text-white leading-snug mb-1 truncate">Rich Dad Poor Dad: Financial Literacy</h3>
                    <p className="text-xs text-gray-500 font-medium">Lifetime Access</p>
                  </div>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="p-6 md:p-8 border-b border-white/5 relative z-10">
                <label className="text-xs text-gray-500 font-bold uppercase tracking-widest block mb-3">Gift Card or Discount Code</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="ENTER CODE"
                    className="flex-1 w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 outline-none focus:border-[#FF7A00]/50 transition-colors uppercase tracking-wider font-bold shadow-inner"
                  />
                  <button
                    onClick={() => coupon && setCouponApplied(true)}
                    className="bg-white/5 border border-white/10 text-white font-bold text-sm px-5 rounded-xl hover:bg-white/10 hover:border-[#FF7A00]/40 transition-all shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-[#3CE36A] text-xs font-bold mt-3 flex items-center gap-1.5 animate-in fade-in">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Coupon applied successfully!
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="p-6 md:p-8 border-b border-white/5 space-y-4 relative z-10">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-medium">Subtotal</span>
                  <span className="text-gray-300 font-bold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#FF7A00] font-bold">Special Discount</span>
                  <span className="text-[#FF7A00] font-black">- ₹{discount.toLocaleString()}</span>
                </div>
              </div>

              {/* Total */}
              <div className="p-6 md:p-8 pt-6 pb-6 relative z-10">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-lg font-black">Total</span>
                  <span className="text-4xl font-black tracking-tight">₹{total}</span>
                </div>
                <div className="text-right mb-8">
                  <span className="text-xs text-gray-500 font-medium">Including all taxes</span>
                </div>

                {/* Pay Button */}
                <button className="w-full bg-gradient-to-r from-[#FF9A44] to-[#FF7A00] text-white font-black text-lg py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(255,122,0,0.3)] hover:shadow-[0_15px_50px_rgba(255,122,0,0.4)] hover:-translate-y-1 active:translate-y-0">
                  <span className="material-symbols-outlined text-[24px]">lock</span>
                  Pay ₹{total} Now
                </button>

                <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1.5 font-bold">
                  <span className="material-symbols-outlined text-[14px]">shield</span>
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
