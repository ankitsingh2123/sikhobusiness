"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center p-4 font-sans">
      
      {/* Main Receipt Card */}
      <div className="w-full max-w-[460px] bg-[#1A1A1A] rounded-[24px] border border-white/5 shadow-2xl p-8 md:p-10 relative overflow-hidden flex flex-col items-center">
        
        {/* Top Green Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[150px] bg-[#3CE36A] opacity-[0.05] blur-[60px] pointer-events-none"></div>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-[#3CE36A]/10 border border-[#3CE36A]/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(60,227,106,0.15)] relative z-10">
          <div className="w-10 h-10 bg-[#3CE36A] rounded-full flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-black text-[24px] font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-3 tracking-tight relative z-10 text-center">
          Payment Successful
        </h1>
        
        <p className="text-[#999] text-[15px] text-center mb-10 leading-relaxed max-w-[340px] relative z-10">
          Thank you for your purchase. Your journey begins now.
        </p>

        {/* Transaction Details Box */}
        <div className="w-full bg-[#111111] rounded-2xl border border-white/5 mb-8 relative z-10">
          
          {/* Course Info */}
          <div className="p-5 flex items-center gap-4 border-b border-white/5">
            <div className="w-14 h-14 rounded-xl bg-gray-800 overflow-hidden shrink-0 relative border border-white/10">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPJCggFkjVFZZj5DEReHfqXFG4D5yBhoXbb8SQV-5wjJCfkDGiyb3FkQpHqurCbnb6lXeIuqvuYZe8KGfIX9GXG9ungwxUL87dxjKWtP42-xnZ8cXkofhCimqmojXN9w9ftk8oTIEKsEzaj-2AOL3Nxt51M3g7pWk16kOLZ6VlBjPJ6_oceQhqq2C6gcwKFZYmcP3eR45X8c9JVubexfhVYFIze1eXT3k211hPzFr5Fupjz5egDjzfCKkcLiVtRL3opsT-VqR7" 
                alt="Course" 
                fill 
                className="object-cover" 
              />
            </div>
            <div>
              <h3 className="text-white font-medium text-[15px] leading-tight mb-1.5">
                Rich Dad Poor Dad Masterclass
              </h3>
              <div className="flex items-center gap-1.5 text-[#888] text-[12px]">
                <span className="material-symbols-outlined text-[14px]">school</span>
                Seekho Business
              </div>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-[#888]">Transaction ID</span>
              <span className="text-white font-medium tracking-wide">TXN-8472910-NL</span>
            </div>
            
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-[#888]">Date</span>
              <span className="text-white font-medium">Oct 24, 2024</span>
            </div>
            
            <div className="w-full border-t border-dashed border-white/10 my-1"></div>
            
            <div className="flex justify-between items-center">
              <span className="text-[#888] text-[14px] font-medium">Total Amount</span>
              <span className="text-[#3CE36A] text-[16px] font-bold tracking-wide">Γé╣99.00</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link href="/watch/rich-dad-poor-dad" className="w-full relative z-10 mb-6">
          <button className="w-full bg-[#FF7A00] hover:bg-[#FF8A1F] text-[#3D1D00] font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,122,0,0.2)] hover:shadow-[0_8px_20px_rgba(255,122,0,0.3)]">
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
            Start Learning
          </button>
        </Link>
        
        {/* Download Receipt */}
        <button className="flex items-center gap-2 text-[#888] hover:text-white transition-colors text-[13px] font-medium relative z-10">
          <span className="material-symbols-outlined text-[18px]">receipt_long</span>
          Download Receipt
        </button>

      </div>
    </div>
  );
}
