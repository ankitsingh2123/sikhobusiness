"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function SettingsPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-[#111111] font-sans px-4 md:px-8 py-8 md:py-12">
      
      <div className="max-w-[1000px] lg:max-w-full mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Account Settings</h1>
          <p className="text-[#999] text-[15px]">Manage your profile, security, and preferences.</p>
        </div>

        <div className="space-y-8">
          
          {/* Profile Management Card */}
          <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-8 md:p-10">
              
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-[#FF7A00] text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                <h2 className="text-xl font-bold text-white tracking-wide">Profile Management</h2>
              </div>

              <div className="flex flex-col lg:flex-row gap-10">
                
                {/* Avatar Section */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-[120px] h-[120px] rounded-full border-2 border-[#FF7A00] p-1 mb-4 relative">
                    <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden relative">
                      <Image 
                        src="https://i.pravatar.cc/150?img=11" 
                        alt="User Profile" 
                        fill 
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <button className="text-[13px] font-bold text-[#FF7A00] hover:text-[#FF8A1F] transition-colors">
                    Change Avatar
                  </button>
                </div>

                {/* Form Fields */}
                <div className="flex-1 space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[12px] font-bold text-[#999] tracking-wider mb-2">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue="Arjun Mehta" 
                        className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3.5 text-white text-[14px] outline-none focus:border-[#FF7A00] transition-colors"
                      />
                    </div>
                    {/* Email */}
                    <div>
                      <label className="block text-[12px] font-bold text-[#999] tracking-wider mb-2">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue="arjun.m@example.com" 
                        className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3.5 text-white text-[14px] outline-none focus:border-[#FF7A00] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-[12px] font-bold text-[#999] tracking-wider mb-2">Bio</label>
                    <textarea 
                      defaultValue="Senior Marketing Executive looking to upskill in digital strategy."
                      rows={3}
                      className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3.5 text-white text-[14px] outline-none focus:border-[#FF7A00] transition-colors resize-none"
                    ></textarea>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button className="bg-[#FF7A00] hover:bg-[#FF8A1F] text-[#3D1D00] font-bold text-[14px] px-8 py-3.5 rounded-xl transition-all shadow-[0_4px_15px_rgba(255,122,0,0.2)]">
                      Save Changes
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Account Security Card */}
          <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-8 md:p-10">
              
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-[#FF7A00] text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                <h2 className="text-xl font-bold text-white tracking-wide">Account Security</h2>
              </div>

              <div className="space-y-6">
                
                {/* Password Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-white/5 bg-[#111111]">
                  <div>
                    <h3 className="text-[15px] font-bold text-white mb-1">Password</h3>
                    <p className="text-[13px] text-[#999]">Last changed 3 months ago</p>
                  </div>
                  <button className="px-6 py-2.5 rounded-xl border border-white/10 text-white text-[13px] font-bold hover:bg-white/5 transition-colors whitespace-nowrap">
                    Change Password
                  </button>
                </div>

                {/* 2FA Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-white/5 bg-[#111111]">
                  <div>
                    <h3 className="text-[15px] font-bold text-white mb-1">Two-Factor Authentication</h3>
                    <p className="text-[13px] text-[#999]">Add an extra layer of security to your account.</p>
                  </div>
                  
                  {/* Custom Toggle Switch */}
                  <button 
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 shrink-0 ${twoFactorEnabled ? 'bg-[#FF7A00]' : 'bg-white/20'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${twoFactorEnabled ? 'left-7' : 'left-1'}`}></div>
                  </button>

                </div>

              </div>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
