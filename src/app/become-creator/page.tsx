"use client";

import Image from "next/image";
import Link from "next/link";

export default function BecomeCreatorPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#FF7A00] selection:text-white font-sans overflow-x-hidden">
      
      {/* Hero Section */}
      <div className="relative pt-16 pb-12 md:pt-24 md:pb-20 px-4 sm:px-6 md:px-12 flex flex-col items-center text-center overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF7A00]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-[#FF7A00] font-bold text-[10px] sm:text-xs mb-4 animate-fade-in-up">
            <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
            Never Happened In History
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            The Highest Paying <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FFB700]">Creator Platform.</span>
          </h1>
          
          <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            Keep exactly what you earn. While others take <span className="text-[#FF4D4D] font-bold">30% to 50%</span>, we charge an industry-shattering <strong>7% flat fee</strong>.<br/>
            <span className="text-white bg-white/5 px-4 py-2 rounded-xl inline-block border border-white/10 mt-3 text-[10px] sm:text-xs text-left max-w-md">
              💡 <strong>The Math:</strong> Sell for ₹100, we take ₹7. After gateway fees (~3%), you pocket <strong>~₹90 directly.</strong> Other platforms only give you ₹50-₹60.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <Link 
              href="/creator-onboarding"
              className="w-full sm:w-auto px-6 py-3 bg-[#FF7A00] hover:bg-[#FF8A1F] text-[#3D1D00] font-bold text-sm rounded-full transition-all shadow-[0_10px_30px_rgba(255,122,0,0.2)] flex items-center justify-center gap-2"
            >
              Become A Creator Now
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
            <Link 
              href="/courses" 
              className="w-full sm:w-auto px-6 py-3 bg-transparent border border-white/20 hover:bg-white/5 text-white font-bold text-sm rounded-full transition-all text-center"
            >
              Explore Courses First
            </Link>
          </div>
        </div>
      </div>

      {/* Stats / Comparison Section */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-12 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1 */}
          <div className="bg-[#141414] p-6 rounded-2xl border border-white/5 hover:border-[#FF7A00]/30 transition-colors group">
            <div className="w-10 h-10 bg-[#FF7A00]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[20px] text-[#FF7A00]">flash_on</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1-Hour Payouts 🚀</h3>
            <p className="text-gray-500 text-[11px] leading-relaxed">
              Get paid within <strong>1 hour</strong> of every sale. Instant liquidity for your business.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#141414] p-6 rounded-2xl border border-white/5 hover:border-[#FF7A00]/30 transition-colors group">
            <div className="w-10 h-10 bg-[#FF7A00]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[20px] text-[#FF7A00]">security</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Safe Access</h3>
            <p className="text-gray-500 text-[11px] leading-relaxed">
              Upgrading to Creator won't affect your student profile or purchased courses.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#141414] p-6 rounded-2xl border border-white/5 hover:border-[#FF7A00]/30 transition-colors group">
            <div className="w-10 h-10 bg-[#FF7A00]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[20px] text-[#FF7A00]">public</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">High Profit</h3>
            <p className="text-gray-500 text-[11px] leading-relaxed">
              Keep ₹90 on every ₹100 instead of just ₹50. Your hard work, your money.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
