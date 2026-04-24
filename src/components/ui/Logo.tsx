"use client";

import React from "react";

export function Logo({ className = "", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Abstract Icon: Book + Growth Line */}
      <div 
        className="w-10 h-10 md:w-12 md:h-12 rounded-[14px] flex items-center justify-center relative overflow-hidden shrink-0 shadow-lg shadow-[#FF7A00]/20"
        style={{
          background: "linear-gradient(135deg, #FF7A00 0%, #F35C00 100%)",
        }}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-white drop-shadow-md"
        >
          {/* Book base */}
          <path 
            d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          {/* Growth Line transition */}
          <path 
            d="M8 12L12 8L16 12L20 6" 
            stroke="white" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col -space-y-1">
          <div className="flex items-center">
            <span className="text-white font-black text-xl md:text-2xl tracking-tight">Seekho</span>
            <span className="text-[#FF7A00] font-black text-xl md:text-2xl tracking-tight ml-1">Business</span>
          </div>
          <span className="text-[9px] text-gray-500 font-bold tracking-[0.2em] uppercase">seekhobusiness.co.in</span>
        </div>
      )}
    </div>
  );
}
