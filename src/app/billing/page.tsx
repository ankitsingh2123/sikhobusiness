"use client";

import React from "react";

export default function BillingPage() {
  const invoices = [
    {
      id: "#SB-2023-8901",
      date: "Oct 24, 2023",
      title: "Advanced Meta Ads Mastery",
      type: "Course Purchase",
      amount: "₹99.00",
      status: "Paid"
    },
    {
      id: "#SB-2023-8842",
      date: "Sep 12, 2023",
      title: "B2B Sales Fundamentals",
      type: "Course Purchase",
      amount: "₹99.00",
      status: "Paid"
    },
    {
      id: "#SB-2023-8715",
      date: "Aug 05, 2023",
      title: "Financial Modeling 101",
      type: "Course Purchase",
      amount: "₹99.00",
      status: "Paid"
    },
    {
      id: "#SB-2023-8603",
      date: "Jul 18, 2023",
      title: "Effective Communication for Leaders",
      type: "Course Purchase",
      amount: "₹99.00",
      status: "Paid"
    },
    {
      id: "#SB-2023-8511",
      date: "Jun 02, 2023",
      title: "Excel Pro: Macros & VBA",
      type: "Course Purchase",
      amount: "₹99.00",
      status: "Paid"
    }
  ];

  return (
    <div className="min-h-screen bg-[#111111] px-4 md:px-8 py-8 md:py-12 font-sans text-white">
      <div className="max-w-[1200px] lg:max-w-full mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-[34px] md:text-4xl font-bold tracking-tight mb-2">Invoices & Billing</h1>
            <p className="text-[#999] text-[15px]">View and download your past transaction history.</p>
          </div>
          
          <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-5 md:w-[280px] shadow-lg flex items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-[#FF7A00]/10 flex items-center justify-center shrink-0 border border-[#FF7A00]/20">
              <span className="material-symbols-outlined text-[#FFB084] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
            </div>
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-[#888] mb-1">Total Spent</p>
              <p className="text-[26px] font-bold text-white tracking-tight leading-none">₹495.00</p>
            </div>
          </div>
        </div>

        {/* Transaction History Card */}
        <div className="bg-[#1A1A1A] rounded-2xl border border-[#FF7A00]/10 overflow-hidden shadow-xl">
          
          <div className="p-6 md:px-8 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-[22px] font-bold tracking-tight">Transaction History</h2>
            <button className="flex items-center gap-2 text-[#FFB084] text-[14px] font-bold hover:text-[#FFC29D] transition-colors">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Filter
            </button>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-8 py-4 border-b border-white/5">
                <div className="col-span-2 text-[11px] font-bold tracking-[0.15em] text-[#888] uppercase">Order ID</div>
                <div className="col-span-2 text-[11px] font-bold tracking-[0.15em] text-[#888] uppercase">Date</div>
                <div className="col-span-4 text-[11px] font-bold tracking-[0.15em] text-[#888] uppercase">Item</div>
                <div className="col-span-1 text-[11px] font-bold tracking-[0.15em] text-[#888] uppercase">Amount</div>
                <div className="col-span-2 text-[11px] font-bold tracking-[0.15em] text-[#888] uppercase">Status</div>
                <div className="col-span-1 text-[11px] font-bold tracking-[0.15em] text-[#888] uppercase text-right">Action</div>
              </div>

              {/* Table Body */}
              <div className="flex flex-col">
                {invoices.map((inv, idx) => (
                  <div key={inv.id} className={`grid grid-cols-12 gap-4 items-center px-8 py-6 hover:bg-white/[0.02] transition-colors ${idx !== invoices.length - 1 ? "border-b border-white/5" : ""}`}>
                    
                    <div className="col-span-2 text-[13px] text-[#CCC] font-medium tracking-wide">
                      {inv.id}
                    </div>

                    <div className="col-span-2 text-[14px] text-white">
                      {inv.date}
                    </div>

                    <div className="col-span-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                        <span className="material-symbols-outlined text-[#888] text-[20px]">menu_book</span>
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-white mb-1 tracking-tight">{inv.title}</p>
                        <p className="text-[12px] text-[#FFB084] font-medium">{inv.type}</p>
                      </div>
                    </div>

                    <div className="col-span-1 text-[14px] font-bold text-white tracking-wide">
                      {inv.amount}
                    </div>

                    <div className="col-span-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#3CE36A]/30 bg-[#3CE36A]/10 text-[#3CE36A] text-[12px] font-bold tracking-wider uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3CE36A]"></span>
                        {inv.status}
                      </span>
                    </div>

                    <div className="col-span-1 flex justify-end">
                      <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-[#CCC] text-[12px] font-bold hover:bg-white/10 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-[16px]">download</span>
                        Invoice
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table Footer */}
          <div className="px-8 py-5 border-t border-white/5 flex items-center justify-between">
            <p className="text-[#888] text-[13px]">Showing 5 of 5 transactions</p>
            <div className="flex items-center gap-4">
              <button className="text-[#666] hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button className="text-[#666] hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>

        </div>

        {/* Payment Methods Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
          <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-6 shadow-lg hover:border-[#FF7A00]/20 transition-colors">
            <h3 className="text-[18px] font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#FFB084] text-[20px]">credit_card</span>
              Payment Method
            </h3>
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-[#222] rounded flex items-center justify-center border border-white/10">
                  <span className="text-[10px] font-bold tracking-tighter italic text-white/50">VISA</span>
                </div>
                <div>
                  <p className="text-[14px] font-bold text-white tracking-widest">•••• •••• •••• 4242</p>
                  <p className="text-[12px] text-[#666]">Expires 12/25</p>
                </div>
              </div>
              <button className="text-[12px] font-bold text-[#FFB084] hover:text-[#FFD2B8] transition-colors">Edit</button>
            </div>
          </div>

          <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-6 shadow-lg hover:border-[#FF7A00]/20 transition-colors">
            <h3 className="text-[18px] font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#FFB084] text-[20px]">mail</span>
              Billing Email
            </h3>
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FF7A00]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#FF7A00] text-[18px]">alternate_email</span>
                </div>
                <div>
                  <p className="text-[14px] font-bold text-white">arjun.mehta@techcorp.com</p>
                  <p className="text-[12px] text-[#666]">Primary billing contact</p>
                </div>
              </div>
              <button className="text-[12px] font-bold text-[#FFB084] hover:text-[#FFD2B8] transition-colors">Change</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
