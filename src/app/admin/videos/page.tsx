"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminNav } from "../_components/AdminNav";

interface PendingVideo {
  id: string; title: string; videoUrl: string; createdAt: string;
  module: { title: string; course: { id: string; title: string; creator: { name: string; email: string } | null } };
}

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<PendingVideo[]>([]);
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
      const data = await fetch("/api/admin/pending-videos", { headers: { Authorization: `Bearer ${session.access_token}` } }).then(r => r.json());
      setVideos(data.videos || []);
      setLoading(false);
    })();
  }, [router]);

  async function approveVideo(id: string) {
    await fetch(`/api/admin/verify-video/${id}`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    setVideos(prev => prev.filter(v => v.id !== id));
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <AdminNav />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-black">Pending Videos</h2>
          <p className="text-gray-500 text-sm">{videos.length} videos awaiting approval</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#FF7A00] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : videos.length === 0 ? (
          <div className="bg-[#111] border border-white/5 rounded-3xl p-16 text-center">
            <span className="material-symbols-outlined text-[48px] text-green-400 mb-4 block">check_circle</span>
            <h3 className="text-lg font-black mb-2">All caught up!</h3>
            <p className="text-gray-500 text-sm">No pending videos to review.</p>
          </div>
        ) : (
          <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5">
                    <th className="px-5 py-3.5 text-[11px] font-black text-gray-500 uppercase tracking-wider">Video</th>
                    <th className="px-5 py-3.5 text-[11px] font-black text-gray-500 uppercase tracking-wider">Course / Creator</th>
                    <th className="px-5 py-3.5 text-[11px] font-black text-gray-500 uppercase tracking-wider">Submitted</th>
                    <th className="px-5 py-3.5 text-[11px] font-black text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {videos.map(v => (
                    <tr key={v.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-bold text-white text-sm">{v.title}</div>
                        <div className="text-[12px] text-gray-500">Module: {v.module.title}</div>
                      </td>
                      <td className="px-5 py-4">
                        <Link href={`/admin/courses/${v.module.course.id}`} className="text-sm text-[#FF7A00] hover:underline font-bold">{v.module.course.title}</Link>
                        <div className="text-[12px] text-gray-500">By: {v.module.course.creator?.name || v.module.course.creator?.email || "Unknown"}</div>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-500">{new Date(v.createdAt).toLocaleDateString("en-IN")}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 justify-end">
                          <a href={v.videoUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Watch">
                            <span className="material-symbols-outlined text-[16px]">play_circle</span>
                          </a>
                          <Link href={`/admin/courses/${v.module.course.id}`} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Course detail">
                            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                          </Link>
                          <button onClick={() => approveVideo(v.id)} className="px-3 py-1.5 bg-[#3CE36A] text-[#0A2E12] text-xs font-black rounded-lg hover:bg-[#32c95d] transition-all">Approve</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
