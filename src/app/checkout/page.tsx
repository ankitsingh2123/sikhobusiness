"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [upiId, setUpiId] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = 4999;
  const discount = 4900;
  const total = subtotal - discount;

  return (
    <div className="min-h-screen bg-sb-bg text-white p-6 md:p-10">
      <div className="max-w-[1200px] mx-auto">

        {/* Page Title */}
        <div className="mb-8 md:mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-[20px] text-gray-500">lock</span>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">Secure Checkout</h1>
          </div>
          <p className="text-gray-400 text-sm md:text-base ml-9 leading-relaxed">Select your preferred payment method to complete the purchase.</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-10">

          {/* LEFT: Payment Methods */}
          <div className="flex-1 space-y-4">

            {/* UPI */}
            <div
              className={`rounded-2xl border cursor-pointer transition-all duration-200 ${
                paymentMethod === "upi"
                  ? "border-[#FF7A00] bg-sb-bg-elevated"
                  : "border-white/8 bg-sb-surface hover:border-white/20"
              }`}
              onClick={() => setPaymentMethod("upi")}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === "upi" ? "border-[#FF7A00]" : "border-gray-500"}`}>
                      {paymentMethod === "upi" && <div className="w-2.5 h-2.5 rounded-full bg-[#FF7A00]" />}
                    </div>
                    <span className="text-lg font-bold">UPI</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-gray-400">G</div>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-gray-400">P</div>
                  </div>
                </div>

                {paymentMethod === "upi" && (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-400">Pay directly from your bank account using your UPI ID.</p>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="Enter UPI ID (e.g., name@bank)"
                        className="flex-1 bg-sb-bg border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#FF7A00]/50 transition-colors"
                      />
                      <button className="bg-sb-surface border border-white/10 text-white font-medium text-sm px-5 py-3 rounded-xl hover:bg-white/5 transition-colors">
                        Verify
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Credit / Debit Card */}
            <div
              className={`rounded-2xl border cursor-pointer transition-all duration-200 ${
                paymentMethod === "card"
                  ? "border-[#FF7A00] bg-sb-bg-elevated"
                  : "border-white/8 bg-sb-surface hover:border-white/20"
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === "card" ? "border-[#FF7A00]" : "border-gray-500"}`}>
                      {paymentMethod === "card" && <div className="w-2.5 h-2.5 rounded-full bg-[#FF7A00]" />}
                    </div>
                    <span className="text-lg font-bold">Credit / Debit Card</span>
                  </div>
                  <span className="material-symbols-outlined text-[24px] text-gray-500">credit_card</span>
                </div>

                {paymentMethod === "card" && (
                  <div className="mt-5 space-y-4">
                    <div>
                      <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full bg-sb-bg border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#FF7A00]/50 transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM / YY"
                          className="w-full bg-sb-bg border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#FF7A00]/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-2">CVV</label>
                        <input
                          type="text"
                          placeholder="•••"
                          className="w-full bg-sb-bg border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#FF7A00]/50 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-2">Name on Card</label>
                      <input
                        type="text"
                        placeholder="Rahul Sharma"
                        className="w-full bg-sb-bg border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#FF7A00]/50 transition-colors"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Net Banking */}
            <div
              className={`rounded-2xl border cursor-pointer transition-all duration-200 ${
                paymentMethod === "netbanking"
                  ? "border-[#FF7A00] bg-sb-bg-elevated"
                  : "border-white/8 bg-sb-surface hover:border-white/20"
              }`}
              onClick={() => setPaymentMethod("netbanking")}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === "netbanking" ? "border-[#FF7A00]" : "border-gray-500"}`}>
                      {paymentMethod === "netbanking" && <div className="w-2.5 h-2.5 rounded-full bg-[#FF7A00]" />}
                    </div>
                    <span className="text-lg font-bold">Net Banking</span>
                  </div>
                  <span className="material-symbols-outlined text-[24px] text-gray-500">account_balance</span>
                </div>

                {paymentMethod === "netbanking" && (
                  <div className="mt-5">
                    <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-3">Select Your Bank</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {["SBI", "HDFC", "ICICI", "Axis"].map((bank) => (
                        <button key={bank} className="bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-xs md:text-sm text-gray-300 hover:border-[#FF7A00]/50 hover:text-white transition-all">
                          {bank}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-white/5">
              {[
                { icon: "security", label: "256-bit SSL Encryption" },
                { icon: "verified_user", label: "Secure Payment" },
                { icon: "replay", label: "30-Day Refund" },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-gray-500 text-xs">
                  <span className="material-symbols-outlined text-[16px] text-gray-600">{badge.icon}</span>
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="w-full xl:w-[400px] shrink-0">
            <div className="bg-sb-bg-elevated border border-white/5 rounded-[28px] overflow-hidden sticky top-8">
              {/* Header */}
              <div className="p-8 border-b border-white/5">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                {/* Course Info */}
                <div className="flex gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#2A2A2A] border border-white/10">
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPJCggFkjVFZZj5DEReHfqXFG4D5yBhoXbb8SQV-5wjJCfkDGiyb3FkQpHqurCbnb6lXeIuqvuYZe8KGfIX9GXG9ungwxUL87dxjKWtP42-xnZ8cXkofhCimqmojXN9w9ftk8oTIEKsEzaj-2AOL3Nxt51M3g7pWk16kOLZ6VlBjPJ6_oceQhqq2C6gcwKFZYmcP3eR45X8c9JVubexfhVYFIze1eXT3k211hPzFr5Fupjz5egDjzfCKkcLiVtRL3opsT-VqR7"
                      alt="Rich Dad Poor Dad"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-[#FF7A00] uppercase tracking-widest mb-1.5">MASTERCLASS</div>
                    <h3 className="text-base font-bold text-white leading-snug mb-1">Rich Dad Poor Dad: Financial Literacy</h3>
                    <p className="text-xs text-gray-500 font-medium">Lifetime Access</p>
                  </div>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="p-8 border-b border-white/5">
                <label className="text-xs text-gray-500 font-bold uppercase tracking-widest block mb-3">Gift Card or Discount Code</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="ENTER CODE"
                    className="flex-1 bg-sb-bg border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 outline-none focus:border-[#FF7A00]/50 transition-colors uppercase tracking-wider font-medium"
                  />
                  <button
                    onClick={() => coupon && setCouponApplied(true)}
                    className="bg-sb-surface border border-white/10 text-white font-bold text-sm px-5 rounded-xl hover:bg-white/5 hover:border-[#FF7A00]/40 transition-all"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-[#3CE36A] text-xs font-medium mt-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Coupon applied successfully!
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="p-8 border-b border-white/5 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-gray-300 font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#FF7A00]">Special Discount</span>
                  <span className="text-[#FF7A00] font-medium">- ₹{discount.toLocaleString()}</span>
                </div>
              </div>

              {/* Total */}
              <div className="px-6 md:px-8 pt-6 pb-2">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-lg md:text-xl font-bold">Total</span>
                  <span className="text-3xl md:text-4xl font-bold">₹{total}</span>
                </div>
                <div className="text-right mb-8">
                  <span className="text-xs text-gray-500">Including all taxes</span>
                </div>

                {/* Pay Button */}
                <button className="w-full bg-[#FF7A00] hover:bg-[#FF8F1F] text-[#3D1D00] font-bold text-lg py-5 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-[0_8px_32px_rgba(255,122,0,0.25)] hover:shadow-[0_12px_40px_rgba(255,122,0,0.35)] hover:-translate-y-0.5 active:translate-y-0">
                  <span className="material-symbols-outlined text-[24px]">lock</span>
                  Pay ₹{total} Now
                </button>

                <p className="text-center text-xs text-gray-600 mt-4 flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">shield</span>
                  Secure encrypted transaction
                </p>
              </div>

              <div className="pb-6" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
