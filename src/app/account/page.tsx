"use client";

import React from "react";
import Image from "next/image";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[#111111] px-4 md:px-8 py-8 md:py-12 font-sans text-white">
      <div className="max-w-[1200px] lg:max-w-full mx-auto space-y-6">
        
        {/* Profile Header Card */}
        <div className="bg-[#1A1A1A] rounded-[24px] border border-white/5 overflow-hidden shadow-sm">
          {/* Top Banner Gradient */}
          <div className="h-[140px] w-full bg-gradient-to-r from-[#2A1E15] via-[#1A1512] to-[#1A1A1A] relative">
            {/* Subtle glow */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#FF7A00]/10 blur-[80px] -translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
          </div>
          
          <div className="px-8 md:px-12 pb-10">
            {/* Avatar & Main Details Row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-[60px] relative z-10 mb-8">
              
              <div className="flex flex-col md:flex-row md:items-end gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-[130px] h-[130px] rounded-full border-4 border-[#1A1A1A] overflow-hidden bg-[#222]">
                    <Image 
                      src="https://i.pravatar.cc/150?img=11" 
                      alt="Arjun Mehta" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  {/* Edit Pencil Badge */}
                  <button className="absolute bottom-1 right-1 w-8 h-8 bg-[#2A2A2A] rounded-full flex items-center justify-center border-2 border-[#1A1A1A] hover:bg-[#333] transition-colors">
                    <span className="material-symbols-outlined text-[14px] text-[#CCC]">edit</span>
                  </button>
                </div>

                <div className="mb-2">
                  <h1 className="text-4xl font-bold tracking-tight mb-1 text-white">Arjun Mehta</h1>
                  <p className="text-[#999] text-[15px] font-medium tracking-wide">Senior Marketing Strategist @ TechCorp</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mb-2">
                <button className="flex items-center gap-2 bg-[#FF7A00] hover:bg-[#FF8A1F] text-[#3D1D00] px-5 py-2.5 rounded-full font-bold text-[13px] transition-all shadow-[0_4px_15px_rgba(255,122,0,0.2)]">
                  <span className="material-symbols-outlined text-[18px]">share</span>
                  Share Profile
                </button>
                <button className="px-6 py-2.5 rounded-full border border-white/10 text-white font-medium text-[13px] hover:bg-white/5 transition-colors">
                  Edit
                </button>
              </div>

            </div>

            {/* About Section */}
            <div>
              <h3 className="text-[#888] text-[11px] font-bold tracking-[0.15em] uppercase mb-3">About</h3>
              <p className="text-[#CCC] text-[15px] leading-relaxed max-w-3xl">
                Passionate about data-driven marketing and growth strategies. Constantly upskilling to stay ahead in the dynamic digital landscape. Currently focused on advanced analytics and customer lifecycle management.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Learning Overview (Spans 2 columns) */}
          <div className="lg:col-span-2 bg-[#1A1A1A] rounded-[24px] border border-white/5 p-8 shadow-sm">
            
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Learning Overview</h2>
              <button className="text-[13px] font-medium text-[#FF7A00] hover:text-[#FF8A1F] flex items-center gap-1 transition-colors">
                View Detailed Report
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Card 1: Courses Completed */}
              <div className="bg-[#222] rounded-2xl p-6 border border-white/5 flex flex-col justify-between h-[200px]">
                <div className="w-10 h-10 rounded-full bg-[#FF7A00]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#FF7A00] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div>
                  <h3 className="text-[40px] font-bold leading-none mb-1">12</h3>
                  <p className="text-[#999] text-[13px] font-medium tracking-wide">Courses Completed</p>
                </div>
                <div className="w-full h-1.5 bg-[#111] rounded-full mt-4 overflow-hidden">
                   <div className="h-full bg-[#3CE36A] w-3/4 rounded-full"></div>
                </div>
              </div>

              {/* Card 2: Learning Hours */}
              <div className="bg-[#222] rounded-2xl p-6 border border-white/5 flex flex-col justify-between h-[200px]">
                <div className="w-10 h-10 rounded-full bg-[#8892FF]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#8892FF] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                </div>
                <div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <h3 className="text-[40px] font-bold leading-none">148</h3>
                    <span className="text-[#999] text-[16px]">hrs</span>
                  </div>
                  <p className="text-[#999] text-[13px] font-medium tracking-wide">Learning Hours</p>
                </div>
                <div className="flex items-center gap-1.5 mt-4 text-[#3CE36A] text-[12px] font-bold">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  +12 hrs this week
                </div>
              </div>

              {/* Card 3: Certificates */}
              <div className="bg-[#222] rounded-2xl p-6 border border-white/5 flex flex-col justify-between h-[200px]">
                <div className="w-10 h-10 rounded-full bg-[#3CE36A]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#3CE36A] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                </div>
                <div>
                  <h3 className="text-[40px] font-bold leading-none mb-1">5</h3>
                  <p className="text-[#999] text-[13px] font-medium tracking-wide">Certificates Earned</p>
                </div>
                <div className="flex items-center gap-1.5 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-[#3CE36A]"></div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Recent Badges (Spans 1 column) */}
          <div className="bg-[#1A1A1A] rounded-[24px] border border-white/5 p-8 shadow-sm flex flex-col">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Recent Badges</h2>
            
            <div className="space-y-6 flex-1">
              
              {/* Badge 1 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#FF7A00] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                </div>
                <div>
                  <h4 className="text-white text-[14px] font-bold tracking-wide">7-Day Streak</h4>
                  <p className="text-[#888] text-[12px]">Consistent Learner</p>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#8892FF]/30 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#8892FF] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                </div>
                <div>
                  <h4 className="text-white text-[14px] font-bold tracking-wide">Top 10% Scorer</h4>
                  <p className="text-[#888] text-[12px]">Advanced Marketing Analytics</p>
                </div>
              </div>

              {/* Badge 3 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#3CE36A]/30 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#3CE36A] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                </div>
                <div>
                  <h4 className="text-white text-[14px] font-bold tracking-wide">Master Strategist</h4>
                  <p className="text-[#888] text-[12px]">Completed 5 Strategy Modules</p>
                </div>
              </div>

            </div>

            <button className="w-full mt-8 py-3.5 rounded-xl border border-white/10 text-[#CCC] text-[13px] font-bold hover:bg-white/5 hover:text-white transition-colors">
              View All Badges
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
