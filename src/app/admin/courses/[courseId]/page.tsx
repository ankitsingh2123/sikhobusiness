"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AdminNav } from "../../_components/AdminNav";

interface Video {
  id: string; title: string; videoUrl: string;
  duration: number | null; order: number;
  isPublished: boolean; isVerified: boolean; isFreePreview: boolean;
}
interface Module { id: string; title: string; order: number; videos: Video[]; }
interface Course {
  id: string; title: string; description: string; category: string;
  price: number; thumbnail: string | null; isPublished: boolean;
  creator: { id: string; name: string; email: string; avatar: string | null } | null;
  modules: Module[];
}

export default function AdminCoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
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
      const data = await fetch(`/api/admin/courses/${courseId}`, { headers: { Authorization: `Bearer ${session.access_token}` } }).then(r => r.json());
      setCourse(data.course);
      setLoading(false);
    })();
  }, [courseId, router]);

  async function verifyVideo(videoId: string) {
    await fetch(`/api/admin/verify-video/${videoId}`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    setCourse(c => c ? { ...c, modules: c.modules.map(m => ({ ...m, videos: m.videos.map(v => v.id === videoId ? { ...v, isVerified: true } : v) })) } : c);
  }

  async function unverifyVideo(videoId: string) {
    await fetch(`/api/admin/unverify-video/${videoId}`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    setCourse(c => c ? { ...c, modules: c.modules.map(m => ({ ...m, videos: m.videos.map(v => v.id === videoId ? { ...v, isVerified: false } : v) })) } : c);
  }

  async function togglePublish(videoId: string, current: boolean) {
    await fetch(`/api/admin/toggle-video/${videoId}`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ isPublished: !current }) });
    setCourse(c => c ? { ...c, modules: c.modules.map(m => ({ ...m, videos: m.videos.map(v => v.id === videoId ? { ...v, isPublished: !current } : v) })) } : c);
  }

  const fmt = (s: number | null) => !s ? "—" : `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  const totalVideos = course?.modules.reduce((a, m) => a + m.videos.length, 0) || 0;
  const pendingVideos = course?.modules.reduce((a, m) => a + m.videos.filter(v => !v.isVerified).length, 0) || 0;

  if (loading) return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#FF7A00] border-t-transparent rounded-full animate-spin" /></div>;
  if (!course) return null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <AdminNav />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
          <Link href="/admin/creators" className="hover:text-white transition-colors">Creators</Link>
          <span>/</span>
          {course.creator && <Link href={`/admin/creators/${course.creator.id}`} className="hover:text-white transition-colors">{course.creator.name || course.creator.email}</Link>}
          <span>/</span>
          <span className="text-white font-bold">{course.title}</span>
        </div>

        {/* Course Header */}
        <div className="bg-[#111] border border-white/5 rounded-3xl p-6 mb-8">
          <div className="flex gap-5">
            <div className="w-32 aspect-video bg-[#1C1C1C] rounded-xl overflow-hidden shrink-0 relative">
              {course.thumbnail && <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-black">{course.title}</h2>
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${course.isPublished ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>{course.isPublished ? "PUBLISHED" : "DRAFT"}</span>
              </div>
              <p className="text-gray-500 text-sm mb-3">{course.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="text-gray-400"><span className="text-gray-600">Category:</span> {course.category}</span>
                <span className="text-gray-400"><span className="text-gray-600">Price:</span> ₹{course.price}</span>
                <span className="text-gray-400"><span className="text-gray-600">Videos:</span> {totalVideos}</span>
                {pendingVideos > 0 && <span className="text-yellow-400 font-bold">{pendingVideos} pending approval</span>}
              </div>
              {course.creator && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-gray-600">By</span>
                  <Link href={`/admin/creators/${course.creator.id}`} className="text-xs text-[#FF7A00] hover:underline font-bold">{course.creator.name || course.creator.email}</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modules & Videos */}
        <h3 className="text-base font-black text-gray-400 uppercase tracking-widest mb-4">Content ({course.modules.length} modules · {totalVideos} videos)</h3>
        {course.modules.map(mod => (
          <div key={mod.id} className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden mb-4">
            {/* Module Header */}
            <div className="flex items-center gap-3 px-5 py-3.5 bg-white/[0.03] border-b border-white/5">
              <span className="material-symbols-outlined text-[18px] text-[#FF7A00]">folder_open</span>
              <span className="font-black text-white">{mod.title}</span>
              <span className="text-[11px] text-gray-500">({mod.videos.length} videos)</span>
            </div>

            {/* Videos */}
            {mod.videos.length === 0 && <div className="px-5 py-6 text-sm text-gray-600">No videos in this module.</div>}
            {mod.videos.map((v, idx) => (
              <div key={v.id} className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group">
                <span className="text-[12px] text-gray-600 w-5 text-center shrink-0">{idx + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{v.title}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-[11px] text-gray-500">{fmt(v.duration)}</span>
                    {v.isFreePreview && <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-green-500/10 text-green-400">FREE</span>}
                    {/* Publish status */}
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${v.isPublished ? "bg-blue-500/10 text-blue-400" : "bg-white/5 text-gray-500"}`}>{v.isPublished ? "PUBLISHED" : "HIDDEN"}</span>
                    {/* Verify status */}
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${v.isVerified ? "bg-[#FF7A00]/10 text-[#FF7A00]" : "bg-yellow-500/10 text-yellow-400"}`}>{v.isVerified ? "VERIFIED" : "PENDING"}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Preview */}
                  <a href={v.videoUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Watch video">
                    <span className="material-symbols-outlined text-[16px]">play_circle</span>
                  </a>
                  {/* Toggle Publish */}
                  <button onClick={() => togglePublish(v.id, v.isPublished)} className={`p-2 rounded-lg transition-colors ${v.isPublished ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20" : "bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white"}`} title={v.isPublished ? "Hide video" : "Publish video"}>
                    <span className="material-symbols-outlined text-[16px]">{v.isPublished ? "visibility" : "visibility_off"}</span>
                  </button>
                  {/* Verify / Unverify */}
                  {!v.isVerified ? (
                    <button onClick={() => verifyVideo(v.id)} className="px-3 py-1.5 bg-[#3CE36A] text-[#0A2E12] text-xs font-black rounded-lg hover:bg-[#32c95d] transition-all">Approve</button>
                  ) : (
                    <button onClick={() => unverifyVideo(v.id)} className="px-3 py-1.5 bg-red-500/20 text-red-400 text-xs font-black rounded-lg hover:bg-red-500/30 transition-all">Revoke</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
