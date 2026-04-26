"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

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

  const [data, setData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCurriculum, setShowCurriculum] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/video/${videoId}`);
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
      className="flex flex-col lg:flex-row min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "#111111" }}
    >
      {/* Left: Video + Info */}
      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
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
          className="w-full bg-black aspect-video shrink-0 relative"
          onContextMenu={(e) => e.preventDefault()} // Blocks right click
        >
          <iframe
            src={(() => {
              let url = video.videoUrl;
              if (!url) return "";
              
              try {
                const u = new URL(url);
                // Handle YouTube
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
                
                // Handle Bunny.net Stream (prevents download)
                if (url.includes("mediadelivery.net") || url.includes("bunny.net")) {
                  // Append security and playback params if not present
                  if (!url.includes("?")) {
                    url += "?autoplay=false&preload=true";
                  }
                  return url;
                }
                
                return url;
              } catch {
                return url;
              }
            })()}
            className="w-full h-full border-none"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
          {/* Transparent overlay on edges to prevent easy inspector element selecting (optional extra security) */}
          <div className="absolute top-0 left-0 w-full h-12 bg-transparent z-10"></div>
        </div>

        {/* Details Section */}
        <div className="p-4 sm:p-6 md:p-10 max-w-[1000px] min-w-0">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4 tracking-tight leading-tight">
            {video.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6 md:mb-8 text-[11px] sm:text-[13px] font-medium text-gray-400">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] sm:text-[16px]">menu_book</span>
              {mod.title}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] sm:text-[16px]">schedule</span>
              {fmt(video.duration)}
            </div>
            {/* Mobile toggle */}
            <button
              className="lg:hidden ml-auto flex items-center gap-1 text-[#FF7A00] font-bold uppercase tracking-wider"
              onClick={() => setShowCurriculum(!showCurriculum)}
            >
              <span className="material-symbols-outlined text-[16px]">{showCurriculum ? "close" : "list"}</span>
              {showCurriculum ? "Close" : "Curriculum"}
            </button>
          </div>

          {/* Progress Card */}
          <div className="bg-[#1F1F1F] rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-6 md:mb-8 border border-white/5">
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <span className="text-[11px] sm:text-[13px] font-medium text-gray-300">Course Progress</span>
              <span className="text-[11px] sm:text-[13px] font-bold text-[#FF7A00]">
                {course.title}
              </span>
            </div>
            <div className="h-1.5 sm:h-2 w-full bg-black/40 rounded-full overflow-hidden">
              <div className="h-full bg-[#3CE36A] rounded-full" style={{ width: "30%" }} />
            </div>
          </div>

          {/* Description */}
          <p className="text-[13px] sm:text-[15px] leading-relaxed text-[#B3B3B3]">
            {course.description}
          </p>
        </div>
      </div>

      {/* Right: Curriculum Sidebar */}
      <div
        className={`w-full lg:w-[350px] xl:w-[420px] bg-[#1E1E1E] flex flex-col shrink-0 lg:border-l border-white/5 lg:h-screen lg:sticky lg:top-0 overflow-hidden transition-all duration-300 ${
          showCurriculum ? "block" : "hidden lg:flex"
        }`}
      >
        <div className="p-4 sm:p-6 border-b border-white/5 flex items-center justify-between shrink-0">
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">Curriculum</h3>
          <span className="px-2.5 py-1 sm:px-3 bg-white/5 rounded-md text-[9px] sm:text-[11px] font-bold text-gray-400 tracking-wider">
            {totalVideos} Videos
          </span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {allModules.map((m) => (
            <div key={m.id} className="mb-2">
              {/* Section header */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 bg-[#161616] border-y border-white/5">
                <h4 className="text-[10px] sm:text-[11px] font-bold tracking-[0.15em] text-gray-400 uppercase">
                  {m.title}
                </h4>
              </div>

              <div className="flex flex-col">
                {m.videos.map((v, idx) => {
                  const isPlaying = v.id === video.id;
                  const isLocked = !hasAccess && !v.isFreePreview;

                  return isLocked ? (
                    <div
                      key={v.id}
                      className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 border-b border-white/5 opacity-60 min-w-0"
                    >
                      <span className="material-symbols-outlined text-gray-400 text-[18px] sm:text-[20px] shrink-0">
                        lock
                      </span>
                      <div className="min-w-0">
                        <p className="text-[13px] sm:text-[14px] text-gray-300 font-medium leading-tight mb-1 sm:mb-1.5 truncate">
                          {idx + 1}. {v.title}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium">{fmt(v.duration)}</p>
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={v.id}
                      href={`/watch/${v.id}`}
                      className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 border-b border-white/5 text-left w-full min-w-0 transition-colors ${
                        isPlaying ? "bg-[#3D2610]/40" : "hover:bg-white/[0.02]"
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-[18px] sm:text-[20px] shrink-0 ${
                          isPlaying ? "text-[#FF7A00]" : "text-[#3CE36A]"
                        }`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {isPlaying ? "play_circle" : "check_circle"}
                      </span>
                      <div className="min-w-0">
                        <p
                          className={`text-[13px] sm:text-[14px] font-medium leading-tight mb-1 sm:mb-1.5 truncate ${
                            isPlaying ? "text-[#FF7A00] font-bold" : "text-gray-300"
                          }`}
                        >
                          {idx + 1}. {v.title}
                        </p>
                        <p
                          className={`text-[10px] sm:text-[11px] font-medium ${
                            isPlaying ? "text-[#FF7A00]/80" : "text-gray-500"
                          }`}
                        >
                          {isPlaying ? `• Playing • ${fmt(v.duration)}` : fmt(v.duration)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
