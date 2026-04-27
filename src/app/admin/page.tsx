"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Stats {
  totalUsers: number; totalCreators: number;
  pendingCreators: number; pendingVideos: number;
  totalPurchases: number; totalRevenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) { router.push("/login"); return; }
        const headers = { Authorization: `Bearer ${session.access_token}` };
        const meData = await fetch("/api/user/me", { headers }).then(r => r.json());
        if (meData.user?.role !== "ADMIN") { setAccessDenied(true); setLoading(false); return; }
        const data = await fetch("/api/admin/stats", { headers }).then(r => r.json());
        setStats(data);
      } catch { setAccessDenied(true); }
      finally { setLoading(false); }
    })();
  }, [router]);

  if (loading) return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center"><div className="w-10 h-10 border-4 border-[#FF7A00] border-t-transparent rounded-full animate-spin" /></div>;
  if (accessDenied) return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white">
      <div className="text-center">
        <span className="material-symbols-outlined text-[64px] text-red-500 mb-4 block">gpp_bad</span>
        <h1 className="text-2xl font-black mb-2">Access Denied</h1>
        <p className="text-gray-500 mb-6">You don&apos;t have admin privileges.</p>
        <button onClick={() => router.push("/")} className="px-6 py-3 bg-white/10 rounded-xl text-sm font-bold hover:bg-white/20 transition-all">Go Home</button>
      </div>
    </div>
  );

  const statCards = [
    { label: "Total Revenue", value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`, icon: "payments", color: "text-green-400", bg: "bg-green-400/5 border-green-400/10" },
    { label: "Total Creators", value: stats?.totalCreators || 0, icon: "groups", color: "text-blue-400", bg: "bg-blue-400/5 border-blue-400/10", href: "/admin/creators?filter=verified" },
    { label: "Pending Approval", value: stats?.pendingCreators || 0, icon: "verified_user", color: "text-yellow-400", bg: "bg-yellow-400/5 border-yellow-400/10", href: "/admin/creators?filter=pending" },
    { label: "Pending Videos", value: stats?.pendingVideos || 0, icon: "play_circle", color: "text-[#FF7A00]", bg: "bg-[#FF7A00]/5 border-[#FF7A00]/10", href: "/admin/videos" },
    { label: "Total Purchases", value: stats?.totalPurchases || 0, icon: "shopping_bag", color: "text-purple-400", bg: "bg-purple-400/5 border-purple-400/10" },
    { label: "Total Users", value: stats?.totalUsers || 0, icon: "person", color: "text-gray-300", bg: "bg-white/5 border-white/5", href: "/admin/creators" },
  ];

  const quickLinks = [
    { label: "All Creators", desc: "View and manage all creators", icon: "groups", href: "/admin/creators", color: "from-blue-600 to-blue-900" },
    { label: "Pending Videos", desc: `${stats?.pendingVideos} videos waiting for approval`, icon: "pending_actions", href: "/admin/videos", color: "from-[#FF7A00] to-orange-900" },
    { label: "Pending Creators", desc: `${stats?.pendingCreators} creators awaiting verification`, icon: "how_to_reg", href: "/admin/creators?filter=pending", color: "from-yellow-600 to-yellow-900" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      {/* Top Nav */}
      <div className="border-b border-white/5 bg-[#0D0D0D] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#FF7A00]">admin_panel_settings</span>
            <h1 className="text-lg font-black">Seekho Admin</h1>
          </div>
          <Link href="/" className="text-xs text-gray-500 hover:text-white flex items-center gap-1 transition-colors">
            <span className="material-symbols-outlined text-[14px]">open_in_new</span> View Site
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h2 className="text-3xl font-black mb-1">Dashboard</h2>
          <p className="text-gray-500 text-sm">Platform overview and moderation centre</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {statCards.map((s, i) => (
            s.href ? (
              <Link key={i} href={s.href} className={`border ${s.bg} p-4 rounded-2xl hover:scale-105 transition-transform cursor-pointer`}>
                <span className={`material-symbols-outlined ${s.color} text-[22px] mb-2 block`}>{s.icon}</span>
                <div className="text-2xl font-black">{s.value}</div>
                <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mt-1">{s.label}</div>
              </Link>
            ) : (
              <div key={i} className={`border ${s.bg} p-4 rounded-2xl`}>
                <span className={`material-symbols-outlined ${s.color} text-[22px] mb-2 block`}>{s.icon}</span>
                <div className="text-2xl font-black">{s.value}</div>
                <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            )
          ))}
        </div>

        {/* Quick Links */}
        <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {quickLinks.map((q, i) => (
            <Link key={i} href={q.href} className={`relative overflow-hidden bg-gradient-to-br ${q.color} border border-white/5 rounded-3xl p-6 hover:scale-[1.02] transition-transform group`}>
              <span className="material-symbols-outlined text-[36px] text-white/30 mb-4 block">{q.icon}</span>
              <div className="text-xl font-black mb-1">{q.label}</div>
              <div className="text-sm text-white/60">{q.desc}</div>
              <span className="material-symbols-outlined absolute bottom-5 right-5 text-white/20 group-hover:text-white/40 transition-colors text-[32px]">arrow_forward</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
