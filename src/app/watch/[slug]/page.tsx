"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function WatchPage() {
  const params = useParams();
  const slug = params.slug;
  const [activeLesson, setActiveLesson] = useState(2); // Index 2 is the 3rd lesson (Advanced Market Segmentation)

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col font-sans">
      
      {/* Top Navbar */}
      <header className="h-[60px] bg-[#0A0A0A] border-b border-white/5 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-6">
          <Link href="/courses" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            <span className="font-bold text-[15px]">Seekho Business</span>
          </Link>
          <div className="w-[1px] h-6 bg-white/10"></div>
          <h1 className="text-[17px] font-medium text-gray-200 tracking-wide">
            Advanced Marketing Strategies
          </h1>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="relative hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-[#FF7A00] text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF7A00] rounded-full border border-[#0A0A0A]"></span>
          </button>
          <div className="w-8 h-8 rounded-full border border-[#FF7A00] overflow-hidden p-0.5">
            <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden relative">
              <Image src="https://i.pravatar.cc/100?img=11" alt="User" fill className="object-cover" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Side: Video & Details */}
        <div className="flex-1 overflow-y-auto bg-[#161616]">
          {/* Video Player Area */}
          <div className="relative w-full aspect-video bg-black flex flex-col justify-between group">
            
            {/* Top Badges */}
            <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-[11px] font-medium text-gray-300 tracking-wider">
                <span className="material-symbols-outlined text-[14px]">check</span>
                Offline Viewing Only
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#FF3B30]/30 bg-black/40 backdrop-blur-md text-[11px] font-medium text-[#FF3B30] tracking-wider">
                <span className="material-symbols-outlined text-[14px]">security</span>
                Anti-Record Security
              </div>
            </div>

            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 bg-[#FF7A00] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,122,0,0.4)] hover:scale-105 transition-transform z-10">
                <span className="material-symbols-outlined text-white text-[40px] ml-1" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </button>
            </div>

            {/* Custom Controls Container */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              
              {/* Progress Bar */}
              <div className="relative h-1.5 bg-white/20 rounded-full mb-4 cursor-pointer">
                <div className="absolute top-0 left-0 h-full bg-[#FF7A00] rounded-full" style={{ width: '35%' }}></div>
                <div className="absolute top-1/2 left-[35%] w-3.5 h-3.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-md"></div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-5">
                  <button className="hover:text-[#FF7A00] transition-colors"><span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>pause</span></button>
                  <button className="hover:text-[#FF7A00] transition-colors"><span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>volume_up</span></button>
                  <span className="text-[13px] font-medium text-gray-300 tracking-wide ml-1">04:20 / 12:45</span>
                </div>
                <div className="flex items-center gap-5">
                  <button className="hover:text-[#FF7A00] transition-colors"><span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>closed_caption</span></button>
                  <button className="hover:text-[#FF7A00] transition-colors"><span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span></button>
                  <button className="hover:text-[#FF7A00] transition-colors"><span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>fullscreen</span></button>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section below video */}
          <div className="p-8 md:p-10 max-w-[1000px]">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Module 3: Advanced Market Segmentation
            </h2>
            
            <div className="flex items-center gap-6 mb-8 text-[13px] font-medium text-gray-400">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                12K Views
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                Oct 24, 2023
              </div>
            </div>

            {/* Progress Card */}
            <div className="bg-[#1F1F1F] rounded-2xl p-5 mb-8 border border-white/5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[13px] font-medium text-gray-300">Course Progress</span>
                <span className="text-[13px] font-bold text-[#FF7A00]">45% Completed</span>
              </div>
              <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                <div className="h-full bg-[#3CE36A] rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            {/* Description */}
            <p className="text-[15px] leading-relaxed text-[#B3B3B3]">
              In this module, we dive deep into advanced techniques for segmenting your market. Moving beyond basic demographics, we explore psychographic profiling, behavioral clustering, and predictive modeling to identify high-value customer segments.
            </p>
          </div>
        </div>

        {/* Right Side: Curriculum Sidebar */}
        <div className="w-full lg:w-[400px] xl:w-[450px] bg-[#1E1E1E] flex flex-col shrink-0 border-l border-white/5 h-full overflow-hidden">
          
          <div className="p-6 border-b border-white/5 flex items-center justify-between shrink-0">
            <h3 className="text-xl font-bold text-white tracking-wide">Curriculum</h3>
            <span className="px-3 py-1 bg-white/5 rounded-md text-[11px] font-bold text-gray-400 tracking-wider">70 Videos</span>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Section 1 */}
            <div className="mb-2">
              <div className="px-6 py-4 bg-[#161616] border-y border-white/5">
                <h4 className="text-[11px] font-bold tracking-[0.15em] text-gray-400 uppercase">SECTION 1: FOUNDATIONS</h4>
              </div>
              <div className="flex flex-col">
                <button className="flex items-start gap-4 p-5 hover:bg-white/[0.02] transition-colors border-b border-white/5 text-left w-full">
                  <span className="material-symbols-outlined text-[#3CE36A] text-[20px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <div>
                    <p className="text-[14px] text-gray-300 font-medium leading-tight mb-1.5">1. Introduction to Marketing Dynamics</p>
                    <p className="text-[11px] text-gray-500 font-medium">10:15</p>
                  </div>
                </button>
                <button className="flex items-start gap-4 p-5 hover:bg-white/[0.02] transition-colors border-b border-white/5 text-left w-full">
                  <span className="material-symbols-outlined text-[#3CE36A] text-[20px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <div>
                    <p className="text-[14px] text-gray-300 font-medium leading-tight mb-1.5">2. Understanding Consumer Behavior</p>
                    <p className="text-[11px] text-gray-500 font-medium">15:30</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <div className="px-6 py-4 bg-[#161616] border-y border-white/5">
                <h4 className="text-[11px] font-bold tracking-[0.15em] text-gray-400 uppercase">SECTION 2: CORE STRATEGIES</h4>
              </div>
              <div className="flex flex-col">
                <button className="flex items-start gap-4 p-5 bg-[#3D2610]/40 border-b border-white/5 text-left w-full">
                  <span className="material-symbols-outlined text-[#FF7A00] text-[20px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                  <div>
                    <p className="text-[14px] text-[#FF7A00] font-bold leading-tight mb-1.5">3. Advanced Market Segmentation</p>
                    <p className="text-[11px] text-[#FF7A00]/80 font-medium tracking-wide">• Playing • 12:45</p>
                  </div>
                </button>
                <button className="flex items-start gap-4 p-5 hover:bg-white/[0.02] transition-colors border-b border-white/5 text-left w-full opacity-60">
                  <span className="material-symbols-outlined text-gray-400 text-[20px] shrink-0">lock</span>
                  <div>
                    <p className="text-[14px] text-gray-300 font-medium leading-tight mb-1.5">4. Positioning and Branding</p>
                    <p className="text-[11px] text-gray-500 font-medium">18:20</p>
                  </div>
                </button>
                <button className="flex items-start gap-4 p-5 hover:bg-white/[0.02] transition-colors border-b border-white/5 text-left w-full opacity-60">
                  <span className="material-symbols-outlined text-gray-400 text-[20px] shrink-0">lock</span>
                  <div>
                    <p className="text-[14px] text-gray-300 font-medium leading-tight mb-1.5">5. Competitive Analysis Frameworks</p>
                    <p className="text-[11px] text-gray-500 font-medium">22:10</p>
                  </div>
                </button>
                <button className="flex items-start gap-4 p-5 hover:bg-white/[0.02] transition-colors border-b border-white/5 text-left w-full opacity-60">
                  <span className="material-symbols-outlined text-gray-400 text-[20px] shrink-0">lock</span>
                  <div>
                    <p className="text-[14px] text-gray-300 font-medium leading-tight mb-1.5">6. Pricing Strategies Deep Dive</p>
                    <p className="text-[11px] text-gray-500 font-medium">14:05</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
