import type { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { LibrarySort } from "@/components/ui/LibrarySort";
import { Button } from "@/components/ui/Button";
import { CategoryFilters } from "@/components/ui/CategoryFilters";
import { redis } from "@/lib/redis";
import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Suspense } from "react";

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
  "from-[#6D28D9] to-[#4C1D95]",
  "from-[#7C3AED] to-[#5B21B6]",
  "from-[#F59E0B] to-[#B45309]",
  "from-[#0EA5E9] to-[#0369A1]",
  "from-[#10B981] to-[#065F46]",
  "from-[#EC4899] to-[#9D174D]",
];

const getCourses = async (category: string, search: string, sort: string, page: number) => {
  const cacheKey = `courses-library-${category}-${search}-${sort}-${page}`;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) return typeof cachedData === "string" ? JSON.parse(cachedData) : cachedData;
  } catch { }

  const take = 12;
  const skip = (page - 1) * take;
  const where: any = { isPublished: true };
  if (category !== "All") where.category = { equals: category, mode: "insensitive" };
  if (search) where.OR = [
    { title: { contains: search, mode: "insensitive" } },
    { description: { contains: search, mode: "insensitive" } },
  ];

  let orderBy: any = { createdAt: "desc" };
  if (sort === "oldest") orderBy = { createdAt: "asc" };
  else if (sort === "price-low") orderBy = { price: "asc" };
  else if (sort === "price-high") orderBy = { price: "desc" };
  else if (sort === "az") orderBy = { title: "asc" };
  else if (sort === "za") orderBy = { title: "desc" };

  const [courses, totalCount] = await Promise.all([
    prisma.course.findMany({ where, include: { _count: { select: { modules: true } } }, orderBy, take, skip }),
    prisma.course.count({ where }),
  ]);

  const result = { courses, totalCount, totalPages: Math.ceil(totalCount / take) };
  try { await redis.setex(cacheKey, 3600, JSON.stringify(result)); } catch { }
  return result;
};

// ── SKELETONS ──────────────────────
function DashboardSkeleton() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 w-full flex-1 mt-10">
      <div className="animate-pulse flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="h-5 w-40 bg-white/5 rounded-lg" />
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-[140px] sm:w-[170px] aspect-[3/4] bg-white/5 rounded-[16px] shrink-0" />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="h-5 w-24 bg-white/5 rounded-lg" />
          <div className="flex gap-2 overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-8 w-24 bg-white/5 rounded-full shrink-0" />
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="flex flex-col bg-white/5 rounded-[16px] sm:rounded-[24px] overflow-hidden">
                <div className="aspect-[16/10] bg-white/10" />
                <div className="p-3 sm:p-5 flex flex-col gap-2">
                  <div className="h-4 w-3/4 bg-white/10 rounded" />
                  <div className="h-3 w-full bg-white/5 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ASYNC COMPONENTS ─────────────────
async function HeroActions() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let isOwned = false;
  
  if (user?.id) {
    const purchaseCount = await prisma.purchase.count({
      where: { userId: user.id, status: "SUCCESS" }
    });
    isOwned = purchaseCount > 0;
  }

  if (isOwned) return null;

  return (
    <FadeIn direction="up" delay={400} className="w-full sm:w-auto">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto items-center">
        <Button href="/courses" variant="primary" size="lg" className="shadow-[0_0_50px_rgba(109,40,217,0.5)] w-full sm:w-auto hover:shadow-[0_0_60px_rgba(109,40,217,0.7)] transition-shadow">
          Start Learning Free
        </Button>
        <a href="/courses" className="text-[#94A3B8] text-sm font-semibold hover:text-white transition-colors flex items-center gap-1.5 group">
          <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">play_circle</span>
          Browse 50+ Courses
        </a>
      </div>
    </FadeIn>
  );
}

async function AsyncCourses({
  currentCategory,
  searchQuery,
  currentSort,
  currentPage,
  searchParams,
}: {
  currentCategory: string;
  searchQuery: string;
  currentSort: string;
  currentPage: number;
  searchParams: any;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;

  let purchasedCourses: any[] = [];
  if (userId) {
    try {
      const purchases = await prisma.purchase.findMany({
        where: { userId, status: "SUCCESS" },
        include: { course: { include: { _count: { select: { modules: true } } } } },
        orderBy: { createdAt: "desc" },
        take: 6,
      });
      purchasedCourses = purchases.map((p) => p.course).filter(Boolean);
    } catch { }
  }

  const [libraryData] = await Promise.all([
    getCourses(currentCategory, searchQuery, currentSort, currentPage)
  ]);
  
  const libraryCourses = libraryData.courses;
  const totalPages = libraryData.totalPages;
  const continueList = purchasedCourses.length > 0 ? purchasedCourses : libraryCourses.slice(0, 5);
  const isOwned = purchasedCourses.length > 0;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 w-full flex-1">
      <section className="mb-8 md:mb-12 w-full">
        <FadeIn direction="up">
          <div className="flex justify-between items-center mb-3 sm:mb-4 md:mb-5">
            <h2 className="text-white text-base sm:text-lg md:text-2xl font-bold tracking-tight">
              {isOwned ? "Continue watching" : "Start learning"}
            </h2>
            <Link href="/courses" className="flex items-center gap-1 text-[11px] sm:text-xs text-[#475569] hover:text-[#8B5CF6] transition-colors font-semibold group">
              View all <span className="material-symbols-outlined text-[12px] sm:text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </FadeIn>

        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 sm:pb-6 pt-2 px-1 -mx-1 snap-x snap-mandatory scroll-smooth" style={{ scrollbarWidth: "none" }}>
          {continueList.map((course: any, idx: number) => (
            <FadeIn key={course.id} direction="right" delay={idx * 100} className="flex-shrink-0 w-[140px] sm:w-[170px] md:w-[200px] snap-start">
              <Link href={`/courses/${course.id}`} className="block relative group">
                <div className="relative aspect-[3/4] rounded-[12px] sm:rounded-[16px] overflow-hidden mb-2 sm:mb-3 border border-white/5 group-hover:border-white/20 transition-all duration-300 group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  {course.thumbnail ? (
                    <Image src={course.thumbnail} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 170px, 200px" priority={idx < 3} unoptimized />
                  ) : (
                    <div className="absolute inset-0 overflow-hidden bg-[#161616]">
                      <Image src="/images/course-placeholder.png" alt="Course Fallback" fill className="object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 170px, 200px" priority={idx < 3} />
                      <div className={`absolute inset-0 bg-gradient-to-b ${gradients[idx % gradients.length]} mix-blend-overlay opacity-60`} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-transparent to-transparent opacity-60" />
                  <div className="absolute top-2 left-2 bg-[#07080F]/80 backdrop-blur-md text-[#A5B4FC] text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest z-20">
                    {course.category}
                  </div>
                  {isOwned && (
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 z-20">
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                        <div className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#F59E0B] rounded-full" style={{ width: "35%" }} />
                      </div>
                    </div>
                  )}
                </div>
                <h3 className="text-white text-[11px] sm:text-[13px] font-bold leading-snug line-clamp-2 px-1 group-hover:text-[#8B5CF6] transition-colors">
                  {course.title}
                </h3>
                <p className="text-[#666] text-[9px] sm:text-[10px] mt-1 px-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[11px] sm:text-[12px]">video_library</span>
                  {course._count?.modules || 0} modules
                </p>
              </Link>
            </FadeIn>
          ))}
          <div className="w-1 flex-shrink-0" />
        </div>
      </section>

      <section>
        <FadeIn direction="up" className="relative z-30">
          <div className="flex justify-between items-center mb-4 md:mb-5 relative">
            <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-tight">Library</h2>
            <LibrarySort />
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={100}>
          <CategoryFilters categories={categories} currentCategory={currentCategory} searchQuery={searchQuery} />
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {libraryCourses.map((course: any, idx: number) => (
            <FadeIn key={course.id} direction="up" delay={(idx % 8) * 50}>
              <Link href={`/courses/${course.id}`} className="group relative block h-full">
                <div className="relative bg-[#0A0B10]/60 backdrop-blur-md border border-white/5 rounded-[16px] sm:rounded-[24px] overflow-hidden hover:border-[#FF7A00]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(255,122,0,0.25)] h-full flex flex-col group/card">
                  <div className={`relative aspect-[16/10] bg-[#07080F] overflow-hidden`}>
                    {course.thumbnail ? (
                      <Image src={course.thumbnail} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" priority={idx < 4} unoptimized />
                    ) : (
                      <div className="absolute inset-0 overflow-hidden bg-[#07080F]">
                        <Image src="/images/course-placeholder.png" alt="Course Fallback" fill className="object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" priority={idx < 4} />
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradients[idx % gradients.length]} mix-blend-overlay opacity-60`} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] via-transparent to-transparent opacity-90 pointer-events-none" />
                    <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#07080F]/80 backdrop-blur-md text-[#A5B4FC] text-[8px] sm:text-[9px] font-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md uppercase tracking-widest shadow-lg z-20">
                      {course.category}
                    </span>
                    <div className="absolute bottom-3 right-3 bg-[#FF7A00] text-white text-[11px] font-black px-3 py-1.5 rounded-lg shadow-[0_4px_15px_rgba(255,122,0,0.4)] transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                      ₹{course.price}
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 flex-1 flex flex-col">
                    <h3 className="text-white text-xs sm:text-base font-bold leading-snug line-clamp-2 mb-1 sm:mb-2 group-hover/card:text-[#FF7A00] transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-[#64748B] text-[10px] sm:text-xs leading-relaxed line-clamp-2 mb-2 sm:mb-4 flex-1">{course.description}</p>
                    <div className="flex items-center justify-between pt-2 sm:pt-4 border-t border-white/5">
                      <span className="flex items-center gap-1.5 text-[#475569] text-[9px] sm:text-[11px] font-medium">
                        <span className="material-symbols-outlined text-[12px] sm:text-[14px]">view_module</span>
                        {course._count?.modules || 0}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#FF7A00] text-[10px] sm:text-xs font-bold group-hover/card:translate-x-1 transition-transform">
                        Explore <span className="material-symbols-outlined text-[12px] sm:text-[14px]">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        {libraryCourses.length === 0 && (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-[48px] text-gray-700 mb-4 block">search_off</span>
            <p className="text-gray-500 text-sm mb-4">No courses found in this category.</p>
            <Button href="/" variant="primary" size="md">View all courses</Button>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10 md:mt-14">
            <Button href={{ pathname: "/", query: { ...searchParams, page: currentPage - 1 } } as any} variant="secondary" size="md" disabled={currentPage <= 1}>← Prev</Button>
            <span className="text-sm font-bold text-gray-500 px-2">{currentPage} / {totalPages}</span>
            <Button href={{ pathname: "/", query: { ...searchParams, page: currentPage + 1 } } as any} variant="secondary" size="md" disabled={currentPage >= totalPages}>Next →</Button>
          </div>
        )}
      </section>
    </div>
  );
}

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

  return (
    <div className="min-h-screen bg-[#07080F] text-white pb-28 md:pb-16 w-full overflow-hidden flex flex-col">
      {/* ── ANIMATED HERO SECTION ── */}
      <div className="relative min-h-[520px] sm:min-h-[600px] md:min-h-[680px] overflow-hidden w-full flex items-center justify-center">
        {/* ── SCROLLING CARDS BACKGROUND (Lean Render) ── */}
        <div className="absolute inset-0 flex gap-3 sm:gap-4 px-3 sm:px-4 pointer-events-none select-none" aria-hidden="true">
          {[
            { speed: '18s', cards: [{ bg: 'from-[#6D28D9] to-[#4C1D95]', icon: 'storefront', label: 'Business Mastery', cat: 'BUSINESS' }, { bg: 'from-[#F59E0B] to-[#B45309]', icon: 'trending_up', label: 'Share Market', cat: 'FINANCE' }, { bg: 'from-[#EC4899] to-[#9D174D]', icon: 'photo_camera', label: 'Instagram Growth', cat: 'SOCIAL' }, { bg: 'from-[#0EA5E9] to-[#0369A1]', icon: 'play_circle', label: 'YouTube Creator', cat: 'VIDEO' }, { bg: 'from-[#10B981] to-[#065F46]', icon: 'account_balance_wallet', label: 'Finance Freedom', cat: 'FINANCE' }, { bg: 'from-[#7C3AED] to-[#5B21B6]', icon: 'memory', label: 'AI & Future Tech', cat: 'AI' }] },
            { speed: '22s', cards: [{ bg: 'from-[#0EA5E9] to-[#0369A1]', icon: 'translate', label: 'English Speaking', cat: 'ENGLISH' }, { bg: 'from-[#10B981] to-[#065F46]', icon: 'eco', label: 'Agriculture Pro', cat: 'FARMING' }, { bg: 'from-[#F59E0B] to-[#B45309]', icon: 'calculate', label: 'Math Tricks', cat: 'MATH' }, { bg: 'from-[#EC4899] to-[#9D174D]', icon: 'palette', label: 'Art & Craft', cat: 'ART' }, { bg: 'from-[#6D28D9] to-[#4C1D95]', icon: 'rocket_launch', label: 'Startup Secrets', cat: 'STARTUP' }, { bg: 'from-[#7C3AED] to-[#5B21B6]', icon: 'fitness_center', label: 'Fitness & Gym', cat: 'FITNESS' }] },
            { speed: '15s', cards: [{ bg: 'from-[#7C3AED] to-[#5B21B6]', icon: 'campaign', label: 'Digital Marketing', cat: 'MARKETING' }, { bg: 'from-[#EC4899] to-[#9D174D]', icon: 'face_retouching_natural', label: 'Beauty Tips', cat: 'BEAUTY' }, { bg: 'from-[#0EA5E9] to-[#0369A1]', icon: 'code', label: 'Coding Bootcamp', cat: 'CODING' }, { bg: 'from-[#F59E0B] to-[#B45309]', icon: 'emoji_events', label: 'Success Mindset', cat: 'SUCCESS' }, { bg: 'from-[#10B981] to-[#065F46]', icon: 'monitor_heart', label: 'Health & Wellness', cat: 'HEALTH' }, { bg: 'from-[#6D28D9] to-[#4C1D95]', icon: 'auto_stories', label: 'Ramayan Stories', cat: 'DEVOTION' }] },
            { speed: '20s', cards: [{ bg: 'from-[#EC4899] to-[#9D174D]', icon: 'school', label: 'Exam Prep 2025', cat: 'EXAM' }, { bg: 'from-[#6D28D9] to-[#4C1D95]', icon: 'currency_rupee', label: 'Part Time Income', cat: 'INCOME' }, { bg: 'from-[#F59E0B] to-[#B45309]', icon: 'directions_car', label: 'Automobile Guide', cat: 'AUTO' }, { bg: 'from-[#0EA5E9] to-[#0369A1]', icon: 'psychology', label: 'Self Growth', cat: 'GROWTH' }, { bg: 'from-[#10B981] to-[#065F46]', icon: 'restaurant', label: 'Food Business', cat: 'FOOD' }, { bg: 'from-[#7C3AED] to-[#5B21B6]', icon: 'fingerprint', label: 'Sarkari Kaam', cat: 'GOVT' }] },
            { speed: '25s', cards: [{ bg: 'from-[#10B981] to-[#065F46]', icon: 'sports_cricket', label: 'Cricket Mastery', cat: 'SPORTS' }, { bg: 'from-[#F59E0B] to-[#B45309]', icon: 'smartphone', label: 'Mobile Tricks', cat: 'TECH' }, { bg: 'from-[#6D28D9] to-[#4C1D95]', icon: 'account_balance', label: 'History Unveiled', cat: 'HISTORY' }, { bg: 'from-[#EC4899] to-[#9D174D]', icon: 'camera_alt', label: 'Photography Pro', cat: 'PHOTO' }, { bg: 'from-[#0EA5E9] to-[#0369A1]', icon: 'auto_awesome', label: 'Astrology Guide', cat: 'ASTRO' }, { bg: 'from-[#7C3AED] to-[#5B21B6]', icon: 'tips_and_updates', label: 'Life Hacks', cat: 'HACKS' }] },
          ].map((col, colIdx) => (
            <div key={colIdx} className="flex-1 min-w-0 flex flex-col gap-3 sm:gap-4">
              <div className="flex flex-col gap-3 sm:gap-4" style={{ animation: `scrollUp ${col.speed} linear infinite` }}>
                {[...col.cards, ...col.cards].map((card, i) => (
                  <div key={i} className={`relative aspect-[3/4] rounded-[14px] sm:rounded-[18px] bg-gradient-to-b ${card.bg} overflow-hidden flex-shrink-0 opacity-80`}>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-sm text-white text-[7px] sm:text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest">{card.cat}</div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                      <span className="material-symbols-outlined text-white/90 mb-2 drop-shadow-lg" style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontVariationSettings: "'FILL' 1" }}>{card.icon}</span>
                      <p className="text-white font-bold text-[9px] sm:text-[11px] leading-tight drop-shadow-lg line-clamp-2">{card.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#07080F] via-transparent to-[#07080F] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07080F]/60 via-[#07080F]/30 to-[#07080F]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-[#07080F]/40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#07080F] via-[#07080F]/90 to-transparent pointer-events-none z-10" />

        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-4xl mx-auto w-full py-16 sm:py-20">
          <FadeIn direction="up" delay={100}>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-[#6D28D9]/20 border border-[#8B5CF6]/30 text-[#A5B4FC] text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-5 sm:mb-7 backdrop-blur-md shadow-[0_0_20px_rgba(109,40,217,0.2)]">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
              India&apos;s No.1 Edutainment Platform
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={200}>
            <h1 className="text-[36px] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-5 sm:mb-6 leading-[1.05] drop-shadow-2xl">
              Learn Any Skill,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#F59E0B]">
                Anytime in Hindi.
              </span>
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={300}>
            <p className="text-[#94A3B8] text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              10,000+ short video lessons from trusted creators. Business, Finance, AI, Health & more — all in one place.
            </p>
          </FadeIn>
          
          <Suspense fallback={<div className="h-14 w-48 bg-white/5 rounded-xl animate-pulse" />}>
            <HeroActions />
          </Suspense>

          <FadeIn direction="up" delay={500}>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-8 sm:mt-10 text-[#64748B] text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-4 sm:px-0">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="material-symbols-outlined text-[#F59E0B] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span>4.8 Rating</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/10" />
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="material-symbols-outlined text-[#8B5CF6] text-[14px]">group</span>
                <span>50K+ Students</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/10" />
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="material-symbols-outlined text-[#10B981] text-[14px]">verified</span>
                <span>Certified Creators</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        @keyframes scrollUp { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
      `}</style>

      <Suspense fallback={<DashboardSkeleton />}>
        <AsyncCourses currentCategory={currentCategory} searchQuery={searchQuery} currentSort={currentSort} currentPage={currentPage} searchParams={searchParams} />
      </Suspense>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 w-full flex-1">
        <section className="mt-20 md:mt-32 w-full relative">
          <div className="absolute inset-0 bg-[#FF7A00]/5 blur-[100px] rounded-full pointer-events-none" />
          <FadeIn direction="up">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10 text-center">
              {[
                { title: 'Exam categories', endValue: 60, suffix: '+', decimals: 0, iconPath: '/images/stats/book.png', fallbackIcon: 'menu_book', color: 'text-[#FF7A00]' },
                { title: 'Educators', endValue: 14, suffix: 'k+', decimals: 0, iconPath: '/images/stats/cap.png', fallbackIcon: 'school', color: 'text-[#3CE36A]' },
                { title: 'Live classes', endValue: 1.5, suffix: 'k+', decimals: 1, iconPath: '/images/stats/live.png', fallbackIcon: 'live_tv', color: 'text-[#FF9A44]' },
                { title: 'Video lessons', endValue: 1, suffix: 'M+', decimals: 0, iconPath: '/images/stats/video.png', fallbackIcon: 'smart_display', color: 'text-[#3CE36A]' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center p-4 sm:p-5 bg-[#111]/80 backdrop-blur-md rounded-2xl border border-white/5 hover:border-[#FF7A00]/30 transition-colors group">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 mb-3 drop-shadow-[0_0_10px_rgba(255,122,0,0.3)] group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                    <span className={`material-symbols-outlined absolute text-[28px] sm:text-[32px] ${stat.color} opacity-40`} style={{ fontVariationSettings: "'FILL' 1" }}>{stat.fallbackIcon}</span>
                    <img src={stat.iconPath} alt={stat.title} className="relative z-10 w-full h-full object-contain mix-blend-screen drop-shadow-2xl text-[0px] text-transparent" />
                  </div>
                  <h4 className="text-[#888] text-[10px] sm:text-[11px] font-bold mb-1 uppercase tracking-wider text-center">{stat.title}</h4>
                  <p className={`text-2xl sm:text-3xl font-black ${stat.color}`}><AnimatedCounter endValue={stat.endValue} suffix={stat.suffix} decimals={stat.decimals} duration={2.5} /></p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        <section className="mt-20 md:mt-32 mb-10 md:mb-20 w-full relative">
          <FadeIn direction="up">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#3CE36A]/10 border border-[#3CE36A]/20 rounded-full text-[#3CE36A] text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-5 sm:mb-6">
                <span className="material-symbols-outlined text-[14px] sm:text-[16px]">android</span>
                Coming Soon
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight mb-4 md:mb-6">Android App Launching Soon</h2>
              <p className="text-[#888] text-sm sm:text-base md:text-xl leading-relaxed">Take your learning on the go. Get ready for a seamless mobile experience with our upcoming Android application.</p>
            </div>
            <div className="relative w-full max-w-[300px] sm:max-w-[320px] mx-auto aspect-[9/16] bg-[#0A0A0B] rounded-[40px] border-[8px] border-[#1C1C1E] shadow-[0_30px_100px_rgba(255,122,0,0.25),inset_0_0_20px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col relative z-10">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#000] rounded-full flex items-center justify-center z-50">
                <div className="w-3 h-3 bg-[#111] rounded-full border border-white/5 flex items-center justify-center">
                  <div className="w-1 h-1 bg-blue-500/40 rounded-full" />
                </div>
              </div>
              <div className="flex-1 bg-[#0F0F11] flex flex-col relative overflow-hidden">
                <div className="px-4 pt-10 pb-3 bg-[#141416] border-b border-white/5 flex items-center justify-between">
                  <span className="text-[#FF7A00] font-black text-base tracking-tight">Seekho.</span>
                  <span className="material-symbols-outlined text-[#888] text-lg">notifications</span>
                </div>
                <div className="flex-1 p-3 flex flex-col gap-3.5 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                  <div className="relative aspect-video bg-[#000] rounded-xl overflow-hidden border border-white/5 group shadow-lg flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#FF7A00]/20 to-[#FF9A44]/10 opacity-60" />
                    <span className="material-symbols-outlined text-[40px] text-[#FF7A00] animate-pulse">play_circle</span>
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center px-2 py-1 bg-[#141416]/80 backdrop-blur-md rounded-lg text-[9px] text-[#aaa]">
                      <span>03:45 / 12:00</span>
                      <span className="material-symbols-outlined text-xs">fullscreen</span>
                    </div>
                  </div>
                  <div className="bg-[#141416] p-3 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-bold text-[11px]">Resume Learning</span>
                      <span className="text-[#3CE36A] text-[9px] font-bold">45% Complete</span>
                    </div>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FF9A44] rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 bg-[#141416] rounded-xl border border-white/5 flex items-center gap-2 hover:bg-[#1A1A1E] transition-colors">
                      <span className="material-symbols-outlined text-[#FF7A00] text-base">menu_book</span>
                      <span className="text-white text-[10px] font-medium">Notes</span>
                    </div>
                    <div className="p-2.5 bg-[#141416] rounded-xl border border-white/5 flex items-center gap-2 hover:bg-[#1A1A1E] transition-colors">
                      <span className="material-symbols-outlined text-[#3CE36A] text-base">download</span>
                      <span className="text-white text-[10px] font-medium">Offline</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-white font-bold text-[11px] mb-0.5">Live Classes</span>
                    {[1, 2].map((i) => (
                      <div key={i} className="flex gap-2.5 bg-[#141416] p-2 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                        <div className="w-12 h-12 bg-[#1C1C1E] rounded-lg relative overflow-hidden flex-shrink-0 flex items-center justify-center border border-white/5">
                          <span className="material-symbols-outlined text-[#888] text-lg">live_tv</span>
                        </div>
                        <div className="flex flex-col justify-center flex-1">
                          <span className="text-white text-[10px] font-bold line-clamp-1">Business Strategy Masterclass {i}</span>
                          <span className="text-[#666] text-[8px] mt-0.5 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[10px] text-[#FF7A00]">schedule</span>
                            Today, 7:00 PM
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}