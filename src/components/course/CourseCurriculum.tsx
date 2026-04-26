"use client";

import { useState } from "react";
import Link from "next/link";

interface Video {
  id: string;
  title: string;
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

interface Props {
  modules: Module[];
  hasPurchased: boolean;
  totalVideos: number;
}

function fmt(secs: number | null) {
  if (!secs) return null;
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function totalDuration(videos: Video[]) {
  const total = videos.reduce((a, v) => a + (v.duration || 0), 0);
  if (!total) return null;
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m} min`;
}

export default function CourseCurriculum({ modules, hasPurchased, totalVideos }: Props) {
  // Open first module by default
  const [openModules, setOpenModules] = useState<Set<string>>(
    new Set(modules.length > 0 ? [modules[0].id] : [])
  );

  const toggleModule = (id: string) => {
    setOpenModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => setOpenModules(new Set(modules.map((m) => m.id)));
  const collapseAll = () => setOpenModules(new Set());

  const totalDur = totalDuration(modules.flatMap((m) => m.videos));
  const freeCount = modules.flatMap((m) => m.videos).filter((v) => v.isFreePreview).length;

  return (
    <div className="bg-[#1A1A1A] rounded-2xl md:rounded-3xl border border-white/5 flex flex-col overflow-hidden xl:sticky xl:top-6">

      {/* Header */}
      <div className="p-5 md:p-7 border-b border-white/5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white tracking-tight mb-1">
              Course Curriculum
            </h2>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#888]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">play_circle</span>
                {totalVideos} videos
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">view_module</span>
                {modules.length} modules
              </span>
              {totalDur && (
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">schedule</span>
                  {totalDur}
                </span>
              )}
              {freeCount > 0 && !hasPurchased && (
                <span className="flex items-center gap-1 text-[#3CE36A]">
                  <span className="material-symbols-outlined text-[13px]">lock_open</span>
                  {freeCount} free preview
                </span>
              )}
            </div>
          </div>
          {/* Expand/Collapse */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={expandAll}
              className="text-[10px] text-[#888] hover:text-white transition-colors px-2 py-1 rounded border border-white/8 hover:border-white/20"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="text-[10px] text-[#888] hover:text-white transition-colors px-2 py-1 rounded border border-white/8 hover:border-white/20"
            >
              Collapse
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable module list */}
      <div className="overflow-y-auto xl:max-h-[560px] divide-y divide-white/5"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#333 transparent" }}>

        {modules.map((mod, modIdx) => {
          const isOpen = openModules.has(mod.id);
          const modDur = totalDuration(mod.videos);
          const modFreeCount = mod.videos.filter((v) => v.isFreePreview).length;
          const videoOffset = modules.slice(0, modIdx).reduce((a, m) => a + m.videos.length, 0);

          return (
            <div key={mod.id}>
              {/* Module Header — clickable accordion toggle */}
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 hover:bg-white/[0.03] transition-colors text-left group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Module number */}
                  <div className="w-7 h-7 rounded-lg bg-[#FF7A00]/10 flex items-center justify-center shrink-0">
                    <span className="text-[#FF7A00] text-[11px] font-bold">{modIdx + 1}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-[13px] font-semibold leading-tight truncate group-hover:text-[#FF7A00] transition-colors">
                      {mod.title}
                    </p>
                    <p className="text-[#666] text-[10px] mt-0.5">
                      {mod.videos.length} videos{modDur ? ` • ${modDur}` : ""}
                      {modFreeCount > 0 && !hasPurchased ? ` • ${modFreeCount} free` : ""}
                    </p>
                  </div>
                </div>
                <span
                  className="material-symbols-outlined text-[#555] text-[18px] shrink-0 transition-transform duration-200"
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  expand_more
                </span>
              </button>

              {/* Video list */}
              {isOpen && (
                <div className="bg-[#161616] border-t border-white/5">
                  {mod.videos.map((video, vIdx) => {
                    const isFree = video.isFreePreview || hasPurchased;
                    const globalIdx = videoOffset + vIdx + 1;
                    const duration = fmt(video.duration);

                    const Inner = (
                      <div className="flex items-center gap-3 px-5 py-3 group/row hover:bg-white/[0.03] transition-colors min-w-0">
                        {/* Play/Lock icon */}
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isFree
                            ? "bg-[#FF7A00]/10 group-hover/row:bg-[#FF7A00]/20"
                            : "bg-white/[0.03]"
                        }`}>
                          <span className={`material-symbols-outlined text-[14px] ${isFree ? "text-[#FF7A00]" : "text-[#555]"}`}
                            style={isFree ? { fontVariationSettings: "'FILL' 1" } : {}}>
                            {isFree ? "play_arrow" : "lock"}
                          </span>
                        </div>

                        {/* Title + meta */}
                        <div className="flex-1 min-w-0">
                          <p className={`text-[12px] font-medium leading-tight truncate ${
                            isFree ? "text-[#CCC] group-hover/row:text-white" : "text-[#555]"
                          } transition-colors`}>
                            <span className="text-[#666] mr-1.5">{globalIdx}.</span>
                            {video.title}
                          </p>
                          {duration && (
                            <p className="text-[10px] text-[#555] mt-0.5 flex items-center gap-1">
                              <span className="material-symbols-outlined text-[11px]">schedule</span>
                              {duration}
                            </p>
                          )}
                        </div>

                        {/* Badges */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {video.isFreePreview && !hasPurchased && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#3CE36A]/10 text-[#3CE36A] tracking-widest uppercase">
                              FREE
                            </span>
                          )}
                          {hasPurchased && (
                            <span className="material-symbols-outlined text-[#3CE36A] text-[14px]"
                              style={{ fontVariationSettings: "'FILL' 1" }}>
                              check_circle
                            </span>
                          )}
                        </div>
                      </div>
                    );

                    return isFree ? (
                      <Link key={video.id} href={`/watch/${video.id}`} className="block border-t border-white/[0.04] first:border-t-0">
                        {Inner}
                      </Link>
                    ) : (
                      <div key={video.id} className="block border-t border-white/[0.04] first:border-t-0 cursor-default">
                        {Inner}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* No content fallback */}
      {modules.length === 0 && (
        <div className="py-12 text-center text-[#555] text-sm">
          <span className="material-symbols-outlined text-[36px] block mb-2 text-[#333]">video_library</span>
          Curriculum coming soon
        </div>
      )}
    </div>
  );
}
