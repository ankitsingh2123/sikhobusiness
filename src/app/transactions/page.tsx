"use client";

import React from "react";
import Image from "next/image";

export default function TransactionsPage() {
  const transactions = [
    {
      id: "txn_001",
      title: "Advanced Digital Marketing Strategy",
      category: "Marketing",
      categoryColor: "text-[#FF7A00]",
      date: "Oct 24, 2023",
      amount: "₹99",
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXnXu_yDN9pA2AcNi7xJVUZDTX2ySF6Ut9OaTA_kJt8Jfb4MdOiS4-YEJTy7z5-WYYohyKBNV1gtnKPrCQz8JWy0VgJNSudC1HrNkva3XMt_-Lt1eSDcuI87gfi9SwEvfHSkAIv7mMXkCF-Gx3jDCC1HibsP20NSeWHnBV3OQUfPvJsSuup0dlc57aZEJH51icMfXJ1CPqV5iqkLtCIOK5xWzuybM2qsQBRph-FXJ0VZ9_jVJNFETfu4UVD5Zfb1-S-byR0JOn",
    },
    {
      id: "txn_002",
      title: "Data Analytics for Business",
      category: "Data",
      categoryColor: "text-[#8892FF]",
      date: "Sep 15, 2023",
      amount: "₹199",
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPJCggFkjVFZZj5DEReHfqXFG4D5yBhoXbb8SQV-5wjJCfkDGiyb3FkQpHqurCbnb6lXeIuqvuYZe8KGfIX9GXG9ungwxUL87dxjKWtP42-xnZ8cXkofhCimqmojXN9w9ftk8oTIEKsEzaj-2AOL3Nxt51M3g7pWk16kOLZ6VlBjPJ6_oceQhqq2C6gcwKFZYmcP3eR45X8c9JVubexfhVYFIze1eXT3k211hPzFr5Fupjz5egDjzfCKkcLiVtRL3opsT-VqR7",
    },
    {
      id: "txn_003",
      title: "Financial Modeling Mastery",
      category: "Finance",
      categoryColor: "text-[#3CE36A]",
      date: "Aug 02, 2023",
      amount: "₹299",
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXnXu_yDN9pA2AcNi7xJVUZDTX2ySF6Ut9OaTA_kJt8Jfb4MdOiS4-YEJTy7z5-WYYohyKBNV1gtnKPrCQz8JWy0VgJNSudC1HrNkva3XMt_-Lt1eSDcuI87gfi9SwEvfHSkAIv7mMXkCF-Gx3jDCC1HibsP20NSeWHnBV3OQUfPvJsSuup0dlc57aZEJH51icMfXJ1CPqV5iqkLtCIOK5xWzuybM2qsQBRph-FXJ0VZ9_jVJNFETfu4UVD5Zfb1-S-byR0JOn",
    },
  ];

  return (
    <div className="min-h-screen bg-[#111111] px-4 md:px-8 py-8 md:py-12">
      <div className="max-w-[1200px] lg:max-w-full mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl text-white mb-2 font-serif tracking-wide">Transaction History</h1>
          <p className="text-[#999] text-[15px] font-sans">View and download receipts for all your past purchases.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Total Spent Card */}
          <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#3CE36A]/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#3CE36A] text-[18px]">account_balance_wallet</span>
              </div>
              <span className="text-[#999] text-[13px] font-serif tracking-wider">Total Spent</span>
            </div>
            <h2 className="text-4xl text-white font-serif tracking-wider font-medium">₹4,995</h2>
          </div>

          {/* Courses Purchased Card */}
          <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#8892FF]/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#8892FF] text-[18px]">library_books</span>
              </div>
              <span className="text-[#999] text-[13px] font-serif tracking-wider">Courses Purchased</span>
            </div>
            <h2 className="text-4xl text-white font-serif tracking-wider font-medium">12</h2>
          </div>

        </div>

        {/* Transactions Table Container */}
        <div className="bg-[#1A1A1A] rounded-2xl border border-[#FF7A00]/10 overflow-hidden font-sans">
          
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-white/5">
            <div className="col-span-6 text-[11px] text-[#888] font-serif tracking-[0.2em] uppercase">Course Details</div>
            <div className="col-span-3 text-[11px] text-[#888] font-serif tracking-[0.2em] uppercase">Purchase Date</div>
            <div className="col-span-2 text-[11px] text-[#888] font-serif tracking-[0.2em] uppercase">Amount</div>
            <div className="col-span-1 text-[11px] text-[#888] font-serif tracking-[0.2em] uppercase text-right">Action</div>
          </div>

          {/* Table Body */}
          <div className="flex flex-col">
            {transactions.map((txn, idx) => (
              <div 
                key={txn.id} 
                className={`grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-6 ${
                  idx !== transactions.length - 1 ? "border-b border-white/5" : ""
                } hover:bg-white/[0.02] transition-colors`}
              >
                
                {/* Course Details */}
                <div className="col-span-6 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden relative shrink-0 border border-white/5">
                    <Image src={txn.thumbnail} alt={txn.title} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-white text-[14px] font-medium mb-1 font-serif tracking-wide">{txn.title}</h3>
                    <p className={`text-[11px] font-medium ${txn.categoryColor}`}>{txn.category}</p>
                  </div>
                </div>

                {/* Date */}
                <div className="col-span-3">
                  <p className="text-[#CCC] text-[14px] font-serif tracking-wide">{txn.date}</p>
                </div>

                {/* Amount */}
                <div className="col-span-2">
                  <p className="text-[#CCC] text-[14px] font-serif tracking-wide">{txn.amount}</p>
                </div>

                {/* Action */}
                <div className="col-span-1 flex md:justify-end">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-[#CCC] hover:text-white hover:border-white/30 transition-all text-[12px] font-serif tracking-wide">
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    Receipt
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
