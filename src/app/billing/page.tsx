"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import { createClient } from "@/utils/supabase/client";

const CertificateModal = dynamic(
  () => import("@/components/certificate/CertificateModal"),
  { ssr: false }
);

interface CertData {
  courseId: string;
  courseTitle: string;
  courseCategory: string;
  courseThumbnail: string | null;
  totalVideos: number;
  completedVideos: number;
  completionPercent: number;
  isEligible: boolean;
  purchasedAt: string;
  issuedAt: string | null;
}

export default function CertificatesPage() {
  const [certs, setCerts] = useState<CertData[]>([]);
  const [userName, setUserName] = useState("Student");
  const [loading, setLoading] = useState(true);
  const [activeCert, setActiveCert] = useState<CertData | null>(null);
  const [filter, setFilter] = useState<"ALL" | "EARNED" | "INPROGRESS">("ALL");
  const supabase = createClient();

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const token = (await supabase.auth.getSession()).data.session?.access_token;
        const res = await fetch("/api/certificates", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.certificates) setCerts(data.certificates);
        if (data.userName) setUserName(data.userName);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, []);

  const earned = certs.filter((c) => c.isEligible);
  const inProgress = certs.filter((c) => !c.isEligible);

  const filtered =
    filter === "EARNED" ? earned :
    filter === "INPROGRESS" ? inProgress :
    certs;

  return (
    <>
      {activeCert && activeCert.issuedAt && (
        <CertificateModal
          userName={userName}
          courseTitle={activeCert.courseTitle}
          courseCategory={activeCert.courseCategory}
          issuedAt={activeCert.issuedAt}
          onClose={() => setActiveCert(null)}
        />
      )}

      <div className="min-h-screen bg-[#111] px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-[#888] text-xs mb-3">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Certificates</span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl text-white font-serif tracking-wide">
                  My Certificates
                </h1>
                <p className="text-[#888] text-sm mt-2">
                  Complete all videos in a course to earn your certificate.
                </p>
              </div>
              {/* Trophy Icon */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #c8a96e22, #c8a96e11)", border: "1px solid #c8a96e33" }}>
                <span className="material-symbols-outlined text-[#c8a96e] text-[28px]">workspace_premium</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="rounded-2xl border border-white/5 p-5" style={{ background: "#1A1A1A" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#c8a96e22" }}>
                    <span className="material-symbols-outlined text-[#c8a96e] text-[18px]">workspace_premium</span>
                  </div>
                  <span className="text-[#888] text-xs uppercase tracking-wider">Certificates Earned</span>
                </div>
                <p className="text-3xl text-white font-serif">{earned.length}</p>
              </div>
              <div className="rounded-2xl border border-white/5 p-5" style={{ background: "#1A1A1A" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#8892FF22" }}>
                    <span className="material-symbols-outlined text-[#8892FF] text-[18px]">school</span>
                  </div>
                  <span className="text-[#888] text-xs uppercase tracking-wider">Courses Enrolled</span>
                </div>
                <p className="text-3xl text-white font-serif">{certs.length}</p>
              </div>
              <div className="rounded-2xl border border-white/5 p-5" style={{ background: "#1A1A1A" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#3CE36A22" }}>
                    <span className="material-symbols-outlined text-[#3CE36A] text-[18px]">play_circle</span>
                  </div>
                  <span className="text-[#888] text-xs uppercase tracking-wider">In Progress</span>
                </div>
                <p className="text-3xl text-white font-serif">{inProgress.length}</p>
              </div>
            </div>
          )}

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            {([
              { key: "ALL", label: "All Courses" },
              { key: "EARNED", label: `🏆 Earned (${earned.length})` },
              { key: "INPROGRESS", label: `📚 In Progress (${inProgress.length})` },
            ] as const).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  filter === key
                    ? "bg-[#c8a96e]/15 text-[#c8a96e] border border-[#c8a96e]/30"
                    : "text-[#888] hover:text-white border border-transparent"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-36 rounded-2xl animate-pulse" style={{ background: "#1A1A1A" }} />
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading && filtered.length === 0 && (
            <div className="py-20 text-center rounded-2xl border border-white/5" style={{ background: "#1A1A1A" }}>
              <span className="material-symbols-outlined text-[48px] text-[#333] block mb-3">workspace_premium</span>
              <p className="text-[#666] text-sm">
                {filter === "EARNED"
                  ? "No certificates earned yet. Complete a course to get your first one!"
                  : "No courses found."}
              </p>
              {filter !== "ALL" && (
                <button onClick={() => setFilter("ALL")} className="mt-4 text-xs text-[#c8a96e] hover:underline">
                  View all courses
                </button>
              )}
            </div>
          )}

          {/* Certificate / Progress Cards */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((cert) => (
                <div
                  key={cert.courseId}
                  className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
                    cert.isEligible
                      ? "border-[#c8a96e]/20 hover:border-[#c8a96e]/50"
                      : "border-white/5 hover:border-white/10"
                  }`}
                  style={{ background: "#1A1A1A" }}
                >
                  <div className="flex items-start gap-4 p-5">
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                      {cert.courseThumbnail ? (
                        <Image src={cert.courseThumbnail} alt={cert.courseTitle} fill className="object-cover" unoptimized />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#222]">
                          <span className="material-symbols-outlined text-[#444] text-[24px]">menu_book</span>
                        </div>
                      )}
                      {/* Gold overlay if earned */}
                      {cert.isEligible && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <span className="material-symbols-outlined text-[#c8a96e] text-[28px]">workspace_premium</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="text-white text-sm font-semibold line-clamp-2 leading-tight">{cert.courseTitle}</h3>
                          <p className="text-[#c8a96e] text-xs mt-1 capitalize">{cert.courseCategory}</p>
                        </div>
                        {cert.isEligible ? (
                          <span className="shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold"
                            style={{ background: "#c8a96e22", color: "#c8a96e", border: "1px solid #c8a96e44" }}>
                            🏆 Earned
                          </span>
                        ) : (
                          <span className="shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium bg-white/5 text-[#888] border border-white/8">
                            In Progress
                          </span>
                        )}
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] text-[#666]">
                            {cert.completedVideos}/{cert.totalVideos} videos completed
                          </span>
                          <span className={`text-[10px] font-semibold ${cert.isEligible ? "text-[#c8a96e]" : "text-[#888]"}`}>
                            {cert.completionPercent}%
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#2A2A2A" }}>
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${cert.completionPercent}%`,
                              background: cert.isEligible
                                ? "linear-gradient(90deg, #c8a96e, #e8d5a3)"
                                : "linear-gradient(90deg, #8892FF, #6366f1)",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className="px-5 pb-4 flex items-center justify-between gap-3">
                    <Link
                      href={`/courses/${cert.courseId}`}
                      className="text-xs text-[#888] hover:text-white transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[13px]">play_circle</span>
                      {cert.isEligible ? "Revisit Course" : "Continue Learning"}
                    </Link>

                    {cert.isEligible ? (
                      <button
                        onClick={() => setActiveCert(cert)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                        style={{ background: "#c8a96e", color: "#1a1a2e" }}
                      >
                        <span className="material-symbols-outlined text-[14px]">download</span>
                        View Certificate
                      </button>
                    ) : (
                      <div className="text-[10px] text-[#666]">
                        {cert.totalVideos - cert.completedVideos} videos left
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom note */}
          {!loading && earned.length > 0 && (
            <p className="text-[#555] text-xs text-center mt-8">
              Certificates are verified by Seekho Business. Share your achievement with pride! 🎓
            </p>
          )}

        </div>
      </div>
    </>
  );
}
