"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const CATEGORIES = ["Finance", "Business", "Technology", "Health", "Education", "Marketing", "Design", "Personal Development", "NCERT", "Other"];

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string | null;
  isPublished: boolean;
  createdAt: string;
  totalVideos: number;
  _count: { modules: number };
}

export default function CreatorDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", category: "Finance", price: "0" });
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Auth token needed for API calls
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setToken(data.session.access_token);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setToken(session.access_token);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProjects = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("/api/creator/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 403) { router.push("/become-creator"); return; }
      const data = await res.json();
      setProjects(data.projects || []);
    } catch {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, [token, router]);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  async function createProject() {
    if (!form.title || !form.category) return;
    setCreating(true);
    try {
      const res = await fetch("/api/creator/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setShowCreate(false);
      setForm({ title: "", description: "", category: "Finance", price: "0" });
      router.push(`/creator/projects/${data.project.id}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to create project");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-500 hover:text-white transition-colors shrink-0">
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </Link>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold text-white truncate">Creator Studio</h1>
              <p className="text-[10px] sm:text-[11px] text-gray-500 truncate">Manage your courses & content</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <Link
              href="/creator-onboarding"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white text-[12px] sm:text-[13px] font-bold px-3 sm:px-4 py-2.5 rounded-xl border border-white/10 transition-colors whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
              Edit Profile
            </Link>
            <button
              onClick={() => setShowCreate(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#FF7A00] hover:bg-[#e06d00] text-white text-[12px] sm:text-[13px] font-bold px-3 sm:px-4 py-2.5 rounded-xl transition-colors shadow-[0_4px_15px_rgba(255,122,0,0.2)] whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Project
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Projects", value: projects.length, icon: "folder" },
            { label: "Total Videos", value: projects.reduce((a, p) => a + p.totalVideos, 0), icon: "play_circle" },
            { label: "Published", value: projects.filter(p => p.isPublished).length, icon: "public" },
            { label: "Drafts", value: projects.filter(p => !p.isPublished).length, icon: "edit_note" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#161616] border border-white/5 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[18px] text-[#FF7A00]">{stat.icon}</span>
                <span className="text-[11px] text-gray-500 font-medium">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-[13px]">
            {error}
          </div>
        )}

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-[#161616] border border-white/5 rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-white/5" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-white/5 rounded w-3/4" />
                  <div className="h-3 bg-white/5 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-[#FF7A00]/10 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[32px] text-[#FF7A00]">video_library</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No Projects Yet</h3>
            <p className="text-[13px] text-gray-500 mb-6 max-w-xs">Create your first project to start uploading courses and earning.</p>
            <button
              onClick={() => setShowCreate(true)}
              className="bg-[#FF7A00] hover:bg-[#e06d00] text-white text-[13px] font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Create First Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Link key={project.id} href={`/creator/projects/${project.id}`}>
                <div className="bg-[#161616] border border-white/5 hover:border-[#FF7A00]/30 rounded-2xl overflow-hidden transition-all group cursor-pointer">
                  {/* Thumbnail */}
                  <div className="aspect-video bg-[#1C1C1C] relative overflow-hidden">
                    {project.thumbnail ? (
                      <Image src={project.thumbnail} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[48px] text-gray-700">play_circle</span>
                      </div>
                    )}
                    {/* Status badge */}
                    <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-bold ${project.isPublished ? "bg-[#3CE36A]/20 text-[#3CE36A]" : "bg-yellow-500/20 text-yellow-400"}`}>
                      {project.isPublished ? "LIVE" : "DRAFT"}
                    </span>
                  </div>
                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-[14px] font-bold text-white group-hover:text-[#FF7A00] transition-colors line-clamp-1">{project.title}</h3>
                      <span className="text-[12px] font-bold text-[#FF7A00] shrink-0">₹{project.price}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mb-3 line-clamp-2">{project.description || "No description"}</p>
                    <div className="flex items-center gap-3 text-[11px] text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">play_circle</span>
                        {project.totalVideos} videos
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">folder</span>
                        {project._count.modules} modules
                      </span>
                      <span className="px-1.5 py-0.5 bg-white/5 rounded text-[10px]">{project.category}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#161616] border border-white/10 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Create New Project</h2>
              <button onClick={() => setShowCreate(false)} className="text-gray-500 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5 block">Project Title *</label>
                <input
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Rich Dad Poor Dad Masterclass"
                  className="w-full bg-[#1C1C1C] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder-gray-600 focus:outline-none focus:border-[#FF7A00]/50"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="What will students learn?"
                  rows={3}
                  className="w-full bg-[#1C1C1C] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder-gray-600 focus:outline-none focus:border-[#FF7A00]/50 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5 block">Category *</label>
                  <select
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full bg-[#1C1C1C] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white focus:outline-none focus:border-[#FF7A00]/50"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5 block">Price (₹)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                    placeholder="0 = Free"
                    className="w-full bg-[#1C1C1C] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder-gray-600 focus:outline-none focus:border-[#FF7A00]/50"
                  />
                </div>
              </div>

              <button
                onClick={createProject}
                disabled={creating || !form.title}
                className="mt-2 w-full bg-[#FF7A00] hover:bg-[#e06d00] disabled:opacity-50 text-white text-[14px] font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {creating ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span className="material-symbols-outlined text-[18px]">add</span>
                )}
                {creating ? "Creating..." : "Create Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
