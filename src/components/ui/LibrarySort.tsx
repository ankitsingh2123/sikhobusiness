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
        className="flex items-center gap-1.5 p-1.5 px-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors text-sm font-medium text-[#555]"
      >
        <span className="material-symbols-outlined text-[16px]">sort</span>
        Sort
        <span className="material-symbols-outlined text-[16px]">{isOpen ? "expand_less" : "expand_more"}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden py-1">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSort(option.value)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                currentSort === option.value 
                  ? "bg-[#FF7A00]/10 text-[#FF7A00] font-bold" 
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{option.icon}</span>
              {option.label}
              {currentSort === option.value && (
                <span className="material-symbols-outlined text-[16px] ml-auto">check</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
