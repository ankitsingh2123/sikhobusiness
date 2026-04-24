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
        <div className="w-24 h-24 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center mb-8">
          <span className="material-symbols-outlined text-[48px] text-white/20">shopping_cart</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
        <p className="text-[#888] mb-10 max-w-md">Looks like you haven't added anything to your cart yet. Explore our top courses and start learning today!</p>
        <Link 
          href="/search" 
          className="bg-[#FF7A00] text-black font-bold px-10 py-4 rounded-xl hover:bg-[#FF8A1F] transition-all shadow-lg shadow-[#FF7A00]/20"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white py-12 px-4 md:px-8">
      <div className="max-w-[1200px] lg:max-w-full mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-[#888]">{items.length} Courses in Cart</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-10">
          
          {/* Item List */}
          <div className="flex-1 space-y-6">
            {items.map((item) => (
              <div 
                key={item.id}
                className="bg-[#1A1A1A] rounded-[28px] border border-white/5 p-5 md:p-6 flex flex-col md:flex-row gap-6 group hover:border-[#FF7A00]/20 transition-all"
              >
                {/* Thumbnail */}
                <div className="relative w-full md:w-48 aspect-[16/10] rounded-2xl overflow-hidden shrink-0 border border-white/5">
                  <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#FF7A00] transition-colors">{item.title}</h3>
                      <div className="text-right">
                        <div className="text-xl font-bold text-[#FF7A00]">₹{item.discountPrice}</div>
                        <div className="text-sm text-[#555] line-through">₹{item.price}</div>
                      </div>
                    </div>
                    <p className="text-sm text-[#888] mb-3">By <span className="text-white/80">{item.instructor}</span></p>
                    
                    <div className="flex items-center gap-4 text-xs font-medium">
                      <div className="flex items-center gap-1 text-[#FF7A00]">
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        {item.rating}
                        <span className="text-[#666] font-normal">({item.reviews})</span>
                      </div>
                      <span className="bg-white/5 text-[#888] px-2 py-0.5 rounded uppercase tracking-wider">{item.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-6">
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-sm font-bold text-[#666] hover:text-red-400 flex items-center gap-1.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                      Remove
                    </button>
                    <button className="text-sm font-bold text-[#666] hover:text-[#FF7A00] flex items-center gap-1.5 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">favorite</span>
                      Save for later
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary Sidebar */}
          <div className="w-full xl:w-[380px] shrink-0">
            <div className="bg-[#1A1A1A] rounded-[32px] border border-white/5 p-8 sticky top-8 shadow-2xl">
              <h2 className="text-xl font-bold mb-8">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[#888]">
                  <span>Original Price</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#FF7A00]">
                  <span>Course Discount</span>
                  <span>- ₹{totalDiscount.toLocaleString()}</span>
                </div>
                <div className="pt-4 border-t border-white/5 flex justify-between items-baseline">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-3xl font-bold text-white">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <Link 
                href="/checkout"
                className="w-full bg-[#FF7A00] text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#FF8A1F] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#FF7A00]/20 active:translate-y-0 mb-6"
              >
                Checkout Now
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>

              <div className="space-y-4">
                <p className="text-[11px] text-[#555] text-center leading-relaxed px-4">
                  By completing your purchase, you agree to these <Link href="/terms" className="underline hover:text-[#888]">Terms of Service</Link>.
                </p>
                
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-white/5">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-40">
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-40 text-[10px] font-bold">VISA</div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-40 text-[10px] font-bold">UPI</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Recently Viewed / Recommendations */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold mb-10">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {/* Simple mini-cards */}
             {[1,2,3,4].map(i => (
               <div key={i} className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-4 flex gap-4 hover:border-white/10 transition-all cursor-pointer">
                 <div className="w-16 h-16 rounded-lg bg-white/5 shrink-0 overflow-hidden relative">
                    <Image src={`https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&auto=format&fit=crop&q=80`} alt="Rec" fill className="object-cover opacity-50" />
                 </div>
                 <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">Business Growth 101</h4>
                    <p className="text-xs text-[#666] mb-1">Jane Smith</p>
                    <span className="text-[#FF7A00] font-bold text-sm">₹499</span>
                 </div>
               </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
}
