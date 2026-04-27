"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const BUNNY_LIBRARY_ID = "645588";
const BUNNY_API_KEY    = "682128ff-78af-48f1-a9e70913d121-3e4d-45b3";
const CATEGORIES = ["Finance", "Business", "Technology", "Health", "Education", "Marketing", "Design", "Personal Development", "NCERT", "Other"];

interface Video { id: string; title: string; videoUrl: string; duration: number | null; order: number; isFreePreview: boolean; isPublished: boolean; }
interface Module { id: string; title: string; order: number; videos: Video[]; }
interface Course { id: string; title: string; description: string; category: string; price: number; thumbnail: string | null; isPublished: boolean; modules: Module[]; }

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const router  = useRouter();
  const [course, setCourse]       = useState<Course | null>(null);
  const [loading, setLoading]     = useState(true);
  const [token, setToken]         = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [editPrice, setEditPrice] = useState(false);
  const [newPrice, setNewPrice]   = useState("");
  const [saving, setSaving]       = useState(false);
  const [error, setError]         = useState("");

  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    title: "", description: "", moduleTitle: "", newModuleTitle: "",
    duration: "", isFreePreview: false,
  });
  const [videoFile, setVideoFile]   = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [thumbFile, setThumbFile]   = useState<File | null>(null);
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const [uploading, setUploading]   = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStep, setUploadStep] = useState("");
  const [currentStep, setCurrentStep] = useState(1); // 1: Details, 2: Video elements, 3: Initial check, 4: Visibility
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);

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

  const fetchProject = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`/api/creator/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) { 
        router.push("/creator"); 
        return; 
      }
      const data = await res.json();
      setCourse(data.project);
      setNewPrice(data.project?.price?.toString() || "0");
    } catch (err) {
      console.error("Error fetching project:", err);
      setError("Failed to load project details.");
    } finally {
      setLoading(false);
    }
  }, [token, id, router]);

  useEffect(() => { fetchProject(); }, [fetchProject]);

  async function updatePrice() {
    if (!token) return;
    setSaving(true);
    await fetch(`/api/creator/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ price: parseFloat(newPrice) }),
    });
    setEditPrice(false);
    setSaving(false);
    fetchProject();
  }

  async function togglePublish() {
    if (!token || !course) return;
    setSaving(true);
    await fetch(`/api/creator/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ isPublished: !course.isPublished }),
    });
    setSaving(false);
    fetchProject();
  }

  async function toggleVideoPublish(videoId: string, currentStatus: boolean) {
    if (!token) return;
    await fetch(`/api/creator/videos/${videoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ isPublished: !currentStatus }),
    });
    fetchProject();
  }

  // Upload thumbnail to Supabase storage or return data URL
  async function uploadThumbnailFile(file: File): Promise<string> {
    // Convert to base64 data URL as fallback (no storage zone needed)
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
    });
  }

  // Upload video directly to Bunny from browser
  async function uploadVideoToBunny(bunnyVideoId: string, file: File) {
    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", `https://video.bunnycdn.com/library/${BUNNY_LIBRARY_ID}/videos/${bunnyVideoId}`);
      xhr.setRequestHeader("AccessKey", BUNNY_API_KEY);
      xhr.setRequestHeader("Content-Type", "video/mp4");
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) setUploadProgress(Math.round((e.loaded / e.total) * 100));
      });
      xhr.onload = () => (xhr.status === 200 ? resolve() : reject(new Error(`Upload failed: ${xhr.status}`)));
      xhr.onerror = () => reject(new Error("Network error during upload"));
      xhr.send(file);
    });
  }

  async function handleUpload() {
    if (!videoFile || !uploadForm.title || !token) return;
    setUploading(true);
    setUploadProgress(0);
    setError("");

    try {
      // Step 1: Get thumbnail URL
      setUploadStep("Processing thumbnail...");
      let thumbnailUrl = "";
      if (thumbFile) thumbnailUrl = await uploadThumbnailFile(thumbFile);

      // Step 2: Create Bunny slot + DB record via API
      setUploadStep("Creating video slot on Bunny...");
      const res = await fetch(`/api/creator/projects/${id}/videos`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          title: uploadForm.title,
          description: uploadForm.description,
          moduleTitle: uploadForm.moduleTitle === "NEW_MODULE" ? uploadForm.newModuleTitle : uploadForm.moduleTitle,
          duration: uploadForm.duration,
          isFreePreview: uploadForm.isFreePreview,
          thumbnailUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create video slot");

      // Step 3: Upload video file directly to Bunny
      setUploadStep(`Uploading video to Bunny...`);
      await uploadVideoToBunny(data.bunnyVideoId, videoFile);

      // Step 4: Done
      setUploadStep("Done!");
      setShowUpload(false);
      setCurrentStep(1);
      setUploadForm({ title: "", description: "", moduleTitle: "", newModuleTitle: "", duration: "", isFreePreview: false });
      setVideoFile(null);
      if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
      setVideoPreviewUrl(null);
      setThumbFile(null);
      if (thumbPreview) URL.revokeObjectURL(thumbPreview);
      setThumbPreview(null);
      fetchProject();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setUploadStep("");
    }
  }

  const fmt = (s: number | null) => {
    if (!s) return "—";
    return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  };

  const totalVideos = course?.modules.reduce((a, m) => a + m.videos.length, 0) || 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FF7A00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#111] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/creator" className="text-gray-500 hover:text-white transition-colors shrink-0">
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </Link>
            <div className="min-w-0">
              <h1 className="text-base font-bold text-white truncate">{course.title}</h1>
              <p className="text-[11px] text-gray-500">{course.category} · {totalVideos} videos</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 bg-[#FF7A00] hover:bg-[#e06d00] text-white text-[12px] font-bold px-4 py-2.5 rounded-xl transition-all shadow-[0_4px_15px_rgba(255,122,0,0.2)] active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">upload</span>
              Upload Video
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {/* Project Info Card */}
        <div className="bg-[#161616] border border-white/5 rounded-2xl p-3.5 mb-6 flex flex-col sm:flex-row gap-4 items-center sm:items-start">
          {/* Thumbnail */}
          <div className="w-full sm:w-40 aspect-video sm:aspect-auto sm:h-24 bg-[#1C1C1C] rounded-xl overflow-hidden shrink-0 relative">
            {course.thumbnail ? (
              <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[36px] text-gray-700">movie</span>
              </div>
            )}
          </div>
          {/* Details */}
          <div className="flex-1 min-w-0 py-0.5">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2.5 mb-0.5">
                  <h2 className="text-lg font-bold text-white leading-tight">{course.title}</h2>
                  {/* Status Tag */}
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${course.isPublished ? "bg-[#3CE36A]/10 text-[#3CE36A]" : "bg-yellow-500/10 text-yellow-400"}`}>
                    {course.isPublished ? "PUBLISHED" : "DRAFT"}
                  </span>
                </div>
                <p className="text-[13px] text-gray-400 line-clamp-2">{course.description || "No description added"}</p>
              </div>
              
              {/* Card Level Toggle */}
              <div className="flex items-center gap-3 bg-[#0A0A0A]/50 px-4 py-2 rounded-xl border border-white/5">
                <span className="text-[12px] font-bold text-gray-400">
                  {course.isPublished ? 'Published' : 'Draft'}
                </span>
                <button
                  onClick={togglePublish}
                  disabled={saving}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${course.isPublished ? 'bg-[#3CE36A]' : 'bg-gray-600'} ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow-sm ${course.isPublished ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="px-2.5 py-1 bg-white/5 rounded-lg text-[11px] text-gray-400">{course.category}</span>
              {/* Price editor */}
              <div className="flex items-center gap-2">
                {editPrice ? (
                  <>
                    <span className="text-[13px] text-gray-400">₹</span>
                    <input
                      value={newPrice}
                      onChange={e => setNewPrice(e.target.value)}
                      className="w-24 bg-[#1C1C1C] border border-[#FF7A00]/50 rounded-lg px-2 py-1 text-[13px] text-white focus:outline-none"
                      type="number"
                    />
                    <button onClick={updatePrice} disabled={saving} className="text-[#3CE36A] text-[12px] font-bold">Save</button>
                    <button onClick={() => setEditPrice(false)} className="text-gray-500 text-[12px]">Cancel</button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditPrice(true)}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FF7A00]/10 hover:bg-[#FF7A00]/20 rounded-lg text-[#FF7A00] text-[11px] font-bold transition-colors"
                  >
                    <span className="material-symbols-outlined text-[13px]">edit</span>
                    ₹{course.price} — Change Price
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-[13px]">{error}</div>
        )}

        {/* Modules & Videos */}
        {course.modules.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-2xl">
            <span className="material-symbols-outlined text-[48px] text-gray-700 mb-3">video_library</span>
            <h3 className="text-base font-bold text-white mb-2">No videos yet</h3>
            <p className="text-[13px] text-gray-500 mb-5">Upload your first video to get started.</p>
            <button
              onClick={() => setShowUpload(true)}
              className="bg-[#FF7A00] hover:bg-[#e06d00] text-white text-[13px] font-bold px-5 py-2.5 rounded-xl"
            >
              Upload First Video
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {course.modules.map((mod) => (
              <div key={mod.id} className="bg-[#161616] border border-white/5 rounded-2xl overflow-hidden">
                {/* Module header */}
                <div className="px-5 py-3 bg-[#131313] border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#FF7A00]">folder_open</span>
                    <h3 className="text-[13px] font-bold text-white">{mod.title}</h3>
                    <span className="text-[11px] text-gray-500">· {mod.videos.length} videos</span>
                  </div>
                </div>

                {/* Videos table */}
                <div className="divide-y divide-white/5">
                  {mod.videos.map((v, idx) => (
                    <div key={v.id} className="flex items-center gap-4 px-5 py-3 hover:bg-white/[0.02] transition-colors group">
                      {/* Number */}
                      <span className="text-[12px] text-gray-600 w-5 text-center shrink-0">{idx + 1}</span>
                      {/* Thumb placeholder */}
                      <div className="w-20 h-11 bg-[#1C1C1C] rounded-lg shrink-0 flex items-center justify-center overflow-hidden relative">
                        <Image
                          src={`https://vz-82a5778a-b1c.b-cdn.net/${v.videoUrl.split("/").at(-1)}/thumbnail.jpg`}
                          alt={v.title}
                          fill
                          className="object-cover"
                          onError={() => {}}
                        />
                        <span className="material-symbols-outlined text-[16px] text-gray-600 absolute">play_circle</span>
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-white group-hover:text-[#FF7A00] transition-colors truncate">{v.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] text-gray-500">{fmt(v.duration)}</span>
                          {v.isFreePreview && (
                            <span className="px-1.5 py-0.5 bg-[#3CE36A]/10 text-[#3CE36A] text-[9px] font-bold rounded">FREE</span>
                          )}
                          <span className={`text-[9px] font-bold ${v.isPublished ? "text-[#3CE36A]" : "text-yellow-500"}`}>
                            {v.isPublished ? "LIVE" : "DRAFT"}
                          </span>
                        </div>
                      </div>
                      {/* Actions */}
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        {/* Video Toggle */}
                        <button
                          onClick={() => toggleVideoPublish(v.id, v.isPublished)}
                          className={`relative w-8 h-4 rounded-full transition-colors duration-300 ${v.isPublished ? 'bg-[#3CE36A]' : 'bg-gray-600'}`}
                          title={v.isPublished ? "Make Draft" : "Go Live"}
                        >
                          <div className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform duration-300 shadow-sm ${v.isPublished ? 'translate-x-4' : 'translate-x-0'}`} />
                        </button>
                        
                        <Link
                          href={`/watch/${v.id}`}
                          target="_blank"
                          className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Add more button */}
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center justify-center gap-2 border border-dashed border-white/10 hover:border-[#FF7A00]/40 rounded-2xl py-5 text-[13px] text-gray-500 hover:text-[#FF7A00] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              Upload Another Video
            </button>
          </div>
        )}
      </div>

      {/* ── Upload Video Modal (4-Step Wizard) ── */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#161616] border border-white/10 rounded-2xl w-full max-w-4xl my-4 shadow-2xl flex flex-col h-[85vh] max-h-[800px]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 shrink-0">
              <h2 className="text-lg font-bold text-white">Upload New Video</h2>
              <button 
                onClick={() => { 
                  if (!uploading) { 
                    setShowUpload(false); 
                    setCurrentStep(1); 
                    if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
                    setVideoPreviewUrl(null);
                    setVideoFile(null);
                    if (thumbPreview) URL.revokeObjectURL(thumbPreview);
                    setThumbPreview(null);
                    setThumbFile(null);
                    setUploadForm({ title: "", description: "", moduleTitle: "", newModuleTitle: "", duration: "", isFreePreview: false });
                  } 
                }} 
                className="text-gray-500 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Stepper */}
            <div className="px-6 py-4 border-b border-white/5 shrink-0">
              <div className="flex items-center justify-between max-w-2xl mx-auto relative">
                {/* Connecting Line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white/10 -z-10"></div>
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#FF7A00] -z-10 transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                ></div>

                {[
                  { step: 1, label: "Details" },
                  { step: 2, label: "Video elements" },
                  { step: 3, label: "Initial check" },
                  { step: 4, label: "Visibility" }
                ].map((s) => (
                  <div key={s.step} className="flex flex-col items-center gap-2 bg-[#161616] px-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border-[3px] transition-colors ${
                      currentStep > s.step ? "bg-[#FF7A00] border-[#FF7A00]" :
                      currentStep === s.step ? "bg-[#161616] border-[#FF7A00]" :
                      "bg-[#161616] border-gray-600"
                    }`}>
                      {currentStep > s.step && <span className="material-symbols-outlined text-[12px] text-white font-bold">check</span>}
                    </div>
                    <span className={`text-[12px] font-semibold ${
                      currentStep >= s.step ? "text-white" : "text-gray-500"
                    }`}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              
              {/* STEP 1: DETAILS */}
              <div className={`${currentStep === 1 ? 'block' : 'hidden'} animate-fade-in`}>
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Left Col: Form */}
                  <div className="flex-1 flex flex-col gap-5">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Details</h3>
                      <p className="text-[13px] text-gray-400 mb-6">Provide basic information about your video.</p>
                    </div>

                    <div>
                      <label className="text-[12px] font-bold text-gray-300 mb-2 block">Video Title *</label>
                      <input
                        value={uploadForm.title}
                        onChange={e => setUploadForm(f => ({ ...f, title: e.target.value }))}
                        placeholder="e.g. Assets vs Liabilities"
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white focus:outline-none focus:border-[#FF7A00]/50 focus:ring-1 focus:ring-[#FF7A00]/50 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[12px] font-bold text-gray-300 mb-2 block">Description</label>
                      <textarea
                        value={uploadForm.description}
                        onChange={e => setUploadForm(f => ({ ...f, description: e.target.value }))}
                        placeholder="Tell viewers about your video..."
                        rows={5}
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white focus:outline-none focus:border-[#FF7A00]/50 focus:ring-1 focus:ring-[#FF7A00]/50 transition-all resize-none"
                      />
                    </div>

                    <div>
                      <label className="text-[12px] font-bold text-gray-300 mb-2 block">Thumbnail</label>
                      <p className="text-[11px] text-gray-500 mb-3">Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention.</p>
                      
                      <div
                        onClick={() => thumbInputRef.current?.click()}
                        className={`w-full sm:w-[250px] aspect-video border-2 border-dashed rounded-xl overflow-hidden cursor-pointer transition-colors ${thumbPreview ? "border-[#FF7A00]/50" : "border-white/10 hover:border-white/30"}`}
                      >
                        {thumbPreview ? (
                          <div className="relative w-full h-full group">
                            <Image src={thumbPreview} alt="thumbnail" fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="material-symbols-outlined text-[32px] text-white">image</span>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-[#0A0A0A]">
                            <span className="material-symbols-outlined text-[32px] text-gray-600 mb-2 block">add_photo_alternate</span>
                            <span className="text-[12px] text-gray-400 font-semibold">Upload thumbnail</span>
                          </div>
                        )}
                      </div>
                      <input
                        ref={thumbInputRef} type="file" accept="image/*" className="hidden"
                        onChange={e => {
                          const f = e.target.files?.[0];
                          if (!f) return;
                          setThumbFile(f); setThumbPreview(URL.createObjectURL(f));
                        }}
                      />
                    </div>
                  </div>

                  {/* Right Col: Video Upload Preview */}
                  <div className="w-full md:w-[320px] shrink-0">
                    <div className="bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden sticky top-0">
                      <div
                        onClick={() => !videoFile && videoInputRef.current?.click()}
                        className={`aspect-video w-full flex flex-col items-center justify-center bg-[#111] overflow-hidden ${!videoFile ? 'cursor-pointer hover:bg-[#161616] transition-colors' : ''}`}
                      >
                        {videoPreviewUrl ? (
                          <div className="w-full h-full relative group bg-black">
                            <video src={videoPreviewUrl} className="w-full h-full object-contain" controls controlsList="nodownload" />
                          </div>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-[40px] text-gray-500 mb-2">upload_file</span>
                            <span className="text-[12px] text-gray-400 font-semibold">Select video file</span>
                          </>
                        )}
                      </div>
                      <input
                        ref={videoInputRef} type="file" accept="video/*" className="hidden"
                        onChange={e => {
                          const f = e.target.files?.[0];
                          if (!f) return;
                          setVideoFile(f);
                          if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
                          const url = URL.createObjectURL(f);
                          setVideoPreviewUrl(url);
                          
                          // Auto-fill title if empty
                          if (!uploadForm.title) {
                            setUploadForm(prev => ({...prev, title: f.name.replace(/\.[^/.]+$/, "")}));
                          }
                          
                          // Try to auto-get duration
                          const videoElement = document.createElement("video");
                          videoElement.src = url;
                          videoElement.onloadedmetadata = () => {
                             if (videoElement.duration && !uploadForm.duration) {
                               setUploadForm(prev => ({...prev, duration: Math.floor(videoElement.duration).toString()}));
                             }
                          };
                        }}
                      />
                      
                      <div className="p-4 border-t border-white/5">
                        <div className="mb-3">
                          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">File Name</p>
                          <p className="text-[13px] text-white truncate">{videoFile ? videoFile.name : "No file selected"}</p>
                        </div>
                        {videoFile && (
                          <div className="flex items-center justify-between">
                             <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Size</p>
                             <p className="text-[13px] text-white">{(videoFile.size / 1024 / 1024).toFixed(1)} MB</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 2: VIDEO ELEMENTS */}
              <div className={`${currentStep === 2 ? 'block' : 'hidden'} animate-fade-in max-w-3xl mx-auto py-4`}>
                <h3 className="text-xl font-bold text-white mb-1">Video Organization</h3>
                <p className="text-[13px] text-gray-400 mb-8">Structure your course content and verify auto-detected metadata.</p>
                
                <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 flex flex-col gap-6">
                  <div>
                    <label className="text-[13px] font-bold text-white mb-2 block">Module / Chapter Name</label>
                    <p className="text-[12px] text-gray-500 mb-3">Select an existing module or create a new section for this video.</p>
                    
                    <div className="flex flex-col gap-3 md:w-2/3">
                      <select
                        value={uploadForm.moduleTitle}
                        onChange={e => setUploadForm(f => ({ ...f, moduleTitle: e.target.value }))}
                        className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white focus:outline-none focus:border-[#FF7A00]/50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select a module...</option>
                        {course?.modules.map(m => (
                          <option key={m.id} value={m.title}>{m.title}</option>
                        ))}
                        <option value="NEW_MODULE" className="text-[#FF7A00] font-bold">+ Create New Module</option>
                      </select>

                      {uploadForm.moduleTitle === "NEW_MODULE" && (
                        <div className="animate-fade-in-down">
                          <input
                            autoFocus
                            value={uploadForm.newModuleTitle}
                            onChange={e => setUploadForm(f => ({ ...f, newModuleTitle: e.target.value }))}
                            placeholder="Enter new module name (e.g. Chapter 2: Advanced Topics)"
                            className="w-full bg-[#161616] border border-[#FF7A00]/40 rounded-xl px-4 py-3 text-[14px] text-white focus:outline-none focus:ring-1 focus:ring-[#FF7A00]/50 transition-all"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-full h-px bg-white/5"></div>

                  <div>
                    <label className="text-[13px] font-bold text-white mb-2 block">Video Duration</label>
                    <p className="text-[12px] text-gray-500 mb-3">Time is automatically calculated from your video file.</p>
                    <div className="inline-flex items-center gap-2.5 bg-[#161616] border border-white/5 px-4 py-2.5 rounded-xl shadow-inner">
                      <span className="material-symbols-outlined text-[18px] text-[#3CE36A]">timer</span>
                      <span className="text-[14px] text-white font-bold tracking-wide">
                        {uploadForm.duration ? fmt(parseInt(uploadForm.duration)) : "00:00"}
                      </span>
                      {uploadForm.duration && (
                        <span className="text-[10px] text-[#3CE36A] bg-[#3CE36A]/10 px-2 py-0.5 rounded ml-2 uppercase font-black tracking-wider">Auto-detected</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 3: INITIAL CHECK */}
              <div className={`${currentStep === 3 ? 'block' : 'hidden'} animate-fade-in max-w-3xl mx-auto py-4`}>
                <h3 className="text-xl font-bold text-white mb-1">Checks</h3>
                <p className="text-[13px] text-gray-400 mb-8">We'll check your video for issues that may restrict its visibility.</p>
                
                <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <span className="material-symbols-outlined text-[24px] text-[#3CE36A]">check_circle</span>
                    <div>
                      <h4 className="text-[14px] font-bold text-white mb-1">Copyright</h4>
                      <p className="text-[13px] text-gray-500">No issues found. Your video is ready to be processed.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-[24px] text-[#3CE36A]">check_circle</span>
                    <div>
                      <h4 className="text-[14px] font-bold text-white mb-1">Format Compatibility</h4>
                      <p className="text-[13px] text-gray-500">Video format is supported across all devices.</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-[12px] text-gray-500 mt-6">
                  Remember: These checks aren't comprehensive. You are solely responsible for ensuring your content complies with our terms and community guidelines.
                </p>
              </div>

              {/* STEP 4: VISIBILITY */}
              <div className={`${currentStep === 4 ? 'block' : 'hidden'} animate-fade-in max-w-3xl mx-auto py-4`}>
                <h3 className="text-xl font-bold text-white mb-1">Visibility</h3>
                <p className="text-[13px] text-gray-400 mb-8">Choose how you want to share this video with students.</p>
                
                <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
                  <h4 className="text-[14px] font-bold text-white mb-4">Preview Options</h4>
                  
                  <label className="flex items-start gap-4 p-4 border border-white/10 rounded-xl cursor-pointer hover:bg-[#161616] transition-colors mb-4">
                    <div className="pt-0.5">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${!uploadForm.isFreePreview ? 'border-[#FF7A00]' : 'border-gray-500'}`}>
                        {!uploadForm.isFreePreview && <div className="w-2.5 h-2.5 rounded-full bg-[#FF7A00]"></div>}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-[14px] font-bold text-white mb-1">Premium / Paid</h5>
                      <p className="text-[13px] text-gray-500">Only students who have purchased this course can watch this video.</p>
                    </div>
                    <input 
                      type="radio" 
                      className="hidden" 
                      checked={!uploadForm.isFreePreview} 
                      onChange={() => setUploadForm(f => ({ ...f, isFreePreview: false }))} 
                    />
                  </label>

                  <label className="flex items-start gap-4 p-4 border border-white/10 rounded-xl cursor-pointer hover:bg-[#161616] transition-colors">
                    <div className="pt-0.5">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${uploadForm.isFreePreview ? 'border-[#FF7A00]' : 'border-gray-500'}`}>
                        {uploadForm.isFreePreview && <div className="w-2.5 h-2.5 rounded-full bg-[#FF7A00]"></div>}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-[14px] font-bold text-white mb-1">Free Preview</h5>
                      <p className="text-[13px] text-gray-500">Anyone visiting the course page can watch this video for free as a teaser.</p>
                    </div>
                    <input 
                      type="radio" 
                      className="hidden" 
                      checked={uploadForm.isFreePreview} 
                      onChange={() => setUploadForm(f => ({ ...f, isFreePreview: true }))} 
                    />
                  </label>
                </div>
                
                {/* Upload Progress Display inside Step 4 when uploading starts */}
                {uploading && (
                  <div className="mt-8 bg-[#1C1C1C] border border-[#FF7A00]/30 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                         <span className="material-symbols-outlined text-[20px] text-[#FF7A00] animate-spin">progress_activity</span>
                         <span className="text-[14px] font-bold text-white">{uploadStep}</span>
                      </div>
                      <span className="text-[14px] font-black text-[#FF7A00]">{uploadProgress}%</span>
                    </div>
                    <div className="h-2.5 bg-black/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FFB700] rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-[13px] font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">error</span>
                    {error}
                  </div>
                )}
              </div>

            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between bg-[#161616] rounded-b-2xl shrink-0">
              {currentStep > 1 ? (
                <button
                  onClick={() => !uploading && setCurrentStep(s => s - 1)}
                  disabled={uploading}
                  className="px-6 py-2.5 bg-transparent hover:bg-white/5 text-white text-[13px] font-bold rounded-lg transition-colors disabled:opacity-50"
                >
                  BACK
                </button>
              ) : <div></div>}
              
              <div className="flex gap-3">
                {currentStep < 4 ? (
                  <button
                    onClick={() => setCurrentStep(s => s + 1)}
                    disabled={currentStep === 1 && (!videoFile || !uploadForm.title)} // Require video and title on step 1
                    className="px-6 py-2.5 bg-[#FF7A00] hover:bg-[#e06d00] text-white text-[13px] font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    NEXT
                  </button>
                ) : (
                  <button
                    onClick={handleUpload}
                    disabled={uploading || !videoFile || !uploadForm.title}
                    className="px-8 py-2.5 bg-[#FF7A00] hover:bg-[#e06d00] disabled:opacity-50 text-white text-[13px] font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(255,122,0,0.3)]"
                  >
                    {uploading ? "UPLOADING..." : "PUBLISH"}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
