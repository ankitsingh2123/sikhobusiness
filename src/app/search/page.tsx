"use client";

import React, { useState } from "react";
import Image from "next/image";

import Link from "next/link";

const categories = [
  { name: "Sarkari Kaam", icon: "fingerprint", from: "#FFA726", to: "#F57C00", id: "sarkari-kaam" },
  { name: "Part Time Income", icon: "currency_rupee", from: "#66BB6A", to: "#388E3C", id: "part-time-income" },
  { name: "Instagram", icon: "photo_camera", from: "#EC407A", to: "#C2185B", id: "instagram" },
  { name: "Youtube", icon: "play_circle", from: "#EF5350", to: "#C62828", id: "youtube" },
  { name: "English Speaking", icon: "translate", from: "#26A69A", to: "#00796B", id: "english-speaking" },
  { name: "Astrology", icon: "auto_awesome", from: "#AB47BC", to: "#7B1FA2", id: "astrology" },
  { name: "Finance", icon: "account_balance_wallet", from: "#9CCC65", to: "#689F38", id: "finance" },
  { name: "Business", icon: "storefront", from: "#42A5F5", to: "#1976D2", id: "business" },
  { name: "Wellness", icon: "volunteer_activism", from: "#80CBC4", to: "#00897B", id: "wellness" },
  { name: "Career & Jobs", icon: "school", from: "#29B6F6", to: "#0288D1", id: "career-jobs" },
  { name: "Share Market", icon: "trending_up", from: "#E040FB", to: "#AA00FF", id: "share-market" },
  { name: "Editing", icon: "content_cut", from: "#FFCA28", to: "#FFA000", id: "editing" },
  { name: "Mobile Tricks", icon: "smartphone", from: "#1E88E5", to: "#0D47A1", id: "mobile-tricks" },
  { name: "Success", icon: "emoji_events", from: "#AFB42B", to: "#827717", id: "success" },
  { name: "Health", icon: "monitor_heart", from: "#EF5350", to: "#D32F2F", id: "health" },
  { name: "Knowledge", icon: "psychology", from: "#B388FF", to: "#651FFF", id: "knowledge" },
  { name: "Crime", icon: "local_police", from: "#9E9E9E", to: "#616161", id: "crime" },
  { name: "Horror", icon: "skull", from: "#F44336", to: "#B71C1C", id: "horror" },
  { name: "Devotion", icon: "self_improvement", from: "#FF7043", to: "#D84315", id: "devotion" },
  { name: "Food", icon: "restaurant", from: "#FFA726", to: "#F57C00", id: "food" },
  { name: "Self-Growth", icon: "lightbulb", from: "#FFB74D", to: "#EF6C00", id: "self-growth" },
  { name: "Agriculture", icon: "eco", from: "#66BB6A", to: "#2E7D32", id: "agriculture" },
  { name: "Marketing", icon: "campaign", from: "#4FC3F7", to: "#0277BD", id: "marketing" },
  { name: "Automobile", icon: "directions_car", from: "#9575CD", to: "#512DA8", id: "automobile" },
  { name: "Startups", icon: "rocket_launch", from: "#EF5350", to: "#C62828", id: "startups" },
  { name: "History", icon: "account_balance", from: "#BCAAA4", to: "#795548", id: "history" },
  { name: "AI", icon: "memory", from: "#FFCA28", to: "#FF8F00", id: "ai" },
  { name: "Beauty", icon: "face_retouching_natural", from: "#F48FB1", to: "#C2185B", id: "beauty" },
  { name: "Exam Prep", icon: "fact_check", from: "#D4E157", to: "#9E9D24", id: "exam-prep" },
  { name: "Computer", icon: "desktop_windows", from: "#7986CB", to: "#3949AB", id: "computer" },
  { name: "Coding", icon: "code", from: "#26A69A", to: "#00695C", id: "coding" },
  { name: "Life Hacks", icon: "tips_and_updates", from: "#FF8A65", to: "#D84315", id: "life-hacks" },
  { name: "Technology", icon: "settings", from: "#FFB74D", to: "#F57C00", id: "technology" },
  { name: "Fitness & Gym", icon: "fitness_center", from: "#CE93D8", to: "#8E24AA", id: "fitness-gym" },
  { name: "Motivation", icon: "directions_run", from: "#BA68C8", to: "#7B1FA2", id: "motivation" },
  { name: "Photography", icon: "camera_alt", from: "#81D4FA", to: "#0097A7", id: "photography" },
  { name: "Math", icon: "calculate", from: "#FF9800", to: "#E65100", id: "math" },
  { name: "Art & Craft", icon: "palette", from: "#F06292", to: "#AD1457", id: "art-craft" },
  { name: "Ramayan", icon: "auto_stories", from: "#FFB74D", to: "#F57C00", id: "ramayan" },
  { name: "Cricket", icon: "sports_cricket", from: "#5C6BC0", to: "#283593", id: "cricket" }
];

export default function SearchPage() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-[#131313] text-white flex flex-col lg:flex-row pb-28 md:pb-12 overflow-x-hidden">
      
      {/* ΓòÉΓòÉ Mobile Filter Toggle ΓòÉΓòÉ */}
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

      {/* ΓòÉΓòÉ Filters Sidebar ΓòÉΓòÉ */}
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

      {/* ΓòÉΓòÉ Main Content ΓòÉΓòÉ */}
      <main className="flex-1 p-3 sm:p-6 lg:p-8 min-w-0">
        
        {/* Top Header (Desktop only) */}
        <div className="hidden lg:flex justify-between items-end mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Explore Courses</h1>
          <p className="text-gray-500 text-sm font-medium">Showing 24 results</p>
        </div>

        {/* Category Chips */}
        <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto hide-scrollbar pb-2">
          {categories.map((cat, i) => (
            <Link
              href={`/search?q=${encodeURIComponent(cat.name)}`}
              key={cat.name}
              className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                i === 0 ? "bg-[#FF7A00] text-white" : "bg-[#2A2A2A] text-gray-300 hover:bg-[#333] hover:text-white"
              }`}
            >
              {cat.name}
            </Link>
          ))}
          <div className="w-1 flex-shrink-0" />
        </div>

        {/* Mobile results count */}
        <p className="lg:hidden text-gray-500 text-[11px] sm:text-xs font-medium mb-4 px-1">Showing 24 results</p>

        {/* ΓòÉΓòÉ Course Grid ΓòÉΓòÉ */}
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
                  <span className="text-[#3CE36A] font-bold text-sm sm:text-lg md:text-2xl mt-0.5 sm:mt-0">Γé╣999</span>
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
              price: "Γé╣99",
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
              price: "Γé╣299",
              img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80",
              rating: "4.6",
              reviews: "512",
              cat: "Business"
            },
            {
              title: "NCERT Class 12 Science Bundle",
              price: "Γé╣149",
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

        {/* ══ All Categories Grid ══ */}
        <div className="mt-16 md:mt-24 border-t border-white/10 pt-12">
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-tight text-white">
              Browse All Categories
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl">
              Can't find what you're looking for? Explore our complete library of professional courses.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
            {categories.map((cat) => (
              <Link 
                href={`/search?q=${encodeURIComponent(cat.name)}`} 
                key={cat.id} 
                className="relative overflow-hidden rounded-xl md:rounded-2xl aspect-[1.8/1] sm:aspect-[2/1] group transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 border border-white/5 shadow-lg"
                style={{ background: `linear-gradient(135deg, ${cat.from}, ${cat.to})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                
                <div className="absolute inset-0 p-3 sm:p-4 md:p-5 flex flex-col justify-end z-20">
                  <h3 className="text-white font-bold text-xs sm:text-sm md:text-base leading-tight w-[80%] drop-shadow-md">
                    {cat.name}
                  </h3>
                </div>
                
                <span 
                  className="material-symbols-outlined absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 text-white opacity-[0.25] pointer-events-none group-hover:scale-110 group-hover:opacity-[0.35] transition-all duration-500 ease-out" 
                  style={{ 
                    fontVariationSettings: "'FILL' 1",
                    fontSize: "max(80px, 50%)",
                  }}
                >
                  {cat.icon}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
