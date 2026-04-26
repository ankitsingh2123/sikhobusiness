"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'error'|'success', text: string} | null>(null);

  const supabase = createClient();

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      setMessage(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || "Failed to log in with Google." });
      setIsGoogleLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setMessage(null);
      // We only have magic link setup right now based on our previous logic, or password if users created one.
      // Let's try standard password login first.
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        // Fallback to magic link if password auth fails (e.g. user doesn't have a password)
        if (error.message.includes("Invalid login credentials") && password === "") {
            const { error: magicError } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                }
            });
            if (magicError) throw magicError;
            setMessage({ type: 'success', text: "Magic link sent to your email!" });
            return;
        }
        throw error;
      }
      
      // Successful login, refresh page to update session
      window.location.href = "/";
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || "Failed to sign in." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {message && (
        <div className={`p-4 mb-6 rounded-lg text-sm font-medium ${message.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
          {message.text}
        </div>
      )}

      <button 
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading || isLoading}
        className="w-full flex items-center justify-center gap-3 py-2.5 md:py-3 px-4 rounded-lg border border-white/10 bg-[#1A1A1A] hover:bg-white/[0.05] transition-colors text-white font-medium text-sm mb-4 md:mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGoogleLoading ? (
           <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        )}
        Log in with Google
      </button>

      <div className="relative mb-4 md:mb-8 flex items-center">
        <div className="flex-grow border-t border-white/10"></div>
        <span className="flex-shrink-0 mx-4 text-[#666] font-medium tracking-widest text-[10px] uppercase">
          or email
        </span>
        <div className="flex-grow border-t border-white/10"></div>
      </div>

      <form onSubmit={handleEmailLogin} className="space-y-4 md:space-y-6">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="text-[13px] font-bold tracking-wide leading-[1.2] block mb-2 text-[#CCC]"
          >
            Email Address
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              required
              className="w-full py-2.5 md:py-3.5 px-4 rounded-lg text-sm outline-none transition-all duration-200 bg-[#161616] border border-white/10 text-white focus:border-[#FF7A00] placeholder-[#555]"
              autoComplete="email"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="password"
              className="text-[13px] font-bold tracking-wide leading-[1.2] text-[#CCC]"
            >
              Password
            </label>
            <a
              href="/auth/forgot-password"
              className="text-[12px] font-medium leading-[1.2] transition-colors hover:text-[#FF8A1F] text-[#FF7A00]"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full py-2.5 md:py-3.5 px-4 pr-12 rounded-lg text-sm outline-none transition-all duration-200 bg-[#161616] border border-white/10 text-white focus:border-[#FF7A00] tracking-[0.2em] placeholder-[#555]"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888] hover:text-white transition-colors"
              tabIndex={-1}
            >
              <span className="material-symbols-outlined text-[18px]">
                {showPassword ? "visibility" : "visibility_off"}
              </span>
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || isGoogleLoading}
          className="w-full bg-[#FF7A00] hover:bg-[#FF8A1F] text-[#3D1D00] font-bold text-[15px] py-3 md:py-4 px-6 rounded-lg border-none cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-[0_8px_20px_rgba(255,122,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed mt-2 group"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span
                className="w-4 h-4 border-2 border-[#3D1D00]/30 border-t-[#3D1D00] rounded-full animate-spin"
              />
              Signing In...
            </span>
          ) : (
            <>
              Sign In
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
