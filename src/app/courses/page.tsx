"use client";

import React from "react";
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

export default function AllCategoriesPage() {
  return (
    <div className="min-h-screen bg-[#111111] text-white px-4 sm:px-6 md:px-12 py-8 md:py-12 pb-28 font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto min-w-0">
        
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 tracking-tight text-white">
            All Categories
          </h1>
          <p className="text-[#888] text-sm md:text-base max-w-2xl">
            Explore our wide range of professional courses designed to help you master new skills, grow your career, and achieve success.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
          {categories.map((cat) => (
            <Link 
              href={`/search?q=${encodeURIComponent(cat.name)}`} 
              key={cat.name} 
              className="relative overflow-hidden rounded-xl md:rounded-2xl aspect-[1.8/1] sm:aspect-[2/1] group transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 border border-white/5 shadow-lg"
              style={{ background: `linear-gradient(135deg, ${cat.from}, ${cat.to})` }}
            >
              {/* Soft overlay gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
              
              {/* Content */}
              <div className="absolute inset-0 p-3 sm:p-4 md:p-5 flex flex-col justify-end z-20">
                <h3 className="text-white font-bold text-xs sm:text-sm md:text-base leading-tight w-[80%] drop-shadow-md">
                  {cat.name}
                </h3>
              </div>
              
              {/* Huge Watermark Icon */}
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
    </div>
  );
}
