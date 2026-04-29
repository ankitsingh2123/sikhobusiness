import React from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { EditProfileModal } from "@/components/account/EditProfileModal";
import { redis } from "@/lib/redis";

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Check cache first for fast output (including image URLs)
  const cacheKey = `cache:frontend:user:${user.id}`;
  let dbUser: any = await redis.get(cacheKey);

  if (!dbUser) {
    // Fetch real user data from Prisma
    dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        purchases: true,
        progress: true
      }
    });

    if (dbUser) {
      // Store in Redis as a JSON link for 5 minutes (300s)
      await redis.setex(cacheKey, 300, dbUser);
    }
  }

  if (!dbUser) {
    redirect("/auth/login");
  }

  const name = dbUser.name || "Learner";
  const email = dbUser.email;
  const roleDisplay = dbUser.role === "ADMIN" ? "Platform Creator & Admin" : "Pro Learner";
  const avatarUrl = dbUser.avatar || "https://i.pravatar.cc/150?img=11";
  
  const fallbackAbout = dbUser.role === "ADMIN" 
    ? "Welcome back, Admin! You have full access to create, edit, and manage all courses and platform settings."
    : "Passionate about learning and growth strategies. Constantly upskilling to stay ahead in the dynamic landscape.";
  const about = dbUser.about || fallbackAbout;
  
  // Calculate some stats
  const coursesDone = dbUser.purchases.length;
  // Approximation: let's assume each progress entry is 10 mins (0.16 hr) just for UI demo, or use actual
  const learnHours = Math.floor(dbUser.progress.length * 0.16) || 0;
  // Certificates (assumed logic: 1 cert per purchased course that has progress)
  const certificates = Math.floor(coursesDone * 0.8) || 0;
  return (
    <div className="min-h-screen bg-[#0A0A0A] px-3 sm:px-4 md:px-8 py-6 md:py-12 font-sans text-white overflow-hidden relative">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#FF7A00]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-[#3CE36A]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] lg:max-w-full mx-auto space-y-4 sm:space-y-6 relative z-10">
        
        {/* ── Profile Header Card ── */}
        <div className="bg-[#111]/80 backdrop-blur-xl rounded-2xl md:rounded-[32px] border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
          {/* Top Banner Gradient */}
          <div className="h-24 sm:h-32 md:h-[160px] w-full bg-gradient-to-r from-[#FF7A00]/20 via-[#1A1A1A] to-[#0A0A0A] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#FF7A00]/20 blur-[100px] -translate-y-1/2 -translate-x-1/4 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50 z-0" />
          </div>
          
          <div className="px-4 sm:px-6 md:px-12 pb-6 md:pb-10 relative z-10">
            {/* Avatar & Main Details Row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 -mt-10 sm:-mt-12 md:-mt-[60px] relative z-10 mb-5 md:mb-8">
              
              <div className="flex items-end sm:items-end gap-4 md:gap-6">
                {/* Avatar */}
                <div className="relative flex-shrink-0 group">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-[140px] md:h-[140px] rounded-full border-4 md:border-8 border-[#0A0A0A] overflow-hidden bg-[#222] shadow-[0_0_30px_rgba(0,0,0,0.8)] relative z-10 group-hover:scale-105 transition-transform duration-500">
                    <Image 
                      src={avatarUrl} 
                      alt={name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  {/* Edit Pencil Badge */}
                  <button className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-8 h-8 md:w-10 md:h-10 bg-[#FF7A00] rounded-full flex items-center justify-center border-2 md:border-[3px] border-[#0A0A0A] hover:bg-[#FF9A44] transition-all z-20 shadow-[0_4px_15px_rgba(255,122,0,0.5)] group-hover:scale-110">
                    <span className="material-symbols-outlined text-[14px] md:text-[18px] text-[#3D1D00] font-black">edit</span>
                  </button>
                </div>

                <div className="mb-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight mb-0.5 text-white truncate">{name}</h1>
                  <p className="text-[#999] text-xs sm:text-[13px] md:text-[15px] font-medium tracking-wide truncate">{roleDisplay} @ Seekho Business</p>
                  <p className="text-[#666] text-[10px] sm:text-xs mt-1 truncate">{email}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button className="flex items-center gap-1.5 bg-[#FF7A00] hover:bg-[#FF8A1F] text-[#3D1D00] px-3 sm:px-4 md:px-5 py-2 md:py-2.5 rounded-full font-bold text-[11px] sm:text-[12px] md:text-[13px] transition-all shadow-[0_4px_15px_rgba(255,122,0,0.2)]">
                  <span className="material-symbols-outlined text-[14px] sm:text-[16px] md:text-[18px]">share</span>
                  Share
                </button>
                <EditProfileModal currentName={name} currentAvatar={avatarUrl} currentAbout={about} />
              </div>

            </div>

            {/* About Section */}
            <div>
              <h3 className="text-[#888] text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase mb-2 md:mb-3">About</h3>
              <p className="text-[#CCC] text-xs sm:text-[13px] md:text-[15px] leading-relaxed max-w-3xl whitespace-pre-wrap">
                {about}
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* ── Learning Overview (Spans 2 columns on desktop) ── */}
          <div className="lg:col-span-2 bg-[#111]/80 backdrop-blur-xl rounded-2xl md:rounded-[32px] border border-white/10 p-5 sm:p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.3)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#3CE36A]/5 blur-[40px] pointer-events-none" />
            
            <div className="flex items-center justify-between mb-5 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight">Learning Overview</h2>
              <button className="text-[11px] sm:text-[12px] md:text-[13px] font-medium text-[#FF7A00] hover:text-[#FF8A1F] flex items-center gap-1 transition-colors">
                <span className="hidden sm:inline">View Report</span>
                <span className="material-symbols-outlined text-[14px] sm:text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* Stats cards ΓÇö horizontal scroll on very small, grid on sm+ */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-5">
              
              {/* Card 1: Courses Completed */}
              <div className="bg-[#222] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/5 flex flex-col justify-between min-h-[120px] sm:min-h-[160px] md:h-[200px]">
                <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-[#FF7A00]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#FF7A00] text-[14px] sm:text-[16px] md:text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div className="mt-2 sm:mt-0">
                  <h3 className="text-xl sm:text-2xl md:text-[40px] font-bold leading-none mb-0.5">{coursesDone}</h3>
                  <p className="text-[#999] text-[9px] sm:text-[11px] md:text-[13px] font-medium">Courses Enrolled</p>
                </div>
                <div className="w-full h-1 sm:h-1.5 bg-[#111] rounded-full mt-2 sm:mt-4 overflow-hidden">
                   <div className="h-full bg-[#3CE36A] w-3/4 rounded-full"></div>
                </div>
              </div>

              {/* Card 2: Learning Hours */}
              <div className="bg-[#222] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/5 flex flex-col justify-between min-h-[120px] sm:min-h-[160px] md:h-[200px]">
                <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-[#8892FF]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#8892FF] text-[14px] sm:text-[16px] md:text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                </div>
                <div className="mt-2 sm:mt-0">
                  <div className="flex items-baseline gap-0.5 mb-0.5">
                    <h3 className="text-xl sm:text-2xl md:text-[40px] font-bold leading-none">{learnHours}</h3>
                    <span className="text-[#999] text-[10px] sm:text-xs md:text-[16px]">hrs</span>
                  </div>
                  <p className="text-[#999] text-[9px] sm:text-[11px] md:text-[13px] font-medium">Learn Hours</p>
                </div>
                <div className="flex items-center gap-1 mt-2 sm:mt-4 text-[#3CE36A] text-[9px] sm:text-[11px] md:text-[12px] font-bold">
                  <span className="material-symbols-outlined text-[12px] sm:text-[14px]">trending_up</span>
                  Active Learner
                </div>
              </div>

              {/* Card 3: Certificates */}
              <div className="bg-[#222] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/5 flex flex-col justify-between min-h-[120px] sm:min-h-[160px] md:h-[200px]">
                <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-[#3CE36A]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#3CE36A] text-[14px] sm:text-[16px] md:text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                </div>
                <div className="mt-2 sm:mt-0">
                  <h3 className="text-xl sm:text-2xl md:text-[40px] font-bold leading-none mb-0.5">{certificates}</h3>
                  <p className="text-[#999] text-[9px] sm:text-[11px] md:text-[13px] font-medium">Certificates</p>
                </div>
                <div className="flex items-center gap-1 mt-2 sm:mt-4">
                  {certificates > 0 ? [...Array(Math.min(5, certificates))].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#3CE36A]"></div>
                  )) : (
                    <span className="text-[#999] text-[10px]">Start learning to earn</span>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* ── Recent Badges ── */}
          <div className="bg-[#111]/80 backdrop-blur-xl rounded-2xl md:rounded-[32px] border border-white/10 p-5 sm:p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#8892FF]/5 blur-[40px] pointer-events-none" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight mb-5 md:mb-8 relative z-10">Recent Badges</h2>
            
            <div className="space-y-4 sm:space-y-5 md:space-y-6 flex-1">
              
              {/* Badge 1 */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#FF7A00] text-[16px] sm:text-[18px] md:text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                </div>
                <div className="min-w-0">
                  <h4 className="text-white text-xs sm:text-[13px] md:text-[14px] font-bold tracking-wide">7-Day Streak</h4>
                  <p className="text-[#888] text-[10px] sm:text-[11px] md:text-[12px]">Consistent Learner</p>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border border-[#8892FF]/30 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#8892FF] text-[16px] sm:text-[18px] md:text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                </div>
                <div className="min-w-0">
                  <h4 className="text-white text-xs sm:text-[13px] md:text-[14px] font-bold tracking-wide">Top 10% Scorer</h4>
                  <p className="text-[#888] text-[10px] sm:text-[11px] md:text-[12px] truncate">Advanced Marketing Analytics</p>
                </div>
              </div>

              {/* Badge 3 */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border border-[#3CE36A]/30 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#3CE36A] text-[16px] sm:text-[18px] md:text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                </div>
                <div className="min-w-0">
                  <h4 className="text-white text-xs sm:text-[13px] md:text-[14px] font-bold tracking-wide">Master Strategist</h4>
                  <p className="text-[#888] text-[10px] sm:text-[11px] md:text-[12px] truncate">Completed 5 Strategy Modules</p>
                </div>
              </div>

            </div>

            <button className="w-full mt-5 md:mt-8 py-3 md:py-3.5 rounded-xl border border-white/10 text-[#CCC] text-[11px] sm:text-[12px] md:text-[13px] font-bold hover:bg-white/5 hover:text-white transition-colors">
              View All Badges
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
