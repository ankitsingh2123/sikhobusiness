import type { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { LibrarySort } from "@/components/ui/LibrarySort";
import { Button } from "@/components/ui/Button";
import { redis } from "@/lib/redis";

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
    } catch { }
  }

  let libraryCourses: any[] = [];
  let totalPages = 1;
  try {
    const data = await getCourses(currentCategory, searchQuery, currentSort, currentPage);
    libraryCourses = data.courses;
    totalPages = data.totalPages;
  } catch { }

  const continueList = purchasedCourses.length > 0 ? purchasedCourses : libraryCourses.slice(0, 5);
  const isOwned = purchasedCourses.length > 0;

  return (
    <div className="min-h-screen bg-[#07080F] text-white pb-28 md:pb-16 w-full overflow-hidden flex flex-col">

      {/* ── ANIMATED HERO SECTION ── */}
      <div className="relative min-h-[520px] sm:min-h-[600px] md:min-h-[680px] overflow-hidden w-full flex items-center justify-center">

        {/* ── SCROLLING CARDS BACKGROUND ── */}
        <div className="absolute inset-0 flex gap-3 sm:gap-4 px-3 sm:px-4 pointer-events-none select-none" aria-hidden="true">
          {[
            {
              speed: '18s',
              cards: [
                { bg: 'from-[#6D28D9] to-[#4C1D95]', icon: 'storefront',       label: 'Business Mastery',    cat: 'BUSINESS'  },
                { bg: 'from-[#F59E0B] to-[#B45309]', icon: 'trending_up',      label: 'Share Market',        cat: 'FINANCE'   },
                { bg: 'from-[#EC4899] to-[#9D174D]', icon: 'photo_camera',     label: 'Instagram Growth',    cat: 'SOCIAL'    },
                { bg: 'from-[#0EA5E9] to-[#0369A1]', icon: 'play_circle',      label: 'YouTube Creator',     cat: 'VIDEO'     },
                { bg: 'from-[#10B981] to-[#065F46]', icon: 'account_balance_wallet', label: 'Finance Freedom', cat: 'FINANCE' },
                { bg: 'from-[#7C3AED] to-[#5B21B6]', icon: 'memory',           label: 'AI & Future Tech',    cat: 'AI'        },
              ]
            },
            {
              speed: '22s',
              cards: [
                { bg: 'from-[#0EA5E9] to-[#0369A1]', icon: 'translate',        label: 'English Speaking',    cat: 'ENGLISH'   },
                { bg: 'from-[#10B981] to-[#065F46]', icon: 'eco',              label: 'Agriculture Pro',     cat: 'FARMING'   },
                { bg: 'from-[#F59E0B] to-[#B45309]', icon: 'calculate',        label: 'Math Tricks',         cat: 'MATH'      },
                { bg: 'from-[#EC4899] to-[#9D174D]', icon: 'palette',          label: 'Art & Craft',         cat: 'ART'       },
                { bg: 'from-[#6D28D9] to-[#4C1D95]', icon: 'rocket_launch',    label: 'Startup Secrets',     cat: 'STARTUP'   },
                { bg: 'from-[#7C3AED] to-[#5B21B6]', icon: 'fitness_center',   label: 'Fitness & Gym',       cat: 'FITNESS'   },
              ]
            },
            {
              speed: '15s',
              cards: [
                { bg: 'from-[#7C3AED] to-[#5B21B6]', icon: 'campaign',         label: 'Digital Marketing',   cat: 'MARKETING' },
                { bg: 'from-[#EC4899] to-[#9D174D]', icon: 'face_retouching_natural', label: 'Beauty Tips',  cat: 'BEAUTY'    },
                { bg: 'from-[#0EA5E9] to-[#0369A1]', icon: 'code',             label: 'Coding Bootcamp',     cat: 'CODING'    },
                { bg: 'from-[#F59E0B] to-[#B45309]', icon: 'emoji_events',     label: 'Success Mindset',     cat: 'SUCCESS'   },
                { bg: 'from-[#10B981] to-[#065F46]', icon: 'monitor_heart',    label: 'Health & Wellness',   cat: 'HEALTH'    },
                { bg: 'from-[#6D28D9] to-[#4C1D95]', icon: 'auto_stories',     label: 'Ramayan Stories',     cat: 'DEVOTION'  },
              ]
            },
            {
              speed: '20s',
              cards: [
                { bg: 'from-[#EC4899] to-[#9D174D]', icon: 'school',           label: 'Exam Prep 2025',      cat: 'EXAM'      },
                { bg: 'from-[#6D28D9] to-[#4C1D95]', icon: 'currency_rupee',   label: 'Part Time Income',    cat: 'INCOME'    },
                { bg: 'from-[#F59E0B] to-[#B45309]', icon: 'directions_car',   label: 'Automobile Guide',    cat: 'AUTO'      },
                { bg: 'from-[#0EA5E9] to-[#0369A1]', icon: 'psychology',       label: 'Self Growth',         cat: 'GROWTH'    },
                { bg: 'from-[#10B981] to-[#065F46]', icon: 'restaurant',       label: 'Food Business',       cat: 'FOOD'      },
                { bg: 'from-[#7C3AED] to-[#5B21B6]', icon: 'fingerprint',      label: 'Sarkari Kaam',        cat: 'GOVT'      },
              ]
            },
            {
              speed: '25s',
              cards: [
                { bg: 'from-[#10B981] to-[#065F46]', icon: 'sports_cricket',   label: 'Cricket Mastery',     cat: 'SPORTS'    },
                { bg: 'from-[#F59E0B] to-[#B45309]', icon: 'smartphone',       label: 'Mobile Tricks',       cat: 'TECH'      },
                { bg: 'from-[#6D28D9] to-[#4C1D95]', icon: 'account_balance',  label: 'History Unveiled',    cat: 'HISTORY'   },
                { bg: 'from-[#EC4899] to-[#9D174D]', icon: 'camera_alt',       label: 'Photography Pro',     cat: 'PHOTO'     },
                { bg: 'from-[#0EA5E9] to-[#0369A1]', icon: 'auto_awesome',     label: 'Astrology Guide',     cat: 'ASTRO'     },
                { bg: 'from-[#7C3AED] to-[#5B21B6]', icon: 'tips_and_updates', label: 'Life Hacks',          cat: 'HACKS'     },
              ]
            },
          ].map((col, colIdx) => (
            <div key={colIdx} className="flex-1 min-w-0 flex flex-col gap-3 sm:gap-4">
              {/* Duplicate for seamless loop */}
              <div
                className="flex flex-col gap-3 sm:gap-4"
                style={{
                  animation: `scrollUp ${col.speed} linear infinite`,
                }}
              >
                {[...col.cards, ...col.cards].map((card, i) => (
                  <div
                    key={i}
                    className={`relative aspect-[3/4] rounded-[14px] sm:rounded-[18px] bg-gradient-to-b ${card.bg} overflow-hidden flex-shrink-0 opacity-80`}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-sm text-white text-[7px] sm:text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest">
                      {card.cat}
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                      <span
                        className="material-symbols-outlined text-white/90 mb-2 drop-shadow-lg"
                        style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontVariationSettings: "'FILL' 1" }}
                      >
                        {card.icon}
                      </span>
                      <p className="text-white font-bold text-[9px] sm:text-[11px] leading-tight drop-shadow-lg line-clamp-2">
                        {card.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Dark gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080F] via-transparent to-[#07080F] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07080F]/60 via-[#07080F]/30 to-[#07080F]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-[#07080F]/40 pointer-events-none" />

        {/* ── HERO TEXT (centered) ── */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-4xl mx-auto w-full py-16 sm:py-20">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-[#6D28D9]/20 border border-[#8B5CF6]/30 text-[#A5B4FC] text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-5 sm:mb-7 backdrop-blur-md shadow-[0_0_20px_rgba(109,40,217,0.2)]">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
            India's No.1 Edutainment Platform
          </div>
          <h1 className="text-[36px] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-5 sm:mb-6 leading-[1.05] drop-shadow-2xl">
            Learn Any Skill,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#F59E0B]">
              Anytime in Hindi.
            </span>
          </h1>
          <p className="text-[#94A3B8] text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            10,000+ short video lessons from trusted creators. Business, Finance, AI, Health & more — all in one place.
          </p>
          {!isOwned && (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto items-center">
              <Button href="/courses" variant="primary" size="lg" className="shadow-[0_0_50px_rgba(109,40,217,0.5)] w-full sm:w-auto">
                Start Learning Free
              </Button>
              <a href="/courses" className="text-[#94A3B8] text-sm font-semibold hover:text-white transition-colors flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                Browse 50+ Courses
              </a>
            </div>
          )}
          {/* Trust badges */}
          <div className="flex items-center gap-5 sm:gap-8 mt-8 sm:mt-10 text-[#64748B] text-[11px] sm:text-xs font-semibold uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#F59E0B] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span>4.8 Rating</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#8B5CF6] text-[14px]">group</span>
              <span>50K+ Students</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#10B981] text-[14px]">verified</span>
              <span>Certified Creators</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for scroll animation */}
      <style>{`
        @keyframes scrollUp {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 w-full flex-1">

        {/* ── CONTINUE WATCHING ── */}
        <section className="mb-8 md:mb-12 w-full">
          <div className="flex justify-between items-center mb-3 sm:mb-4 md:mb-5">
            <h2 className="text-white text-base sm:text-lg md:text-2xl font-bold tracking-tight">
              {isOwned ? "Continue watching" : "Start learning"}
            </h2>
            <Link href="/courses" className="flex items-center gap-1 text-[11px] sm:text-xs text-[#475569] hover:text-[#8B5CF6] transition-colors font-semibold">
              View all <span className="material-symbols-outlined text-[12px] sm:text-[14px]">arrow_forward</span>
            </Link>
          </div>

          {/* Snap scrolling carousel */}
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 sm:pb-6 pt-2 px-1 -mx-1 snap-x snap-mandatory scroll-smooth" style={{ scrollbarWidth: "none" }}>
            {continueList.map((course: any, idx: number) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="flex-shrink-0 w-[140px] sm:w-[170px] md:w-[200px] relative snap-start"
              >
                <div className="relative aspect-[3/4] rounded-[12px] sm:rounded-[16px] overflow-hidden mb-2 sm:mb-3">
                  {course.thumbnail ? (
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 overflow-hidden bg-[#161616]">
                      <img src="https://skills.sikhobusiness.com/wp-content/uploads/2025/02/17-768x1067.png" alt="Course Fallback" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity" />
                      <div className={`absolute inset-0 bg-gradient-to-b ${gradients[idx % gradients.length]} mix-blend-overlay opacity-60`} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-transparent to-transparent opacity-60" />
                  <div className="absolute top-2 left-2 bg-[#07080F]/80 backdrop-blur-md text-[#A5B4FC] text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest z-20">
                    {course.category}
                  </div>
                  {isOwned && (
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 z-20">
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#F59E0B] rounded-full" style={{ width: "35%" }} />
                      </div>
                    </div>
                  )}
                </div>
                <h3 className="text-white text-[11px] sm:text-[13px] font-bold leading-snug line-clamp-2 px-1">
                  {course.title}
                </h3>
                <p className="text-[#666] text-[9px] sm:text-[10px] mt-1 px-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[11px] sm:text-[12px]">video_library</span>
                  {course._count?.modules || 0} modules
                </p>
              </Link>
            ))}
            <div className="w-1 flex-shrink-0" />
          </div>
        </section>

        {/* ── LIBRARY ── */}
        <section>
          <div className="flex justify-between items-center mb-4 md:mb-5">
            <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-tight">Library</h2>
            <LibrarySort />
          </div>

          {/* Category pills */}
          <div className="flex gap-2.5 overflow-x-auto pb-4 mb-8 md:mb-10 px-1" style={{ scrollbarWidth: "none" }}>
            {categories.map((cat, idx) => {
              const isActive = currentCategory === cat;
              const query: Record<string, string> = { category: cat };
              if (searchQuery) query.q = searchQuery;
              return (
                <Link
                  key={idx}
                  href={{ pathname: "/", query }}
                  className={`px-4 sm:px-5 py-2 md:py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap flex-shrink-0 transition-all duration-300 ${isActive
                      ? "bg-[#6D28D9] text-white shadow-[0_0_20px_rgba(109,40,217,0.5)] border border-[#8B5CF6]/40"
                      : "bg-[#0D0E1A] text-[#475569] hover:bg-[#181A27] hover:text-[#94A3B8] border border-white/5 hover:border-white/10"
                    }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          {/* Grid — premium spatial cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {libraryCourses.map((course: any, idx: number) => (
              <Link key={course.id} href={`/courses/${course.id}`} className="group relative">
                <div className="relative bg-[#0D0E1A] border border-white/6 rounded-[20px] overflow-hidden hover:border-[#8B5CF6]/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(109,40,217,0.12)] h-full flex flex-col">
                  {/* Image Only Thumbnail */}
                  <div className={`relative aspect-[16/10] bg-[#111] overflow-hidden`}>
                    {course.thumbnail ? (
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="absolute inset-0 overflow-hidden bg-[#111]">
                        <img src="https://skills.sikhobusiness.com/wp-content/uploads/2025/02/17-768x1067.png" alt="Course Fallback" className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700" />
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradients[idx % gradients.length]} mix-blend-overlay opacity-60`} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E1A] via-transparent to-transparent opacity-80 pointer-events-none" />

                    {/* Floating badge */}
                    <span className="absolute top-3 left-3 bg-[#07080F]/80 backdrop-blur-md text-[#A5B4FC] text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest shadow-lg z-20">
                      {course.category}
                    </span>

                    {/* Price overlay */}
                    <div className="absolute bottom-3 right-3 bg-[#F59E0B] text-[#0D0E1A] text-[11px] font-black px-3 py-1.5 rounded-lg shadow-[0_4px_15px_rgba(245,158,11,0.4)] transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                      ₹{course.price}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-white text-base font-bold leading-snug line-clamp-2 mb-2 group-hover:text-[#8B5CF6] transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-[#475569] text-xs leading-relaxed line-clamp-2 mb-4 flex-1">{course.description}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="flex items-center gap-1.5 text-[#475569] text-[11px] font-medium">
                        <span className="material-symbols-outlined text-[14px]">view_module</span>
                        {course._count?.modules || 0} modules
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#8B5CF6] text-xs font-bold group-hover:translate-x-1 transition-transform">
                        Explore <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {libraryCourses.length === 0 && (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-[48px] text-gray-700 mb-4 block">search_off</span>
              <p className="text-gray-500 text-sm mb-4">No courses found in this category.</p>
              <Button href="/" variant="primary" size="md">
                View all courses
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-10 md:mt-14">
              {currentPage > 1 ? (
                <Button
                  href={{ pathname: "/", query: { ...searchParams, page: currentPage - 1 } } as any}
                  variant="secondary"
                  size="md"
                >← Prev</Button>
              ) : (
                <Button variant="secondary" size="md" disabled>← Prev</Button>
              )}
              <span className="text-sm font-bold text-gray-500 px-2">
                {currentPage} / {totalPages}
              </span>
              {currentPage < totalPages ? (
                <Button
                  href={{ pathname: "/", query: { ...searchParams, page: currentPage + 1 } } as any}
                  variant="secondary"
                  size="md"
                >Next →</Button>
              ) : (
                <Button variant="secondary" size="md" disabled>Next →</Button>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
