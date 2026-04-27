"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CreatorOnboardingPage() {
  const [upiId, setUpiId] = useState("");
  const [bankAccountNo, setBankAccountNo] = useState("");
  const [bankIfsc, setBankIfsc] = useState("");
  const [bankName, setBankName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [legalName, setLegalName] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [category, setCategory] = useState("");
  const [experience, setExperience] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  // Fetch existing data
  useEffect(() => {
    async function fetchUserData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      try {
        const res = await fetch("/api/user/me", {
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
        const data = await res.json();
        if (data.user) {
          const u = data.user;
          setUpiId(u.upiId || "");
          // Parse saved bankAccount string "ACNo|IFSC|Name"
          const parts = (u.bankAccount || "").split("|");
          setBankAccountNo(parts[0] || "");
          setBankIfsc(parts[1] || "");
          setBankName(parts[2] || "");
          setPhone(u.phone || "");
          setAddress(u.address || "");
          setLegalName(u.legalName || "");
          setInstagram(u.instagram || "");
          setYoutube(u.youtube || "");
          setCategory(u.category || "");
          setExperience(u.experience || "");
          
          if (u.role === "CREATOR" || u.role === "ADMIN") {
            setIsEditing(true);
          }
        }
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    }
    fetchUserData();
  }, []);

  const handleUpgrade = async (e: React.FormEvent) => {
    e.preventDefault();
    const bankAccount = [bankAccountNo, bankIfsc, bankName].filter(Boolean).join("|");
    if (!upiId && !bankAccount) {
      setError("Provide UPI ID or Bank Account details.");
      return;
    }
    if (!phone || !address || !legalName || !category) {
      setError("Fill all mandatory fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/user/upgrade", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ 
          upiId,
          bankAccount: [bankAccountNo, bankIfsc, bankName].filter(Boolean).join("|"),
          phone, address, legalName, instagram, youtube, category, experience 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to upgrade account");
      }

      setSuccess(true);
      // Do NOT redirect to /creator — user needs admin approval first (unless editing)
      if (isEditing) {
        setTimeout(() => router.push("/creator"), 2000);
      }

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upgrade account");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          {/* Icon */}
          <div className="relative mx-auto w-20 h-20 mb-6">
            <div className="absolute inset-0 bg-yellow-500/20 rounded-full animate-ping" />
            <div className="relative w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/30">
              <span className="material-symbols-outlined text-[36px] text-yellow-400">pending</span>
            </div>
          </div>

          <h1 className="text-2xl font-black text-white mb-3">
            {isEditing ? "Profile Updated!" : "Welcome to Creator Studio!"}
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            {isEditing 
              ? "Your creator profile has been updated successfully." 
              : "Your creator account is now active."}
            <br />
            {!isEditing && (
              <span className="text-[#3CE36A] font-semibold">You can now start uploading videos to your channel! Redirecting...</span>
            )}
          </p>

          {/* Steps */}
          <div className="bg-[#141414] border border-white/5 rounded-2xl p-5 text-left mb-6 space-y-4">
            {[
              { icon: "check_circle", color: "text-[#3CE36A]", label: "Application submitted", done: true },
              { icon: "manage_accounts", color: "text-yellow-400", label: "Admin review in progress", done: false },
              { icon: "video_library", color: "text-gray-600", label: "Creator Studio unlocked", done: false },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className={`material-symbols-outlined text-[20px] ${step.color}`}>{step.icon}</span>
                <span className={`text-sm ${step.done ? "text-white font-semibold" : step.color === "text-yellow-400" ? "text-yellow-400" : "text-gray-600"}`}>
                  {step.label}
                </span>
                {!step.done && step.color === "text-yellow-400" && (
                  <span className="ml-auto text-[10px] bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full font-bold">IN PROGRESS</span>
                )}
              </div>
            ))}
          </div>

          <p className="text-[11px] text-gray-600 mb-6">
            Usually takes 24-48 hours. We'll notify you via email.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-white font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">home</span>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans py-4 sm:py-6 px-4 md:px-8 relative overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FF7A00]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFB700]/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/become-creator" className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                Creator Onboarding
                <span className="text-[10px] bg-[#FF7A00]/10 text-[#FF7A00] px-2 py-0.5 rounded-md border border-[#FF7A00]/20 font-black uppercase shadow-[0_0_10px_rgba(255,122,0,0.2)]">Live</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[#111]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <div className="text-[#3CE36A] font-black text-sm">93.0%</div>
            <div className="text-gray-500 text-[8px] uppercase font-bold tracking-widest hidden sm:block">Payout Rate</div>
          </div>
        </div>

        <form onSubmit={handleUpgrade} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Info Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Identity & Social Block */}
            <div className="bg-[#111]/80 backdrop-blur-xl rounded-[24px] border border-white/10 p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.3)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A00]/5 blur-[40px] pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <span className="material-symbols-outlined text-[#FF7A00] text-[20px]">badge</span>
                <h2 className="text-xs font-black text-white uppercase tracking-widest">Professional Identity</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative z-10">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 ml-1">Legal Name</label>
                  <input 
                    type="text" required
                    value={legalName}
                    onChange={(e) => setLegalName(e.target.value)}
                    placeholder="Official Name for Payments"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF7A00]/50 transition-all shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 ml-1">Category</label>
                  <select 
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF7A00]/50 cursor-pointer appearance-none shadow-inner"
                  >
                    <option value="">Select Category</option>
                    <option value="Business">Business</option>
                    <option value="Tech">Tech</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 ml-1">Experience</label>
                  <input 
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. 5 Years"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF7A00]/50 transition-all shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 ml-1">Instagram</label>
                  <input 
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@handle"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#3CE36A]/50 transition-all shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 ml-1">YouTube</label>
                  <input 
                    type="text"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                    placeholder="Channel Name"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#3CE36A]/50 transition-all shadow-inner"
                  />
                </div>
              </div>
            </div>

            {/* Contact Block */}
            <div className="bg-[#111]/80 backdrop-blur-xl rounded-[24px] border border-white/10 p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.3)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#3CE36A]/5 blur-[40px] pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <span className="material-symbols-outlined text-[#3CE36A] text-[20px]">contact_mail</span>
                <h2 className="text-xs font-black text-white uppercase tracking-widest">Contact Details</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 relative z-10">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 ml-1">Phone</label>
                  <input 
                    type="tel" required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91..."
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#3CE36A]/50 transition-all shadow-inner"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 ml-1">Business Address</label>
                  <input 
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Full Business Address"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#3CE36A]/50 transition-all shadow-inner"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payout & Action Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#111]/80 backdrop-blur-xl rounded-[24px] border border-white/10 p-6 sm:p-8 h-full flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.3)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB700]/10 blur-[40px] pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <span className="material-symbols-outlined text-[#FFB700] text-[20px]">account_balance_wallet</span>
                <h2 className="text-xs font-black text-white uppercase tracking-widest">Payout Setup</h2>
              </div>

              <div className="space-y-5 flex-grow relative z-10">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 ml-1">UPI ID (Fastest)</label>
                  <input 
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="name@upi"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFB700]/50 transition-all shadow-inner"
                  />
                </div>
                <div className="flex items-center gap-3 opacity-20 my-2">
                  <div className="h-px bg-white flex-1"></div>
                  <span className="text-[10px] font-black uppercase">OR</span>
                  <div className="h-px bg-white flex-1"></div>
                </div>
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 ml-1">Bank Account Details</label>
                  <div>
                    <label className="block text-[10px] text-gray-600 mb-1.5 ml-1 font-bold">Account Number</label>
                    <input
                      type="text"
                      value={bankAccountNo}
                      onChange={(e) => setBankAccountNo(e.target.value)}
                      placeholder="e.g. 123456789012"
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFB700]/50 transition-all shadow-inner"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-gray-600 mb-1.5 ml-1 font-bold">IFSC Code</label>
                      <input
                        type="text"
                        value={bankIfsc}
                        onChange={(e) => setBankIfsc(e.target.value.toUpperCase())}
                        placeholder="e.g. SBIN0001234"
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFB700]/50 transition-all font-mono shadow-inner"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-600 mb-1.5 ml-1 font-bold">Account Holder Name</label>
                      <input
                        type="text"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFB700]/50 transition-all shadow-inner"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-white/5 relative z-10">
                {error && <p className="text-[#FF7A00] text-xs font-bold mb-4 uppercase tracking-tight text-center">{error}</p>}
                
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-[#FF9A44] to-[#FF7A00] hover:shadow-[0_10px_40px_rgba(255,122,0,0.4)] hover:-translate-y-1 active:translate-y-0 text-white font-black rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-base shadow-[0_10px_30px_rgba(255,122,0,0.2)] disabled:opacity-50"
                >
                  {loading ? (
                    <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                  ) : (
                    <>
                      {isEditing ? "Update Profile ✨" : "Launch Profile 🚀"}
                    </>
                  )}
                </button>
                <p className="text-center text-gray-500 text-[10px] mt-4 font-bold uppercase tracking-widest flex justify-center items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">lock</span>
                  Secure Onboarding
                </p>
              </div>
            </div>
          </div>

        </form>

        <p className="text-center text-gray-700 text-[9px] mt-6 leading-relaxed max-w-xl mx-auto italic">
          By submitting, you certify all data is accurate for payout compliance.
        </p>
      </div>
    </div>
  );
}
