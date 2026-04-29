"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";

const categories = [
  { name: "Sarkari Kaam", icon: "fingerprint", color: "#FFA726", id: "sarkari-kaam" },
  { name: "Part Time Income", icon: "currency_rupee", color: "#66BB6A", id: "part-time-income" },
  { name: "Instagram", icon: "photo_camera", color: "#EC407A", id: "instagram" },
  { name: "Youtube", icon: "play_circle", color: "#EF5350", id: "youtube" },
  { name: "English Speaking", icon: "translate", color: "#26A69A", id: "english-speaking" },
  { name: "Astrology", icon: "auto_awesome", color: "#AB47BC", id: "astrology" },
  { name: "Finance", icon: "account_balance_wallet", color: "#9CCC65", id: "finance" },
  { name: "Business", icon: "storefront", color: "#42A5F5", id: "business" },
  { name: "Wellness", icon: "volunteer_activism", color: "#80CBC4", id: "wellness" },
  { name: "Career & Jobs", icon: "school", color: "#29B6F6", id: "career-jobs" },
  { name: "Share Market", icon: "trending_up", color: "#E040FB", id: "share-market" },
  { name: "Editing", icon: "content_cut", color: "#FFCA28", id: "editing" },
  { name: "Mobile Tricks", icon: "smartphone", color: "#1E88E5", id: "mobile-tricks" },
  { name: "Success", icon: "emoji_events", color: "#AFB42B", id: "success" },
  { name: "Health", icon: "monitor_heart", color: "#EF5350", id: "health" },
  { name: "Knowledge", icon: "psychology", color: "#B388FF", id: "knowledge" },
  { name: "Crime", icon: "local_police", color: "#9E9E9E", id: "crime" },
  { name: "Horror", icon: "skull", color: "#F44336", id: "horror" },
  { name: "Devotion", icon: "self_improvement", color: "#FF7043", id: "devotion" },
  { name: "Food", icon: "restaurant", color: "#FFA726", id: "food" },
  { name: "Self-Growth", icon: "lightbulb", color: "#FFB74D", id: "self-growth" },
  { name: "Agriculture", icon: "eco", color: "#66BB6A", id: "agriculture" },
  { name: "Marketing", icon: "campaign", color: "#4FC3F7", id: "marketing" },
  { name: "Automobile", icon: "directions_car", color: "#9575CD", id: "automobile" },
  { name: "Startups", icon: "rocket_launch", color: "#EF5350", id: "startups" },
  { name: "History", icon: "account_balance", color: "#BCAAA4", id: "history" },
  { name: "AI", icon: "memory", color: "#FFCA28", id: "ai" },
  { name: "Beauty", icon: "face_retouching_natural", color: "#F48FB1", id: "beauty" },
  { name: "Exam Prep", icon: "fact_check", color: "#D4E157", id: "exam-prep" },
  { name: "Computer", icon: "desktop_windows", color: "#7986CB", id: "computer" },
  { name: "Coding", icon: "code", color: "#26A69A", id: "coding" },
  { name: "Life Hacks", icon: "tips_and_updates", color: "#FF8A65", id: "life-hacks" },
  { name: "Technology", icon: "settings", color: "#FFB74D", id: "technology" },
  { name: "Fitness & Gym", icon: "fitness_center", color: "#CE93D8", id: "fitness-gym" },
  { name: "Motivation", icon: "directions_run", color: "#BA68C8", id: "motivation" },
  { name: "Photography", icon: "camera_alt", color: "#81D4FA", id: "photography" },
  { name: "Math", icon: "calculate", color: "#FF9800", id: "math" },
  { name: "Art & Craft", icon: "palette", color: "#F06292", id: "art-craft" },
  { name: "Ramayan", icon: "auto_stories", color: "#FFB74D", id: "ramayan" },
  { name: "Cricket", icon: "sports_cricket", color: "#5C6BC0", id: "cricket" }
];

export default function AllCategoriesPage() {
  return (
    <div className="min-h-screen bg-[#07080F] text-white px-4 sm:px-6 md:px-12 py-10 md:py-16 pb-28 font-sans overflow-hidden relative">
      
      {/* ── PREMIUM VIDEO BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#07080F]" aria-hidden="true">
        {/* The Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          style={{ filter: 'brightness(0.7) contrast(1.2)' }}
        >
          {/* Using a premium abstract dark purple/blue fluid video from Coverr for demonstration */}
          <source src="https://cdn.coverr.co/videos/coverr-abstract-blue-and-purple-fluid-5639/1080p.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlays to blend the video into the page */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-transparent to-[#07080F]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080F] via-transparent to-[#07080F]" />
        <div className="absolute inset-0 bg-[#6D28D9]/5 mix-blend-screen" />
        
        {/* Deep noise texture over the video for that ultra-premium tech feel */}
        <div className="absolute inset-0 bg-[url('https://skills.sikhobusiness.com/wp-content/uploads/2025/02/noise.png')] opacity-[0.05] mix-blend-overlay z-0" />
      </div>

      <div className="max-w-[1400px] mx-auto min-w-0 relative z-10">
        
        {/* Header with Floating 3D Elements */}
        <div className="mb-12 md:mb-24 flex flex-col items-center text-center relative mt-8">
          <FadeIn direction="up" delay={100}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0D0E1A]/80 backdrop-blur-xl border border-[#8B5CF6]/20 text-[#A5B4FC] font-semibold text-[11px] sm:text-xs mb-8 shadow-[0_0_20px_rgba(109,40,217,0.15)] uppercase tracking-widest relative">
              <span className="absolute inset-0 rounded-full bg-[#8B5CF6]/10 animate-pulse pointer-events-none" />
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
              Discover Your Next Skill
            </div>
          </FadeIn>
          
          <FadeIn direction="up" delay={200}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-black mb-6 tracking-tight text-white leading-[1.05] drop-shadow-2xl">
              Explore <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#F59E0B] relative">
                Categories
                {/* Sparkle overlay on text */}
                <span className="absolute -top-6 -right-8 material-symbols-outlined text-[#F59E0B] text-[32px] animate-pulse">sparkles</span>
              </span>
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={300}>
            <p className="text-[#94A3B8] text-sm md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              Dive into our curated collection of professional courses designed to elevate your skills, accelerate your career, and build your business.
            </p>
          </FadeIn>
        </div>

        {/* ── BENTO GRID HERO CATEGORIES ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-12 lg:h-[400px]">
          {/* Main Hero Card - Business & Startups */}
          <FadeIn direction="up" delay={400} className="md:col-span-8 h-full">
            <Link href="/search?category=Business" className="group relative rounded-[32px] overflow-hidden flex flex-col justify-end p-8 sm:p-12 hover:-translate-y-2 transition-transform duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] h-full min-h-[300px]">
              <div className="absolute inset-0 bg-[#0D0E1A]/80 z-0" />
              <Image 
                src="https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=2070" 
                alt="Business & Technology" 
                fill
                className="object-cover opacity-60 mix-blend-screen group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] via-[#07080F]/40 to-transparent z-10" />
              <div className="relative z-20">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-widest uppercase mb-4">
                  <span className="material-symbols-outlined text-[14px] text-[#F59E0B]">local_fire_department</span> Trending
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#A5B4FC] transition-all">Business & AI</h2>
                <p className="text-[#94A3B8] text-sm sm:text-base max-w-md">Master the tools of tomorrow. From startup foundations to advanced artificial intelligence integration.</p>
              </div>
            </Link>
          </FadeIn>

          {/* Secondary Stacked Cards */}
          <div className="md:col-span-4 flex flex-col gap-4 md:gap-6 h-full">
            <FadeIn direction="up" delay={500} className="flex-1">
              <Link href="/search?category=Editing" className="group relative rounded-[32px] overflow-hidden flex flex-col justify-end p-6 sm:p-8 hover:-translate-y-2 transition-transform duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] h-full min-h-[200px]">
                <div className="absolute inset-0 bg-[#4C1D95]/40 z-0" />
                <Image 
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070" 
                  alt="Creative & Editing" 
                  fill
                  className="object-cover opacity-50 mix-blend-screen group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] to-transparent z-10" />
                <div className="relative z-20">
                  <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-[#F472B6] transition-colors">Video Editing</h2>
                  <p className="text-[#94A3B8] text-xs">Premiere Pro, After Effects & Design</p>
                </div>
              </Link>
            </FadeIn>

            <FadeIn direction="up" delay={600} className="flex-1">
              <Link href="/search?category=Finance" className="group relative rounded-[32px] overflow-hidden flex flex-col justify-end p-6 sm:p-8 hover:-translate-y-2 transition-transform duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] h-full min-h-[200px]">
                <div className="absolute inset-0 bg-[#065F46]/40 z-0" />
                <Image 
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070" 
                  alt="Finance & Wealth" 
                  fill
                  className="object-cover opacity-50 mix-blend-screen group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080F] to-transparent z-10" />
                <div className="relative z-20">
                  <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-[#34D399] transition-colors">Share Market</h2>
                  <p className="text-[#94A3B8] text-xs">Trading, Investing & Wealth Growth</p>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>

        {/* ── ALL CATEGORIES GRID ── */}
        <FadeIn direction="up">
          <div className="flex items-center gap-4 mb-8 mt-16">
            <div className="h-px bg-white/10 flex-1" />
            <h3 className="text-[#A5B4FC] font-semibold tracking-widest uppercase text-sm">Browse All Topics</h3>
            <div className="h-px bg-white/10 flex-1" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.filter(c => !['Business', 'Editing', 'Finance', 'Share Market', 'AI'].includes(c.name)).map((cat, idx) => (
            <FadeIn key={cat.name} direction="up" delay={(idx % 6) * 50}>
              <Link 
                href={`/search?category=${encodeURIComponent(cat.name)}`} 
                className="group relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-[24px] bg-[#0D0E1A]/40 backdrop-blur-md border border-white/5 hover:bg-[#0D0E1A]/80 hover:border-[#8B5CF6]/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full"
              >
                <div 
                  className="relative w-12 h-12 rounded-[16px] flex items-center justify-center mb-3 transition-transform duration-500 group-hover:scale-110 shadow-inner"
                  style={{ 
                    backgroundColor: `${cat.color}15`, 
                    color: cat.color, 
                  }}
                >
                  <span className="material-symbols-outlined text-[24px] drop-shadow-md" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {cat.icon}
                  </span>
                </div>
                
                <h3 className="text-white font-medium text-xs sm:text-sm text-center transition-colors duration-300 group-hover:text-white line-clamp-1">
                  {cat.name}
                </h3>
              </Link>
            </FadeIn>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        @keyframes shimmer {
          100% { left: 200%; }
        }
        .animate-shimmer {
          animation: shimmer 1.5s ease-out;
        }
        @keyframes staggerUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-stagger-up {
          animation: staggerUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes aurora-1 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(5%, 5%) scale(1.1) rotate(5deg); }
          66% { transform: translate(-5%, 8%) scale(0.9) rotate(-5deg); }
        }
        @keyframes aurora-2 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(-8%, -5%) scale(1.15) rotate(-5deg); }
          66% { transform: translate(5%, -8%) scale(0.85) rotate(5deg); }
        }
        @keyframes aurora-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(8%, -8%) scale(1.1); }
        }
        @keyframes aurora-4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-10%, 10%) scale(1.2); }
        }
        .animate-aurora-1 { animation: aurora-1 25s ease-in-out infinite alternate; }
        .animate-aurora-2 { animation: aurora-2 30s ease-in-out infinite alternate; }
        .animate-aurora-3 { animation: aurora-3 20s ease-in-out infinite alternate; }
        .animate-aurora-4 { animation: aurora-4 35s ease-in-out infinite alternate; }
      `}</style>
    </div>
  );
}
