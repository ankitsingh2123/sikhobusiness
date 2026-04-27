"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/Button";

export function AddToCartButton({ courseId }: { courseId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const token = (await supabase.auth.getSession()).data.session?.access_token;
      
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
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
    <Button
      onClick={handleAddToCart}
      isLoading={isLoading}
      variant="secondary"
      size="lg"
      className="whitespace-nowrap flex-shrink-0 w-full sm:w-auto h-full !py-3 md:!py-4"
      leftIcon={<span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>}
    >
      Add to Cart
    </Button>
  );
}
