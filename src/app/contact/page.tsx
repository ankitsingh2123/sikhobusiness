"use client";

import React from "react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#111111] px-4 md:px-8 py-8 md:py-12 font-sans text-white">
      <div className="max-w-[1200px] lg:max-w-full mx-auto">
        
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-[38px] md:text-4xl font-bold tracking-tight mb-4 text-white">Contact Us</h1>
          <p className="text-[#999] text-lg max-w-2xl leading-relaxed">
            Have questions about our enterprise learning solutions? Our team is here to help you build a smarter workforce.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Form Card (Left) */}
          <div className="lg:col-span-7 bg-[#1A1A1A] rounded-[24px] border border-white/5 p-8 md:p-10 shadow-2xl">
            <h2 className="text-[24px] font-bold mb-8 text-white">Send us a message</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-[#888] uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Jane Doe"
                    className="w-full bg-[#242424] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:border-[#FF7A00]/50 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-[#888] uppercase tracking-wider">Work Email</label>
                  <input 
                    type="email" 
                    placeholder="jane@company.com"
                    className="w-full bg-[#242424] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:border-[#FF7A00]/50 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#888] uppercase tracking-wider">Subject</label>
                <input 
                  type="text" 
                  placeholder="How can we help?"
                  className="w-full bg-[#242424] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:border-[#FF7A00]/50 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#888] uppercase tracking-wider">Message</label>
                <textarea 
                  rows={6}
                  placeholder="Tell us about your team's learning needs..."
                  className="w-full bg-[#242424] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:border-[#FF7A00]/50 outline-none transition-all resize-none"
                />
              </div>

              <button className="bg-[#FF7A00] text-black font-bold px-8 py-3.5 rounded-xl flex items-center gap-2 hover:bg-[#FF8A1F] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#FF7A00]/20 active:translate-y-0">
                Send Message
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          </div>

          {/* Contact Info Cards (Right) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Email Card */}
            <div className="bg-[#1A1A1A] rounded-[24px] border border-white/5 p-6 flex items-start gap-5 hover:border-[#FF7A00]/20 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#FF7A00]/10 flex items-center justify-center shrink-0 border border-[#FF7A00]/10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[#FFB084] text-[22px]">mail</span>
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-white mb-1">Email Us</h3>
                <p className="text-[#888] text-[14px] mb-3 leading-relaxed">For general inquiries and support.</p>
                <a href="mailto:business@seekho.ai" className="text-[#FFB084] font-bold text-[15px] hover:underline">business@seekho.ai</a>
              </div>
            </div>

            {/* Call Card */}
            <div className="bg-[#1A1A1A] rounded-[24px] border border-white/5 p-6 flex items-start gap-5 hover:border-[#3CE36A]/20 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#3CE36A]/10 flex items-center justify-center shrink-0 border border-[#3CE36A]/10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[#3CE36A] text-[22px]">call</span>
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-white mb-1">Call Us</h3>
                <p className="text-[#888] text-[14px] mb-3 leading-relaxed">Mon-Fri from 9am to 6pm IST.</p>
                <p className="text-[#3CE36A] font-bold text-[15px]">+91 123 456 7890</p>
              </div>
            </div>

            {/* Headquarters Card */}
            <div className="bg-[#1A1A1A] rounded-[24px] border border-white/5 p-6 flex items-start gap-5 hover:border-white/20 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-white text-[22px]">location_on</span>
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-white mb-1">Headquarters</h3>
                <p className="text-[#888] text-[14px] leading-relaxed">
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
    </div>
  );
}
