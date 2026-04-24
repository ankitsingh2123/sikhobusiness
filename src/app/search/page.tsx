import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Search Courses | Seekho Business",
  description: "Explore and search courses.",
};

const categories = ["All", "NCERT", "Business", "History", "General Knowledge", "Technology"];

export default function SearchPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#131313] text-white flex flex-col lg:flex-row">
      {/* Filters Sidebar - Collapsible on Mobile */}
      <aside className="w-full lg:w-[240px] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-white/5 p-4 md:p-6">
        <div className="flex items-center justify-between lg:mb-8">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#FF7A00]">filter_list</span>
            <h2 className="text-lg md:text-xl font-bold uppercase tracking-widest text-gray-200">Filters</h2>
          </div>
          {/* Mobile indicator or toggle can go here if needed */}
        </div>
        
        {/* Horizontal scroll for filters on mobile, vertical on desktop */}
        <div className="flex flex-row lg:flex-col gap-8 lg:gap-0 overflow-x-auto lg:overflow-visible hide-scrollbar py-4 lg:py-0">

        {/* Difficulty */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Difficulty</h3>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-4 h-4">
                <input type="checkbox" defaultChecked className="peer appearance-none w-4 h-4 border border-gray-600 rounded bg-transparent checked:bg-[#FF7A00] checked:border-[#FF7A00] cursor-pointer transition-colors" />
                <span className="material-symbols-outlined absolute text-white text-[12px] opacity-0 peer-checked:opacity-100 pointer-events-none">check</span>
              </div>
              <span className="text-sm group-hover:text-white transition-colors text-gray-300">Beginner</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-4 h-4">
                <input type="checkbox" className="peer appearance-none w-4 h-4 border border-gray-600 rounded bg-transparent checked:bg-[#FF7A00] checked:border-[#FF7A00] cursor-pointer transition-colors" />
                <span className="material-symbols-outlined absolute text-white text-[12px] opacity-0 peer-checked:opacity-100 pointer-events-none">check</span>
              </div>
              <span className="text-sm group-hover:text-white transition-colors text-gray-300">Intermediate</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-4 h-4">
                <input type="checkbox" className="peer appearance-none w-4 h-4 border border-gray-600 rounded bg-transparent checked:bg-[#FF7A00] checked:border-[#FF7A00] cursor-pointer transition-colors" />
                <span className="material-symbols-outlined absolute text-white text-[12px] opacity-0 peer-checked:opacity-100 pointer-events-none">check</span>
              </div>
              <span className="text-sm group-hover:text-white transition-colors text-gray-300">Advanced</span>
            </label>
          </div>
        </div>

        {/* Price */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Price</h3>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-4 h-4">
                <input type="radio" name="price" defaultChecked className="peer appearance-none w-4 h-4 border border-gray-600 rounded-full bg-transparent checked:border-[#FF7A00] cursor-pointer transition-colors" />
                <span className="absolute w-2 h-2 rounded-full bg-[#FF7A00] opacity-0 peer-checked:opacity-100 pointer-events-none"></span>
              </div>
              <span className="text-sm group-hover:text-white transition-colors text-gray-300">All</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-4 h-4">
                <input type="radio" name="price" className="peer appearance-none w-4 h-4 border border-gray-600 rounded-full bg-transparent checked:border-[#FF7A00] cursor-pointer transition-colors" />
                <span className="absolute w-2 h-2 rounded-full bg-[#FF7A00] opacity-0 peer-checked:opacity-100 pointer-events-none"></span>
              </div>
              <span className="text-sm group-hover:text-white transition-colors text-gray-300">Free</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-4 h-4">
                <input type="radio" name="price" className="peer appearance-none w-4 h-4 border border-gray-600 rounded-full bg-transparent checked:border-[#FF7A00] cursor-pointer transition-colors" />
                <span className="absolute w-2 h-2 rounded-full bg-[#FF7A00] opacity-0 peer-checked:opacity-100 pointer-events-none"></span>
              </div>
              <span className="text-sm group-hover:text-white transition-colors text-gray-300">Paid</span>
            </label>
          </div>
        </div>

        {/* Rating */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Rating</h3>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center w-4 h-4">
              <input type="checkbox" defaultChecked className="peer appearance-none w-4 h-4 border border-gray-600 rounded bg-transparent checked:bg-[#FF7A00] checked:border-[#FF7A00] cursor-pointer transition-colors" />
              <span className="material-symbols-outlined absolute text-white text-[12px] opacity-0 peer-checked:opacity-100 pointer-events-none">check</span>
            </div>
            <div className="flex items-center gap-1 text-[#FF7A00] text-sm">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="text-gray-300 ml-1 group-hover:text-white transition-colors">4.0 & Up</span>
            </div>
          </label>
        </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8">
        {/* Top Chips */}
        <div className="flex gap-3 mb-8 overflow-x-auto hide-scrollbar pb-2">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                i === 0 ? "bg-[#FF7A00] text-white" : "bg-[#2A2A2A] text-gray-300 hover:bg-[#333] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Explore Courses</h1>
          <p className="text-gray-500 text-xs md:text-sm font-medium">Showing 24 results</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Featured Card */}
          <div className="col-span-1 md:col-span-2 bg-[#1C1C1C] border border-white/5 rounded-2xl overflow-hidden flex flex-col md:flex-row group hover:border-white/10 transition-colors cursor-pointer">
            <div className="relative w-full md:w-2/5 aspect-video md:aspect-auto">
              <Image src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80" alt="Strategy" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              <div className="absolute bottom-3 left-3 bg-[#FF7A00] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-lg">
                FEATURED
              </div>
            </div>
            <div className="p-5 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4">
                  <h3 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-[#FF7A00] transition-colors">Advanced Business Strategy Masterclass</h3>
                  <span className="text-[#3CE36A] font-bold text-lg md:text-2xl">₹999</span>
                </div>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-2 md:line-clamp-3">
                  Learn advanced frameworks for corporate strategy, market analysis, and sustainable competitive advantage in today's fast-paced digital economy.
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#FF7A00] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="text-sm font-semibold">4.8 <span className="text-gray-500 font-normal">(1.2k reviews)</span></span>
                </div>
                <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors py-2 px-4 border border-white/10 rounded-lg hover:bg-white/10">
                  View Details
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Normal Card 1 */}
          <div className="bg-[#1C1C1C] border border-white/5 rounded-2xl overflow-hidden flex flex-col group hover:border-white/10 transition-colors cursor-pointer">
            <div className="relative w-full aspect-[16/9]">
              <Image src="https://images.unsplash.com/photo-1461301214746-1e109215d6d3?w=800&auto=format&fit=crop&q=80" alt="History" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg leading-tight pr-2 group-hover:text-[#FF7A00] transition-colors">World History: Modern Era Concepts</h3>
                <span className="text-[#3CE36A] font-bold">₹99</span>
              </div>
              <p className="text-gray-400 text-sm mb-5 flex-1">Comprehensive guide to global events that shaped the 20th century...</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#FF7A00] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="text-sm font-semibold">4.5 <span className="text-gray-500 font-normal">(840)</span></span>
                </div>
                <span className="bg-[#2A2A2A] text-gray-400 text-xs px-2.5 py-1 rounded-md font-medium">History</span>
              </div>
            </div>
          </div>

          {/* Normal Card 2 */}
          <div className="bg-[#1C1C1C] border border-white/5 rounded-2xl overflow-hidden flex flex-col group hover:border-white/10 transition-colors cursor-pointer">
            <div className="relative w-full aspect-[16/9]">
              <Image src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80" alt="ML" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg leading-tight pr-2 group-hover:text-[#FF7A00] transition-colors">Introduction to Machine Learning</h3>
                <span className="text-[#3CE36A] font-bold">Free</span>
              </div>
              <p className="text-gray-400 text-sm mb-5 flex-1">Basics of AI and Machine Learning models using Python and Pandas...</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#FF7A00] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="text-sm font-semibold">4.9 <span className="text-gray-500 font-normal">(3.2k)</span></span>
                </div>
                <span className="bg-[#2A2A2A] text-gray-400 text-xs px-2.5 py-1 rounded-md font-medium">Tech</span>
              </div>
            </div>
          </div>

          {/* Normal Card 3 */}
          <div className="bg-[#1C1C1C] border border-white/5 rounded-2xl overflow-hidden flex flex-col group hover:border-white/10 transition-colors cursor-pointer">
            <div className="relative w-full aspect-[16/9]">
              <Image src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80" alt="Finance" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg leading-tight pr-2 group-hover:text-[#FF7A00] transition-colors">Corporate Finance Essentials</h3>
                <span className="text-[#3CE36A] font-bold">₹299</span>
              </div>
              <p className="text-gray-400 text-sm mb-5 flex-1">Understand corporate valuation, investments, and risk management...</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#FF7A00] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="text-sm font-semibold">4.6 <span className="text-gray-500 font-normal">(512)</span></span>
                </div>
                <span className="bg-[#2A2A2A] text-gray-400 text-xs px-2.5 py-1 rounded-md font-medium">Business</span>
              </div>
            </div>
          </div>

          {/* Normal Card 4 */}
          <div className="bg-[#1C1C1C] border border-white/5 rounded-2xl overflow-hidden flex flex-col group hover:border-white/10 transition-colors cursor-pointer">
            <div className="relative w-full aspect-[16/9]">
              <Image src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80" alt="Science" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg leading-tight pr-2 group-hover:text-[#FF7A00] transition-colors">NCERT Class 12 Science Bundle</h3>
                <span className="text-[#3CE36A] font-bold">₹149</span>
              </div>
              <p className="text-gray-400 text-sm mb-5 flex-1">Physics, Chemistry, and Biology complete curriculum explained...</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#FF7A00] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="text-sm font-semibold">4.7 <span className="text-gray-500 font-normal">(2.1k)</span></span>
                </div>
                <span className="bg-[#2A2A2A] text-gray-400 text-xs px-2.5 py-1 rounded-md font-medium">NCERT</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
