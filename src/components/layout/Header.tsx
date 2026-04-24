"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "../ui/Logo";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <header
      className="w-full h-16 sticky top-0 z-30 px-4 md:px-6"
      style={{
        backgroundColor: "rgba(19, 19, 19, 0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="flex items-center justify-between w-full h-full relative">
        
        {/* === Mobile Expanded Search View === */}
        {isMobileSearchOpen ? (
          <div className="flex items-center w-full gap-2 sm:hidden animate-in fade-in slide-in-from-right-4 duration-200">
            <button 
              onClick={() => setIsMobileSearchOpen(false)}
              className="p-1 rounded-full text-gray-400 hover:text-white transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-gray-500">search</span>
              <input
                type="text"
                autoFocus
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-9 pr-4 rounded-full text-sm outline-none transition-all duration-200 bg-[#2A2A2A] text-white border border-white/10 focus:border-[#FF7A00]/50"
              />
            </div>
          </div>
        ) : (
          <>
            {/* Brand Logo */}
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center">
                <Logo className="scale-75 md:scale-90 origin-left" />
              </Link>
            </div>

            {/* Center: Desktop Search Bar */}
            <div className="hidden sm:flex flex-1 max-w-xl mx-auto px-4">
              <div className="w-full relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-gray-500 group-focus-within:text-[#FF7A00] transition-colors">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search courses, books, NCERT chapters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 rounded-full text-sm outline-none transition-all duration-200"
                  style={{
                    backgroundColor: "#201f1f",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#e5e2e1",
                  }}
                  aria-label="Search courses"
                />
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Mobile search Toggle */}
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="sm:hidden p-2 rounded-lg text-gray-400 hover:text-white transition-colors"
                aria-label="Open Search"
              >
                <span className="material-symbols-outlined text-[20px] sm:text-[24px]">search</span>
              </button>

              {/* Notifications */}
              <button
                className="p-2 rounded-lg transition-all duration-200 hover:scale-105 relative text-gray-400 hover:text-white"
                aria-label="Notifications"
              >
                <span className="material-symbols-outlined text-[20px] sm:text-[24px]">notifications</span>
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF7A00]" />
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className="p-2 rounded-lg transition-all duration-200 hover:scale-105 text-gray-400 hover:text-white"
                aria-label="Cart"
              >
                <span className="material-symbols-outlined text-[20px] sm:text-[24px]">shopping_cart</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
