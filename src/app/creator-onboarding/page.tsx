"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreatorOnboardingPage() {
  const [upiId, setUpiId] = useState("");
  const [bankAccount, setBankAccount] = useState("");
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
  const router = useRouter();

  const handleUpgrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!upiId && !bankAccount) {
      setError("Provide UPI or Bank details.");
      return;
    }
    if (!phone || !address || !legalName || !category) {
      setError("Fill all mandatory fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/user/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          upiId, bankAccount, phone, address, 
          legalName, instagram, youtube, category, experience 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to upgrade account");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/account");
        router.refresh();
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
        <div className="text-center animate-fade-in scale-90 sm:scale-100">
          <div className="w-16 h-16 bg-[#3CE36A]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#3CE36A]/30">
            <span className="material-symbols-outlined text-[#3CE36A] text-[32px]">check_circle</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Setup Complete!</h1>
          <p className="text-gray-400 text-sm">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans py-4 sm:py-6 px-4 md:px-8 relative overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF7A00]/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/become-creator" className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                Creator Onboarding
                <span className="text-[10px] bg-[#FF7A00]/10 text-[#FF7A00] px-2 py-0.5 rounded-md border border-[#FF7A00]/20 font-black uppercase">Live</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <div className="text-[#3CE36A] font-black text-sm">93.0%</div>
            <div className="text-gray-500 text-[8px] uppercase font-bold tracking-widest hidden sm:block">Payout Rate</div>
          </div>
        </div>

        <form onSubmit={handleUpgrade} className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Main Info Column */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* Identity & Social Block */}
            <div className="bg-[#141414] rounded-2xl border border-white/5 p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-[#FF7A00] text-[20px]">badge</span>
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Professional Identity</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1.5 ml-1">Legal Name</label>
                  <input 
                    type="text" required
                    value={legalName}
                    onChange={(e) => setLegalName(e.target.value)}
                    placeholder="Official Name for Payments"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF7A00] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1.5 ml-1">Category</label>
                  <select 
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF7A00] cursor-pointer appearance-none"
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
                  <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1.5 ml-1">Experience</label>
                  <input 
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. 5 Years"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF7A00] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1.5 ml-1">Instagram</label>
                  <input 
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@handle"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#3CE36A] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1.5 ml-1">YouTube</label>
                  <input 
                    type="text"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                    placeholder="Channel Name"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#3CE36A] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Contact Block */}
            <div className="bg-[#141414] rounded-2xl border border-white/5 p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-[#3CE36A] text-[20px]">contact_mail</span>
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Contact Details</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1.5 ml-1">Phone</label>
                  <input 
                    type="tel" required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91..."
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#3CE36A] transition-all"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1.5 ml-1">Business Address</label>
                  <input 
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Full Business Address"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#3CE36A] transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payout & Action Column */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-[#141414] rounded-2xl border border-white/5 p-5 sm:p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-[#FFB700] text-[20px]">account_balance_wallet</span>
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Payout Setup</h2>
              </div>

              <div className="space-y-4 flex-grow">
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1.5 ml-1">UPI ID (Fastest)</label>
                  <input 
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="name@upi"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFB700] transition-all"
                  />
                </div>
                <div className="flex items-center gap-3 opacity-20">
                  <div className="h-px bg-white flex-1"></div>
                  <span className="text-[8px] font-black uppercase">OR</span>
                  <div className="h-px bg-white flex-1"></div>
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1.5 ml-1">Bank Account</label>
                  <textarea 
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    placeholder="A/C No, IFSC, Name"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFB700] transition-all resize-none h-20"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-5 border-t border-white/5">
                {error && <p className="text-red-500 text-[10px] font-bold mb-3 uppercase tracking-tight">{error}</p>}
                
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-[#FF7A00] to-[#FFB700] hover:brightness-110 active:scale-95 text-[#3D1D00] font-black rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-[0_10px_30px_rgba(255,122,0,0.1)] disabled:opacity-50"
                >
                  {loading ? (
                    <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                  ) : (
                    <>
                      Launch Profile 🚀
                    </>
                  )}
                </button>
                <p className="text-center text-gray-600 text-[8px] mt-3 font-bold uppercase tracking-widest">
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
