"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface EditProfileModalProps {
  currentName: string;
  currentAvatar: string;
  currentAbout: string;
}

export function EditProfileModal({ currentName, currentAvatar, currentAbout }: EditProfileModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(currentName);
  const [about, setAbout] = useState(currentAbout);
  const [previewUrl, setPreviewUrl] = useState(currentAvatar);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("about", about);
      if (file) {
        formData.append("file", file);
      }

      const res = await fetch("/api/user/profile", {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setIsOpen(false);
      router.refresh(); // Refresh Server Component to show new data
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 sm:px-5 md:px-6 py-2 md:py-2.5 rounded-full border border-white/10 text-white font-medium text-[11px] sm:text-[12px] md:text-[13px] hover:bg-white/5 transition-colors"
      >
        Edit Profile
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#1A1A1A] w-full max-w-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Edit Profile</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {error && (
                <div className="bg-red-500/10 text-red-500 text-sm px-4 py-3 rounded-xl border border-red-500/20">
                  {error}
                </div>
              )}

              {/* Avatar Upload */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <Image src={previewUrl} alt="Avatar Preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="material-symbols-outlined text-white">photo_camera</span>
                  </div>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-[#FF7A00] font-medium hover:underline"
                >
                  Change Picture
                </button>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF7A00] transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              {/* About Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">About (Bio)</label>
                <textarea 
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="w-full bg-[#222] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF7A00] transition-colors resize-none h-24"
                  placeholder="Tell us a little bit about yourself..."
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-[#111] border-t border-white/5 flex justify-end gap-3">
              <button 
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 rounded-xl font-medium text-gray-300 hover:text-white transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={loading}
                className="bg-[#FF7A00] hover:bg-[#FF8A1F] text-[#3D1D00] px-6 py-2.5 rounded-xl font-bold transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
