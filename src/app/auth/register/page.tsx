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
    <div className="flex-1 flex flex-col md:flex-row bg-sb-bg overflow-hidden max-h-[calc(100vh-64px)]">
      {/* Left Side: Branding & Features (Tighter Layout) */}
      <div 
        className="w-full md:w-[40%] p-6 md:p-10 lg:p-12 flex flex-col justify-between relative border-r border-white/5 overflow-y-auto"
        style={{
          backgroundColor: "#2E2721",
        }}
      >
        <div>
          <div className="mb-8">
            <h1 className="text-[#FF7A00] font-bold text-2xl tracking-tight">
              Seekho Business
            </h1>
          </div>

          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-[1.1] tracking-tight">
            Unlock Professional <br /> Growth
          </h2>
          
          <p className="text-gray-300 text-[14px] mb-8 leading-relaxed max-w-sm">
            Join thousands of professionals accelerating their careers with expert-led business courses.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#3D332B] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#FF7A00] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>video_library</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-[14px] mb-0.5">Access to 70+ Premium Videos</h3>
                <p className="text-gray-400 text-[12px] leading-relaxed max-w-[280px]">Dive deep into marketing, finance, and leadership topics.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#3D332B] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#FF7A00] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>card_giftcard</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-[14px] mb-0.5">First 5 Videos Free</h3>
                <p className="text-gray-400 text-[12px] leading-relaxed max-w-[280px]">Experience the quality of our content before committing.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#3D332B] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#FF7A00] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-[14px] mb-0.5">Expert Certification</h3>
                <p className="text-gray-400 text-[12px] leading-relaxed max-w-[280px]">Earn certificates recognized by top industry leaders.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof (Tighter) */}
        <div className="mt-8">
          <div className="w-full h-px bg-white/10 mb-6" />
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-[#2E2721] bg-gray-800 flex items-center justify-center overflow-hidden">
                  <Image src={`https://i.pravatar.cc/100?img=${i + 35}`} alt="User" width={28} height={28} />
                </div>
              ))}
            </div>
            <p className="text-gray-300 text-[12px]">
              Join <span className="text-white font-medium">10,000+</span> ambitious learners.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Form (Tighter) */}
      <div className="flex-1 bg-sb-bg-elevated p-8 md:p-12 lg:p-16 flex flex-col justify-center items-center overflow-y-auto">
        <div className="w-full max-w-[360px]">
          <div className="text-center mb-8">
            <h2 className="text-[30px] font-bold text-white mb-2">Create an account</h2>
            <p className="text-gray-400 text-[14px]">Start your learning journey today.</p>
          </div>

          <RegisterForm />

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-sb-bg-elevated px-4 text-gray-500 font-bold tracking-widest text-[10px] uppercase">OR CONTINUE WITH</span>
            </div>
          </div>

          {/* Google Signup Button */}
          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-white/10 bg-transparent text-gray-300 hover:bg-white/[0.03] transition-all font-medium text-sm mb-6">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign Up with Google
          </button>

          <p className="text-center text-[14px] text-gray-400">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[#FF7A00] font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
