import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { CheckoutButton } from "@/components/checkout/CheckoutButton";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import CourseCurriculum from "@/components/course/CourseCurriculum";
import { Button } from "@/components/ui/Button";
import { Suspense } from "react";
import { FadeIn } from "@/components/ui/FadeIn";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const course = await prisma.course.findUnique({ where: { id } });
  if (!course) return { title: "Course Not Found" };
  return {
    title: `${course.title} — Complete Video Course | Seekho Business`,
    description: course.description,
  };
}

// ── SKELETON ──────────────────────
function CourseSkeleton() {
  return (
    <div className="min-h-screen bg-[#F4F1EA] pb-20 animate-pulse">
      {/* Hero Skeleton */}
      <div className="bg-[#181818] pt-8 pb-20 px-4 sm:px-6 md:px-12 rounded-b-[32px] md:rounded-b-[48px]">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Thumbnail Skeleton */}
          <div className="w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] aspect-[3/4] bg-white/5 rounded-3xl shrink-0 mx-auto md:mx-0" />
          {/* Info Skeleton */}
          <div className="flex-1 space-y-4 pt-4">
            <div className="h-4 w-24 bg-white/5 rounded-full" />
            <div className="h-10 w-3/4 bg-white/5 rounded-xl" />
            <div className="h-20 w-full bg-white/5 rounded-xl" />
            <div className="flex gap-4">
              <div className="h-6 w-20 bg-white/5 rounded-full" />
              <div className="h-6 w-20 bg-white/5 rounded-full" />
              <div className="h-6 w-20 bg-white/5 rounded-full" />
            </div>
            <div className="h-14 w-48 bg-white/5 rounded-xl pt-10" />
          </div>
        </div>
      </div>
      {/* Content Skeleton */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 -mt-10 grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 bg-white/50 backdrop-blur-sm rounded-3xl h-[400px]" />
        <div className="xl:col-span-4 bg-white/50 backdrop-blur-sm rounded-3xl h-[600px]" />
      </div>
    </div>
  );
}

// ── ASYNC CONTENT ─────────────────
async function AsyncCourseContent({ 
  courseId, 
  isPaymentSuccess 
}: { 
  courseId: string;
  isPaymentSuccess: boolean;
}) {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          videos: { orderBy: { order: "asc" } },
        },
      },
    },
  });

  if (!course) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let hasPurchased = false;
  if (user) {
    const purchase = await prisma.purchase.findUnique({
      where: { userId_courseId: { userId: user.id, courseId } },
    });
    if (purchase?.status === "SUCCESS") {
      hasPurchased = true;
    }
  }

  const totalVideos = course.modules.reduce((a, m) => a + m.videos.length, 0);
  const allVideos = course.modules.flatMap((m) => m.videos);
  const freeVideos = allVideos.filter((v) => v.isFreePreview);
  const firstFreeVideo = freeVideos[0];

  const totalSecs = allVideos.reduce((a, v) => a + (v.duration || 0), 0);
  const totalHours = Math.floor(totalSecs / 3600);
  const totalMins = Math.floor((totalSecs % 3600) / 60);
  const totalDurationStr = totalHours > 0
    ? `${totalHours}h ${totalMins}m`
    : totalMins > 0 ? `${totalMins} min` : null;

  const outcomes: string[] = (course as any).outcomes?.length
    ? (course as any).outcomes
    : [
        "Deep understanding of every concept in this course",
        "Practical application of the ideas in real life",
        "Hindi explanation with Indian examples for maximum clarity",
        "Downloadable notes for revision",
        "Lifetime access — watch at your own pace",
      ];

  return (
    <div className="min-h-screen font-sans pb-20" style={{ backgroundColor: "#F4F1EA" }}>
      <div className="bg-[#181818] text-white pt-8 pb-20 px-4 sm:px-6 md:px-12 rounded-b-[32px] md:rounded-b-[48px] relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#FF7A00]/5 blur-[80px] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-8 md:gap-12 relative z-10">
          <div className="w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] shrink-0 mx-auto md:mx-0">
            <FadeIn direction="up">
              <div className="aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-black/50 relative">
                {course.thumbnail ? (
                  <Image src={course.thumbnail} alt={course.title} fill className="object-cover" priority unoptimized />
                ) : (
                  <div className="w-full h-full bg-gradient-to-b from-[#FF9A44] to-[#E54D00] flex items-end p-6">
                    <h2 className="text-white font-bold text-xl leading-tight" style={{ fontFamily: "Georgia, serif" }}>{course.title}</h2>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left min-w-0">
            <FadeIn direction="up" delay={100}>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-[0.15em] text-[#FF7A00] uppercase mb-3 md:mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
                {course.category}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-3 md:mb-4" style={{ fontFamily: "Georgia, serif" }}>
                {course.title}
              </h1>
              <p className="text-[#B0B0B0] text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-2xl mx-auto md:mx-0">{course.description}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-6 mb-6 md:mb-8 text-[11px] sm:text-[13px] font-semibold text-[#888]">
                <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[#FF7A00] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>4.9 Rating</div>
                <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">play_circle</span>{totalVideos} Videos</div>
                <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">view_module</span>{course.modules.length} Modules</div>
                <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>Certificate</div>
              </div>

              {hasPurchased ? (
                <div className="flex flex-col sm:flex-row items-center md:items-start gap-3 md:gap-4">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-[#3CE36A]">
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="text-sm font-bold">You own this course</span>
                  </div>
                  {firstFreeVideo && (
                    <Button href={`/watch/${firstFreeVideo.id}`} variant="primary" size="lg" className="w-full sm:w-auto" leftIcon={<span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>}>
                      Continue Watching
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="text-center md:text-left">
                    <p className="text-[10px] font-bold text-[#888] tracking-widest uppercase mb-1">Full Course Access</p>
                    <div className="flex justify-center md:justify-start items-baseline gap-2">
                      <span className="text-3xl md:text-4xl font-bold text-[#FF7A00]">₹{course.price}</span>
                      <span className="text-gray-500 line-through text-base font-medium">₹{Math.round(Number(course.price) * 20)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-stretch">
                    <div className="flex-1 min-w-[200px]"><CheckoutButton courseId={course.id} price={Number(course.price)} userId={user?.id} /></div>
                    <AddToCartButton courseId={course.id} />
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-1.5 text-[10px] text-[#3CE36A] font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    Lifetime Access • 30-Day Guarantee
                  </div>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 -mt-10 relative z-10">
        <div className="flex flex-col xl:flex-row gap-6 md:gap-8 items-start">
          <div className="flex-1 min-w-0 space-y-6 md:space-y-8">
            <FadeIn direction="up" delay={200}>
              <div className="rounded-2xl md:rounded-3xl border border-white/5 overflow-hidden" style={{ background: "#1A1A1A" }}>
                <div className="px-6 md:px-10 pt-7 pb-5 border-b border-white/5" style={{ background: "linear-gradient(135deg, rgba(255,122,0,0.06), rgba(255,122,0,0))" }}>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,122,0,0.12)" }}>
                      <span className="material-symbols-outlined text-[#FF7A00] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">What You'll Learn</h2>
                  </div>
                  <p className="text-[#666] text-[12px] ml-12">Master these skills by the end of this course</p>
                </div>
                <div className="grid grid-cols-3 divide-x divide-white/5 border-b border-white/5">
                  {[
                    { icon: "play_circle", label: "Videos", value: totalVideos },
                    { icon: "schedule", label: "Duration", value: totalDurationStr || "—" },
                    { icon: "view_module", label: "Modules", value: course.modules.length },
                  ].map((stat) => (
                    <div key={stat.label} className="py-4 px-4 md:px-6 text-center">
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <span className="material-symbols-outlined text-[#FF7A00] text-[14px]">{stat.icon}</span>
                        <span className="text-white font-bold text-base md:text-lg">{stat.value}</span>
                      </div>
                      <p className="text-[#666] text-[10px] uppercase tracking-widest">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="p-6 md:p-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {outcomes.map((outcome, i) => (
                      <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl transition-colors hover:bg-white/[0.03]" style={{ border: "1px solid rgba(255,255,255,0.04)" }}>
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(60,227,106,0.1)" }}>
                          <span className="material-symbols-outlined text-[#3CE36A] text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                        </div>
                        <span className="text-[#CCC] text-[13px] md:text-sm leading-relaxed font-medium">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="w-full xl:w-[460px] shrink-0 min-w-0">
            <FadeIn direction="left" delay={300}>
              <CourseCurriculum modules={course.modules} hasPurchased={hasPurchased} totalVideos={totalVideos} />
              {!hasPurchased && (
                <div className="mt-4 rounded-2xl border border-[#FF7A00]/10 p-5 relative overflow-hidden" style={{ background: "rgba(255,122,0,0.04)", borderColor: "rgba(255,122,0,0.12)" }}>
                  <p className="text-[10px] font-bold text-[#888] tracking-widest uppercase mb-1">Full Course Access</p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-[#FF7A00]">₹{course.price}</span>
                    <span className="text-gray-500 line-through text-base">₹{Math.round(Number(course.price) * 20)}</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <CheckoutButton courseId={course.id} price={Number(course.price)} userId={user?.id} />
                    <AddToCartButton courseId={course.id} />
                  </div>
                  <p className="flex items-center gap-1.5 text-[10px] text-[#3CE36A] font-bold uppercase tracking-wider mt-3">
                    <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    Lifetime Access • 30-Day Guarantee
                  </p>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function CoursePage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment?: string }>;
}) {
  const params = await paramsPromise;
  const searchParams = await searchParamsPromise;
  const courseId = params.id;
  const isPaymentSuccess = searchParams.payment === "success";

  return (
    <Suspense fallback={<CourseSkeleton />}>
      <AsyncCourseContent courseId={courseId} isPaymentSuccess={isPaymentSuccess} />
    </Suspense>
  );
}
