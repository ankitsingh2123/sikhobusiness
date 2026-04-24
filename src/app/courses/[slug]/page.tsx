import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// ── SEO: Generate metadata for each course ──
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  return {
    title: `${course.title} — Complete Video Course`,
    description: course.description,
    keywords: course.keywords,
  };
}

export async function generateStaticParams() {
  return [
    { slug: "rich-dad-poor-dad" },
    { slug: "psychology-of-money" },
    { slug: "atomic-habits" },
  ];
}

function getCourseBySlug(slug: string) {
  const courses: Record<string, CourseData> = {
    "rich-dad-poor-dad": {
      title: "Rich Dad Poor Dad",
      subtitle: "What The Rich Teach Their Kids About Money",
      author: "Robert Kiyosaki",
      series: "BUSINESS MASTERY SERIES",
      description:
        "Master the principles of wealth creation with this comprehensive 70-video breakdown of Robert Kiyosaki's classic. We go beyond the book, providing actionable insights, modern examples, and practical exercises to transform your financial mindset from employee to investor.",
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPJCggFkjVFZZj5DEReHfqXFG4D5yBhoXbb8SQV-5wjJCfkDGiyb3FkQpHqurCbnb6lXeIuqvuYZe8KGfIX9GXG9ungwxUL87dxjKWtP42-xnZ8cXkofhCimqmojXN9w9ftk8oTIEKsEzaj-2AOL3Nxt51M3g7pWk16kOLZ6VlBjPJ6_oceQhqq2C6gcwKFZYmcP3eR45X8c9JVubexfhVYFIze1eXT3k211hPzFr5Fupjz5egDjzfCKkcLiVtRL3opsT-VqR7",
      price: 99,
      originalPrice: 1999,
      rating: 4.9,
      totalVideos: 70,
      totalHours: "12.5",
      instructor: {
        name: "Rajesh Kumar",
        title: "Financial Educator & Investor",
        avatar: "https://i.pravatar.cc/150?img=11"
      },
      learningOutcomes: [
        "The difference between assets and liabilities.",
        "How to make money work for you.",
        "Mindset shifts from poor to rich dad.",
        "Basics of real estate and investing."
      ],
      curriculum: [
        {
          section: "MODULE 1: THE BASICS",
          lessons: [
            { title: "Introduction to Wealth", duration: "12:45", free: true },
            { title: "The Rat Race Explained", duration: "15:20", free: true },
            { title: "Assets vs Liabilities", duration: "18:05", free: true },
            { title: "The Rich Don't Work For Money", duration: "22:10", free: true },
            { title: "Why Teach Financial Literacy?", duration: "14:55", free: true },
          ]
        },
        {
          section: "MODULE 2: ADVANCED CONCEPTS",
          lessons: [
            { title: "Mind Your Own Business", duration: "Premium Content", free: false },
            { title: "The History of Taxes", duration: "Premium Content", free: false },
          ]
        }
      ],
      keywords: ["finance", "rich dad", "investing"]
    },
    "psychology-of-money": {
      title: "The Psychology of Money",
      subtitle: "Timeless lessons on wealth, greed, and happiness",
      author: "Morgan Housel",
      series: "FINANCE MASTERY SERIES",
      description:
        "Doing well with money isn't necessarily about what you know. It's about how you behave. Master the psychological aspect of money with this 50-video course breaking down Morgan Housel's bestselling book.",
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXnXu_yDN9pA2AcNi7xJVUZDTX2ySF6Ut9OaTA_kJt8Jfb4MdOiS4-YEJTy7z5-WYYohyKBNV1gtnKPrCQz8JWy0VgJNSudC1HrNkva3XMt_-Lt1eSDcuI87gfi9SwEvfHSkAIv7mMXkCF-Gx3jDCC1HibsP20NSeWHnBV3OQUfPvJsSuup0dlc57aZEJH51icMfXJ1CPqV5iqkLtCIOK5xWzuybM2qsQBRph-FXJ0VZ9_jVJNFETfu4UVD5Zfb1-S-byR0JOn",
      price: 99,
      originalPrice: 1499,
      rating: 4.8,
      totalVideos: 50,
      totalHours: "8.5",
      instructor: {
        name: "Neha Sharma",
        title: "Behavioral Economist",
        avatar: "https://i.pravatar.cc/150?img=5"
      },
      learningOutcomes: [
        "Why you shouldn't judge others' financial decisions.",
        "The difference between getting wealthy and staying wealthy.",
        "Understanding compounding in finance.",
        "How to define your concept of 'enough'."
      ],
      curriculum: [
        {
          section: "MODULE 1: WEALTH & MINDSET",
          lessons: [
            { title: "No One's Crazy", duration: "10:15", free: true },
            { title: "Luck & Risk", duration: "12:30", free: true },
            { title: "Never Enough", duration: "14:45", free: true },
            { title: "Confounding Compounding", duration: "18:20", free: true },
          ]
        },
        {
          section: "MODULE 2: GETTING VS STAYING WEALTHY",
          lessons: [
            { title: "Getting Wealthy vs Staying Wealthy", duration: "Premium Content", free: false },
            { title: "Tails, You Win", duration: "Premium Content", free: false },
          ]
        }
      ],
      keywords: ["finance", "psychology", "money"]
    }
  };

  return courses[slug] || courses["rich-dad-poor-dad"];
}

interface CourseData {
  title: string;
  subtitle: string;
  author: string;
  series: string;
  description: string;
  thumbnail: string;
  price: number;
  originalPrice: number;
  rating: number;
  totalVideos: number;
  totalHours: string;
  instructor: {
    name: string;
    title: string;
    avatar: string;
  };
  learningOutcomes: string[];
  curriculum: {
    section: string;
    lessons: { title: string; duration: string; free: boolean }[];
  }[];
  keywords: string[];
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  return (
    <div className="min-h-screen bg-[#111111] text-white px-4 md:px-8 py-8 md:py-12 font-sans">
      <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-8">
        
        {/* LEFT COLUMN: Main Info */}
        <div className="flex-1 space-y-8">
          
          {/* Hero Card */}
          <div className="bg-[#1A1A1A] rounded-3xl border border-white/5 p-6 md:p-10 flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Thumbnail */}
            <div className="w-full md:w-[320px] shrink-0">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/10 group">
                <Image 
                  src={course.thumbnail} 
                  alt={course.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                
                {/* Play Overlay */}
                <Link href={`/watch/${slug}`} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                   <div className="w-20 h-20 bg-[#FF7A00] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,122,0,0.4)] transform group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-white text-[40px] ml-1" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                   </div>
                </Link>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-[#FF7A00] font-bold text-[11px] tracking-[0.2em] mb-4 uppercase">
                <span className="material-symbols-outlined text-[16px]">business_center</span>
                {course.series}
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-[1.1]">
                {course.title}
              </h1>
              <p className="text-xl text-gray-400 mb-8 font-medium leading-relaxed">
                {course.subtitle}
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[13px] font-medium text-gray-300">
                  <span className="material-symbols-outlined text-[18px] text-gray-500">video_library</span>
                  {course.totalVideos} Videos
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[13px] font-medium text-gray-300">
                  <span className="material-symbols-outlined text-[18px] text-gray-500">schedule</span>
                  {course.totalHours} Hours
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[13px] font-medium text-gray-300">
                  <span className="material-symbols-outlined text-[18px] text-gray-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  {course.rating} Rating
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed text-[15px] mb-10 max-w-[90%]">
                {course.description}
              </p>

              {/* Action Box */}
              <div className="bg-[#111111] rounded-2xl border border-[#FF7A00]/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[#FF7A00]/5 pointer-events-none"></div>
                <div className="relative z-10 w-full sm:w-auto text-center sm:text-left">
                  <p className="text-[11px] font-bold text-[#888] tracking-widest uppercase mb-1">Full Course Access</p>
                  <div className="flex items-baseline justify-center sm:justify-start gap-3">
                    <span className="text-4xl font-bold text-[#FF7A00] tracking-tight">₹{course.price}</span>
                    <span className="text-gray-500 line-through text-lg font-medium">₹{course.originalPrice}</span>
                  </div>
                </div>
                
                <div className="relative z-10 w-full sm:w-auto flex flex-col items-center sm:items-end gap-3">
                  <Link href="/checkout" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto bg-[#FF7A00] hover:bg-[#FF8A1F] text-[#3D1D00] font-bold px-8 py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,122,0,0.2)] hover:shadow-[0_8px_20px_rgba(255,122,0,0.3)]">
                      <span className="material-symbols-outlined text-[20px]">lock_open</span>
                      Unlock Now
                    </button>
                  </Link>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#3CE36A] font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    Lifetime Access • 30-Day Guarantee
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Grid: What You'll Learn & Instructor */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* What You'll Learn */}
            <div className="bg-[#1A1A1A] rounded-3xl border border-white/5 p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white tracking-tight">
                <span className="material-symbols-outlined text-[#FF7A00] text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                What You'll Learn
              </h2>
              <div className="space-y-5">
                {course.learningOutcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-4 text-[#CCC] text-[15px] leading-relaxed">
                    <div className="w-6 h-6 rounded-full bg-[#3CE36A]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[#3CE36A] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    </div>
                    <span className="font-medium">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor Profile Card */}
            <div className="bg-[#1A1A1A] rounded-3xl border border-white/5 p-8 md:p-10 flex flex-col items-center justify-center text-center">
              <div className="relative w-28 h-28 rounded-full overflow-hidden shrink-0 border-2 border-[#FF7A00] p-1 mb-6">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <Image src={course.instructor.avatar} alt={course.instructor.name} fill className="object-cover" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">{course.instructor.name}</h2>
              <p className="text-[#888] text-[15px] font-medium">{course.instructor.title}</p>
            </div>
            
          </div>
        </div>

        {/* RIGHT COLUMN: Curriculum Sidebar */}
        <div className="w-full xl:w-[460px] shrink-0">
          <div className="bg-[#1A1A1A] rounded-3xl border border-white/5 flex flex-col overflow-hidden h-fit sticky top-24">
            
            <div className="p-8 border-b border-white/5 bg-[#1A1A1A]">
              <h2 className="text-2xl font-bold mb-1 text-white tracking-tight">Course Curriculum</h2>
              <p className="text-[13px] text-[#888] font-medium">{course.totalVideos} Modules • Structured Learning</p>
            </div>
            
            <div className="p-6 md:p-8 space-y-8 max-h-[800px] overflow-y-auto">
              {course.curriculum.map((section, sIdx) => (
                <div key={sIdx}>
                  <h4 className="text-[11px] font-bold text-[#FF7A00] uppercase tracking-[0.15em] mb-4 px-2">{section.section}</h4>
                  <div className="space-y-3">
                    {section.lessons.map((lesson, lIdx) => {
                      const isFree = lesson.free;
                      const className = `p-4 rounded-2xl flex items-center justify-between group transition-all duration-300 border border-white/5 ${isFree ? 'bg-[#222222] hover:bg-[#2A2A2A] cursor-pointer block' : 'bg-[#111111]'}`;
                      
                      const content = (
                        <>
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors shrink-0 border border-white/5 ${isFree ? 'bg-[#1A1A1A]' : 'bg-[#161616]'}`}>
                              <span className={`material-symbols-outlined text-[20px] ${isFree ? 'text-[#FF7A00]' : 'text-[#666]'}`} style={isFree ? { fontVariationSettings: "'FILL' 1" } : {}}>
                                {isFree ? 'play_arrow' : 'lock'}
                              </span>
                            </div>
                            <div>
                              <p className={`text-[14px] font-bold leading-tight mb-1.5 ${isFree ? 'text-white' : 'text-[#888]'}`}>
                                {lIdx + 1 + (sIdx * 5)}. {lesson.title}
                              </p>
                              <div className="flex items-center gap-1.5 text-[11px] text-[#666] font-medium tracking-wide">
                                <span className="material-symbols-outlined text-[14px]">schedule</span>
                                {lesson.duration}
                              </div>
                            </div>
                          </div>
                          {isFree && (
                            <span className="text-[9px] font-bold px-2 py-1 rounded bg-[#3CE36A]/10 text-[#3CE36A] tracking-widest shrink-0 ml-4 group-hover:bg-[#3CE36A]/20 transition-colors uppercase">FREE</span>
                          )}
                        </>
                      );

                      return isFree ? (
                        <Link key={lIdx} href={`/watch/${slug}`} className={className}>
                          {content}
                        </Link>
                      ) : (
                        <div key={lIdx} className={className}>
                          {content}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
