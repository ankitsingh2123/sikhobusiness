"use client";

import React, { useState, useEffect, useCallback, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

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
    <div className="bg-[#0D0E1A] border border-white/5 rounded-2xl overflow-hidden animate-pulse">
      <div className="w-full aspect-video bg-[#12141F]" />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-5 bg-[#12141F] rounded w-3/4" />
        <div className="h-3 bg-[#12141F] rounded w-full" />
        <div className="h-3 bg-[#12141F] rounded w-5/6" />
        <div className="flex justify-between mt-2">
          <div className="h-4 bg-[#12141F] rounded w-16" />
          <div className="h-4 bg-[#12141F] rounded w-20" />
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
        className="col-span-1 sm:col-span-2 bg-[#0D0E1A] border border-white/5 rounded-[24px] overflow-hidden flex flex-col md:flex-row group hover:border-[#8B5CF6]/30 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(109,40,217,0.15)] shadow-sm relative">
        {/* Glow effect behind card */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/0 to-[#8B5CF6]/0 group-hover:from-[#8B5CF6]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
        
        <div className="relative w-full md:w-2/5 aspect-video md:aspect-auto shrink-0 bg-[#12141F] overflow-hidden">
          {course.thumbnail
            ? <Image src={course.thumbnail} alt={course.title} fill className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
            : <div className="absolute inset-0 flex items-center justify-center bg-[#181A27] group-hover:scale-105 transition-all duration-700"><span className="material-symbols-outlined text-[64px] text-[#475569]">school</span></div>}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-4 left-4 bg-[#07080F]/80 backdrop-blur-md border border-[#8B5CF6]/20 text-[#A5B4FC] text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest shadow-lg">FEATURED</div>
        </div>
        <div className="p-6 md:p-8 flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex justify-between items-start gap-3 mb-3">
              <h3 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-[#8B5CF6] transition-colors line-clamp-2">{course.title}</h3>
              <span className="text-[#10B981] font-bold text-xl shrink-0">{priceLabel}</span>
            </div>
            <p className="text-[#94A3B8] text-sm mb-5 leading-relaxed line-clamp-3">{course.description}</p>
          </div>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
            <span className="bg-[#12141F] text-[#94A3B8] text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider group-hover:text-white transition-colors">{course.category}</span>
            <span className="flex items-center gap-1 text-sm font-bold text-[#8B5CF6] group-hover:translate-x-1 transition-transform">
              Explore <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </span>
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link href={`/courses/${course.id}`}
      className="bg-[#0D0E1A] border border-white/5 rounded-[20px] overflow-hidden flex flex-row sm:flex-col group hover:border-[#8B5CF6]/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(109,40,217,0.1)] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#8B5CF6]/0 to-[#8B5CF6]/0 group-hover:from-[#8B5CF6]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none rounded-[20px]" />
      <div className="relative w-28 sm:w-full h-auto sm:aspect-[16/10] shrink-0 bg-[#12141F] overflow-hidden">
        {course.thumbnail
          ? <Image src={course.thumbnail} alt={course.title} fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
          : <div className="absolute inset-0 flex items-center justify-center bg-[#181A27] group-hover:scale-105 transition-all duration-700"><span className="material-symbols-outlined text-[40px] text-[#475569]">school</span></div>}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E1A] via-transparent to-transparent opacity-80" />
      </div>
      <div className="p-4 sm:p-5 flex-1 flex flex-col min-w-0 z-10 relative">
        <h3 className="font-bold text-xs sm:text-[15px] leading-snug group-hover:text-[#8B5CF6] transition-colors line-clamp-2 mb-1 sm:mb-2">{course.title}</h3>
        <p className="hidden sm:block text-[#94A3B8] text-xs mb-4 flex-1 line-clamp-2 leading-relaxed">{course.description}</p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <span className="text-[#10B981] font-black text-xs sm:text-[13px]">{priceLabel}</span>
          <span className="bg-[#12141F] text-[#94A3B8] text-[9px] sm:text-[10px] px-2.5 py-1 rounded-md uppercase tracking-widest font-bold group-hover:text-white transition-colors">{course.category}</span>
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
    <div className="min-h-screen bg-[#07080F] text-white flex flex-col lg:flex-row pb-28 md:pb-12 overflow-x-hidden">

      {/* Mobile top bar */}
      <div className="lg:hidden p-4 border-b border-white/5 flex items-center justify-between gap-3 bg-[#0D0E1A]/80 backdrop-blur-xl sticky top-0 z-40">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#F59E0B]">Explore</h1>
        <Button onClick={() => setShowFilters(!showFilters)} variant="glass" size="sm" leftIcon={<span className="material-symbols-outlined text-[18px]">filter_list</span>}>
          Filters
        </Button>
      </div>

      {/* ══ SIDEBAR ══ */}
      <aside className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-[280px] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-white/5 p-5 lg:p-6 bg-[#0D0E1A] lg:bg-transparent lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto custom-scroll shadow-2xl lg:shadow-none z-30`}>

        <div className="hidden lg:flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-[#8B5CF6]">filter_list</span>
          <h2 className="text-lg font-bold uppercase tracking-widest text-[#F1F5F9]">Filters</h2>
        </div>

        <div className="flex flex-col gap-8">

          {/* ── Sort ── */}
          <div className="bg-[#12141F] rounded-2xl p-4 border border-white/5">
            <h3 className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">sort</span> Sort By
            </h3>
            <div className="flex flex-col gap-3">
              {SORT_OPTIONS.map((opt) => (
                <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                    <input type="radio" name="sort" checked={srt === opt.value}
                      onChange={() => push(qp, cat, prc, opt.value)}
                      className="peer appearance-none w-5 h-5 border-2 border-[#475569] rounded-full bg-transparent checked:border-[#8B5CF6] cursor-pointer transition-colors" />
                    <span className="absolute w-2.5 h-2.5 rounded-full bg-[#8B5CF6] opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                  </div>
                  <span className={`text-sm transition-colors ${srt === opt.value ? 'text-white font-medium' : 'text-[#94A3B8] group-hover:text-[#F1F5F9]'}`}>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* ── Price ── */}
          <div className="bg-[#12141F] rounded-2xl p-4 border border-white/5">
            <h3 className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">payments</span> Price
            </h3>
            <div className="flex flex-col gap-3">
              {(["all", "free", "paid"] as const).map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                    <input type="radio" name="price" checked={prc === type}
                      onChange={() => push(qp, cat, type, srt)}
                      className="peer appearance-none w-5 h-5 border-2 border-[#475569] rounded-full bg-transparent checked:border-[#8B5CF6] cursor-pointer transition-colors" />
                    <span className="absolute w-2.5 h-2.5 rounded-full bg-[#8B5CF6] opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                  </div>
                  <span className={`text-sm transition-colors capitalize ${prc === type ? 'text-white font-medium' : 'text-[#94A3B8] group-hover:text-[#F1F5F9]'}`}>
                    {type === "all" ? "All Prices" : type === "free" ? "Free Courses" : "Paid Courses"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* ── Categories ── */}
          <div className="bg-[#12141F] rounded-2xl p-4 border border-white/5 flex flex-col min-h-0">
            <h3 className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">category</span> Category
            </h3>
            <div className="flex flex-col gap-1 overflow-y-auto pr-2 custom-scroll max-h-[300px]">
              {/* All option */}
              <button onClick={() => push(qp, "", prc, srt)}
                className={`text-left text-sm px-3 py-2 rounded-xl transition-all ${!cat ? "text-[#A5B4FC] bg-[#6D28D9]/20 font-semibold border border-[#8B5CF6]/30 shadow-[0_0_15px_rgba(109,40,217,0.15)]" : "text-[#94A3B8] hover:text-white hover:bg-white/5 border border-transparent"}`}>
                All Categories
              </button>
              {loading && allCats.length === 0
                ? Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-9 bg-[#181A27] rounded-xl animate-pulse mt-1" />
                  ))
                : allCats.map((c) => (
                    <button key={c} onClick={() => push(qp, c, prc, srt)}
                      className={`text-left text-sm px-3 py-2 rounded-xl transition-all truncate mt-1 ${cat === c ? "text-[#A5B4FC] bg-[#6D28D9]/20 font-semibold border border-[#8B5CF6]/30 shadow-[0_0_15px_rgba(109,40,217,0.15)]" : "text-[#94A3B8] hover:text-white hover:bg-white/5 border border-transparent"}`}>
                      {c}
                    </button>
                  ))}
            </div>
          </div>

        </div>
      </aside>

      {/* ══ MAIN ══ */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 relative">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6D28D9]/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

        {/* Search bar */}
        <div className="max-w-4xl mb-8 sm:mb-12 relative z-10">
          <form onSubmit={(e) => { e.preventDefault(); if (debounceRef.current) clearTimeout(debounceRef.current); push(inputValue, cat, prc, srt); }}
            className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/20 to-[#F59E0B]/10 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="relative bg-[#0D0E1A]/80 backdrop-blur-xl border border-white/10 group-focus-within:border-[#8B5CF6]/50 rounded-full flex items-center shadow-lg transition-all">
              <span className="material-symbols-outlined text-[#94A3B8] group-focus-within:text-[#8B5CF6] transition-colors ml-6 text-[24px]">search</span>
              <input type="text" value={inputValue} onChange={handleInput}
                placeholder="Search premium courses, topics, or categories..."
                className="w-full bg-transparent border-none pl-4 pr-12 py-4 sm:py-5 text-[15px] sm:text-base text-white placeholder-[#475569] focus:outline-none focus:ring-0" />
              {inputValue && (
                <button type="button" onClick={() => { setInputValue(""); push("", cat, prc, srt); }}
                  className="absolute right-5 text-[#475569] hover:text-white transition-colors bg-[#181A27] rounded-full p-1 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Header row */}
        <div className="flex flex-wrap justify-between items-end gap-4 mb-8 relative z-10">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              {qp ? `Results for "${qp}"` : cat ? cat : "Explore Catalog"}
            </h1>
            {!loading && (
              <p className="text-[#94A3B8] text-sm mt-2 font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                {total === 0 ? "No results" : `${total} course${total !== 1 ? "s" : ""} available`}
              </p>
            )}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 shrink-0 bg-[#0D0E1A]/80 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 hover:border-white/20 transition-colors">
            <span className="material-symbols-outlined text-[#94A3B8] text-[20px]">swap_vert</span>
            <select value={srt} onChange={(e) => push(qp, cat, prc, e.target.value)}
              className="bg-transparent text-sm text-[#F1F5F9] font-medium focus:outline-none cursor-pointer appearance-none pr-4 relative z-10">
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value} className="bg-[#12141F]">{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Active filters pills */}
        {(cat || prc !== "all" || srt !== "newest") && (
          <div className="flex flex-wrap gap-2 mb-8 relative z-10">
            {cat && (
              <span className="flex items-center gap-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#A5B4FC] text-xs font-semibold px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(109,40,217,0.1)]">
                {cat}
                <button onClick={() => push(qp, "", prc, srt)} className="hover:text-white transition-colors flex items-center"><span className="material-symbols-outlined text-[14px]">close</span></button>
              </span>
            )}
            {prc !== "all" && (
              <span className="flex items-center gap-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#A5B4FC] text-xs font-semibold px-3 py-1.5 rounded-full capitalize shadow-[0_0_10px_rgba(109,40,217,0.1)]">
                {prc}
                <button onClick={() => push(qp, cat, "all", srt)} className="hover:text-white transition-colors flex items-center"><span className="material-symbols-outlined text-[14px]">close</span></button>
              </span>
            )}
            {srt !== "newest" && (
              <span className="flex items-center gap-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#A5B4FC] text-xs font-semibold px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(109,40,217,0.1)]">
                {SORT_OPTIONS.find((o) => o.value === srt)?.label}
                <button onClick={() => push(qp, cat, prc, "newest")} className="hover:text-white transition-colors flex items-center"><span className="material-symbols-outlined text-[14px]">close</span></button>
              </span>
            )}
            <button onClick={() => push("", "", "all", "newest")}
              className="text-xs font-semibold text-[#64748B] hover:text-white transition-colors flex items-center gap-1 px-2">
              Clear all
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-4 mb-8 flex items-center gap-3 backdrop-blur-md">
            <span className="material-symbols-outlined text-red-400">error</span>
            <p className="text-red-400 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <span className="material-symbols-outlined text-[72px] text-gray-700">search_off</span>
            <h3 className="text-xl font-bold text-gray-300">No courses found</h3>
            <p className="text-gray-500 text-sm max-w-xs">
              {qp ? `No results for "${qp}". Try different keywords.` : "No published courses match the selected filters."}
            </p>
            <Button onClick={() => push("", "", "all", "newest")} variant="primary" size="md" className="mt-2">
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {courses.map((course, idx) => (
                <CourseCard key={course.id} course={course} featured={idx === 0 && pg === 1 && !qp} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-12 relative z-10">
                <button onClick={() => { push(qp, cat, prc, srt, curPage - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={curPage <= 1}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-[#0D0E1A] border border-white/10 text-sm font-medium text-[#94A3B8] hover:text-white hover:border-[#8B5CF6]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span> Prev
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - curPage) <= 1)
                    .reduce<(number | "…")[]>((acc, p, i, arr) => {
                      if (i > 0 && typeof arr[i - 1] === "number" && (p as number) - (arr[i - 1] as number) > 1) acc.push("…");
                      acc.push(p); return acc;
                    }, [])
                    .map((p, i) => p === "…"
                      ? <span key={`el-${i}`} className="text-[#475569] px-1 font-bold">…</span>
                      : <button key={p} onClick={() => { push(qp, cat, prc, srt, p as number); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className={`w-10 h-10 rounded-xl text-sm font-bold border transition-all ${p === curPage ? "bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-[0_0_15px_rgba(139,92,246,0.4)]" : "bg-[#0D0E1A] text-[#94A3B8] border-white/10 hover:text-white hover:border-[#8B5CF6]/50"}`}>
                          {p}
                        </button>
                    )}
                </div>

                <button onClick={() => { push(qp, cat, prc, srt, curPage + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={curPage >= totalPages}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-[#0D0E1A] border border-white/10 text-sm font-medium text-[#94A3B8] hover:text-white hover:border-[#8B5CF6]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm">
                  Next <span className="material-symbols-outlined text-[18px]">chevron_right</span>
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
      <div className="min-h-screen bg-[#131313] flex items-center justify-center">
        <span className="material-symbols-outlined text-[48px] text-[#FF7A00] animate-spin" style={{ animationDuration: "1.5s" }}>autorenew</span>
      </div>
    }>
      <SearchInner />
    </Suspense>
  );
}
