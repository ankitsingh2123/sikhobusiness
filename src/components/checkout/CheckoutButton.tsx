"use client";

import { useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";

export function CheckoutButton({ courseId, price, userId }: { courseId: string; price: number; userId?: string }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!userId) {
      alert("Please login first to purchase courses.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full h-full bg-[#FF7A00] text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg shadow-lg hover:shadow-xl hover:bg-[#E56D00] transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
    >
      {loading ? "Processing..." : `Buy Now for ₹${price}`}
    </button>
  );
}
