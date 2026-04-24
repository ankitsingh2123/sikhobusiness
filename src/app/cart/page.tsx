"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const initialItems = [
  {
    id: 1,
    title: "Advanced Digital Marketing Strategy",
    instructor: "Sarah Jenkins",
    price: 4999,
    discountPrice: 499,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: 1240,
    category: "Marketing"
  },
  {
    id: 2,
    title: "Financial Modeling & Valuation Masterclass",
    instructor: "Robert Chen",
    price: 2999,
    discountPrice: 199,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: 856,
    category: "Finance"
  }
];

export default function CartPage() {
  const [items, setItems] = useState(initialItems);

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const totalDiscount = items.reduce((acc, item) => acc + (item.price - item.discountPrice), 0);
  const total = subtotal - totalDiscount;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center mb-6 sm:mb-8">
          <span className="material-symbols-outlined text-[36px] sm:text-[48px] text-white/20">shopping_cart</span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">Your cart is empty</h1>
        <p className="text-[#888] text-sm mb-8 sm:mb-10 max-w-md">Looks like you haven&apos;t added anything yet. Explore our top courses and start learning!</p>
        <Link 
          href="/search" 
          className="bg-[#FF7A00] text-black font-bold px-8 py-3.5 rounded-xl hover:bg-[#FF8A1F] transition-all shadow-lg shadow-[#FF7A00]/20 text-sm sm:text-base"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-8 pb-28 md:pb-12 overflow-x-hidden">
      <div className="max-w-[1200px] lg:max-w-full mx-auto">
        
        {/* Header */}
        <div className="mb-6 md:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-1 sm:mb-2 tracking-tight">Shopping Cart</h1>
          <p className="text-[#888] text-xs sm:text-sm">{items.length} Courses in Cart</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-6 md:gap-10">
          
          {/* ── Item List ── */}
          <div className="flex-1 space-y-3 sm:space-y-4 md:space-y-6 min-w-0">
            {items.map((item) => (
              <div 
                key={item.id}
                className="bg-[#1A1A1A] rounded-2xl md:rounded-[28px] border border-white/5 p-3 sm:p-4 md:p-6 group hover:border-[#FF7A00]/20 transition-all"
              >
                {/* Mobile: stacked layout */}
                <div className="flex gap-3 sm:gap-4 md:gap-6">
                  {/* Thumbnail — small on mobile, larger on desktop */}
                  <div className="relative w-20 h-20 sm:w-28 sm:h-24 md:w-48 md:h-32 rounded-xl md:rounded-2xl overflow-hidden shrink-0 border border-white/5">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      {/* Title + Price row */}
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h3 className="text-sm sm:text-base md:text-xl font-bold text-white group-hover:text-[#FF7A00] transition-colors line-clamp-2 leading-snug">{item.title}</h3>
                      </div>
                      <p className="text-[10px] sm:text-xs md:text-sm text-[#888] mb-1 sm:mb-2">By <span className="text-white/80">{item.instructor}</span></p>
                      
                      {/* Rating + Category */}
                      <div className="hidden sm:flex items-center gap-3 text-[10px] sm:text-xs font-medium">
                        <div className="flex items-center gap-1 text-[#FF7A00]">
                          <span className="material-symbols-outlined text-[12px] sm:text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          {item.rating}
                          <span className="text-[#666] font-normal">({item.reviews})</span>
                        </div>
                        <span className="bg-white/5 text-[#888] px-1.5 py-0.5 rounded uppercase tracking-wider text-[9px] sm:text-[10px]">{item.category}</span>
                      </div>
                    </div>

                    {/* Price on mobile — inline */}
                    <div className="flex items-center gap-2 mt-1 sm:mt-2">
                      <span className="text-base sm:text-lg md:text-xl font-bold text-[#FF7A00]">₹{item.discountPrice}</span>
                      <span className="text-[10px] sm:text-xs text-[#555] line-through">₹{item.price}</span>
                    </div>
                  </div>
                </div>

                {/* Action buttons — below content */}
                <div className="flex items-center gap-4 sm:gap-6 mt-3 sm:mt-4 md:mt-5 pt-3 sm:pt-4 border-t border-white/5">
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-[11px] sm:text-xs md:text-sm font-bold text-[#666] hover:text-red-400 flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px] sm:text-[16px] md:text-[18px]">delete</span>
                    Remove
                  </button>
                  <button className="text-[11px] sm:text-xs md:text-sm font-bold text-[#666] hover:text-[#FF7A00] flex items-center gap-1 transition-colors">
                    <span className="material-symbols-outlined text-[14px] sm:text-[16px] md:text-[18px]">favorite</span>
                    <span className="hidden sm:inline">Save for later</span>
                    <span className="sm:hidden">Save</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ── Checkout Summary ── */}
          <div className="w-full xl:w-[380px] shrink-0">
            <div className="bg-[#1A1A1A] rounded-2xl md:rounded-[32px] border border-white/5 p-5 sm:p-6 md:p-8 sticky top-8 shadow-2xl">
              <h2 className="text-base sm:text-lg md:text-xl font-bold mb-5 md:mb-8">Order Summary</h2>
              
              <div className="space-y-3 sm:space-y-4 mb-5 md:mb-8">
                <div className="flex justify-between text-[#888] text-xs sm:text-sm">
                  <span>Original Price</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#FF7A00] text-xs sm:text-sm font-medium">
                  <span>Discount</span>
                  <span>- ₹{totalDiscount.toLocaleString()}</span>
                </div>
                <div className="pt-3 sm:pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-sm sm:text-base font-bold">Total</span>
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <Link 
                href="/checkout"
                className="w-full bg-[#FF7A00] text-black font-bold py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 hover:bg-[#FF8A1F] transition-all shadow-lg shadow-[#FF7A00]/20 text-sm sm:text-base mb-4 sm:mb-6"
              >
                Checkout Now
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">arrow_forward</span>
              </Link>

              <div className="space-y-3 sm:space-y-4">
                <p className="text-[10px] sm:text-[11px] text-[#555] text-center leading-relaxed px-2 sm:px-4">
                  By completing your purchase, you agree to these <Link href="/terms" className="underline hover:text-[#888]">Terms of Service</Link>.
                </p>
                
                <div className="flex items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-white/5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center opacity-40">
                    <span className="material-symbols-outlined text-[14px] sm:text-[18px]">lock</span>
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center opacity-40 text-[8px] sm:text-[10px] font-bold">VISA</div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center opacity-40 text-[8px] sm:text-[10px] font-bold">UPI</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── You Might Also Like ── */}
        <div className="mt-12 sm:mt-16 md:mt-24">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-5 sm:mb-6 md:mb-10">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-6">
             {[1,2,3,4].map(i => (
               <div key={i} className="bg-[#1A1A1A] border border-white/5 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 md:p-4 flex gap-2 sm:gap-3 md:gap-4 hover:border-white/10 transition-all cursor-pointer">
                 <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg bg-white/5 shrink-0 overflow-hidden relative">
                    <Image src={`https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&auto=format&fit=crop&q=80`} alt="Rec" fill className="object-cover opacity-50" />
                 </div>
                 <div className="flex-1 min-w-0">
                    <h4 className="text-[10px] sm:text-xs md:text-sm font-bold text-white truncate">Business Growth 101</h4>
                    <p className="text-[8px] sm:text-[10px] md:text-xs text-[#666] mb-0.5 sm:mb-1">Jane Smith</p>
                    <span className="text-[#FF7A00] font-bold text-[10px] sm:text-xs md:text-sm">₹499</span>
                 </div>
               </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
}
