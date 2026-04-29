"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'error'|'success', text: string} | null>(null);

  const supabase = createClient();

  const handleGoogleSignup = async () => {
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
      setMessage({ type: 'error', text: err.message || "Failed to sign up with Google." });
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setMessage(null);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      if (error) throw error;
      
      // If auto-confirm is off, tell user to check email. If on, they are logged in.
      if (data.session) {
          window.location.href = "/";
      } else {
          setMessage({ type: 'success', text: "Check your email for the confirmation link!" });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || "Failed to create account." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {message && (
        <div className={`p-4 mb-6 rounded-none text-sm font-medium ${message.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="text-[13px] font-medium text-gray-300 block mb-1"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
            className="w-full py-2 md:py-3 px-4 rounded-none text-sm outline-none transition-all duration-200 bg-[#1A1A1A] border border-white/10 text-white focus:border-[#FF7A00]/50"
            autoComplete="name"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="reg-email"
            className="text-[13px] font-medium text-gray-300 block mb-1"
          >
            Email Address
          </label>
          <input
            id="reg-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@company.com"
            required
            className="w-full py-2 md:py-3 px-4 rounded-none text-sm outline-none transition-all duration-200 bg-[#1A1A1A] border border-white/10 text-white focus:border-[#FF7A00]/50"
            autoComplete="email"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="reg-password"
            className="text-[13px] md:text-sm font-medium text-gray-300 block mb-1"
          >
            Password
          </label>
          <input
            id="reg-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={8}
            className="w-full py-2 md:py-3 px-4 rounded-none text-sm outline-none transition-all duration-200 bg-[#1A1A1A] border border-white/10 text-white focus:border-[#FF7A00]/50"
            autoComplete="new-password"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || isGoogleLoading}
          className="w-full bg-[#FF7A00] text-white font-bold text-[15px] py-2.5 md:py-3 px-6 rounded-none border-none cursor-pointer transition-all duration-200 shadow-lg hover:bg-[#FF8C1A] disabled:opacity-50 disabled:cursor-not-allowed mt-1"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating account...
            </span>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>

      <div className="relative my-4 md:my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/5"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#111111] px-4 text-gray-500 font-bold tracking-widest text-[10px] uppercase">OR CONTINUE WITH</span>
        </div>
      </div>

      <button 
        onClick={handleGoogleSignup}
        disabled={isLoading || isGoogleLoading}
        className="w-full flex items-center justify-center gap-3 py-2 md:py-2.5 px-4 rounded-none border border-white/10 bg-transparent text-gray-300 hover:bg-white/[0.03] transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGoogleLoading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
            <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
        )}
        Sign Up with Google
      </button>
    </div>
  );
}
