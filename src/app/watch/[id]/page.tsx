"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/Button";
import { apiUrl } from "@/lib/api";

type TabId = "overview" | "notes" | "resources";

interface Video {
  id: string;
  title: string;
  videoUrl: string;
  duration: number | null;
  order: number;
  isFreePreview: boolean;
}

interface Module {
  id: string;
  title: string;
  order: number;
  videos: Video[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  modules: Module[];
}

interface VideoData {
  video: Video;
  module: Module;
  course: Course;
  hasAccess: boolean;
}

export default function WatchPage() {
  const params = useParams();
  const router = useRouter();
  const videoId = params.id as string;
  const supabase = createClient();

  const [data, setData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCurriculum, setShowCurriculum] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [notes, setNotes] = useState("");
  const [notesSaved, setNotesSaved] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(apiUrl(`/api/video/${videoId}`), {
          headers: {
            "Authorization": `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
          }
        });
        if (res.status === 401 || res.status === 403) {
          // Not purchased — redirect to course page
          const body = await res.json();
          if (body.courseId) {
            router.push(`/courses/${body.courseId}`);
          }
          return;
        }
        if (!res.ok) {
          router.push("/");
          return;
        }
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [videoId, router]);

  // Load saved notes for this video from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`notes_${videoId}`);
    if (saved) setNotes(saved);
  }, [videoId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FF7A00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  const { video, module: mod, course, hasAccess } = data;

  // Group videos by module
  const allModules = course.modules;
  const totalVideos = allModules.reduce((a, m) => a + m.videos.length, 0);

  // Format duration mm:ss
  const fmt = (secs: number | null) => {
    if (!secs) return "—";
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="flex flex-col lg:flex-row min-h-screen overflow-x-hidden bg-[#111111]"
    >
      {/* Left: Video + Info */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Back button */}
        <div className="px-4 sm:px-6 pt-4 pb-2 shrink-0">
          <Link
            href={`/courses/${course.id}`}
            className="inline-flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to {course.title}
          </Link>
        </div>

        {/* Video Player */}
        <div
          className="w-full bg-[#050505] shrink-0 relative overflow-hidden"
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Ambient background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#FF7A00]/10 blur-[100px] pointer-events-none mix-blend-screen" />
          
          <div className="mx-auto w-full max-w-[1000px] relative z-10">
            <div className="relative w-full aspect-video lg:h-[500px] bg-black shadow-2xl shadow-black/80">
            <iframe
              src={(() => {
                let url = video.videoUrl;
                if (!url) return "";
                try {
                  const u = new URL(url);
                  if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
                    let vidId = "";
                    if (u.hostname.includes("youtu.be")) {
                      vidId = u.pathname.slice(1);
                    } else if (u.searchParams.has("v")) {
                      vidId = u.searchParams.get("v") || "";
                    } else if (u.pathname.startsWith("/embed/")) {
                      return url;
                    }
                    if (vidId) return `https://www.youtube.com/embed/${vidId}?rel=0&modestbranding=1`;
                  }
                  if (url.includes("mediadelivery.net") || url.includes("bunny.net")) {
                    return url.includes("?") ? url : url + "?autoplay=false&preload=true";
                  }
                  return url;
                } catch {
                  return url;
                }
              })()}
              className="absolute inset-0 w-full h-full border-none"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
            </div>
          </div>
        </div>

        {/* ── Details Tabs ── */}
        <div className="flex-1 min-w-0">

          {/* Video title + meta */}
          <div className="px-4 sm:px-6 md:px-10 pt-5 pb-4 border-b border-white/5">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight leading-tight">
              {video.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[11px] sm:text-[13px] font-medium text-gray-400">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] sm:text-[16px]">menu_book</span>
                {mod.title}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] sm:text-[16px]">schedule</span>
                {fmt(video.duration)}
              </div>
              <button
                className="lg:hidden ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[#FF7A00] font-bold uppercase tracking-wider text-[10px] hover:bg-white/10 transition-colors"
                onClick={() => setShowCurriculum(!showCurriculum)}
              >
                <span className="material-symbols-outlined text-[14px]">{showCurriculum ? "close" : "list"}</span>
                {showCurriculum ? "Close" : "Curriculum"}
              </button>
            </div>
          </div>

          {/* Tab Bar */}
          <div className="flex items-center gap-0 border-b border-white/5 px-4 sm:px-6 md:px-10 overflow-x-auto hide-scrollbar">
            {([ 
              { id: "overview",  label: "Overview",  icon: "info" },
              { id: "notes",     label: "My Notes",  icon: "edit_note" },
              { id: "resources", label: "Resources", icon: "download" },
            ] as { id: TabId; label: string; icon: string }[]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-[12px] sm:text-[13px] font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-[#FF7A00] text-[#FF7A00]"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="px-4 sm:px-6 md:px-10 py-6 md:py-8 max-w-[900px]">

            {/* ── OVERVIEW ── */}
            {activeTab === "overview" && (
              <div className="flex flex-col gap-6">
                {/* Progress */}
                <div className="bg-[#1F1F1F] rounded-xl p-4 sm:p-5 border border-white/5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[11px] sm:text-[13px] font-medium text-gray-300">Course Progress</span>
                    <span className="text-[11px] sm:text-[13px] font-bold text-[#FF7A00]">{course.title}</span>
                  </div>
                  <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                    <div className="h-full bg-[#3CE36A] rounded-full" style={{ width: "30%" }} />
                  </div>
                  <p className="text-[11px] text-gray-500 mt-2">30% complete</p>
                </div>

                {/* About this lesson */}
                <div>
                  <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">About This Lesson</h3>
                  <p className="text-[13px] sm:text-[15px] leading-relaxed text-[#B3B3B3]">
                    {course.description}
                  </p>
                </div>

                {/* What you'll learn */}
                {course.modules && course.modules.length > 0 && (
                  <div>
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Course Modules</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {course.modules.map((m, i) => (
                        <div key={m.id} className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl text-[13px] text-gray-300 hover:bg-white/[0.04] transition-colors">
                          <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#FF9A44]/20 to-[#FF7A00]/20 text-[#FF7A00] text-[11px] font-black flex items-center justify-center shrink-0 border border-[#FF7A00]/20 shadow-[0_0_10px_rgba(255,122,0,0.1)]">{i + 1}</span>
                          <span className="flex-1 min-w-0 truncate font-semibold">{m.title}</span>
                          <span className="text-gray-500 text-[10px] bg-black/40 px-2 py-0.5 rounded-md font-bold shrink-0">{m.videos.length} videos</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── NOTES ── */}
            {activeTab === "notes" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] text-gray-500">Notes are saved locally on your device.</p>
                  {notesSaved && (
                    <span className="flex items-center gap-1 text-[11px] text-[#3CE36A] font-medium">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Saved
                    </span>
                  )}
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => {
                    setNotes(e.target.value);
                    setNotesSaved(false);
                    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
                    saveTimerRef.current = setTimeout(() => {
                      localStorage.setItem(`notes_${videoId}`, e.target.value);
                      setNotesSaved(true);
                      setTimeout(() => setNotesSaved(false), 2000);
                    }, 800);
                  }}
                  placeholder={`Take notes for "${video.title}"...\n\nYour notes are auto-saved as you type.`}
                  className="w-full min-h-[300px] bg-[#1C1C1C] border border-white/10 rounded-xl p-4 text-[13px] sm:text-[14px] text-gray-200 placeholder-gray-600 resize-none focus:outline-none focus:border-[#FF7A00]/40 transition-colors leading-relaxed"
                />
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      localStorage.setItem(`notes_${videoId}`, notes);
                      setNotesSaved(true);
                      setTimeout(() => setNotesSaved(false), 2000);
                    }}
                    variant="primary"
                    size="md"
                    leftIcon={<span className="material-symbols-outlined text-[16px]">save</span>}
                  >
                    Save Notes
                  </Button>
                  {notes && (
                    <Button
                      onClick={() => {
                        const blob = new Blob([`# Notes: ${video.title}\n\n${notes}`], { type: "text/markdown" });
                        const a = document.createElement("a");
                        a.href = URL.createObjectURL(blob);
                        a.download = `notes-${video.title.replace(/\s+/g, "-").toLowerCase()}.md`;
                        a.click();
                      }}
                      variant="secondary"
                      size="md"
                      leftIcon={<span className="material-symbols-outlined text-[16px]">download</span>}
                    >
                      Export
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* ── RESOURCES ── */}
            {activeTab === "resources" && (
              <div className="flex flex-col gap-4">
                <p className="text-[12px] text-gray-500">Downloadable materials for this lesson.</p>
                <div className="flex flex-col gap-3">
                  {[
                    { name: "Rich Dad Poor Dad — Summary PDF", size: "2.4 MB", icon: "picture_as_pdf", color: "text-red-400" },
                    { name: "Assets vs Liabilities Worksheet", size: "1.1 MB", icon: "table_chart", color: "text-green-400" },
                    { name: "Financial Freedom Checklist", size: "0.8 MB", icon: "checklist", color: "text-blue-400" },
                  ].map((res) => (
                    <div key={res.name} className="flex items-center gap-4 bg-[#1C1C1C] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors group cursor-pointer">
                      <span className={`material-symbols-outlined text-[28px] shrink-0 ${res.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{res.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-gray-200 group-hover:text-white transition-colors truncate">{res.name}</p>
                        <p className="text-[11px] text-gray-500">{res.size}</p>
                      </div>
                      <span className="material-symbols-outlined text-gray-600 group-hover:text-[#FF7A00] transition-colors">download</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-gray-600 mt-2">* Resources are coming soon. Check back after the course is fully published.</p>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ══ Right: Curriculum Sidebar (YouTube style) ══ */}
      <div
        className={`w-full lg:w-[380px] xl:w-[420px] bg-[#161616] flex flex-col shrink-0 lg:border-l border-white/5 lg:h-screen lg:sticky lg:top-0 overflow-hidden shadow-2xl ${
          showCurriculum ? "flex" : "hidden lg:flex"
        }`}
      >
        {/* Header */}
        <div className="px-5 py-5 bg-[#1A1A1A] border-b border-white/5 shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A00]/5 rounded-full blur-[40px] pointer-events-none" />
          <h3 className="text-[15px] font-bold text-white leading-snug">{course.title}</h3>
          <p className="text-[12px] font-medium text-[#888] mt-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
            {course.modules[0]?.title} · <span className="text-gray-500">{(() => {
              // find global index of current video
              let globalIdx = 0;
              let found = 0;
              allModules.forEach((m) => m.videos.forEach((v, i) => {
                globalIdx++;
                if (v.id === video.id) found = globalIdx;
              }));
              return `${found}/${totalVideos}`;
            })()}</span>
          </p>
        </div>

        {/* Video List */}
        <div className="flex-1 overflow-y-auto">
          {allModules.map((m) => (
            <div key={m.id}>
              {/* Module header */}
              <div className="px-4 py-2.5 bg-[#141414] border-y border-white/5 sticky top-0 z-10">
                <p className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase">{m.title}</p>
              </div>

              {m.videos.map((v, idx) => {
                const isPlaying = v.id === video.id;
                const isLocked  = !hasAccess && !v.isFreePreview;

                // Global video number across all modules
                const globalNum = allModules.slice(0, allModules.indexOf(m))
                  .reduce((acc, mod) => acc + mod.videos.length, 0) + idx + 1;

                const cardContent = (
                  <div className={`flex items-start gap-2.5 px-3 py-2.5 transition-colors ${
                    isPlaying ? "bg-[#FF7A00]/10 border-l-2 border-[#FF7A00]" : isLocked ? "opacity-50" : "hover:bg-white/[0.04] border-l-2 border-transparent"
                  }`}>
                    {/* Video number */}
                    <span className={`text-[11px] font-medium shrink-0 mt-2 w-4 text-center ${isPlaying ? "text-[#FF7A00]" : "text-gray-600"}`}>
                      {isPlaying
                        ? <span className="material-symbols-outlined text-[14px] text-[#FF7A00]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                        : globalNum}
                    </span>

                    {/* Thumbnail */}
                    <div className="relative w-[120px] h-[68px] shrink-0 rounded-md overflow-hidden bg-[#2A2A2A]">
                      {course.thumbnail ? (
                        <img
                          src={course.thumbnail}
                          alt={v.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#222]">
                          <span className="material-symbols-outlined text-[28px] text-gray-600">school</span>
                        </div>
                      )}
                      {/* Duration badge */}
                      {v.duration && (
                        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-bold px-1 py-0.5 rounded">
                          {fmt(v.duration)}
                        </span>
                      )}
                      {/* Lock overlay */}
                      {isLocked && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="material-symbols-outlined text-white text-[18px]">lock</span>
                        </div>
                      )}
                      {/* Playing overlay */}
                      {isPlaying && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[#FF7A00] text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 pt-1">
                      <p className={`text-[13px] font-bold leading-snug line-clamp-2 mb-1 transition-colors ${isPlaying ? "text-[#FF7A00]" : "text-gray-200 group-hover:text-white"}`}>
                        {v.title}
                      </p>
                      <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{course.title}</p>
                      {isPlaying && (
                        <span className="inline-flex items-center gap-1 mt-1.5 px-1.5 py-0.5 rounded text-[9px] text-[#FF7A00] font-black bg-[#FF7A00]/10 border border-[#FF7A00]/20 uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] animate-pulse" />
                          Playing
                        </span>
                      )}
                    </div>
                  </div>
                );

                return isLocked ? (
                  <div key={v.id}>{cardContent}</div>
                ) : (
                  <Link key={v.id} href={`/watch/${v.id}`}>
                    {cardContent}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
