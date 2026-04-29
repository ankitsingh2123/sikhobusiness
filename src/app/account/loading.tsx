import React from "react";

export default function AccountLoading() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] px-3 sm:px-4 md:px-8 py-6 md:py-12 font-sans text-white overflow-hidden relative">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#FF7A00]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-[#3CE36A]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] lg:max-w-full mx-auto space-y-4 sm:space-y-6 relative z-10">
        
        {/* ── Profile Header Card Skeleton ── */}
        <div className="bg-[#111]/80 backdrop-blur-xl rounded-2xl md:rounded-[32px] border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
          <div className="h-24 sm:h-32 md:h-[160px] w-full bg-[#1A1A1A] animate-pulse" />
          
          <div className="px-4 sm:px-6 md:px-12 pb-6 md:pb-10 relative z-10">
            {/* Avatar & Main Details Row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 -mt-10 sm:-mt-12 md:-mt-[60px] relative z-10 mb-5 md:mb-8">
              <div className="flex items-end sm:items-end gap-4 md:gap-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-[140px] md:h-[140px] rounded-full border-4 md:border-8 border-[#0A0A0A] bg-[#222] animate-pulse shadow-[0_0_30px_rgba(0,0,0,0.8)] relative z-10" />
                <div className="mb-1 space-y-3">
                  <div className="h-6 sm:h-8 md:h-10 w-48 sm:w-64 bg-[#222] animate-pulse rounded-md" />
                  <div className="h-3 sm:h-4 w-32 sm:w-48 bg-[#222] animate-pulse rounded-md" />
                  <div className="h-2 sm:h-3 w-40 sm:w-56 bg-[#222] animate-pulse rounded-md" />
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-20 sm:w-24 h-8 sm:h-10 bg-[#222] animate-pulse rounded-full" />
                <div className="w-24 sm:w-32 h-8 sm:h-10 bg-[#222] animate-pulse rounded-full" />
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-2 md:space-y-3">
              <div className="h-3 sm:h-4 w-16 bg-[#222] animate-pulse rounded-md mb-2 md:mb-4" />
              <div className="h-3 sm:h-4 w-full max-w-3xl bg-[#222] animate-pulse rounded-md" />
              <div className="h-3 sm:h-4 w-5/6 max-w-2xl bg-[#222] animate-pulse rounded-md" />
              <div className="h-3 sm:h-4 w-2/3 max-w-xl bg-[#222] animate-pulse rounded-md" />
            </div>
          </div>
        </div>

        {/* ── Bottom Grid Skeleton ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Learning Overview */}
          <div className="lg:col-span-2 bg-[#111]/80 backdrop-blur-xl rounded-2xl md:rounded-[32px] border border-white/10 p-5 sm:p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.3)] relative overflow-hidden">
            <div className="flex items-center justify-between mb-5 md:mb-8">
              <div className="h-6 sm:h-7 md:h-8 w-48 sm:w-56 bg-[#222] animate-pulse rounded-md" />
              <div className="h-4 w-24 bg-[#222] animate-pulse rounded-md" />
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#222] animate-pulse rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/5 min-h-[120px] sm:min-h-[160px] md:h-[200px]" />
              ))}
            </div>
          </div>

          {/* Recent Badges */}
          <div className="bg-[#111]/80 backdrop-blur-xl rounded-2xl md:rounded-[32px] border border-white/10 p-5 sm:p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex flex-col relative overflow-hidden">
            <div className="h-6 sm:h-7 md:h-8 w-40 bg-[#222] animate-pulse rounded-md mb-5 md:mb-8" />
            
            <div className="space-y-4 sm:space-y-5 md:space-y-6 flex-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-[#222] animate-pulse shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3 sm:h-4 w-24 sm:w-32 bg-[#222] animate-pulse rounded-md" />
                    <div className="h-2 sm:h-3 w-32 sm:w-40 bg-[#222] animate-pulse rounded-md" />
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full mt-5 md:mt-8 h-12 bg-[#222] animate-pulse rounded-xl" />
          </div>

        </div>
      </div>
    </div>
  );
}
