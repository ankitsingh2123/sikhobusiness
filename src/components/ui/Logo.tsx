"use client";

import React from "react";

export function Logo({ className = "", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 md:gap-3 ${className}`}>
      {/* 3D Generated Icon */}
      <div 
        className="w-8 h-8 md:w-12 md:h-12 rounded-[12px] flex items-center justify-center relative overflow-hidden shrink-0 shadow-lg shadow-[#FF7A00]/20 border border-white/10"
      >
        <img 
          src="/logo-icon.png" 
          alt="Seekho Business Logo" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col -space-y-1 md:-space-y-2">
          <span className="text-white font-black text-[11px] sm:text-base md:text-2xl tracking-tight leading-none">Seekho</span>
          <span className="text-[#FF7A00] font-black text-[11px] sm:text-base md:text-2xl tracking-tight leading-none">Business</span>
          <span className="hidden md:block text-[9px] text-gray-500 font-bold tracking-[0.2em] uppercase mt-1">seekhobusiness.co.in</span>
        </div>
      )}
    </div>
  );
}
