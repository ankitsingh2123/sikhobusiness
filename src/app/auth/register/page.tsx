import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "./RegisterForm";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Create an Account | Seekho Business",
  description: "Start your learning journey with Seekho Business today.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FF7A00]/10 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '7s' }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF9A44]/10 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[1200px] bg-[#111]/80 backdrop-blur-2xl rounded-[32px] border border-white/10 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col md:flex-row relative z-10 max-h-[90vh]">
        
        {/* Left Side: Branding & Features (Hidden on mobile) */}
        <div className="relative w-full md:w-[45%] lg:w-[40%] p-8 lg:p-12 flex-col justify-between hidden md:flex overflow-hidden group bg-[#161616]">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] z-0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#FF7A00]/5 via-transparent to-transparent opacity-50 z-0" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-12">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF9A44] to-[#FF7A00] flex items-center justify-center shadow-[0_0_20px_rgba(255,122,0,0.4)]">
                <span className="material-symbols-outlined text-white text-[20px]">school</span>
              </div>
              <h1 className="text-white font-black text-2xl tracking-tight">
                Seekho <span className="text-[#FF7A00]">Business</span>
              </h1>
            </div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-[10px] font-semibold uppercase tracking-widest mb-4">
                <span className="material-symbols-outlined text-[12px] text-[#FF7A00]">rocket_launch</span>
                Accelerate Growth
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-[1.1] tracking-tight">
                Unlock <br /> Professional Growth.
              </h2>
              <p className="text-gray-400 text-sm mb-10 leading-relaxed max-w-[280px]">
                Join thousands of professionals accelerating their careers with expert-led courses.
              </p>

              {/* Features List */}
              <div className="space-y-6">
                <div className="flex gap-4 group/feature">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover/feature:bg-[#FF7A00]/10 group-hover/feature:border-[#FF7A00]/30 transition-all duration-300">
                    <span className="material-symbols-outlined text-gray-400 group-hover/feature:text-[#FF7A00] transition-colors text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>video_library</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1 group-hover/feature:text-[#FF7A00] transition-colors">Access 70+ Premium Courses</h3>
                    <p className="text-gray-500 text-[12px] leading-relaxed max-w-[240px]">Dive deep into marketing, finance, and leadership topics.</p>
                  </div>
                </div>

                <div className="flex gap-4 group/feature">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover/feature:bg-[#FF7A00]/10 group-hover/feature:border-[#FF7A00]/30 transition-all duration-300">
                    <span className="material-symbols-outlined text-gray-400 group-hover/feature:text-[#FF7A00] transition-colors text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1 group-hover/feature:text-[#FF7A00] transition-colors">Expert Certification</h3>
                    <p className="text-gray-500 text-[12px] leading-relaxed max-w-[240px]">Earn certificates recognized by top industry leaders.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#161616] bg-gray-800 flex items-center justify-center overflow-hidden">
                      <Image src={`https://i.pravatar.cc/100?img=${i + 35}`} alt="User" width={32} height={32} />
                    </div>
                  ))}
                </div>
                <p className="text-gray-400 text-xs">
                  Join <span className="text-white font-bold">10,000+</span> learners.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 bg-[#111]/80 p-6 md:p-12 lg:p-16 flex flex-col justify-center items-center overflow-y-auto custom-scroll relative">
          <div className="absolute inset-0 border-l border-white/5 pointer-events-none hidden md:block" />
          
          <div className="w-full max-w-[400px] relative z-10 py-4">
            <div className="text-center md:text-left mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">Create Account</h2>
              <p className="text-[#888] text-sm">Start your learning journey today.</p>
            </div>

            <RegisterForm />

            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <p className="text-[13px] text-gray-400">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-[#FF7A00] font-bold hover:text-white transition-colors">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
