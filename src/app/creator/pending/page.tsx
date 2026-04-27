import Link from "next/link";

export default function CreatorPendingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        {/* Pulsing icon */}
        <div className="relative mx-auto w-20 h-20 mb-6">
          <div className="absolute inset-0 bg-yellow-500/20 rounded-full animate-ping" />
          <div className="relative w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/30">
            <span className="material-symbols-outlined text-[36px] text-yellow-400">pending</span>
          </div>
        </div>

        <h1 className="text-2xl font-black text-white mb-3">Application Under Review</h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          Our team is reviewing your creator application.<br />
          <span className="text-yellow-400 font-semibold">
            After verification, you'll be able to upload to your channel.
          </span>
        </p>

        {/* Progress steps */}
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-5 text-left mb-6 space-y-4">
          {[
            { icon: "check_circle",    color: "text-[#3CE36A]",  label: "Application submitted",       done: true  },
            { icon: "manage_accounts", color: "text-yellow-400", label: "Admin review in progress",    done: false },
            { icon: "video_library",   color: "text-gray-600",   label: "Creator Studio unlocked",     done: false },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className={`material-symbols-outlined text-[20px] ${step.color}`}>{step.icon}</span>
              <span className={`text-sm ${step.done ? "text-white font-semibold" : step.color === "text-yellow-400" ? "text-yellow-400" : "text-gray-600"}`}>
                {step.label}
              </span>
              {!step.done && step.color === "text-yellow-400" && (
                <span className="ml-auto text-[10px] bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full font-bold animate-pulse">
                  IN PROGRESS
                </span>
              )}
            </div>
          ))}
        </div>

        <p className="text-[11px] text-gray-600 mb-6">
          Usually takes 24–48 hours · You'll get an email once approved
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-white font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">home</span>
            Back to Home
          </Link>
          <Link
            href="/courses"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#FF7A00]/10 hover:bg-[#FF7A00]/20 border border-[#FF7A00]/30 rounded-xl text-sm text-[#FF7A00] font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">play_circle</span>
            Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
