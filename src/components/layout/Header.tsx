"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "../ui/Logo";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header
      className="w-full h-16 sticky top-0 z-30 flex items-center justify-between px-4 md:px-6"
      style={{
        backgroundColor: "rgba(19, 19, 19, 0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Brand Logo */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center">
          <Logo className="scale-75 md:scale-90 origin-left" />
        </Link>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden sm:flex flex-1 max-w-xl mx-auto">
        <div className="w-full relative">
          <span
            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px]"
            style={{ color: "#6b6b6b" }}
          >
            search
          </span>
          <input
            type="text"
            placeholder="Search courses, books, NCERT chapters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-10 pr-4 rounded-xl text-sm outline-none transition-all duration-200"
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
      <div className="flex items-center gap-2">
        {/* Mobile search */}
        <button
          className="sm:hidden p-2 rounded-lg transition-colors"
          style={{ color: "#6b6b6b" }}
          aria-label="Search"
        >
          <span className="material-symbols-outlined text-[20px]">search</span>
        </button>

        {/* Notifications */}
        <button
          className="p-2 rounded-lg transition-all duration-200 hover:scale-105 relative"
          style={{ color: "#6b6b6b" }}
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined text-[20px]">
            notifications
          </span>
          <div
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ backgroundColor: "#FF7A00" }}
          />
        </button>

        {/* Cart */}
        <Link
          href="/cart"
          className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
          style={{ color: "#6b6b6b" }}
          aria-label="Cart"
        >
          <span className="material-symbols-outlined text-[20px]">
            shopping_cart
          </span>
        </Link>
      </div>
    </header>
  );
}
