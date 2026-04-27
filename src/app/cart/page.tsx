"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = (await supabase.auth.getSession()).data.session?.access_token;
      const res = await fetch("/api/cart", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 401) {
        router.push("/auth/login");
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id: string) => {
    try {
      setItems(items.filter(item => item.id !== id)); // Optimistic UI update
      const token = (await supabase.auth.getSession()).data.session?.access_token;
      const res = await fetch(`/api/cart?id=${id}`, { 
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        fetchCart(); // Revert if failed
      }
    } catch (e) {
      console.error(e);
      fetchCart();
    }
  };

  const subtotal = items.reduce((acc, item) => acc + (item.course.price * 20), 0); // Assuming 20x discount ratio for display
  const total = items.reduce((acc, item) => acc + item.course.price, 0);
  const totalDiscount = subtotal - total;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FF7A00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center mb-6 sm:mb-8">
          <span className="material-symbols-outlined text-[36px] sm:text-[48px] text-white/20">shopping_cart</span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">Your cart is empty</h1>
        <p className="text-[#888] text-sm mb-8 sm:mb-10 max-w-md">Looks like you haven&apos;t added anything yet. Explore our top courses and start learning!</p>
        <Button 
          href="/" 
          variant="primary"
          size="lg"
        >
          Browse Courses
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-8 pb-28 md:pb-12 overflow-hidden relative">
      {/* Ambient background glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FF7A00]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF9A44]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-6 md:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-1 sm:mb-2 tracking-tight">Shopping Cart</h1>
          <p className="text-[#888] text-xs sm:text-sm">{items.length} Courses in Cart</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-6 md:gap-10">
          
          {/* ΓöÇΓöÇ Item List ΓöÇΓöÇ */}
          <div className="flex-1 space-y-3 sm:space-y-4 md:space-y-6 min-w-0">
            {items.map((item) => (
              <div 
                key={item.id}
                className="bg-[#111]/80 backdrop-blur-xl rounded-[24px] border border-white/5 p-4 sm:p-5 md:p-6 group hover:border-[#FF7A00]/30 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(255,122,0,0.1)] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A00]/0 to-[#FF7A00]/0 group-hover:from-[#FF7A00]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                
                {/* Mobile: stacked layout */}
                <div className="flex gap-3 sm:gap-4 md:gap-6">
                  {/* Thumbnail ΓÇö small on mobile, larger on desktop */}
                  <div className="relative w-20 h-20 sm:w-28 sm:h-24 md:w-48 md:h-32 rounded-xl md:rounded-2xl overflow-hidden shrink-0 border border-white/5">
                    <Image src={item.course.thumbnail || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80"} alt={item.course.title} fill className="object-cover" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      {/* Title + Price row */}
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h3 className="text-sm sm:text-base md:text-xl font-bold text-white group-hover:text-[#FF7A00] transition-colors line-clamp-2 leading-snug">{item.course.title}</h3>
                      </div>
                      <p className="text-[10px] sm:text-xs md:text-sm text-[#888] mb-1 sm:mb-2">By <span className="text-white/80">Seekho Business</span></p>
                      
                      {/* Rating + Category */}
                      <div className="hidden sm:flex items-center gap-3 text-[10px] sm:text-xs font-medium">
                        <div className="flex items-center gap-1 text-[#FF7A00]">
                          <span className="material-symbols-outlined text-[12px] sm:text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          4.9
                          <span className="text-[#666] font-normal">(1200)</span>
                        </div>
                        <span className="bg-white/5 text-[#888] px-1.5 py-0.5 rounded uppercase tracking-wider text-[9px] sm:text-[10px]">{item.course.category}</span>
                      </div>
                    </div>

                    {/* Price on mobile ΓÇö inline */}
                    <div className="flex items-center gap-2 mt-1 sm:mt-2">
                      <span className="text-base sm:text-lg md:text-xl font-bold text-[#FF7A00]">₹{item.course.price}</span>
                      <span className="text-[10px] sm:text-xs text-[#555] line-through">₹{item.course.price * 20}</span>
                    </div>
                  </div>
                </div>

                {/* Action buttons — below content */}
                <div className="flex items-center gap-4 sm:gap-6 mt-3 sm:mt-4 md:mt-5 pt-3 sm:pt-4 border-t border-white/5">
                  <Button 
                    onClick={() => removeItem(item.id)}
                    variant="ghost"
                    size="sm"
                    className="!text-[#666] hover:!text-red-400 !px-0"
                    leftIcon={<span className="material-symbols-outlined text-[14px] sm:text-[16px] md:text-[18px]">delete</span>}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="!text-[#666] hover:!text-[#FF7A00] !px-0"
                    leftIcon={<span className="material-symbols-outlined text-[14px] sm:text-[16px] md:text-[18px]">favorite</span>}
                  >
                    <span className="hidden sm:inline">Save for later</span>
                    <span className="sm:hidden">Save</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="w-full xl:w-[380px] shrink-0">
            <div className="bg-[#111]/80 backdrop-blur-xl rounded-[32px] border border-white/10 p-6 md:p-8 sticky top-24 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A00]/10 blur-[40px] pointer-events-none rounded-full" />
              <h2 className="text-xl md:text-2xl font-black mb-6 tracking-tight relative z-10">Order Summary</h2>
              
              <div className="space-y-3 sm:space-y-4 mb-5 md:mb-8">
                <div className="flex justify-between text-[#888] text-xs sm:text-sm">
                  <span>Original Price</span>
                  <span>Γé╣{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#FF7A00] text-xs sm:text-sm font-medium">
                  <span>Discount</span>
                  <span>- Γé╣{totalDiscount.toLocaleString()}</span>
                </div>
                <div className="pt-3 sm:pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-sm sm:text-base font-bold">Total</span>
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Γé╣{total.toLocaleString()}</span>
                </div>
              </div>

              <Button 
                href="/checkout"
                variant="primary"
                size="lg"
                fullWidth
                className="mb-4 sm:mb-6"
                rightIcon={<span className="material-symbols-outlined text-[18px] sm:text-[20px]">arrow_forward</span>}
              >
                Checkout Now
              </Button>

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
        <div className="mt-16 md:mt-24 relative z-10">
          <h2 className="text-xl md:text-3xl font-black mb-6 md:mb-10 tracking-tight">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
             {[1,2,3,4].map(i => (
               <div key={i} className="bg-[#111]/80 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex gap-4 hover:border-[#FF7A00]/30 hover:shadow-[0_10px_30px_rgba(255,122,0,0.1)] transition-all cursor-pointer group">
                 <div className="w-16 h-16 rounded-xl bg-[#1A1A1A] shrink-0 overflow-hidden relative">
                    <Image src={`https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&auto=format&fit=crop&q=80`} alt="Rec" fill className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-500" />
                 </div>
                 <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h4 className="text-sm font-bold text-white truncate group-hover:text-[#FF7A00] transition-colors">Business Growth 101</h4>
                    <p className="text-xs text-[#666] mb-1">Jane Smith</p>
                    <span className="text-[#3CE36A] font-bold text-sm">₹499</span>
                 </div>
               </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
}
