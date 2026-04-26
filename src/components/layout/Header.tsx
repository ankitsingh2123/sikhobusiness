"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Logo } from "../ui/Logo";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import Image from "next/image";

type SearchResult = {
  id: string;
  title: string;
  category: string;
  thumbnail: string | null;
  price: string;
};

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  
  const supabase = createClient();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced Search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true);
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
          if (res.ok) {
            const data = await res.json();
            setSearchResults(data.courses || []);
            setShowDropdown(true);
          }
        } catch (error) {
          console.error("Search failed:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const SearchDropdown = () => (
    <div className="absolute top-full left-0 right-0 mt-2 bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/50 z-50">
      {isSearching ? (
        <div className="p-4 text-center text-sm text-[#888]">Searching...</div>
      ) : searchResults.length > 0 ? (
        <div className="max-h-[60vh] overflow-y-auto">
          {searchResults.map((course) => (
            <Link 
              key={course.id} 
              href={`/courses/${course.id}`}
              onClick={() => {
                setShowDropdown(false);
                setIsMobileSearchOpen(false);
                setSearchQuery("");
              }}
              className="flex items-center gap-3 p-3 hover:bg-[#222] transition-colors border-b border-white/5 last:border-0"
            >
              <div className="w-12 h-12 rounded-lg bg-white/5 shrink-0 relative overflow-hidden">
                {course.thumbnail ? (
                  <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />
                ) : (
                  <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20">video_library</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{course.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-[#FF7A00] font-bold uppercase tracking-wider">{course.category}</span>
                  <span className="text-[10px] text-[#888]">Γé╣{course.price}</span>
                </div>
              </div>
            </Link>
          ))}
          <Link 
            href={`/search?q=${encodeURIComponent(searchQuery)}`}
            onClick={() => {
              setShowDropdown(false);
              setIsMobileSearchOpen(false);
            }}
            className="block w-full p-3 text-center text-sm font-bold text-[#FF7A00] hover:bg-[#222] transition-colors bg-[#111]"
          >
            See all results
          </Link>
        </div>
      ) : (
        <div className="p-4 text-center text-sm text-[#888]">No courses found</div>
      )}
    </div>
  );

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
          <div className="flex items-center w-full gap-2 sm:hidden animate-in fade-in slide-in-from-right-4 duration-200" ref={searchRef}>
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
                onFocus={() => searchQuery.trim().length >= 2 && setShowDropdown(true)}
                className="w-full py-2 pl-9 pr-4 rounded-full text-sm outline-none transition-all duration-200 bg-[#2A2A2A] text-white border border-white/10 focus:border-[#FF7A00]/50"
              />
              {showDropdown && <SearchDropdown />}
            </div>
          </div>
        ) : (
          <>
            {/* Brand Logo */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center">
                <Logo className="scale-75 md:scale-90 origin-left" />
              </Link>
            </div>

            {/* Center: Desktop Search Bar */}
            <div className="hidden sm:flex flex-1 max-w-xl mx-auto px-4" ref={searchRef}>
              <div className="w-full relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-gray-500 group-focus-within:text-[#FF7A00] transition-colors">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search courses, books, NCERT chapters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim().length >= 2 && setShowDropdown(true)}
                  className="w-full py-2 pl-10 pr-4 rounded-full text-sm outline-none transition-all duration-200"
                  style={{
                    backgroundColor: "#201f1f",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#e5e2e1",
                  }}
                  aria-label="Search courses"
                />
                {showDropdown && <SearchDropdown />}
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Become Creator Button */}
              <Link 
                href="/become-creator" 
                className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF7A00]/10 to-[#FF7A00]/5 border border-[#FF7A00]/30 hover:border-[#FF7A00] transition-all text-sm font-bold text-[#FF7A00]"
              >
                <span className="material-symbols-outlined text-[18px]">campaign</span>
                Become Creator
              </Link>

              {/* All Categories Button */}
              <Link 
                href="/courses" 
                className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all text-sm font-medium text-white mr-1"
              >
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
                All Categories
              </Link>

              {/* Mobile Become Creator Icon */}
              <Link 
                href="/become-creator" 
                className="md:hidden p-2 rounded-lg text-[#FF7A00] hover:bg-[#FF7A00]/10 transition-all active:scale-90"
                title="Become Creator"
              >
                <span className="material-symbols-outlined text-[22px]">campaign</span>
              </Link>

              {/* Mobile search Toggle */}
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="sm:hidden p-2 rounded-lg text-gray-400 hover:text-white transition-colors"
                aria-label="Open Search"
              >
                <span className="material-symbols-outlined text-[20px] sm:text-[24px]">search</span>
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className="p-2 rounded-lg transition-all duration-200 hover:scale-105 text-gray-400 hover:text-white"
                aria-label="Cart"
              >
                <span className="material-symbols-outlined text-[20px] sm:text-[24px]">shopping_cart</span>
              </Link>

              {/* Auth */}
              {user ? (
                <div className="relative group ml-1">
                  <button
                    className="w-8 h-8 rounded-full overflow-hidden border border-white/10 hover:border-[#FF7A00] transition-colors flex-shrink-0"
                    title={user.email || "Account"}
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#FF7A00] flex items-center justify-center text-white font-bold text-xs">
                        {user.email?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </button>
                  {/* Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-52 py-1.5 rounded-xl border border-white/10 shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50"
                    style={{ backgroundColor: "#1A1A1A" }}
                  >
                    <div className="px-4 py-2 border-b border-white/5 mb-1">
                      <p className="text-white text-xs font-medium truncate">{user.user_metadata?.full_name || "Student"}</p>
                      <p className="text-[#666] text-[10px] truncate">{user.email}</p>
                    </div>
                    <Link href="/account" className="flex items-center gap-2.5 px-4 py-2 text-[#aaa] hover:text-white hover:bg-white/5 transition-colors text-xs">
                      <span className="material-symbols-outlined text-[15px]">person</span>
                      My Profile
                    </Link>
                    <Link href="/billing" className="flex items-center gap-2.5 px-4 py-2 text-[#aaa] hover:text-white hover:bg-white/5 transition-colors text-xs">
                      <span className="material-symbols-outlined text-[15px]">workspace_premium</span>
                      My Certificates
                    </Link>
                    <Link href="/transactions" className="flex items-center gap-2.5 px-4 py-2 text-[#aaa] hover:text-white hover:bg-white/5 transition-colors text-xs">
                      <span className="material-symbols-outlined text-[15px]">receipt_long</span>
                      Purchase History
                    </Link>
                    <div className="border-t border-white/5 mt-1 pt-1">
                      <button
                        onClick={() => supabase.auth.signOut()}
                        className="flex items-center gap-2.5 w-full px-4 py-2 text-[#FF4D4D] hover:bg-[#FF4D4D]/10 transition-colors text-xs"
                      >
                        <span className="material-symbols-outlined text-[15px]">logout</span>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="ml-1 px-3 py-1.5 rounded-full text-xs font-bold text-white flex-shrink-0"
                  style={{ background: "#FF7A00" }}
                >
                  Login
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
