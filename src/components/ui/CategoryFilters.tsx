"use client";

import React, { useState } from "react";
import Link from "next/link";

interface CategoryFiltersProps {
  categories: string[];
  currentCategory: string;
  searchQuery?: string;
}

export function CategoryFilters({ categories, currentCategory, searchQuery }: CategoryFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Initially show 14 categories including "All"
  const INITIAL_COUNT = 14;
  const visibleCategories = isExpanded ? categories : categories.slice(0, INITIAL_COUNT);

  return (
    <div className="mb-8 md:mb-10 flex flex-col gap-2.5">
      {/* ── ROW 1 ── */}
      <div 
        className="flex flex-nowrap gap-2 overflow-x-auto pb-1 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.slice(0, Math.ceil(categories.length / 2)).map((cat, idx) => {
          const isActive = currentCategory === cat;
          const query: Record<string, string> = { category: cat };
          if (searchQuery) query.q = searchQuery;

          return (
            <Link
              key={idx}
              href={{ pathname: "/", query }}
              className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-semibold whitespace-nowrap transition-all duration-200 flex items-center justify-center flex-shrink-0 ${
                isActive
                  ? "bg-[#FF7A00] text-white shadow-[0_4px_15px_rgba(255,122,0,0.4)] border border-[#FF7A00]/20"
                  : "bg-[#0D0E1A] text-gray-400 hover:bg-[#121324] hover:text-white border border-white/5 hover:border-white/10"
              }`}
            >
              {cat}
            </Link>
          );
        })}
      </div>

      {/* ── ROW 2 ── */}
      <div 
        className="flex flex-nowrap gap-2 overflow-x-auto pb-1 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.slice(Math.ceil(categories.length / 2)).map((cat, idx) => {
          const isActive = currentCategory === cat;
          const query: Record<string, string> = { category: cat };
          if (searchQuery) query.q = searchQuery;

          return (
            <Link
              key={idx}
              href={{ pathname: "/", query }}
              className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-semibold whitespace-nowrap transition-all duration-200 flex items-center justify-center flex-shrink-0 ${
                isActive
                  ? "bg-[#FF7A00] text-white shadow-[0_4px_15px_rgba(255,122,0,0.4)] border border-[#FF7A00]/20"
                  : "bg-[#0D0E1A] text-gray-400 hover:bg-[#121324] hover:text-white border border-white/5 hover:border-white/10"
              }`}
            >
              {cat}
            </Link>
          );
        })}

        {/* View More link leading to all courses */}
        <Link 
          href="/courses" 
          className="px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold whitespace-nowrap bg-[#12131A] text-[#FF7A00] hover:bg-[#FF7A00]/10 border border-[#FF7A00]/20 hover:border-[#FF7A00]/40 transition-all duration-300 flex items-center justify-center flex-shrink-0 gap-0.5 shadow-sm cursor-pointer"
        >
          <span>View More</span>
          <span className="material-symbols-outlined text-[14px] sm:text-[16px]">
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  );
}
