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
        <div className="flex flex-col -space-y-1">
          <div className="flex items-center">
            <span className="text-white font-black text-base md:text-2xl tracking-tight">Seekho</span>
            <span className="text-[#FF7A00] font-black text-base md:text-2xl tracking-tight ml-1">Business</span>
          </div>
          <span className="hidden sm:block text-[9px] text-gray-500 font-bold tracking-[0.2em] uppercase">seekhobusiness.co.in</span>
        </div>
      )}
    </div>
  );
}
