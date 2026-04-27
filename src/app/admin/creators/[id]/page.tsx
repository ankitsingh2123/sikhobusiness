"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AdminNav } from "../../_components/AdminNav";

interface Video { id: string; title: string; duration: number | null; isPublished: boolean; isVerified: boolean; order: number; }
interface Module { id: string; title: string; order: number; videos: Video[]; }
interface Course {
  id: string; title: string; description: string; category: string;
  price: number; thumbnail: string | null; isPublished: boolean;
  modules: Module[];
}
interface Creator {
  id: string; name: string; email: string; avatar: string | null;
  role: string; isVerified: boolean; legalName: string | null;
  phone: string | null; category: string | null; experience: string | null;
  upiId: string | null; bankAccount: string | null; instagram: string | null;
  youtube: string | null; createdAt: string;
  courses: Course[];
}

export default function AdminCreatorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push("/login"); return; }
      const meData = await fetch("/api/user/me", { headers: { Authorization: `Bearer ${session.access_token}` } }).then(r => r.json());
      if (meData.user?.role !== "ADMIN") { router.push("/"); return; }
      setToken(session.access_token);
      const data = await fetch(`/api/admin/creators/${id}`, { headers: { Authorization: `Bearer ${session.access_token}` } }).then(r => r.json());
      setCreator(data.user);
      setLoading(false);
    })();
  }, [id, router]);

  async function verifyCreator() {
    await fetch(`/api/admin/verify-creator/${id}`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    setCreator(c => c ? { ...c, isVerified: true, role: "CREATOR" } : c);
  }

  async function revokeCreator() {
    if (!confirm("Revoke creator access?")) return;
    await fetch(`/api/admin/revoke-creator/${id}`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    setCreator(c => c ? { ...c, isVerified: false, role: "STUDENT" } : c);
  }

  const fmt = (s: number | null) => !s ? "—" : `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  const totalVideos = creator?.courses.reduce((a, c) => a + c.modules.reduce((b, m) => b + m.videos.length, 0), 0) || 0;

  if (loading) return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#FF7A00] border-t-transparent rounded-full animate-spin" /></div>;
  if (!creator) return null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <AdminNav />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/admin/creators" className="hover:text-white transition-colors">Creators</Link>
          <span>/</span>
          <span className="text-white font-bold">{creator.name || creator.email}</span>
        </div>

        {/* Creator Header */}
        <div className="bg-[#111] border border-white/5 rounded-3xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-16 h-16 rounded-2xl bg-[#1C1C1C] overflow-hidden shrink-0 relative">
              {creator.avatar ? <Image src={creator.avatar} alt={creator.name || ""} fill className="object-cover" /> : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-black text-gray-600">{(creator.name || creator.email)[0].toUpperCase()}</div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-xl font-black">{creator.name || "—"}</h2>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black ${creator.role === "CREATOR" ? "bg-blue-500/20 text-blue-400" : "bg-white/5 text-gray-500"}`}>{creator.role}</span>
                {creator.isVerified && <span className="px-2 py-0.5 rounded text-[10px] font-black bg-green-500/20 text-green-400">VERIFIED</span>}
                {!creator.isVerified && creator.legalName && <span className="px-2 py-0.5 rounded text-[10px] font-black bg-yellow-500/20 text-yellow-400">PENDING</span>}
              </div>
              <p className="text-gray-400 text-sm mb-4">{creator.email}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
                {[
                  { label: "Courses", value: creator.courses.length },
                  { label: "Total Videos", value: totalVideos },
                  { label: "Category", value: creator.category || "—" },
                  { label: "Experience", value: creator.experience || "—" },
                ].map((s, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-3">
                    <div className="font-black text-white text-lg">{s.value}</div>
                    <div className="text-[11px] text-gray-500 uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-400">
                {creator.legalName && <div><span className="text-gray-600 text-xs uppercase">Legal Name</span><br />{creator.legalName}</div>}
                {creator.phone && <div><span className="text-gray-600 text-xs uppercase">Phone</span><br />{creator.phone}</div>}
                {creator.upiId && <div><span className="text-gray-600 text-xs uppercase">UPI ID</span><br />{creator.upiId}</div>}
                {creator.bankAccount && <div><span className="text-gray-600 text-xs uppercase">Bank Account</span><br />{creator.bankAccount}</div>}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 shrink-0">
              {!creator.isVerified && creator.legalName && (
                <button onClick={verifyCreator} className="px-4 py-2.5 bg-[#3CE36A] text-[#0A2E12] text-sm font-black rounded-xl hover:bg-[#32c95d] transition-all">✓ Verify Creator</button>
              )}
              {creator.role === "CREATOR" && (
                <button onClick={revokeCreator} className="px-4 py-2.5 bg-red-500/20 text-red-400 text-sm font-black rounded-xl hover:bg-red-500/30 transition-all">✕ Revoke Access</button>
              )}
            </div>
          </div>
        </div>

        {/* Courses */}
        <h3 className="text-lg font-black mb-4 text-gray-300">Courses ({creator.courses.length})</h3>
        {creator.courses.length === 0 && <div className="bg-[#111] border border-white/5 rounded-2xl p-12 text-center text-gray-500">No courses yet</div>}
        {creator.courses.map(course => (
          <div key={course.id} className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden mb-4">
            {/* Course Header */}
            <div className="flex items-center gap-4 p-5 border-b border-white/5">
              <div className="w-14 h-9 bg-[#1C1C1C] rounded-lg overflow-hidden shrink-0 relative">
                {course.thumbnail && <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{course.title}</span>
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${course.isPublished ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>{course.isPublished ? "LIVE" : "DRAFT"}</span>
                </div>
                <div className="text-[12px] text-gray-500">{course.category} · ₹{course.price}</div>
              </div>
              <Link href={`/admin/courses/${course.id}`} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">open_in_new</span> Manage
              </Link>
            </div>

            {/* Modules & Videos Accordion */}
            {course.modules.map(mod => (
              <div key={mod.id} className="border-b border-white/5 last:border-0">
                <div className="px-5 py-2.5 bg-white/[0.02] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-gray-600">folder</span>
                  <span className="text-[12px] font-black text-gray-400 uppercase tracking-wider">{mod.title}</span>
                  <span className="text-[11px] text-gray-600">({mod.videos.length} videos)</span>
                </div>
                {mod.videos.map((v, idx) => (
                  <div key={v.id} className="flex items-center gap-3 px-5 py-3 hover:bg-white/[0.02] transition-colors">
                    <span className="text-[11px] text-gray-600 w-4 text-center shrink-0">{idx + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{v.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-gray-500">{fmt(v.duration)}</span>
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${v.isPublished ? "bg-green-500/10 text-green-400" : "bg-white/5 text-gray-500"}`}>{v.isPublished ? "LIVE" : "DRAFT"}</span>
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${v.isVerified ? "bg-blue-500/10 text-blue-400" : "bg-yellow-500/10 text-yellow-400"}`}>{v.isVerified ? "VERIFIED" : "PENDING"}</span>
                      </div>
                    </div>
                    <Link href={`/admin/courses/${course.id}`} className="text-xs text-gray-500 hover:text-[#FF7A00] transition-colors">
                      <span className="material-symbols-outlined text-[16px]">settings</span>
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
