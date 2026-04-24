import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./LoginForm";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login — Access Your Courses | Seekho Business",
  description: "Sign in to your Seekho Business account to continue watching courses and track your learning progress.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center p-4 md:p-8">
      {/* Main Card */}
      <div className="w-full max-w-[1000px] bg-[#161616] rounded-2xl md:rounded-[24px] border border-white/5 overflow-hidden shadow-2xl flex flex-col md:flex-row">
        
        {/* Left Side: Branding/Image Panel */}
        <div className="relative w-full md:w-[45%] lg:w-[40%] bg-[#1A1A1A] p-10 flex flex-col justify-between overflow-hidden min-h-[300px] md:min-h-full">
          {/* Grayscale Background Image */}
          <Image 
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=80" 
            alt="Professionals" 
            fill 
            className="object-cover object-center opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#161616]/40 via-transparent to-[#161616] pointer-events-none"></div>

          {/* Logo */}
          <div className="relative z-10">
            <h1 className="text-[#FF7A00] font-bold text-2xl tracking-tight inline-block pb-2 border-b-2 border-[#FF7A00]">
              Seekho Business
            </h1>
          </div>

          {/* Bottom Text */}
          <div className="relative z-10 mt-20 md:mt-0">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight tracking-tight">
              Elevate your workforce.
            </h2>
            <p className="text-[#999] text-sm md:text-[15px] leading-relaxed">
              Access premium industry insights, specialized courses, and a thriving community of professionals designed to accelerate your company's growth.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-[55%] lg:w-[60%] p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome back</h2>
            <p className="text-[#888] text-[15px]">Log in to your account to continue learning.</p>
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-white/10 bg-[#1A1A1A] hover:bg-white/[0.05] transition-colors text-white font-medium text-sm mb-8">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Log in with Google
          </button>

          <div className="relative mb-8 flex items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-[#666] font-medium tracking-widest text-[10px] uppercase">
              or email
            </span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <LoginForm />

          <p className="text-center text-[14px] text-[#888] mt-10">
            Don't have an account yet?{" "}
            <Link href="/auth/register" className="text-[#FF7A00] font-medium hover:underline transition-all">
              Register your team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
