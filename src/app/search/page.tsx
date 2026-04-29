"use client";

import React, { useState, useEffect, useCallback, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

interface Course {
  id: string; title: string; description: string;
  category: string; thumbnail: string | null; price: number;
}
interface SearchResponse {
  courses: Course[]; total: number; page: number;
  pageSize: number; totalPages: number; allCategories: string[];
}

const SORT_OPTIONS = [
  { value: "newest",     label: "Newest First" },
  { value: "oldest",     label: "Oldest First" },
  { value: "price_asc",  label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

function SkeletonCard() {
  return (
    <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden animate-pulse">
      <div className="w-full aspect-[16/10] bg-[#1A1A1A]" />
      <div className="p-4 sm:p-5 flex flex-col gap-3">
        <div className="h-5 bg-[#1A1A1A] rounded w-3/4" />
        <div className="h-3 bg-[#1A1A1A] rounded w-full" />
        <div className="h-3 bg-[#1A1A1A] rounded w-5/6" />
        <div className="flex justify-between mt-2 pt-2 border-t border-white/5">
          <div className="h-4 bg-[#1A1A1A] rounded w-16" />
          <div className="h-4 bg-[#1A1A1A] rounded w-20" />
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course, featured }: { course: Course; featured?: boolean }) {
  const priceLabel = course.price <= 0 ? "Free" : `₹${course.price.toFixed(0)}`;
  if (featured) {
    return (
      <Link href={`/courses/${course.id}`}
        className="col-span-1 sm:col-span-2 bg-[#111]/80 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden flex flex-col md:flex-row group hover:border-[#FF7A00]/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(255,122,0,0.1)] shadow-sm relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A00]/0 to-[#FF7A00]/0 group-hover:from-[#FF7A00]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
        
        <div className="relative w-full md:w-[45%] aspect-[16/10] md:aspect-auto shrink-0 bg-[#1A1A1A] overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
          {course.thumbnail
            ? <Image src={course.thumbnail} alt={course.title} fill className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
            : <div className="absolute inset-0 flex items-center justify-center bg-[#161616] group-hover:scale-105 transition-all duration-700"><span className="material-symbols-outlined text-[64px] text-[#444]">school</span></div>}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 to-transparent md:hidden" />
          <div className="absolute top-3 left-3 bg-[#0A0A0A]/90 backdrop-blur-md border border-[#FF7A00]/20 text-[#FF9A44] text-[9px] sm:text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest shadow-lg">FEATURED</div>
        </div>
        <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col justify-between min-w-0 z-10 relative">
          <div>
            <div className="flex justify-between items-start gap-3 mb-2 sm:mb-3">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight group-hover:text-[#FF7A00] transition-colors line-clamp-2">{course.title}</h3>
              <span className="text-[#3CE36A] font-black text-lg md:text-xl shrink-0">{priceLabel}</span>
            </div>
            <p className="text-[#888] text-xs sm:text-sm mb-4 sm:mb-5 leading-relaxed line-clamp-2 md:line-clamp-3">{course.description}</p>
          </div>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
            <span className="bg-[#1A1A1A] text-[#888] text-[9px] sm:text-[10px] md:text-[11px] font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full uppercase tracking-wider group-hover:text-white transition-colors">{course.category}</span>
            <span className="flex items-center gap-1 text-xs sm:text-sm font-bold text-[#FF7A00] group-hover:translate-x-1 transition-transform">
              Explore <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </span>
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link href={`/courses/${course.id}`}
      className="bg-[#111]/80 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden flex flex-col group hover:border-[#FF7A00]/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,122,0,0.1)] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF7A00]/0 to-[#FF7A00]/0 group-hover:from-[#FF7A00]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none rounded-2xl" />
      <div className="relative w-full aspect-[16/10] shrink-0 bg-[#1A1A1A] overflow-hidden border-b border-white/5">
        {course.thumbnail
          ? <Image src={course.thumbnail} alt={course.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
          : <div className="absolute inset-0 flex items-center justify-center bg-[#161616] group-hover:scale-105 transition-all duration-700"><span className="material-symbols-outlined text-[40px] text-[#444]">school</span></div>}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111]/90 via-transparent to-transparent opacity-90" />
      </div>
      <div className="p-4 sm:p-5 flex-1 flex flex-col min-w-0 z-10 relative">
        <h3 className="font-bold text-[15px] sm:text-base leading-snug group-hover:text-[#FF7A00] transition-colors line-clamp-2 mb-1.5">{course.title}</h3>
        <p className="text-[#888] text-[11px] sm:text-xs mb-4 flex-1 line-clamp-2 leading-relaxed">{course.description}</p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <span className="text-[#3CE36A] font-black text-[13px] sm:text-[14px]">{priceLabel}</span>
          <span className="bg-[#1A1A1A] text-[#888] text-[9px] sm:text-[10px] px-2.5 py-1 rounded-md uppercase tracking-widest font-bold group-hover:text-white transition-colors">{course.category}</span>
        </div>
      </div>
    </Link>
  );
}

function SearchInner() {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const qp  = searchParams.get("q")        ?? "";
  const cat = searchParams.get("category") ?? "";
  const prc = searchParams.get("price")    ?? "all";
  const srt = searchParams.get("sort")     ?? "newest";
  const pg  = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));

  const [inputValue,    setInputValue]    = useState(qp);
  const [showFilters,   setShowFilters]   = useState(false);
  const [data,          setData]          = useState<SearchResponse | null>(null);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchCourses = useCallback(async (q: string, c: string, p: string, s: string, page: number) => {
    setLoading(true); setError(null);
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (c) params.set("category", c);
      if (p !== "all") params.set("price", p);
      if (s !== "newest") params.set("sort", s);
      if (page > 1) params.set("page", String(page));
      const res = await fetch(`/api/search?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      setData(await res.json());
    } catch (e) {
      setError((e as Error).message);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => {
    setInputValue(qp);
    fetchCourses(qp, cat, prc, srt, pg);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qp, cat, prc, srt, pg]);

  const push = (q: string, c: string, p: string, s: string, page = 1) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (c) params.set("category", c);
    if (p !== "all") params.set("price", p);
    if (s !== "newest") params.set("sort", s);
    if (page > 1) params.set("page", String(page));
    router.push(`/search?${params}`);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => push(e.target.value, cat, prc, srt), 450);
  };

  const courses     = data?.courses     ?? [];
  const total       = data?.total       ?? 0;
  const totalPages  = data?.totalPages  ?? 1;
  const curPage     = data?.page        ?? pg;
  const allCats     = data?.allCategories ?? [];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col lg:flex-row pb-28 md:pb-12 overflow-x-hidden relative">

      {/* Mobile top bar */}
      <div className="lg:hidden p-3 sm:p-4 border-b border-white/5 flex items-center justify-between gap-3 bg-[#0A0A0A]/90 backdrop-blur-xl sticky top-0 z-40">
        <h1 className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF7A00] to-[#FF9A44]">Explore Catalog</h1>
        <Button onClick={() => setShowFilters(true)} variant="glass" size="sm" className="!py-1.5 !px-3" leftIcon={<span className="material-symbols-outlined text-[16px] sm:text-[18px]">filter_list</span>}>
          Filters
        </Button>
      </div>

      {/* ══ SIDEBAR (Fixed Drawer on Mobile, Sticky on Desktop) ══ */}
      <div className={`
        fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col transform transition-transform duration-300
        ${showFilters ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:block lg:w-[280px] lg:flex-shrink-0 lg:border-r lg:border-white/5 lg:bg-transparent lg:h-screen lg:z-30
      `}>
        
        {/* Mobile Header for Filters */}
        <div className="lg:hidden p-4 border-b border-white/5 flex justify-between items-center bg-[#111]/80 backdrop-blur-md">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-[#FF7A00]">filter_list</span> Filters
          </h2>
          <button onClick={() => setShowFilters(false)} className="text-[#888] hover:text-white transition-colors bg-white/5 w-8 h-8 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scroll p-4 sm:p-5 lg:p-6 lg:h-full lg:sticky lg:top-0">
          <div className="hidden lg:flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-[#FF7A00]">filter_list</span>
            <h2 className="text-lg font-bold uppercase tracking-widest text-[#F1F5F9]">Filters</h2>
          </div>

          <div className="flex flex-col gap-6 lg:gap-8">
            {/* ── Sort ── */}
            <div className="bg-[#111] rounded-2xl p-4 border border-white/5">
              <h3 className="text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">sort</span> Sort By
              </h3>
              <div className="flex flex-col gap-3">
                {SORT_OPTIONS.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                      <input type="radio" name="sort" checked={srt === opt.value}
                        onChange={() => push(qp, cat, prc, opt.value)}
                        className="peer appearance-none w-5 h-5 border-2 border-[#444] rounded-full bg-transparent checked:border-[#FF7A00] cursor-pointer transition-colors" />
                      <span className="absolute w-2.5 h-2.5 rounded-full bg-[#FF7A00] opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                    </div>
                    <span className={`text-[13px] sm:text-sm transition-colors ${srt === opt.value ? 'text-white font-medium' : 'text-[#888] group-hover:text-white'}`}>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* ── Price ── */}
            <div className="bg-[#111] rounded-2xl p-4 border border-white/5">
              <h3 className="text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">payments</span> Price
              </h3>
              <div className="flex flex-col gap-3">
                {(["all", "free", "paid"] as const).map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                      <input type="radio" name="price" checked={prc === type}
                        onChange={() => push(qp, cat, type, srt)}
                        className="peer appearance-none w-5 h-5 border-2 border-[#444] rounded-full bg-transparent checked:border-[#FF7A00] cursor-pointer transition-colors" />
                      <span className="absolute w-2.5 h-2.5 rounded-full bg-[#FF7A00] opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                    </div>
                    <span className={`text-[13px] sm:text-sm transition-colors capitalize ${prc === type ? 'text-white font-medium' : 'text-[#888] group-hover:text-white'}`}>
                      {type === "all" ? "All Prices" : type === "free" ? "Free Courses" : "Paid Courses"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* ── Categories ── */}
            <div className="bg-[#111] rounded-2xl p-4 border border-white/5 flex flex-col min-h-0">
              <h3 className="text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">category</span> Category
              </h3>
              <div className="flex flex-col gap-1 overflow-y-auto pr-2 custom-scroll max-h-[250px] lg:max-h-[300px]">
                {/* All option */}
                <button onClick={() => push(qp, "", prc, srt)}
                  className={`text-left text-[13px] sm:text-sm px-3 py-2 sm:py-2.5 rounded-xl transition-all ${!cat ? "text-[#FF9A44] bg-[#FF7A00]/10 font-bold border border-[#FF7A00]/20 shadow-[0_0_15px_rgba(255,122,0,0.05)]" : "text-[#888] hover:text-white hover:bg-white/5 border border-transparent"}`}>
                  All Categories
                </button>
                {loading && allCats.length === 0
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-9 sm:h-10 bg-[#1A1A1A] rounded-xl animate-pulse mt-1" />
                    ))
                  : allCats.map((c) => (
                      <button key={c} onClick={() => { push(qp, c, prc, srt); if(window.innerWidth < 1024) setShowFilters(false); }}
                        className={`text-left text-[13px] sm:text-sm px-3 py-2 sm:py-2.5 rounded-xl transition-all truncate mt-1 ${cat === c ? "text-[#FF9A44] bg-[#FF7A00]/10 font-bold border border-[#FF7A00]/20 shadow-[0_0_15px_rgba(255,122,0,0.05)]" : "text-[#888] hover:text-white hover:bg-white/5 border border-transparent"}`}>
                        {c}
                      </button>
                    ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Footer for Filters */}
        <div className="lg:hidden p-4 border-t border-white/5 bg-[#111] shrink-0">
          <Button fullWidth onClick={() => setShowFilters(false)} variant="primary" size="lg" className="rounded-xl shadow-[0_0_20px_rgba(255,122,0,0.2)]">
            Apply Filters
          </Button>
        </div>
      </div>

      {/* ══ MAIN ══ */}
      <main className="flex-1 p-3 sm:p-5 lg:p-8 min-w-0 relative">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#FF7A00]/5 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none mix-blend-screen" />

        {/* Search bar */}
        <FadeIn direction="down" delay={100}>
          <div className="max-w-4xl mb-6 sm:mb-10 relative z-10">
            <form onSubmit={(e) => { e.preventDefault(); if (debounceRef.current) clearTimeout(debounceRef.current); push(inputValue, cat, prc, srt); }}
              className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A00]/10 to-[#FF9A44]/5 blur-xl rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="relative bg-[#111]/80 backdrop-blur-xl border border-white/10 group-focus-within:border-[#FF7A00]/50 rounded-2xl flex items-center shadow-lg transition-all">
                <span className="material-symbols-outlined text-[#888] group-focus-within:text-[#FF7A00] transition-colors ml-4 sm:ml-5 text-[20px] sm:text-[24px]">search</span>
                <input type="text" value={inputValue} onChange={handleInput}
                  placeholder="Search premium courses..."
                  className="w-full bg-transparent border-none pl-3 sm:pl-4 pr-12 py-3.5 sm:py-5 text-[14px] sm:text-base text-white placeholder-[#555] focus:outline-none focus:ring-0" />
                {inputValue && (
                  <button type="button" onClick={() => { setInputValue(""); push("", cat, prc, srt); }}
                    className="absolute right-4 text-[#555] hover:text-white transition-colors bg-[#1A1A1A] rounded-full p-1 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px] sm:text-[18px]">close</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </FadeIn>

        {/* Header row */}
        <FadeIn direction="up" delay={150}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 relative z-10">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                {qp ? `Results for "${qp}"` : cat ? cat : "Explore Catalog"}
              </h1>
              {!loading && (
                <p className="text-[#888] text-[13px] sm:text-sm mt-1 sm:mt-2 font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3CE36A] animate-pulse" />
                  {total === 0 ? "No results" : `${total} course${total !== 1 ? "s" : ""} available`}
                </p>
              )}
            </div>

            {/* Sort dropdown (hidden on mobile, inside filters instead) */}
            <div className="hidden sm:flex items-center gap-2 shrink-0 bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 hover:border-white/20 transition-colors">
              <span className="material-symbols-outlined text-[#888] text-[18px]">swap_vert</span>
              <select value={srt} onChange={(e) => push(qp, cat, prc, e.target.value)}
                className="bg-transparent text-[13px] text-[#F1F5F9] font-bold focus:outline-none cursor-pointer appearance-none pr-4 relative z-10">
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value} className="bg-[#111]">{o.label}</option>)}
              </select>
            </div>
          </div>
        </FadeIn>

        {/* Active filters pills */}
        {(cat || prc !== "all" || srt !== "newest") && (
          <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 relative z-10">
            {cat && (
              <span className="flex items-center gap-1.5 bg-[#FF7A00]/10 border border-[#FF7A00]/20 text-[#FF9A44] text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-[0_0_10px_rgba(255,122,0,0.05)]">
                {cat}
                <button onClick={() => push(qp, "", prc, srt)} className="hover:text-white transition-colors flex items-center"><span className="material-symbols-outlined text-[14px]">close</span></button>
              </span>
            )}
            {prc !== "all" && (
              <span className="flex items-center gap-1.5 bg-[#FF7A00]/10 border border-[#FF7A00]/20 text-[#FF9A44] text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full capitalize shadow-[0_0_10px_rgba(255,122,0,0.05)]">
                {prc}
                <button onClick={() => push(qp, cat, "all", srt)} className="hover:text-white transition-colors flex items-center"><span className="material-symbols-outlined text-[14px]">close</span></button>
              </span>
            )}
            {srt !== "newest" && (
              <span className="flex items-center gap-1.5 bg-[#FF7A00]/10 border border-[#FF7A00]/20 text-[#FF9A44] text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-[0_0_10px_rgba(255,122,0,0.05)]">
                {SORT_OPTIONS.find((o) => o.value === srt)?.label}
                <button onClick={() => push(qp, cat, prc, "newest")} className="hover:text-white transition-colors flex items-center"><span className="material-symbols-outlined text-[14px]">close</span></button>
              </span>
            )}
            <button onClick={() => push("", "", "all", "newest")}
              className="text-[11px] sm:text-xs font-bold text-[#666] hover:text-white transition-colors flex items-center gap-1 px-2">
              Clear all
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-3 sm:p-4 mb-6 sm:mb-8 flex items-center gap-3 backdrop-blur-md">
            <span className="material-symbols-outlined text-red-400 text-[20px]">error</span>
            <p className="text-red-400 text-xs sm:text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-24 gap-3 sm:gap-4 text-center px-4">
            <span className="material-symbols-outlined text-[64px] sm:text-[72px] text-[#222]">search_off</span>
            <h3 className="text-lg sm:text-xl font-bold text-gray-300">No courses found</h3>
            <p className="text-[#666] text-xs sm:text-sm max-w-xs">
              {qp ? `No results for "${qp}". Try different keywords.` : "No published courses match the selected filters."}
            </p>
            <Button onClick={() => push("", "", "all", "newest")} variant="primary" size="md" className="mt-2 rounded-xl">
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {courses.map((course, idx) => (
                <FadeIn key={course.id} direction="up" delay={(idx % 12) * 50}>
                  <CourseCard course={course} featured={idx === 0 && pg === 1 && !qp} />
                </FadeIn>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 sm:gap-3 mt-10 sm:mt-12 relative z-10">
                <button onClick={() => { push(qp, cat, prc, srt, curPage - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={curPage <= 1}
                  className="flex items-center gap-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#111] border border-white/10 text-[11px] sm:text-sm font-bold text-[#888] hover:text-white hover:border-[#FF7A00]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm">
                  <span className="material-symbols-outlined text-[16px] sm:text-[18px]">chevron_left</span> <span className="hidden sm:inline">Prev</span>
                </button>

                <div className="flex items-center gap-1 sm:gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - curPage) <= 1)
                    .reduce<(number | "…")[]>((acc, p, i, arr) => {
                      if (i > 0 && typeof arr[i - 1] === "number" && (p as number) - (arr[i - 1] as number) > 1) acc.push("…");
                      acc.push(p); return acc;
                    }, [])
                    .map((p, i) => p === "…"
                      ? <span key={`el-${i}`} className="text-[#555] px-1 font-bold">…</span>
                      : <button key={p} onClick={() => { push(qp, cat, prc, srt, p as number); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl text-[13px] sm:text-sm font-bold border transition-all ${p === curPage ? "bg-[#FF7A00] text-white border-[#FF7A00] shadow-[0_0_15px_rgba(255,122,0,0.3)]" : "bg-[#111] text-[#888] border-white/10 hover:text-white hover:border-[#FF7A00]/50"}`}>
                          {p}
                        </button>
                    )}
                </div>

                <button onClick={() => { push(qp, cat, prc, srt, curPage + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={curPage >= totalPages}
                  className="flex items-center gap-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#111] border border-white/10 text-[11px] sm:text-sm font-bold text-[#888] hover:text-white hover:border-[#FF7A00]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm">
                  <span className="hidden sm:inline">Next</span> <span className="material-symbols-outlined text-[16px] sm:text-[18px]">chevron_right</span>
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        .hide-scrollbar { scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <span className="material-symbols-outlined text-[48px] text-[#FF7A00] animate-spin" style={{ animationDuration: "1.5s" }}>autorenew</span>
      </div>
    }>
      <SearchInner />
    </Suspense>
  );
}
