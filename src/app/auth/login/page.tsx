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
    <div className="min-h-screen bg-[#111111] flex items-center justify-center p-4 md:p-8">
      {/* Main Card */}
      <div className="w-full max-w-[1000px] bg-[#161616] rounded-2xl md:rounded-[24px] border border-white/5 overflow-hidden shadow-2xl flex flex-col md:flex-row">
        
        {/* Left Side: Branding/Image Panel */}
        <div className="relative w-full md:w-[45%] lg:w-[40%] bg-[#1A1A1A] p-6 md:p-10 flex flex-col justify-between overflow-hidden min-h-[100px] md:min-h-full">
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

          {/* Bottom Text - Hidden on mobile to save height */}
          <div className="relative z-10 mt-4 md:mt-0 hidden md:block">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight tracking-tight">
              Elevate your workforce.
            </h2>
            <p className="text-[#999] text-sm md:text-[15px] leading-relaxed">
              Access premium industry insights, specialized courses, and a thriving community of professionals designed to accelerate your company's growth.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-[55%] lg:w-[60%] p-5 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-4 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 tracking-tight">Welcome back</h2>
            <p className="text-[#888] text-[13px] md:text-[15px]">Log in to your account to continue learning.</p>
          </div>

          <LoginForm />

          <p className="text-center text-[13px] md:text-[14px] text-[#888] mt-6 md:mt-10">
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
