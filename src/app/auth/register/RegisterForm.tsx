"use client";

import { useState } from "react";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Call backend auth API
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="text-sm font-medium text-gray-300 block mb-2"
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
          className="w-full py-3.5 px-4 rounded-xl text-sm outline-none transition-all duration-200 bg-[#1A1A1A] border border-white/10 text-white focus:border-[#FF7A00]/50"
          autoComplete="name"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="reg-email"
          className="text-sm font-medium text-gray-300 block mb-2"
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
          className="w-full py-3.5 px-4 rounded-xl text-sm outline-none transition-all duration-200 bg-[#1A1A1A] border border-white/10 text-white focus:border-[#FF7A00]/50"
          autoComplete="email"
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="reg-password"
          className="text-sm font-medium text-gray-300 block mb-2"
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
          className="w-full py-3.5 px-4 rounded-xl text-sm outline-none transition-all duration-200 bg-[#1A1A1A] border border-white/10 text-white focus:border-[#FF7A00]/50"
          autoComplete="new-password"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#FF7A00] text-white font-bold text-sm py-4 px-6 rounded-xl border-none cursor-pointer transition-all duration-200 shadow-lg hover:bg-[#FF8C1A] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
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
  );
}
