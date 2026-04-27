"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/Button";

export default function BecomeCreatorPage() {
  const [isCreator, setIsCreator] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkRole() {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setIsLoading(false);
          return;
        }

        const res = await fetch("/api/user/me", {
          headers: { Authorization: `Bearer ${session.access_token}` }
        });
        const data = await res.json();
        const role = data.user?.role ?? data.role ?? "STUDENT";
        
        if (role === "CREATOR" || role === "ADMIN") {
          setIsCreator(true);
        }
      } catch (error) {
        console.error("Failed to check role:", error);
      } finally {
        setIsLoading(false);
      }
    }
    checkRole();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#FF7A00] selection:text-white font-sans overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FF7A00]/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFB700]/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 md:px-12 flex flex-col items-center text-center overflow-hidden z-10">
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 font-bold text-[11px] sm:text-xs mb-8 animate-fade-in-up backdrop-blur-md shadow-[0_0_20px_rgba(255,122,0,0.1)]">
            <span className="material-symbols-outlined text-[14px] text-[#FF7A00]">local_fire_department</span>
            Never Happened In History
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[1.1] animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            The Highest Paying <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FF7A00] to-[#FFB700] drop-shadow-sm">
              Creator Platform.
            </span>
          </h1>
          
          <p className="text-[#8A8A8A] text-sm md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            Keep exactly what you earn. While others take <span className="text-[#FF4D4D] font-black">30% to 50%</span>, we charge an industry-shattering <strong className="text-white font-black">7% flat fee</strong>.
          </p>

          {/* The Math Box */}
          <div className="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-[24px] p-5 md:p-6 text-left max-w-lg w-full mb-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-fade-in-up relative overflow-hidden" style={{ animationDelay: "300ms" }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A00]/10 blur-[40px] -z-10 rounded-full" />
            <div className="flex items-start gap-3 relative z-10">
              <span className="text-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">💡</span>
              <div>
                <h4 className="text-white font-black mb-1 text-sm md:text-base">The Math</h4>
                <p className="text-[#8A8A8A] text-xs md:text-sm leading-relaxed font-medium">
                  Sell for ₹100, we take ₹7. After gateway fees (~3%), you pocket <strong className="text-[#3CE36A] font-black drop-shadow-[0_0_5px_rgba(60,227,106,0.5)]">~₹90 directly.</strong> Other platforms only give you ₹50-₹60.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            {isLoading ? (
              <div className="w-[220px] h-14 bg-white/5 rounded-full animate-pulse" />
            ) : isCreator ? (
              <Button 
                href="/creator"
                size="lg"
                variant="primary"
                className="w-full sm:w-auto shadow-[0_10px_30px_rgba(255,122,0,0.3)]"
                rightIcon={<span className="material-symbols-outlined text-[20px]">video_library</span>}
              >
                Go to Creator Studio
              </Button>
            ) : (
              <Button 
                href="/creator-onboarding"
                size="lg"
                variant="primary"
                className="w-full sm:w-auto shadow-[0_10px_30px_rgba(255,122,0,0.3)]"
                rightIcon={<span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
              >
                Become A Creator Now
              </Button>
            )}
            <Button 
              href="/courses"
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto bg-[#111]/80 backdrop-blur-md border border-white/10 hover:bg-white/10"
            >
              Explore Courses First
            </Button>
          </div>
        </div>
      </div>

      {/* Stats / Comparison Section */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 pb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          
          {/* Card 1 */}
          <div className="bg-[#111]/80 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 hover:border-[#FF7A00]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,122,0,0.15)] group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A00]/0 to-[#FF7A00]/0 group-hover:from-[#FF7A00]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#FF7A00]/20 transition-all duration-500 border border-white/10 shadow-inner relative z-10">
              <span className="material-symbols-outlined text-[28px] text-[#8A8A8A] group-hover:text-[#FF7A00] transition-colors">flash_on</span>
            </div>
            <h3 className="text-xl font-black text-white mb-3 relative z-10">1-Hour Payouts <span className="inline-block group-hover:-translate-y-1 transition-transform">🚀</span></h3>
            <p className="text-gray-400 text-sm leading-relaxed font-medium relative z-10">
              Get paid within <strong className="text-white font-black">1 hour</strong> of every sale. Instant liquidity for your business, no more waiting for net-30 terms.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#111]/80 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 hover:border-[#3CE36A]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(60,227,106,0.1)] group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#3CE36A]/0 to-[#3CE36A]/0 group-hover:from-[#3CE36A]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#3CE36A]/20 transition-all duration-500 border border-white/10 shadow-inner relative z-10">
              <span className="material-symbols-outlined text-[28px] text-[#8A8A8A] group-hover:text-[#3CE36A] transition-colors">security</span>
            </div>
            <h3 className="text-xl font-black text-white mb-3 relative z-10">Safe Access</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-medium relative z-10">
              Upgrading to Creator won't affect your student profile or purchased courses. Everything stays seamlessly in one account.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#111]/80 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 hover:border-[#FFB700]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,183,0,0.1)] group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFB700]/0 to-[#FFB700]/0 group-hover:from-[#FFB700]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#FFB700]/20 transition-all duration-500 border border-white/10 shadow-inner relative z-10">
              <span className="material-symbols-outlined text-[28px] text-[#8A8A8A] group-hover:text-[#FFB700] transition-colors">public</span>
            </div>
            <h3 className="text-xl font-black text-white mb-3 relative z-10">High Profit Margin</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-medium relative z-10">
              Keep ₹90 on every ₹100 instead of just ₹50. It's your hard work, you deserve to keep the lion's share of the profit.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
