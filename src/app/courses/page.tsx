"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MyCoursesPage() {
  const [activeTab, setActiveTab] = useState("All");

  const progressCourses = [
    {
      title: "Financial Modeling Basics",
      instructor: "Sarah Chen",
      progressText: "12/40",
      percent: 30,
      isDone: false,
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXnXu_yDN9pA2AcNi7xJVUZDTX2ySF6Ut9OaTA_kJt8Jfb4MdOiS4-YEJTy7z5-WYYohyKBNV1gtnKPrCQz8JWy0VgJNSudC1HrNkva3XMt_-Lt1eSDcuI87gfi9SwEvfHSkAIv7mMXkCF-Gx3jDCC1HibsP20NSeWHnBV3OQUfPvJsSuup0dlc57aZEJH51icMfXJ1CPqV5iqkLtCIOK5xWzuybM2qsQBRph-FXJ0VZ9_jVJNFETfu4UVD5Zfb1-S-byR0JOn",
    },
    {
      title: "Leadership Communication",
      instructor: "David Miller",
      progressText: "25/25",
      percent: 100,
      isDone: true,
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPJCggFkjVFZZj5DEReHfqXFG4D5yBhoXbb8SQV-5wjJCfkDGiyb3FkQpHqurCbnb6lXeIuqvuYZe8KGfIX9GXG9ungwxUL87dxjKWtP42-xnZ8cXkofhCimqmojXN9w9ftk8oTIEKsEzaj-2AOL3Nxt51M3g7pWk16kOLZ6VlBjPJ6_oceQhqq2C6gcwKFZYmcP3eR45X8c9JVubexfhVYFIze1eXT3k211hPzFr5Fupjz5egDjzfCKkcLiVtRL3opsT-VqR7",
    },
    {
      title: "Python for Data Analysis",
      instructor: "Dr. Emily Roberts",
      progressText: "2/85",
      percent: 2,
      isDone: false,
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXnXu_yDN9pA2AcNi7xJVUZDTX2ySF6Ut9OaTA_kJt8Jfb4MdOiS4-YEJTy7z5-WYYohyKBNV1gtnKPrCQz8JWy0VgJNSudC1HrNkva3XMt_-Lt1eSDcuI87gfi9SwEvfHSkAIv7mMXkCF-Gx3jDCC1HibsP20NSeWHnBV3OQUfPvJsSuup0dlc57aZEJH51icMfXJ1CPqV5iqkLtCIOK5xWzuybM2qsQBRph-FXJ0VZ9_jVJNFETfu4UVD5Zfb1-S-byR0JOn",
    },
    {
      title: "Strategic Product Management",
      instructor: "Michael Chang",
      progressText: "41/60",
      percent: 68,
      isDone: false,
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPJCggFkjVFZZj5DEReHfqXFG4D5yBhoXbb8SQV-5wjJCfkDGiyb3FkQpHqurCbnb6lXeIuqvuYZe8KGfIX9GXG9ungwxUL87dxjKWtP42-xnZ8cXkofhCimqmojXN9w9ftk8oTIEKsEzaj-2AOL3Nxt51M3g7pWk16kOLZ6VlBjPJ6_oceQhqq2C6gcwKFZYmcP3eR45X8c9JVubexfhVYFIze1eXT3k211hPzFr5Fupjz5egDjzfCKkcLiVtRL3opsT-VqR7",
    },
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-white px-3 sm:px-4 md:px-8 py-6 md:py-8 pb-28 md:pb-12 font-sans overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto min-w-0">
        
        {/* ══ Page Header ══ */}
        <div className="mb-6 md:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 tracking-tight">My Courses</h1>
          <p className="text-[#999] text-xs sm:text-[13px] md:text-[15px]">Pick up right where you left off.</p>
        </div>

        {/* ══ Continue Learning Hero Card ══ */}
        <div className="bg-[#1A1A1A] rounded-2xl md:rounded-[24px] border border-white/5 overflow-hidden flex flex-col lg:flex-row mb-8 md:mb-12 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          
          {/* Left Side: Course Hero Image */}
          <div className="w-full lg:w-[460px] min-h-[160px] sm:min-h-[200px] lg:min-h-full bg-gradient-to-br from-[#0F1E24] via-[#152B34] to-[#122228] p-4 sm:p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shrink-0 border-b lg:border-b-0 lg:border-r border-white/5">
            {/* Soft glow in background */}
            <div className="absolute inset-0 bg-[#3AC0D6]/10 blur-[60px] pointer-events-none"></div>
            
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full h-full my-4 lg:my-0">
              <div className="relative w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXnXu_yDN9pA2AcNi7xJVUZDTX2ySF6Ut9OaTA_kJt8Jfb4MdOiS4-YEJTy7z5-WYYohyKBNV1gtnKPrCQz8JWy0VgJNSudC1HrNkva3XMt_-Lt1eSDcuI87gfi9SwEvfHSkAIv7mMXkCF-Gx3jDCC1HibsP20NSeWHnBV3OQUfPvJsSuup0dlc57aZEJH51icMfXJ1CPqV5iqkLtCIOK5xWzuybM2qsQBRph-FXJ0VZ9_jVJNFETfu4UVD5Zfb1-S-byR0JOn" 
                  alt="Advanced Marketing Analytics"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-3 mt-6 z-10 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/5 w-fit">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-black text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </div>
              <span className="text-[13px] font-medium text-white tracking-wide">Module 3: Attribution Models</span>
            </div>
          </div>
          
          {/* Right Side: Content */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-12 flex-1 flex flex-col justify-center bg-[#1A1A1A] min-w-0">
            <div className="flex items-center gap-1.5 text-[#FFB084] font-bold text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.15em] mb-2 sm:mb-3 md:mb-4 uppercase">
              <span className="material-symbols-outlined text-[14px] sm:text-[16px]">sync</span>
              Continue Learning
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold mb-2 md:mb-4 tracking-tight leading-tight line-clamp-2">Advanced Marketing Analytics</h2>
            
            <p className="hidden md:block text-[#888] text-sm md:text-[15px] leading-relaxed mb-6 md:mb-10 max-w-2xl line-clamp-3">
              Master complex attribution modeling and data-driven decision making to optimize your marketing spend and demonstrate clear ROI to stakeholders.
            </p>
            
            <div className="space-y-2 md:space-y-4 mb-5 md:mb-8 max-w-[600px]">
              <div className="flex justify-between text-[11px] md:text-[13px] font-bold tracking-wide">
                <span className="text-white">45% Complete</span>
                <span className="text-[#888]">32/70 videos</span>
              </div>
              <div className="w-full h-1.5 md:h-[6px] bg-[#2A2A2A] rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-[#A5A6F6] rounded-full w-[45%] shadow-[0_0_10px_rgba(165,166,246,0.5)]"></div>
              </div>
            </div>

            <div>
              <Link href="/watch/advanced-marketing-analytics">
                <button className="w-full sm:w-auto bg-[#FFB084] hover:bg-[#FFC29D] text-[#5C2D11] px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,176,132,0.15)] hover:shadow-[0_4px_20px_rgba(255,176,132,0.25)] text-sm md:text-base">
                  <span className="material-symbols-outlined text-[18px] md:text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  Resume Course
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* ══ In Progress & Completed Section ══ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-8 gap-3 sm:gap-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight">Your Courses</h2>
          
          {/* Scrollable Tabs on Mobile */}
          <div className="flex gap-1 bg-[#1A1A1A] p-1 rounded-xl border border-white/5 overflow-x-auto hide-scrollbar w-full sm:w-auto">
            {["All", "In Progress", "Completed"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-[13px] font-bold transition-all duration-200 ${
                  activeTab === tab 
                    ? "bg-[#2A2A2A] text-white shadow-sm" 
                    : "text-[#888] hover:text-white hover:bg-white/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ══ Grid: Horizontal on Mobile, Grid on Desktop ══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {progressCourses.map((course, idx) => (
            <div key={idx} className="bg-[#161616] rounded-xl md:rounded-2xl border border-white/5 overflow-hidden flex flex-row sm:flex-col group hover:border-white/10 transition-colors shadow-sm sm:shadow-lg cursor-pointer hover:-translate-y-0.5 sm:hover:-translate-y-1 duration-300">
              
              {/* Thumbnail Area */}
              <div className="relative w-28 sm:w-full h-auto sm:aspect-[16/9] shrink-0 bg-[#222]">
                <Image 
                  src={course.thumbnail} 
                  alt={course.title} 
                  fill 
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                {course.isDone && (
                  <div className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 bg-[#0E3B1B] border border-[#3CE36A]/30 text-[#3CE36A] px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[8px] sm:text-[11px] font-bold tracking-wider sm:tracking-widest uppercase flex items-center gap-0.5 sm:gap-1 shadow-lg">
                    <span className="material-symbols-outlined text-[10px] sm:text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="hidden sm:inline">Done</span>
                  </div>
                )}
                
                {/* Hover Play Button Overlay (Desktop Only) */}
                <div className="hidden sm:flex absolute inset-0 bg-black/40 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <span className="material-symbols-outlined text-white text-[24px] md:text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  </div>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <h3 className="font-bold text-xs sm:text-[14px] md:text-[15px] text-white leading-tight mb-1 group-hover:text-[#FF7A00] transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] md:text-[12px] text-[#888] font-medium mb-2 sm:mb-4 md:mb-5 truncate">
                    {course.instructor}
                  </p>
                </div>
                
                {/* Progress Details */}
                <div>
                  <div className="flex items-center justify-between text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-wide mb-1.5 sm:mb-2.5">
                    <span className="text-[#888]">{course.progressText} <span className="hidden sm:inline">videos</span></span>
                    <span className={course.isDone ? "text-[#3CE36A]" : "text-[#A5A6F6]"}>
                      {course.percent}%
                    </span>
                  </div>
                  <div className="w-full h-[3px] sm:h-[4px] bg-[#2A2A2A] rounded-full overflow-hidden border border-white/5">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${course.isDone ? "bg-[#3CE36A] shadow-[0_0_8px_rgba(60,227,106,0.5)]" : "bg-[#A5A6F6] shadow-[0_0_8px_rgba(165,166,246,0.5)]"}`} 
                      style={{ width: `${course.percent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
