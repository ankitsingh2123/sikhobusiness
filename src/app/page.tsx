import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard — Your Learning Journey | Seekho Business",
  description: "Track your progress and continue learning with Seekho Business.",
};

const continueWatching = [
  { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", tag: "BESTSELLER", progress: 81, progressText: "13 videos left", slug: "rich-dad-poor-dad", gradient: "from-[#FF9A44] to-[#E54D00]" },
  { title: "Think and Grow Rich", author: "Napoleon Hill", tag: "TOP RATED", progress: 68, progressText: "16 videos left", slug: "think-and-grow-rich", gradient: "from-[#FFC837] to-[#E56D00]" },
  { title: "The Psychology of Money", author: "Morgan Housel", tag: "NEW", progress: 95, progressText: "2 videos left", slug: "psychology-of-money", gradient: "from-[#526377] to-[#0A101D]" },
  { title: "Atomic Habits", author: "James Clear", tag: "TRENDING", progress: 48, progressText: "23 videos left", slug: "atomic-habits", gradient: "from-[#34D399] to-[#065F46]" },
];

const libraryCourses = [
  { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", tag: "BESTSELLER", totalVideos: 70, slug: "rich-dad-poor-dad", gradient: "from-[#FF9A44] to-[#E54D00]" },
  { title: "Think and Grow Rich", author: "Napoleon Hill", tag: "TOP RATED", totalVideos: 50, slug: "think-and-grow-rich", gradient: "from-[#FFC837] to-[#E56D00]" },
  { title: "The Psychology of Money", author: "Morgan Housel", tag: "NEW", totalVideos: 40, slug: "psychology-of-money", gradient: "from-[#526377] to-[#0A101D]" },
];

const categories = ["All", "Business", "NCERT Physics", "NCERT Chemistry", "History", "General GK", "Self Help", "Fiction"];

export default function HomePage() {
  return (
    <div
      className="min-h-screen text-[#222] pb-28 md:pb-16 overflow-x-hidden"
      style={{ backgroundColor: "#F4F1EA", fontFamily: "Inter, sans-serif" }}
    >
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 md:px-10 pt-4 md:pt-8 overflow-x-hidden">

        {/* ══ CONTINUE WATCHING ══ */}
        <section className="bg-[#181818] rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-8 mb-6 md:mb-12">

          {/* Section heading */}
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-white text-base sm:text-xl md:text-3xl font-bold tracking-tight"
              style={{ fontFamily: "Georgia, serif" }}>
              Continue watching
            </h2>
            <button className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-white text-base">chevron_right</span>
            </button>
          </div>

          {/* Cards — horizontal scroll */}
          <div
            className="flex gap-3 md:gap-6 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
          >
            {continueWatching.map((course, idx) => (
              <Link
                key={idx}
                href={`/courses/${course.slug}`}
                className="flex-shrink-0 w-[calc(80vw-2rem)] max-w-[280px] sm:w-64 md:w-72"
              >
                <div className="flex gap-3 group">
                  {/* Book cover */}
                  <div className={`w-16 h-24 sm:w-20 sm:h-28 md:w-24 md:h-32 rounded-xl bg-gradient-to-b ${course.gradient} relative flex-shrink-0 overflow-hidden shadow-md`}>
                    <span className="absolute top-1 left-1 bg-black/40 text-white text-[7px] font-bold px-1 py-0.5 rounded uppercase tracking-wide leading-tight max-w-[90%]">
                      {course.tag}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <h3 className="text-white text-xs sm:text-sm md:text-base font-bold leading-snug mb-0.5 md:mb-1 line-clamp-2 group-hover:text-[#FF7A00] transition-colors"
                      style={{ fontFamily: "Georgia, serif" }}>
                      {course.title}
                    </h3>
                    <p className="text-[#888] text-[10px] sm:text-xs mb-2 truncate">{course.author}</p>
                    <p className="text-[#888] text-[10px] mb-1">{course.progress}% · {course.progressText}</p>
                    <div className="h-1 w-full bg-[#333] rounded-full overflow-hidden">
                      <div className="h-full bg-[#FF7A00] rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            {/* trailing spacer */}
            <div className="w-1 flex-shrink-0" />
          </div>
        </section>

        {/* ══ LIBRARY ══ */}
        <section>

          {/* Heading row */}
          <div className="flex justify-between items-center mb-3 md:mb-5">
            <h2 className="text-[#222] text-xl sm:text-2xl md:text-4xl font-bold"
              style={{ fontFamily: "Georgia, serif" }}>
              Library
            </h2>
            <div className="flex items-center gap-2 text-[#888]">
              <button className="p-1">
                <span className="material-symbols-outlined text-[18px]">sort</span>
              </button>
              <button className="p-1">
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
              </button>
              <button className="p-1">
                <span className="material-symbols-outlined text-[18px]">more_vert</span>
              </button>
            </div>
          </div>

          {/* Category pills */}
          <div
            className="flex gap-2 overflow-x-auto pb-3 mb-4 md:mb-8"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
          >
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-colors ${
                  idx === 0
                    ? "bg-[#FF7A00] text-white shadow-md"
                    : "bg-white text-[#555] border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── Mobile: vertical list ── */}
          <div className="flex flex-col gap-3 md:hidden">
            {libraryCourses.map((course, idx) => (
              <Link key={idx} href={`/courses/${course.slug}`}>
                <div className="flex gap-4 bg-white rounded-2xl p-3 shadow-sm group active:scale-[0.99] transition-transform">
                  {/* Book cover */}
                  <div className={`w-16 h-24 rounded-xl bg-gradient-to-b ${course.gradient} relative flex-shrink-0 overflow-hidden shadow`}>
                    <span className="absolute top-1 left-1 bg-black/40 text-white text-[6px] font-bold px-1 py-0.5 rounded uppercase tracking-wide">
                      {course.tag}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <h3 className="text-[#1a1a1a] text-sm font-bold leading-snug mb-0.5 line-clamp-2 group-hover:text-[#FF7A00] transition-colors"
                      style={{ fontFamily: "Georgia, serif" }}>
                      {course.title}
                    </h3>
                    <p className="text-[#888] text-xs mb-3 truncate">{course.author}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-gray-200 rounded-full">
                        <div className="h-full w-0 bg-[#FF7A00] rounded-full" />
                      </div>
                      <span className="text-[#aaa] text-[10px] whitespace-nowrap">{course.totalVideos} videos</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* ── Desktop: grid ── */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {libraryCourses.map((course, idx) => (
              <Link key={idx} href={`/courses/${course.slug}`}>
                <div className="flex gap-5 group cursor-pointer">
                  <div className={`w-32 h-48 rounded-xl bg-gradient-to-b ${course.gradient} relative flex-shrink-0 shadow-md overflow-hidden transition-transform group-hover:scale-105`}>
                    <span className="absolute top-3 left-3 bg-black/30 text-white text-[8px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                      {course.tag}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-white font-bold text-sm leading-tight"
                        style={{ fontFamily: "Georgia, serif" }}>{course.title}</h3>
                      <p className="text-white/70 text-[10px]">{course.author}</p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <h3 className="text-[#222] text-xl font-bold leading-tight mb-1 group-hover:text-[#FF7A00] transition-colors"
                      style={{ fontFamily: "Georgia, serif" }}>{course.title}</h3>
                    <p className="text-[#666] text-sm mb-6">{course.author}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-[#E0DDD6] rounded-full">
                        <div className="h-full w-0 bg-[#FF7A00] rounded-full" />
                      </div>
                      <span className="text-[#888] text-xs">{course.totalVideos} videos</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </section>
      </div>
    </div>
  );
}
