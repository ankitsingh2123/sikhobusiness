import type { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { LibrarySort } from "@/components/ui/LibrarySort";

export const metadata: Metadata = {
  title: "Dashboard — Your Learning Journey | Seekho Business",
  description: "Track your progress and continue learning with Seekho Business.",
};

const categories = [
  "All",
  "Sarkari Kaam", "Part Time Income", "Instagram", "Youtube", "English Speaking", 
  "Astrology", "Finance", "Business", "Wellness", "Career & Jobs", "Share Market", 
  "Editing", "Mobile Tricks", "Success", "Health", "Knowledge", "Crime", "Horror", 
  "Devotion", "Food", "Self-Growth", "Agriculture", "Marketing", "Automobile", 
  "Startups", "History", "AI", "Beauty", "Exam Prep", "Computer", "Coding", 
  "Life Hacks", "Technology", "Fitness & Gym", "Motivation", "Photography", 
  "Math", "Art & Craft", "Ramayan", "Cricket"
];

const gradients = [
  "from-[#FF9A44] to-[#E54D00]",
  "from-[#FFC837] to-[#E56D00]",
  "from-[#526377] to-[#0A101D]",
  "from-[#34D399] to-[#065F46]",
  "from-[#818CF8] to-[#4F46E5]",
  "from-[#F472B6] to-[#BE185D]",
];

import { redis } from "@/lib/redis";

const getCourses = async (category: string, search: string, sort: string, page: number) => {
  const cacheKey = `courses-library-${category}-${search}-${sort}-${page}`;
  
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return typeof cachedData === 'string' ? JSON.parse(cachedData) : cachedData;
    }
  } catch (e) {
    console.warn("Redis cache read failed:", e);
  }

  const take = 12;
  const skip = (page - 1) * take;

  const where: any = { isPublished: true };
  if (category !== "All") {
    where.category = { equals: category, mode: "insensitive" };
  }
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  let orderBy: any = { createdAt: "desc" };
  if (sort === "oldest") orderBy = { createdAt: "asc" };
  else if (sort === "price-low") orderBy = { price: "asc" };
  else if (sort === "price-high") orderBy = { price: "desc" };
  else if (sort === "az") orderBy = { title: "asc" };
  else if (sort === "za") orderBy = { title: "desc" };

  const [courses, totalCount] = await Promise.all([
    prisma.course.findMany({
      where,
      include: { _count: { select: { modules: true } } },
      orderBy,
      take,
      skip,
    }),
    prisma.course.count({ where }),
  ]);

  const result = { courses, totalCount, totalPages: Math.ceil(totalCount / take) };

  try {
    // Cache for 1 hour (3600 seconds)
    await redis.setex(cacheKey, 3600, JSON.stringify(result));
  } catch (e) {
    console.warn("Redis cache write failed:", e);
  }

  return result;
};

export default async function HomePage({
  searchParams: rawSearchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; sort?: string; page?: string }>;
}) {
  const searchParams = await rawSearchParams;
  const currentCategory = searchParams.category || "All";
  const searchQuery = searchParams.q || "";
  const currentSort = searchParams.sort || "newest";
  const currentPage = Math.max(1, parseInt(searchParams.page || "1", 10));

  // Get current user's purchased courses for "Continue Watching"
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let purchasedCourses: any[] = [];
  if (user) {
    try {
      const purchases = await prisma.purchase.findMany({
        where: { userId: user.id, status: "SUCCESS" },
        include: { course: { include: { _count: { select: { modules: true } } } } },
        orderBy: { createdAt: "desc" },
        take: 6,
      });
      purchasedCourses = purchases.map((p) => p.course).filter(Boolean);
    } catch (e) {
      console.error("Failed to fetch purchases:", e);
    }
  }

  // Fetch paginated, sorted, and filtered courses from the backend cache
  let libraryCourses: any[] = [];
  let totalPages = 1;
  try {
    const data = await getCourses(currentCategory, searchQuery, currentSort, currentPage);
    libraryCourses = data.courses;
    totalPages = data.totalPages;
  } catch (e) {
    console.error("Failed to fetch library courses:", e);
  }

  return (
    <div
      className="min-h-screen text-[#222] pb-28 md:pb-16 overflow-x-hidden"
      style={{ backgroundColor: "#F4F1EA", fontFamily: "Inter, sans-serif" }}
    >
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 md:px-10 pt-4 md:pt-8 overflow-x-hidden">

        {/* ══ CONTINUE WATCHING ══ */}
        {purchasedCourses.length > 0 ? (
          <section className="bg-[#181818] rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-8 mb-6 md:mb-12">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-white text-base sm:text-xl md:text-3xl font-bold tracking-tight"
                style={{ fontFamily: "Georgia, serif" }}>
                Continue watching
              </h2>
              <button className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-white text-base">chevron_right</span>
              </button>
            </div>

            <div
              className="flex gap-3 md:gap-6 overflow-x-auto pb-1"
              style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
            >
              {purchasedCourses.map((course: any, idx: number) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="flex-shrink-0 w-[calc(80vw-2rem)] max-w-[280px] sm:w-64 md:w-72"
                >
                  <div className="flex gap-3 group">
                    <div className={`w-16 h-24 sm:w-20 sm:h-28 md:w-24 md:h-32 rounded-xl bg-gradient-to-b ${gradients[idx % gradients.length]} relative flex-shrink-0 overflow-hidden shadow-md`}>
                      {course.thumbnail && <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />}
                      <span className="absolute top-1 left-1 bg-black/40 text-white text-[7px] font-bold px-1 py-0.5 rounded uppercase tracking-wide leading-tight max-w-[90%]">
                        {course.category}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <h3 className="text-white text-xs sm:text-sm md:text-base font-bold leading-snug mb-0.5 md:mb-1 line-clamp-2 group-hover:text-[#FF7A00] transition-colors"
                        style={{ fontFamily: "Georgia, serif" }}>
                        {course.title}
                      </h3>
                      <p className="text-[#888] text-[10px] sm:text-xs mb-2 truncate">{course.category}</p>
                      <p className="text-[#888] text-[10px] mb-1">{course._count?.modules || 0} modules</p>
                      <div className="h-1 w-full bg-[#333] rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF7A00] rounded-full" style={{ width: "100%" }} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              <div className="w-1 flex-shrink-0" />
            </div>
          </section>
        ) : (
          // Show placeholder "Continue Watching" when no purchases — same old UI look
          <section className="bg-[#181818] rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-8 mb-6 md:mb-12">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-white text-base sm:text-xl md:text-3xl font-bold tracking-tight"
                style={{ fontFamily: "Georgia, serif" }}>
                Continue watching
              </h2>
              <button className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-white text-base">chevron_right</span>
              </button>
            </div>
            <div className="flex gap-3 md:gap-6 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {libraryCourses.slice(0, 4).map((course: any, idx: number) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="flex-shrink-0 w-[calc(80vw-2rem)] max-w-[280px] sm:w-64 md:w-72"
                >
                  <div className="flex gap-3 group">
                    <div className={`w-16 h-24 sm:w-20 sm:h-28 md:w-24 md:h-32 rounded-xl bg-gradient-to-b ${gradients[idx % gradients.length]} relative flex-shrink-0 overflow-hidden shadow-md`}>
                      {course.thumbnail && <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />}
                      <span className="absolute top-1 left-1 bg-black/40 text-white text-[7px] font-bold px-1 py-0.5 rounded uppercase tracking-wide leading-tight max-w-[90%]">
                        {course.category}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <h3 className="text-white text-xs sm:text-sm md:text-base font-bold leading-snug mb-0.5 md:mb-1 line-clamp-2 group-hover:text-[#FF7A00] transition-colors"
                        style={{ fontFamily: "Georgia, serif" }}>
                        {course.title}
                      </h3>
                      <p className="text-[#888] text-[10px] sm:text-xs mb-2 truncate">{course.category}</p>
                      <p className="text-[#888] text-[10px] mb-1">{course._count?.modules || 0} modules · start now</p>
                      <div className="h-1 w-full bg-[#333] rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF7A00] rounded-full" style={{ width: "0%" }} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              <div className="w-1 flex-shrink-0" />
            </div>
          </section>
        )}

        {/* ══ LIBRARY ══ */}
        <section>

          {/* Heading row */}
          <div className="flex justify-between items-center mb-3 md:mb-5">
            <h2 className="text-[#222] text-xl sm:text-2xl md:text-4xl font-bold"
              style={{ fontFamily: "Georgia, serif" }}>
              Library
            </h2>
            <div className="flex items-center gap-2 text-[#888]">
              <LibrarySort />
            </div>
          </div>

          {/* Category pills */}
          <div
            className="flex gap-2 overflow-x-auto pb-3 mb-4 md:mb-8"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
          >
            {categories.map((cat, idx) => {
              const isActive = currentCategory === cat;
              const query: Record<string, string> = { category: cat };
              if (searchQuery) query.q = searchQuery;
              return (
                <Link
                  key={idx}
                  href={{ pathname: "/", query }}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-colors ${
                    isActive
                      ? "bg-[#FF7A00] text-white shadow-md"
                      : "bg-white text-[#555] border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          {/* ── Mobile: vertical list ── */}
          <div className="flex flex-col gap-3 md:hidden">
            {libraryCourses.map((course: any, idx: number) => (
              <Link key={course.id} href={`/courses/${course.id}`}>
                <div className="flex gap-4 bg-white rounded-2xl p-3 shadow-sm group active:scale-[0.99] transition-transform">
                  <div className={`w-16 h-24 rounded-xl bg-gradient-to-b ${gradients[idx % gradients.length]} relative flex-shrink-0 overflow-hidden shadow`}>
                    {course.thumbnail && <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />}
                    <span className="absolute top-1 left-1 bg-black/40 text-white text-[6px] font-bold px-1 py-0.5 rounded uppercase tracking-wide">
                      {course.category}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <h3 className="text-[#1a1a1a] text-sm font-bold leading-snug mb-0.5 line-clamp-2 group-hover:text-[#FF7A00] transition-colors"
                      style={{ fontFamily: "Georgia, serif" }}>
                      {course.title}
                    </h3>
                    <p className="text-[#888] text-xs mb-3 truncate">{course.description}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-gray-200 rounded-full">
                        <div className="h-full w-0 bg-[#FF7A00] rounded-full" />
                      </div>
                      <span className="text-[#aaa] text-[10px] whitespace-nowrap">{course._count?.modules || 0} modules</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* ── Desktop: grid ── */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {libraryCourses.map((course: any, idx: number) => (
              <Link key={course.id} href={`/courses/${course.id}`}>
                <div className="flex gap-5 group cursor-pointer">
                  <div className={`w-32 h-48 rounded-xl bg-gradient-to-b ${gradients[idx % gradients.length]} relative flex-shrink-0 shadow-md overflow-hidden transition-transform group-hover:scale-105`}>
                    {course.thumbnail && <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-90" />}
                    <span className="absolute top-3 left-3 bg-black/30 text-white text-[8px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                      {course.category}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-white font-bold text-sm leading-tight"
                        style={{ fontFamily: "Georgia, serif" }}>{course.title}</h3>
                      <p className="text-white/70 text-[10px]">{course.category}</p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <h3 className="text-[#222] text-xl font-bold leading-tight mb-1 group-hover:text-[#FF7A00] transition-colors"
                      style={{ fontFamily: "Georgia, serif" }}>{course.title}</h3>
                    <p className="text-[#666] text-sm mb-6 line-clamp-2">{course.description}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-[#E0DDD6] rounded-full">
                        <div className="h-full w-0 bg-[#FF7A00] rounded-full" />
                      </div>
                      <span className="text-[#888] text-xs">{course._count?.modules || 0} modules</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {libraryCourses.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#888] text-sm">No courses found in this category.</p>
              <Link href="/" className="mt-4 inline-block text-[#FF7A00] font-bold text-sm border-b border-[#FF7A00]">
                View all courses
              </Link>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8 md:mt-12">
              {currentPage > 1 ? (
                <Link 
                  href={{ pathname: "/", query: { ...searchParams, page: currentPage - 1 } }}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Previous
                </Link>
              ) : (
                <button disabled className="px-4 py-2 rounded-lg border border-gray-100 text-gray-300 text-sm font-medium cursor-not-allowed">
                  Previous
                </button>
              )}
              
              <span className="text-sm font-medium text-gray-600 px-4">
                Page {currentPage} of {totalPages}
              </span>

              {currentPage < totalPages ? (
                <Link 
                  href={{ pathname: "/", query: { ...searchParams, page: currentPage + 1 } }}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Next
                </Link>
              ) : (
                <button disabled className="px-4 py-2 rounded-lg border border-gray-100 text-gray-300 text-sm font-medium cursor-not-allowed">
                  Next
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
