"use client";

import React from "react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] px-4 md:px-8 py-8 md:py-12 font-sans text-white overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FF7A00]/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF9A44]/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      
      <div className="max-w-[1200px] lg:max-w-full mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-[38px] md:text-5xl font-black tracking-tight mb-4 text-white">Contact Us</h1>
          <p className="text-[#999] text-lg max-w-2xl leading-relaxed font-medium">
            Have questions about our enterprise learning solutions? Our team is here to help you build a smarter workforce.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Form Card (Left) */}
          <div className="lg:col-span-7 bg-[#111]/80 backdrop-blur-xl rounded-[32px] border border-white/10 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF7A00]/5 blur-[40px] pointer-events-none rounded-full" />
            <h2 className="text-[28px] font-black mb-8 text-white relative z-10 tracking-tight">Send us a message</h2>
            
            <form className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Jane Doe"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 focus:border-[#FF7A00]/50 outline-none transition-all shadow-inner"
                  />
                </div>
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Work Email</label>
                  <input 
                    type="email" 
                    placeholder="jane@company.com"
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 focus:border-[#FF7A00]/50 outline-none transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Subject</label>
                <input 
                  type="text" 
                  placeholder="How can we help?"
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 focus:border-[#FF7A00]/50 outline-none transition-all shadow-inner"
                />
              </div>

              <div className="space-y-2.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Message</label>
                <textarea 
                  rows={6}
                  placeholder="Tell us about your team's learning needs..."
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 focus:border-[#FF7A00]/50 outline-none transition-all resize-none shadow-inner custom-scroll"
                />
              </div>

              <button className="bg-gradient-to-r from-[#FF9A44] to-[#FF7A00] text-white font-black text-lg px-10 py-4 rounded-xl flex items-center gap-3 hover:shadow-[0_10px_30px_rgba(255,122,0,0.3)] hover:-translate-y-1 transition-all duration-300 active:translate-y-0 w-full md:w-auto justify-center">
                Send Message
                <span className="material-symbols-outlined text-[20px]">send</span>
              </button>
            </form>
          </div>

          {/* Contact Info Cards (Right) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Email Card */}
            <div className="bg-[#111]/80 backdrop-blur-xl rounded-[32px] border border-white/10 p-8 flex items-start gap-6 hover:border-[#FF7A00]/30 hover:shadow-[0_10px_40px_rgba(255,122,0,0.1)] transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A00]/0 to-[#FF7A00]/0 group-hover:from-[#FF7A00]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 group-hover:bg-[#FF7A00]/20 transition-all duration-500 shadow-inner relative z-10">
                <span className="material-symbols-outlined text-gray-400 group-hover:text-[#FF7A00] text-[28px] transition-colors">mail</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-black text-white mb-2">Email Us</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed font-medium">For general inquiries and support.</p>
                <a href="mailto:business@seekho.ai" className="text-[#FF7A00] font-black text-base hover:text-white transition-colors">business@seekho.ai</a>
              </div>
            </div>

            {/* Call Card */}
            <div className="bg-[#111]/80 backdrop-blur-xl rounded-[32px] border border-white/10 p-8 flex items-start gap-6 hover:border-[#3CE36A]/30 hover:shadow-[0_10px_40px_rgba(60,227,106,0.1)] transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3CE36A]/0 to-[#3CE36A]/0 group-hover:from-[#3CE36A]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 group-hover:bg-[#3CE36A]/20 transition-all duration-500 shadow-inner relative z-10">
                <span className="material-symbols-outlined text-gray-400 group-hover:text-[#3CE36A] text-[28px] transition-colors">call</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-black text-white mb-2">Call Us</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed font-medium">Mon-Fri from 9am to 6pm IST.</p>
                <p className="text-[#3CE36A] font-black text-base">+91 123 456 7890</p>
              </div>
            </div>

            {/* Headquarters Card */}
            <div className="bg-[#111]/80 backdrop-blur-xl rounded-[32px] border border-white/10 p-8 flex items-start gap-6 hover:border-white/20 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 transition-all duration-500 shadow-inner relative z-10">
                <span className="material-symbols-outlined text-gray-400 group-hover:text-white text-[28px] transition-colors">location_on</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-black text-white mb-2">Headquarters</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                  Seekho Business Hub<br />
                  Cyber City, Phase 3<br />
                  Gurugram, Haryana 122002<br />
                  India
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
      `}</style>
    </div>
  );
}
