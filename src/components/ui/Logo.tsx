"use client";

import React from "react";

export function Logo({ className = "", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 md:gap-3 ${className}`}>
      {/* 3D Generated Icon - Now Rectangular */}
      <div 
        className="w-32 h-10 sm:w-40 sm:h-12 md:w-48 md:h-16 flex items-center justify-center relative overflow-hidden shrink-0"
      >
        <img 
          src="/images/logo-rect.png" 
          alt="Seekho Business Logo" 
          className="w-full h-full object-cover"
          style={{ mixBlendMode: "screen" }}
        />
      </div>
    </div>
  );
}
