"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

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
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FF7A00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="h-[calc(100dvh-4rem)] bg-[#07080F] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        <FadeIn direction="up" className="flex flex-col items-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#161616] border border-white/5 flex items-center justify-center mb-6 sm:mb-8 shadow-[0_0_40px_rgba(255,122,0,0.05)]">
            <span className="material-symbols-outlined text-[36px] sm:text-[48px] text-[#444]">shopping_cart</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-3 sm:mb-4 tracking-tight">Your cart is empty</h1>
          <p className="text-[#888] text-sm mb-8 sm:mb-10 max-w-md">Looks like you haven&apos;t added anything yet. Explore our top courses and start learning!</p>
          <Button 
            href="/courses" 
            variant="primary"
            size="lg"
            className="rounded-xl shadow-[0_0_20px_rgba(255,122,0,0.2)] hover:shadow-[0_0_30px_rgba(255,122,0,0.4)] transition-all"
          >
            Browse Courses
          </Button>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-8 pb-28 md:pb-12 overflow-hidden relative">
      {/* Ambient background glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FF7A00]/10 blur-[150px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF9A44]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Header */}
        <FadeIn direction="down">
          <div className="mb-6 md:mb-12 border-b border-white/5 pb-4">
            <h1 className="text-2xl md:text-4xl font-black mb-1 sm:mb-2 tracking-tight">Shopping Cart</h1>
            <p className="text-[#888] text-sm font-medium tracking-wide">{items.length} Courses in Cart</p>
          </div>
        </FadeIn>

        <div className="flex flex-col xl:flex-row gap-6 md:gap-10">
          
          {/* ── Item List ── */}
          <div className="flex-1 space-y-4 min-w-0">
            {items.map((item, idx) => (
              <FadeIn key={item.id} direction="up" delay={idx * 50}>
                <div className="bg-[#111]/80 backdrop-blur-xl rounded-2xl border border-white/5 p-4 md:p-6 group hover:border-white/10 transition-all duration-300 hover:bg-[#161616]/80 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A00]/0 to-[#FF7A00]/0 group-hover:from-[#FF7A00]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                  
                  <div className="flex gap-4 md:gap-6">
                    {/* Thumbnail */}
                    <div className="relative w-24 h-16 sm:w-32 sm:h-20 md:w-48 md:h-28 rounded-lg overflow-hidden shrink-0 border border-white/10 group-hover:border-white/20 transition-colors">
                      <Image 
                        src={item.course.thumbnail || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80"} 
                        alt={item.course.title} 
                        fill 
                        sizes="(max-width: 768px) 150px, 300px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h3 className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-[#FF7A00] transition-colors line-clamp-2 leading-snug">{item.course.title}</h3>
                        </div>
                        <p className="text-[10px] sm:text-xs text-[#888] mb-2">By <span className="text-white/80">Seekho Business</span></p>
                        
                        <div className="hidden sm:flex items-center gap-3 text-xs font-medium">
                          <div className="flex items-center gap-1 text-[#FF7A00]">
                            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            4.9
                            <span className="text-[#666] font-normal">(1.2k)</span>
                          </div>
                          <span className="bg-white/5 text-[#AAA] px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">{item.course.category}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-base md:text-xl font-black text-white">₹{item.course.price}</span>
                        <span className="text-xs text-[#555] line-through">₹{item.course.price * 20}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/5">
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-[#666] hover:text-red-500 transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                      Remove
                    </button>
                    <button
                      className="text-[#666] hover:text-[#FF7A00] transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide"
                    >
                      <span className="material-symbols-outlined text-[16px]">favorite</span>
                      <span className="hidden sm:inline">Save for later</span>
                      <span className="sm:hidden">Save</span>
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* ── Order Summary ── */}
          <FadeIn direction="up" delay={150} className="w-full xl:w-[380px] shrink-0">
            <div className="bg-[#111]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8 sticky top-24 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A00]/10 blur-[40px] pointer-events-none rounded-full" />
              <h2 className="text-xl font-black mb-6 tracking-tight relative z-10 border-b border-white/5 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[#888] text-sm">
                  <span>Original Price</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#3CE36A] text-sm font-medium">
                  <span>Discount</span>
                  <span>- ₹{totalDiscount.toLocaleString()}</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                  <span className="text-sm font-bold text-gray-300">Total:</span>
                  <span className="text-3xl font-black text-white leading-none">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <Button 
                href="/checkout"
                variant="primary"
                size="lg"
                fullWidth
                className="mb-6 shadow-[0_0_20px_rgba(255,122,0,0.2)] hover:shadow-[0_0_30px_rgba(255,122,0,0.4)] transition-shadow text-[15px] font-bold py-4 rounded-xl"
                rightIcon={<span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>}
              >
                Checkout Now
              </Button>

              <div className="space-y-4">
                <p className="text-[11px] text-[#555] text-center leading-relaxed">
                  By completing your purchase, you agree to these <Link href="/terms" className="underline hover:text-[#888]">Terms of Service</Link>.
                </p>
                
                <div className="flex items-center justify-center gap-3 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-center gap-1 text-[#444] text-[10px] font-bold">
                    <span className="material-symbols-outlined text-[16px]">lock</span> SECURE CHECKOUT
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>

        {/* ── You Might Also Like ── */}
        <FadeIn direction="up" delay={200}>
          <div className="mt-20 md:mt-24 relative z-10 border-t border-white/5 pt-12">
            <h2 className="text-xl md:text-2xl font-black mb-8 tracking-tight">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
               {[1,2,3,4].map((i, idx) => (
                 <FadeIn key={i} direction="up" delay={idx * 50}>
                   <div className="bg-[#111]/80 backdrop-blur-md border border-white/5 rounded-xl p-3 flex gap-4 hover:border-[#FF7A00]/30 hover:bg-[#161616] transition-all cursor-pointer group">
                     <div className="w-20 h-16 rounded-lg bg-[#1A1A1A] shrink-0 overflow-hidden relative">
                        <Image 
                          src={`https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&auto=format&fit=crop&q=80`} 
                          alt="Rec" 
                          fill 
                          sizes="(max-width: 768px) 100px, 100px"
                          className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
                        />
                     </div>
                     <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h4 className="text-sm font-bold text-white truncate group-hover:text-[#FF7A00] transition-colors">Business Growth 101</h4>
                        <p className="text-[10px] text-[#666] mb-1 uppercase tracking-wider font-semibold mt-0.5">Jane Smith</p>
                        <span className="text-white font-black text-sm">₹499</span>
                     </div>
                   </div>
                 </FadeIn>
               ))}
            </div>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
