"use client";

import React, { useState } from "react";
import Image from "next/image";

const categories = ["All", "NCERT", "Business", "History", "General Knowledge", "Technology"];

export default function SearchPage() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-[#131313] text-white flex flex-col lg:flex-row pb-28 md:pb-12 overflow-x-hidden">
      
      {/* ══ Mobile Filter Toggle ══ */}
      <div className="lg:hidden p-4 sm:p-6 border-b border-white/5 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Explore Courses</h1>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-[#2A2A2A] px-3 sm:px-4 py-2 rounded-lg text-sm font-medium"
        >
          <span className="material-symbols-outlined text-[18px]">filter_list</span>
          Filters
        </button>
      </div>

      {/* ══ Filters Sidebar ══ */}
      <aside className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-[240px] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-white/5 p-4 sm:p-6 bg-[#1A1A1A] lg:bg-transparent`}>
        <div className="hidden lg:flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-[#FF7A00]">filter_list</span>
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-widest text-gray-200">Filters</h2>
        </div>
        
        <div className="flex flex-col gap-6 lg:gap-8">
          {/* Difficulty */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 lg:mb-4">Difficulty</h3>
            <div className="flex flex-col gap-2.5 lg:gap-3">
              {["Beginner", "Intermediate", "Advanced"].map((level, i) => (
                <label key={level} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-4 h-4">
                    <input type="checkbox" defaultChecked={i === 0} className="peer appearance-none w-4 h-4 border border-gray-600 rounded bg-transparent checked:bg-[#FF7A00] checked:border-[#FF7A00] cursor-pointer transition-colors" />
                    <span className="material-symbols-outlined absolute text-white text-[12px] opacity-0 peer-checked:opacity-100 pointer-events-none">check</span>
                  </div>
                  <span className="text-xs sm:text-sm group-hover:text-white transition-colors text-gray-300">{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 lg:mb-4">Price</h3>
            <div className="flex flex-col gap-2.5 lg:gap-3">
              {["All", "Free", "Paid"].map((type, i) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-4 h-4">
                    <input type="radio" name="price" defaultChecked={i === 0} className="peer appearance-none w-4 h-4 border border-gray-600 rounded-full bg-transparent checked:border-[#FF7A00] cursor-pointer transition-colors" />
                    <span className="absolute w-2 h-2 rounded-full bg-[#FF7A00] opacity-0 peer-checked:opacity-100 pointer-events-none"></span>
                  </div>
                  <span className="text-xs sm:text-sm group-hover:text-white transition-colors text-gray-300">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 lg:mb-4">Rating</h3>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-4 h-4 shrink-0">
                <input type="checkbox" defaultChecked className="peer appearance-none w-4 h-4 border border-gray-600 rounded bg-transparent checked:bg-[#FF7A00] checked:border-[#FF7A00] cursor-pointer transition-colors" />
                <span className="material-symbols-outlined absolute text-white text-[12px] opacity-0 peer-checked:opacity-100 pointer-events-none">check</span>
              </div>
              <div className="flex items-center gap-0.5 sm:gap-1 text-[#FF7A00] text-sm">
                {[1,2,3,4].map(star => (
                  <span key={star} className="material-symbols-outlined text-[14px] sm:text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
                <span className="text-gray-300 ml-1 group-hover:text-white transition-colors text-xs sm:text-sm">4.0 & Up</span>
              </div>
            </label>
          </div>
        </div>
      </aside>

      {/* ══ Main Content ══ */}
      <main className="flex-1 p-3 sm:p-6 lg:p-8 min-w-0">
        
        {/* Top Header (Desktop only) */}
        <div className="hidden lg:flex justify-between items-end mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Explore Courses</h1>
          <p className="text-gray-500 text-sm font-medium">Showing 24 results</p>
        </div>

        {/* Category Chips */}
        <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto hide-scrollbar pb-2">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                i === 0 ? "bg-[#FF7A00] text-white" : "bg-[#2A2A2A] text-gray-300 hover:bg-[#333] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="w-1 flex-shrink-0" />
        </div>

        {/* Mobile results count */}
        <p className="lg:hidden text-gray-500 text-[11px] sm:text-xs font-medium mb-4 px-1">Showing 24 results</p>

        {/* ══ Course Grid ══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          
          {/* Featured Card */}
          <div className="col-span-1 sm:col-span-2 bg-[#1C1C1C] border border-white/5 rounded-xl sm:rounded-2xl overflow-hidden flex flex-col md:flex-row group hover:border-white/10 transition-colors cursor-pointer shadow-sm">
            <div className="relative w-full md:w-2/5 aspect-video md:aspect-auto shrink-0 bg-[#222]">
              <Image src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80" alt="Strategy" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              <div className="absolute top-2 left-2 sm:bottom-3 sm:left-3 bg-[#FF7A00] text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded uppercase tracking-wider shadow-lg">
                FEATURED
              </div>
            </div>
            <div className="p-4 sm:p-5 md:p-8 flex-1 flex flex-col justify-between min-w-0">
              <div>
                <div className="flex justify-between items-start gap-2 mb-2 sm:mb-4">
                  <h3 className="text-base sm:text-xl md:text-2xl font-bold leading-tight group-hover:text-[#FF7A00] transition-colors line-clamp-2">Advanced Business Strategy Masterclass</h3>
                  <span className="text-[#3CE36A] font-bold text-sm sm:text-lg md:text-2xl mt-0.5 sm:mt-0">₹999</span>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed line-clamp-2 md:line-clamp-3">
                  Learn advanced frameworks for corporate strategy, market analysis, and sustainable competitive advantage in today&apos;s fast-paced digital economy.
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="material-symbols-outlined text-[#FF7A00] text-[14px] sm:text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="text-xs sm:text-sm font-semibold">4.8 <span className="text-gray-500 font-normal hidden sm:inline">(1.2k)</span></span>
                </div>
                <button className="flex items-center gap-1 sm:gap-2 text-[11px] sm:text-sm text-gray-300 hover:text-white transition-colors py-1.5 sm:py-2 px-3 sm:px-4 border border-white/10 rounded-lg hover:bg-white/10">
                  <span className="hidden sm:inline">View Details</span>
                  <span className="sm:hidden">View</span>
                  <span className="material-symbols-outlined text-[14px] sm:text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Normal Cards: Horizontal on mobile, vertical on sm+ */}
          {[
            {
              title: "World History: Modern Era Concepts",
              price: "₹99",
              img: "https://images.unsplash.com/photo-1461301214746-1e109215d6d3?w=800&auto=format&fit=crop&q=80",
              rating: "4.5",
              reviews: "840",
              cat: "History"
            },
            {
              title: "Introduction to Machine Learning",
              price: "Free",
              img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80",
              rating: "4.9",
              reviews: "3.2k",
              cat: "Tech"
            },
            {
              title: "Corporate Finance Essentials",
              price: "₹299",
              img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80",
              rating: "4.6",
              reviews: "512",
              cat: "Business"
            },
            {
              title: "NCERT Class 12 Science Bundle",
              price: "₹149",
              img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80",
              rating: "4.7",
              reviews: "2.1k",
              cat: "NCERT"
            }
          ].map((course, idx) => (
            <div key={idx} className="bg-[#1C1C1C] border border-white/5 rounded-xl sm:rounded-2xl overflow-hidden flex flex-row sm:flex-col group hover:border-white/10 transition-colors cursor-pointer shadow-sm">
              <div className="relative w-28 sm:w-full h-auto sm:aspect-[16/9] shrink-0 bg-[#222]">
                <Image src={course.img} alt={course.cat} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3 sm:p-5 flex-1 flex flex-col min-w-0">
                <div className="flex justify-between items-start mb-1 sm:mb-3 gap-2">
                  <h3 className="font-bold text-xs sm:text-lg leading-tight group-hover:text-[#FF7A00] transition-colors line-clamp-2">{course.title}</h3>
                </div>
                {/* Price on mobile sits below title, on desktop it's floated right in the above div */}
                <div className="mb-2 sm:hidden">
                  <span className="text-[#3CE36A] font-bold text-[11px]">{course.price}</span>
                </div>
                
                <p className="hidden sm:block text-gray-400 text-xs sm:text-sm mb-4 sm:mb-5 flex-1 line-clamp-2">Comprehensive guide and complete curriculum explained clearly...</p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    <span className="material-symbols-outlined text-[#FF7A00] text-[12px] sm:text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-[10px] sm:text-sm font-semibold">{course.rating} <span className="text-gray-500 font-normal hidden sm:inline">({course.reviews})</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline text-[#3CE36A] font-bold text-sm">{course.price}</span>
                    <span className="bg-[#2A2A2A] text-gray-400 text-[9px] sm:text-xs px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded sm:rounded-md font-medium uppercase tracking-wider">{course.cat}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </main>
    </div>
  );
}
