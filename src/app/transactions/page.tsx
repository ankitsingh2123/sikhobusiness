"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { createClient } from "@/utils/supabase/client";

const InvoiceModal = dynamic(() => import("@/components/invoice/InvoiceModal"), { ssr: false });

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  category: string;
  price: number;
}

interface Purchase {
  id: string;
  cashfreeOrderId: string | null;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  course: Course;
}

interface Stats {
  totalSpent: number;
  totalCourses: number;
}

export default function TransactionsPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [stats, setStats] = useState<Stats>({ totalSpent: 0, totalCourses: 0 });
  const [loading, setLoading] = useState(true);
  const [activeInvoice, setActiveInvoice] = useState<any | null>(null);
  const [invoiceLoading, setInvoiceLoading] = useState<string | null>(null);
  const [filter, setFilter] = useState<"ALL" | "SUCCESS" | "PENDING" | "FAILED">("ALL");
  const supabase = createClient();

  useEffect(() => {
    const loadPurchases = async () => {
      try {
        const token = (await supabase.auth.getSession()).data.session?.access_token;
        const res = await fetch("/api/purchases", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.purchases) {
          setPurchases(data.purchases);
          setStats(data.stats);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadPurchases();
  }, []);

  const handleDownloadInvoice = async (orderId: string) => {
    setInvoiceLoading(orderId);
    try {
      const token = (await supabase.auth.getSession()).data.session?.access_token;
      const res = await fetch(`/api/invoice/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Could not load invoice.");
        return;
      }
      const { invoice } = await res.json();
      setActiveInvoice(invoice);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setInvoiceLoading(null);
    }
  };

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  const filteredPurchases = purchases.filter(
    (p) => filter === "ALL" || p.status === filter
  );

  const statusConfig = {
    SUCCESS: { label: "Paid", color: "text-[#3CE36A]", bg: "bg-[#3CE36A]/10", dot: "bg-[#3CE36A]" },
    PENDING: { label: "Pending", color: "text-[#FFC837]", bg: "bg-[#FFC837]/10", dot: "bg-[#FFC837]" },
    FAILED: { label: "Failed", color: "text-[#FF4D4D]", bg: "bg-[#FF4D4D]/10", dot: "bg-[#FF4D4D]" },
  } as const;

  return (
    <>
      {activeInvoice && (
        <InvoiceModal invoice={activeInvoice} onClose={() => setActiveInvoice(null)} />
      )}

      <div className="min-h-screen bg-[#111111] px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-[#888] text-xs mb-3">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Transactions</span>
            </div>
            <h1 className="text-3xl md:text-4xl text-white font-serif tracking-wide">Purchase History</h1>
            <p className="text-[#999] text-sm mt-2">View and download invoices for all your purchases.</p>
          </div>

          {/* Stats Row */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-[#1A1A1A] rounded-2xl p-6 animate-pulse h-24" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#3CE36A]/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#3CE36A] text-[18px]">account_balance_wallet</span>
                  </div>
                  <span className="text-[#888] text-xs tracking-wider uppercase">Total Spent</span>
                </div>
                <p className="text-3xl text-white font-serif">{fmt(stats.totalSpent)}</p>
              </div>

              <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#8892FF]/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#8892FF] text-[18px]">library_books</span>
                  </div>
                  <span className="text-[#888] text-xs tracking-wider uppercase">Courses Bought</span>
                </div>
                <p className="text-3xl text-white font-serif">{stats.totalCourses}</p>
              </div>

              <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FF7A00]/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#FF7A00] text-[18px]">receipt_long</span>
                  </div>
                  <span className="text-[#888] text-xs tracking-wider uppercase">Total Orders</span>
                </div>
                <p className="text-3xl text-white font-serif">{purchases.length}</p>
              </div>
            </div>
          )}

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
            {(["ALL", "SUCCESS", "PENDING", "FAILED"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  filter === f
                    ? "bg-white/10 text-white border border-white/20"
                    : "text-[#888] hover:text-white border border-transparent"
                }`}
              >
                {f === "ALL" ? "All Orders" : f === "SUCCESS" ? "✓ Paid" : f === "PENDING" ? "⏳ Pending" : "✗ Failed"}
              </button>
            ))}
          </div>

          {/* Purchase Table */}
          <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 overflow-hidden">

            {/* Table Header - Desktop */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 bg-white/[0.02]">
              <div className="col-span-5 text-[10px] text-[#666] uppercase tracking-[0.2em]">Course</div>
              <div className="col-span-2 text-[10px] text-[#666] uppercase tracking-[0.2em]">Date</div>
              <div className="col-span-2 text-[10px] text-[#666] uppercase tracking-[0.2em]">Amount</div>
              <div className="col-span-2 text-[10px] text-[#666] uppercase tracking-[0.2em]">Status</div>
              <div className="col-span-1 text-[10px] text-[#666] uppercase tracking-[0.2em] text-right">Invoice</div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col gap-0">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="px-6 py-5 border-b border-white/5 animate-pulse">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-white/5" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-white/5 rounded w-1/2" />
                        <div className="h-2 bg-white/5 rounded w-1/4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredPurchases.length === 0 && (
              <div className="py-20 text-center">
                <span className="material-symbols-outlined text-[48px] text-[#333] block mb-4">receipt_long</span>
                <p className="text-[#666] text-sm">
                  {filter === "ALL" ? "No purchases yet." : `No ${filter.toLowerCase()} orders found.`}
                </p>
                {filter === "ALL" && (
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 mt-4 px-5 py-2 bg-[#FF7A00]/10 text-[#FF7A00] border border-[#FF7A00]/20 rounded-lg text-sm hover:bg-[#FF7A00]/20 transition-all"
                  >
                    Browse Courses
                  </Link>
                )}
              </div>
            )}

            {/* Rows */}
            {!loading && filteredPurchases.map((purchase, idx) => {
              const status = statusConfig[purchase.status as keyof typeof statusConfig] || statusConfig.PENDING;
              const date = new Date(purchase.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit", month: "short", year: "numeric",
              });

              return (
                <div
                  key={purchase.id}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-6 py-5 hover:bg-white/[0.02] transition-colors ${
                    idx !== filteredPurchases.length - 1 ? "border-b border-white/5" : ""
                  }`}
                >
                  {/* Course */}
                  <div className="col-span-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0 bg-[#2A2A2A] border border-white/5">
                      {purchase.course.thumbnail ? (
                        <Image
                          src={purchase.course.thumbnail}
                          alt={purchase.course.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-[#444] text-[20px]">menu_book</span>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`/courses/${purchase.course.id}`}
                        className="text-white text-sm font-medium hover:text-[#FF7A00] transition-colors line-clamp-1"
                      >
                        {purchase.course.title}
                      </Link>
                      <p className="text-[#FF7A00] text-xs mt-0.5 capitalize">{purchase.course.category}</p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="col-span-2">
                    <p className="text-[#999] text-sm">{date}</p>
                  </div>

                  {/* Amount */}
                  <div className="col-span-2">
                    <p className="text-white text-sm font-medium">{fmt(purchase.amount)}</p>
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${status.bg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                      <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
                    </div>
                  </div>

                  {/* Invoice Button */}
                  <div className="col-span-1 flex md:justify-end">
                    {purchase.status === "SUCCESS" && purchase.cashfreeOrderId ? (
                      <button
                        onClick={() => handleDownloadInvoice(purchase.cashfreeOrderId!)}
                        disabled={invoiceLoading === purchase.cashfreeOrderId}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-[#ccc] hover:text-white hover:border-white/30 transition-all text-xs disabled:opacity-50"
                        title="Download Invoice"
                      >
                        {invoiceLoading === purchase.cashfreeOrderId ? (
                          <span className="material-symbols-outlined text-[15px] animate-spin">progress_activity</span>
                        ) : (
                          <span className="material-symbols-outlined text-[15px]">download</span>
                        )}
                        <span className="hidden sm:inline">Invoice</span>
                      </button>
                    ) : (
                      <span className="text-[#444] text-xs italic">—</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Help Note */}
          <p className="text-[#555] text-xs text-center mt-6">
            For payment disputes or invoice corrections, contact{" "}
            <a href="mailto:support@seekhobusiness.co.in" className="text-[#888] hover:text-white transition-colors underline">
              support@seekhobusiness.co.in
            </a>
          </p>

        </div>
      </div>
    </>
  );
}
