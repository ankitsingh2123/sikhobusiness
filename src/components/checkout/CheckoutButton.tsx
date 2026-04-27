"use client";

import { useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/Button";

export function CheckoutButton({ courseId, price, userId }: { courseId: string; price: number; userId?: string }) {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handlePayment = async () => {
    if (!userId) {
      alert("Please login first to purchase courses.");
      return;
    }

    try {
      setLoading(true);
      const token = (await supabase.auth.getSession()).data.session?.access_token;
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ courseId }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Payment failed");
      }

      if (data.paymentSessionId) {
        // Load Cashfree SDK
        const cashfree = await load({ mode: "sandbox" }); // Change to production later
        cashfree.checkout({
          paymentSessionId: data.paymentSessionId,
          redirectTarget: "_self",
        });
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      isLoading={loading}
      variant="primary"
      size="lg"
      className="w-full !py-3 md:!py-4"
    >
      Buy Now for ₹{price}
    </Button>
  );
}
