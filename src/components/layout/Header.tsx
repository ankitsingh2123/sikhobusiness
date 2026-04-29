"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Logo } from "../ui/Logo";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { apiUrl } from "@/lib/api";

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
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<"STUDENT" | "CREATOR" | "ADMIN">("STUDENT");
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const supabase = createClient();
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  async function fetchRole(token: string) {
    try {
      const d = await fetch(apiUrl("/api/user/me"), {
        headers: { Authorization: `Bearer ${token}` },
      }).then(r => r.json());
      // /me returns { user: {...}, pending: bool }
      const role = d.user?.role ?? d.role ?? "STUDENT";
      setUserRole(role);
    } catch { /* silent */ }
  }

  useEffect(() => {
    // getSession reads from localStorage — instant, no network call
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsAuthLoading(false);
      if (session?.access_token) fetchRole(session.access_token);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      setIsAuthLoading(false);
      if (session?.access_token) {
        fetchRole(session.access_token);
      } else {
        setUserRole("STUDENT");
      }
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
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
          const res = await fetch(apiUrl(`/api/search?q=${encodeURIComponent(searchQuery)}`));
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
    <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-[#1A1A1A] border border-white/5 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-50 animate-in fade-in zoom-in-95 duration-200">
      {isSearching ? (
        <div className="p-8 text-center">
          <div className="w-6 h-6 border-2 border-[#FF7A00] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-[12px] text-gray-500 font-medium">Searching courses...</p>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="max-h-[65vh] overflow-y-auto custom-scrollbar">
          {searchResults.map((course) => (
            <Link 
              key={course.id} 
              href={`/courses/${course.id}`}
              onClick={() => {
                setShowDropdown(false);
                setIsMobileSearchOpen(false);
                setSearchQuery("");
              }}
              className="flex items-center gap-4 p-4 hover:bg-white/[0.03] active:bg-white/[0.06] transition-all border-b border-white/[0.03] last:border-0"
            >
              <div className="w-14 h-14 rounded-xl bg-[#222] shrink-0 relative overflow-hidden shadow-inner">
                {course.thumbnail ? (
                  <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />
                ) : (
                  <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/10 text-[20px]">video_library</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold text-white truncate leading-tight mb-1">{course.title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#FF7A00] font-bold uppercase tracking-widest">{course.category}</span>
                  <div className="w-1 h-1 rounded-full bg-white/10" />
                  <span className="text-[10px] text-gray-500 font-bold">Γé╣{course.price}</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-700 text-[18px]">chevron_right</span>
            </Link>
          ))}
          <Link 
            href={`/search?q=${encodeURIComponent(searchQuery)}`}
            onClick={() => {
              setShowDropdown(false);
              setIsMobileSearchOpen(false);
            }}
            className="flex items-center justify-center gap-2 w-full p-4 text-[13px] font-black text-[#FF7A00] hover:bg-[#FF7A00]/5 transition-colors bg-[#111] border-t border-white/5"
          >
            See all {searchResults.length} results
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      ) : (
        <div className="p-10 text-center">
          <span className="material-symbols-outlined text-gray-700 text-[32px] mb-2">search_off</span>
          <p className="text-[13px] text-gray-500 font-medium">No courses found for "{searchQuery}"</p>
        </div>
      )}
    </div>
  );

  return (
    <header
      className="fixed top-0 left-0 right-0 h-16 z-50 px-4 md:px-6"
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
          <div className="absolute inset-0 flex items-center gap-3 px-2 sm:hidden animate-in fade-in slide-in-from-top-2 duration-300 z-[60] bg-[#131313]" ref={searchRef}>
            <button 
              onClick={() => {
                setIsMobileSearchOpen(false);
                setSearchQuery("");
              }}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all shrink-0 active:scale-95"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back_ios_new</span>
            </button>
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#FF7A00]/70 group-focus-within:text-[#FF7A00]">search</span>
              <input
                type="text"
                autoFocus
                placeholder="Search courses, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim().length >= 2 && setShowDropdown(true)}
                className="w-full py-2.5 pl-10 pr-10 rounded-xl text-[14px] outline-none transition-all duration-300 bg-[#1C1C1C] text-white border border-white/5 focus:border-[#FF7A00]/40 focus:ring-4 focus:ring-[#FF7A00]/5 placeholder:text-gray-600"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-500 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
              {showDropdown && <SearchDropdown />}
            </div>
          </div>
        ) : (
          <>
            {/* Brand Logo */}
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center">
                <Logo className="scale-[0.8] sm:scale-75 md:scale-90 origin-left" />
              </Link>
            </div>

            {/* Center: Desktop Search Bar */}
            <div className="hidden sm:flex flex-1 max-w-xs md:max-w-md lg:max-w-xl mx-auto px-2 md:px-4" ref={searchRef}>
              <div className="w-full relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-gray-500 group-focus-within:text-[#FF7A00] transition-colors">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim().length >= 2 && setShowDropdown(true)}
                  className="w-full py-2 pl-10 pr-4 rounded-full text-xs md:text-sm outline-none transition-all duration-200"
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
            <div className="flex items-center gap-0.5 sm:gap-2 shrink-0 pr-1 sm:pr-0">
              {/* Become Creator Button */}
              {userRole === "CREATOR" || userRole === "ADMIN" ? (
                <Button
                  href="/creator"
                  variant="glass"
                  size="sm"
                  className="!px-1.5 sm:!px-3 !text-[#3CE36A] hover:!bg-[#3CE36A]/10 !border-transparent"
                  leftIcon={<span className="material-symbols-outlined text-[18px] md:text-[20px]">video_library</span>}
                >
                  <span className="hidden lg:inline">Creator Studio</span>
                </Button>
              ) : (
                <Button
                  href="/become-creator"
                  variant="glass"
                  size="sm"
                  className="!px-1.5 sm:!px-3 !text-[#FF7A00] hover:!bg-[#FF7A00]/10 !border-transparent"
                  leftIcon={<span className="material-symbols-outlined text-[18px] md:text-[20px]">campaign</span>}
                >
                  <span className="hidden lg:inline">Become Creator</span>
                </Button>
              )}



              {/* All Categories Button */}
              <Button
                href="/search"
                variant="glass"
                size="sm"
                className="hidden sm:flex !px-3 !text-white hover:!bg-white/10 !border-white/10"
                leftIcon={<span className="material-symbols-outlined text-[18px] md:text-[20px]">grid_view</span>}
              >
                <span className="hidden xl:inline">All Categories</span>
              </Button>

              {/* Cart Icon */}
              <Link
                href="/cart"
                className="hidden sm:flex p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all relative group"
                aria-label="Shopping Cart"
              >
                <span className="material-symbols-outlined text-[22px] md:text-[24px]">shopping_cart</span>
                {/* Optional: Cart badge can be added here if needed */}
              </Link>

              {/* Mobile search Toggle (Only for screen < sm) */}
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="sm:hidden p-1.5 rounded-lg text-gray-400 hover:text-white transition-colors flex items-center justify-center"
                aria-label="Open Search"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
              </button>



              {/* Auth — skeleton while loading to prevent flash */}
              {isAuthLoading ? (
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 animate-pulse ml-0 sm:ml-0.5" />
              ) : user ? (
                <div className="relative group ml-0 sm:ml-0.5" ref={profileRef}>
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-white/10 hover:border-[#FF7A00] transition-colors flex-shrink-0 flex items-center justify-center"
                    title={user.email || "Account"}
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#FF7A00] flex items-center justify-center text-white font-bold text-[10px]">
                        {user.email?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </button>
                  {/* Dropdown */}
                  <div className={`absolute right-0 top-full mt-2 w-52 py-1.5 rounded-xl border border-white/10 shadow-2xl transition-all duration-200 z-50 ${showProfileDropdown ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2 lg:group-hover:opacity-100 lg:group-hover:pointer-events-auto lg:group-hover:translate-y-0'}`}
                    style={{ backgroundColor: "#1A1A1A" }}
                  >
                    <div className="px-4 py-2 border-b border-white/5 mb-1">
                      <p className="text-white text-xs font-medium truncate">{user.user_metadata?.full_name || "Student"}</p>
                      <p className="text-[#666] text-[10px] truncate">{user.email}</p>
                    </div>
                    <Link href="/account" onClick={() => setShowProfileDropdown(false)} className="flex items-center gap-2.5 px-4 py-2 text-[#aaa] hover:text-white hover:bg-white/5 transition-colors text-xs">
                      <span className="material-symbols-outlined text-[15px]">person</span>
                      My Profile
                    </Link>
                    <Link href="/billing" onClick={() => setShowProfileDropdown(false)} className="flex items-center gap-2.5 px-4 py-2 text-[#aaa] hover:text-white hover:bg-white/5 transition-colors text-xs">
                      <span className="material-symbols-outlined text-[15px]">workspace_premium</span>
                      My Certificates
                    </Link>
                    <Link href="/transactions" onClick={() => setShowProfileDropdown(false)} className="flex items-center gap-2.5 px-4 py-2 text-[#aaa] hover:text-white hover:bg-white/5 transition-colors text-xs">
                      <span className="material-symbols-outlined text-[15px]">receipt_long</span>
                      Purchase History
                    </Link>
                    <Link href="/cart" onClick={() => setShowProfileDropdown(false)} className="sm:hidden flex items-center gap-2.5 px-4 py-2 text-[#aaa] hover:text-white hover:bg-white/5 transition-colors text-xs">
                      <span className="material-symbols-outlined text-[15px]">shopping_cart</span>
                      My Cart
                    </Link>
                    <div className="border-t border-white/5 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setShowProfileDropdown(false);
                          supabase.auth.signOut();
                        }}
                        className="flex items-center gap-2.5 w-full px-4 py-2 text-[#FF4D4D] hover:bg-[#FF4D4D]/10 transition-colors text-xs"
                      >
                        <span className="material-symbols-outlined text-[15px]">logout</span>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  href="/auth/login"
                  variant="primary"
                  size="sm"
                  className="ml-1 flex-shrink-0 !text-[11px]"
                >
                  Login
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
