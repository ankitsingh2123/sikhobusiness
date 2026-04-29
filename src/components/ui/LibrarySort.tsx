"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export function LibrarySort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentSort = searchParams.get("sort") || "newest";

  const options = [
    { value: "newest", label: "Newest First", icon: "schedule" },
    { value: "oldest", label: "Oldest First", icon: "history" },
    { value: "price-low", label: "Price: Low to High", icon: "arrow_upward" },
    { value: "price-high", label: "Price: High to Low", icon: "arrow_downward" },
    { value: "az", label: "A to Z", icon: "sort_by_alpha" },
    { value: "za", label: "Z to A", icon: "sort_by_alpha" },
  ];

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 sm:gap-1.5 py-1 sm:py-1.5 px-2.5 sm:px-3 rounded-full border border-white/10 hover:border-[#FF7A00]/40 hover:bg-[#FF7A00]/5 transition-all duration-300 text-[12px] sm:text-sm font-bold text-white/80 hover:text-white"
      >
        <span className="material-symbols-outlined text-[14px] sm:text-[16px]">sort</span>
        Sort
        <span className="material-symbols-outlined text-[14px] sm:text-[16px] transition-transform duration-300" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>expand_more</span>
      </button>

      <div 
        className={`absolute right-0 top-full mt-2 w-44 sm:w-48 bg-[#111] border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 overflow-hidden py-1 transition-all duration-300 origin-top-right ${isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSort(option.value)}
            className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 text-[12px] sm:text-sm transition-colors ${
              currentSort === option.value 
                ? "bg-[#FF7A00]/10 text-[#FF9A44] font-bold" 
                : "text-white/70 hover:bg-white/5 hover:text-white font-medium"
            }`}
          >
            <span className="material-symbols-outlined text-[14px] sm:text-[16px]">{option.icon}</span>
            {option.label}
            {currentSort === option.value && (
              <span className="material-symbols-outlined text-[14px] sm:text-[16px] ml-auto text-[#FF9A44] font-black">check</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
