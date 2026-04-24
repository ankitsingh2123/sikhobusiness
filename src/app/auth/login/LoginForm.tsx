"use client";

import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Call backend auth API
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            className="w-full py-3.5 px-4 rounded-lg text-sm outline-none transition-all duration-200 bg-[#161616] border border-white/10 text-white focus:border-[#FF7A00] placeholder-[#555]"
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
            className="w-full py-3.5 px-4 pr-12 rounded-lg text-sm outline-none transition-all duration-200 bg-[#161616] border border-white/10 text-white focus:border-[#FF7A00] tracking-[0.2em] placeholder-[#555]"
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
        disabled={isLoading}
        className="w-full bg-[#FF7A00] hover:bg-[#FF8A1F] text-[#3D1D00] font-bold text-[15px] py-4 px-6 rounded-lg border-none cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-[0_8px_20px_rgba(255,122,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed mt-2 group"
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
  );
}
