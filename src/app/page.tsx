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
  { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", tag: "BESTSELLER", totalVideos: 70, progressText: "70 videos left", slug: "rich-dad-poor-dad", gradient: "from-[#FF9A44] to-[#E54D00]" },
  { title: "Think and Grow Rich", author: "Napoleon Hill", tag: "TOP RATED", totalVideos: 50, progressText: "50 videos left", slug: "think-and-grow-rich", gradient: "from-[#FFC837] to-[#E56D00]" },
  { title: "The Psychology of Money", author: "Morgan Housel", tag: "NEW", totalVideos: 40, progressText: "40 videos left", slug: "psychology-of-money", gradient: "from-[#526377] to-[#0A101D]" },
];

const categories = ["All", "Business", "NCERT Class 10 Physics", "NCERT Class 10 Chemistry", "History", "General Knowledge", "Self Help", "Fiction"];

export default function HomePage() {
  return (
    <div
      className="min-h-screen text-[#222] pb-16"
      style={{ backgroundColor: "#F4F1EA", fontFamily: "Inter, sans-serif" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-8">

        {/* Continue Watching Section — Dark Card */}
        <section className="bg-[#181818] rounded-3xl p-8 mb-12 relative overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <h2
              className="text-white text-3xl font-bold tracking-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Continue watching
            </h2>
            <button className="w-10 h-10 rounded-full bg-[#2A2A2A] hover:bg-[#3A3A3A] flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-white text-lg">chevron_right</span>
            </button>
          </div>

          <div className="flex gap-8 overflow-x-auto hide-scrollbar pb-2">
            {continueWatching.map((course, idx) => (
              <Link href={`/courses/${course.slug}`} key={idx}>
                <div className="flex gap-4 w-[280px] shrink-0 group cursor-pointer">
                  {/* Book Cover */}
                  <div
                    className={`w-28 h-40 rounded-lg bg-gradient-to-b ${course.gradient} relative p-3 flex flex-col justify-end shadow-md transition-transform group-hover:scale-105`}
                  >
                    <span className="absolute top-3 left-3 bg-white/20 text-white text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wide">
                      {course.tag}
                    </span>
                    <div>
                      <h3
                        className="text-white font-bold text-sm leading-tight mb-1"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {course.title}
                      </h3>
                      <p className="text-white/80 text-[10px]">{course.author}</p>
                    </div>
                  </div>

                  {/* Right Text */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3
                      className="text-white text-lg font-bold leading-tight mb-1 group-hover:text-[#FF7A00] transition-colors"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {course.title}
                    </h3>
                    <p className="text-[#A0A0A0] text-sm mb-4">{course.author}</p>

                    <div>
                      <p className="text-[#B0B0B0] text-xs mb-1.5">
                        {course.progress}% • {course.progressText}
                      </p>
                      <div className="h-1.5 w-full bg-[#333] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#FF7A00] rounded-full"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Library Section — Light Theme */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2
              className="text-[#222] text-4xl font-bold tracking-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Library
            </h2>
            <div className="flex items-center gap-4 text-[#666]">
              <button className="flex items-center gap-1.5 text-sm hover:text-[#222]">
                <span className="material-symbols-outlined text-[18px]">sort</span>
                Sort by
              </button>
              <button className="hover:text-[#222]">
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
              </button>
              <button className="hover:text-[#222]">
                <span className="material-symbols-outlined text-[18px]">more_vert</span>
              </button>
            </div>
          </div>

          {/* Categories — Light Pills */}
          <div className="flex gap-3 mb-10 overflow-x-auto hide-scrollbar pb-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors shadow-sm ${
                  idx === 0
                    ? "bg-[#FF7A00] text-white"
                    : "bg-white text-[#444] hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Course Grid — Light Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {libraryCourses.map((course, idx) => (
              <Link href={`/courses/${course.slug}`} key={idx}>
                <div className="flex gap-5 group cursor-pointer">
                  {/* Book Cover */}
                  <div
                    className={`w-32 h-48 rounded-lg bg-gradient-to-b ${course.gradient} relative p-4 flex flex-col justify-end shadow-md transition-transform group-hover:scale-105`}
                  >
                    <span className="absolute top-4 left-4 bg-white/20 text-white text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wide">
                      {course.tag}
                    </span>
                    <div>
                      <h3
                        className="text-white font-bold text-base leading-tight mb-1"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {course.title}
                      </h3>
                      <p className="text-white/80 text-xs">{course.author}</p>
                    </div>
                  </div>

                  {/* Right Text */}
                  <div className="flex-1 pt-2">
                    <h3
                      className="text-[#222] text-xl font-bold leading-tight mb-1.5 group-hover:text-[#FF7A00] transition-colors"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {course.title}
                    </h3>
                    <p className="text-[#666] text-sm mb-6">{course.author}</p>

                    <p className="text-[#888] text-xs">
                      0% • {course.progressText}
                    </p>
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
