"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AddToCartButton({ courseId }: { courseId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });
      
      if (res.status === 401) {
        router.push("/auth/login");
        return;
      }
      
      if (res.ok || res.status === 400) {
        // status 400 likely means it's already in the cart, redirect to cart anyway
        router.push("/cart");
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white border border-white/10 font-bold px-6 sm:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl transition-all text-sm md:text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex-shrink-0 w-full sm:w-auto h-full"
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
          Add to Cart
        </>
      )}
    </button>
  );
}
