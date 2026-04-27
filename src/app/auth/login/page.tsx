import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./LoginForm";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login ΓÇö Access Your Courses | Seekho Business",
  description: "Sign in to your Seekho Business account to continue watching courses and track your learning progress.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF7A00]/10 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FF9A44]/10 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[1100px] bg-[#111]/80 backdrop-blur-2xl rounded-[32px] border border-white/10 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col md:flex-row relative z-10 mb-16 md:mb-0">
        
        {/* Left Side: Branding/Image Panel */}
        <div className="relative w-full md:w-[45%] lg:w-[45%] p-6 md:p-12 lg:p-16 flex flex-col justify-center md:justify-between min-h-[140px] md:min-h-[600px] overflow-hidden group">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] z-0" />
          
          <Image 
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=80" 
            alt="Professionals" 
            fill 
            className="object-cover object-center opacity-30 md:opacity-40 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000 z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90 z-0" />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-[#FF9A44] to-[#FF7A00] flex items-center justify-center shadow-[0_0_20px_rgba(255,122,0,0.4)]">
              <span className="material-symbols-outlined text-white text-[16px] md:text-[20px]">school</span>
            </div>
            <h1 className="text-white font-black text-xl md:text-2xl tracking-tight">
              Seekho <span className="text-[#FF7A00]">Business</span>
            </h1>
          </div>

          {/* Bottom Text */}
          <div className="relative z-10">
            <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-4 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3CE36A] animate-pulse" />
              Welcome Back
            </div>
            <h2 className="text-xl md:text-4xl lg:text-5xl font-black text-white mb-2 md:mb-4 leading-tight tracking-tight drop-shadow-lg">
              Elevate your <span className="md:hidden text-[#FF7A00]">workforce.</span>
              <span className="hidden md:inline"><br/>workforce.</span>
            </h2>
            <p className="hidden md:block text-gray-300 text-sm md:text-base leading-relaxed max-w-sm drop-shadow-md">
              Access premium industry insights, specialized courses, and a thriving community of professionals.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-[55%] lg:w-[55%] p-6 sm:p-10 md:p-14 lg:p-20 flex flex-col justify-center bg-[#161616]/50 relative">
          {/* Subtle inner border glow */}
          <div className="absolute inset-0 border-l border-white/5 pointer-events-none" />
          
          <div className="max-w-[400px] mx-auto w-full relative z-10">
            <div className="mb-8 md:mb-10 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">Log In</h2>
              <p className="text-[#888] text-sm md:text-base">Enter your details to continue learning.</p>
            </div>

            <LoginForm />

            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <p className="text-[13px] md:text-[14px] text-[#888]">
                Don't have an account yet?{" "}
                <Link href="/auth/register" className="text-[#FF7A00] font-bold hover:text-white transition-colors">
                  Register your team
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
