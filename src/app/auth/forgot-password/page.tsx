"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center p-4 font-sans">
      
      {/* Top Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-[#FF7A00]/10 rounded-xl flex items-center justify-center border border-[#FF7A00]/20 shadow-[0_0_15px_rgba(255,122,0,0.1)]">
          <span className="material-symbols-outlined text-[#FF7A00] text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
        </div>
        <span className="text-[22px] font-bold text-white tracking-tight">Seekho Business</span>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[460px] bg-[#1A1A1A] rounded-2xl border border-white/5 shadow-2xl p-8 md:p-10 relative overflow-hidden">
        
        {/* Subtle top gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[100px] bg-white/5 blur-[50px] pointer-events-none"></div>

        {!isSent ? (
          <>
            <div className="text-center mb-8 relative z-10">
              <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
                Reset your password
              </h1>
              <p className="text-[#999] text-[15px] leading-relaxed max-w-[320px] mx-auto">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label
                  htmlFor="email"
                  className="text-[13px] font-bold tracking-wide leading-[1.2] block mb-2 text-[#CCC]"
                >
                  Email Address
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#888]">
                    mail
                  </span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                    className="w-full py-3.5 pl-12 pr-4 rounded-lg text-sm outline-none transition-all duration-200 bg-[#111111] border border-white/10 text-white focus:border-[#FF7A00] placeholder-[#555]"
                    autoComplete="email"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full bg-[#FF7A00] hover:bg-[#FF8A1F] text-[#3D1D00] font-bold text-[15px] py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,122,0,0.2)] hover:shadow-[0_8px_20px_rgba(255,122,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#3D1D00]/30 border-t-[#3D1D00] rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-6 relative z-10">
            <div className="w-16 h-16 bg-[#3CE36A]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#3CE36A]/20">
              <span className="material-symbols-outlined text-[#3CE36A] text-[32px]">check</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Check your email</h2>
            <p className="text-[#999] text-[15px] leading-relaxed mb-8">
              We've sent a password reset link to <br/><span className="text-white font-medium">{email}</span>
            </p>
            <button 
              onClick={() => setIsSent(false)}
              className="text-[14px] font-medium text-[#FF7A00] hover:underline"
            >
              Didn't receive it? Try again
            </button>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-white/5 flex justify-center relative z-10">
          <Link 
            href="/auth/login" 
            className="flex items-center gap-2 text-[#888] hover:text-white transition-colors text-[14px] font-medium"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to Login
          </Link>
        </div>
      </div>

      {/* Footer Text */}
      <div className="mt-10 text-center">
        <p className="text-[#555] text-[11px] font-medium tracking-wide">
          Secure connection • Professional Learning Environment
        </p>
      </div>

    </div>
  );
}
