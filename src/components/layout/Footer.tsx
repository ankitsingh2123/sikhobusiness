import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="border-t mt-4 pb-24 md:pb-8"
      style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "#111" }}
    >
      <div className="px-4 sm:px-6 md:px-10 w-full py-3">

        {/* 
          sm:  3 rows — Brand | Platform | Legal | Copyright
          md:  2 rows — [Brand + Platform + Legal] | [Copyright]
          lg:  1 row  — Brand + Platform + Legal + Copyright
        */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

          {/* Row 1 (sm) / Left section (md+) */}
          <div className="flex flex-col md:flex-row md:items-start lg:items-center gap-3 md:gap-10">

            {/* Brand - Transparent Rectangular Logo */}
            <div className="flex items-center flex-shrink-0">
              <div className="w-24 h-8 sm:w-28 sm:h-10 flex items-center justify-center relative overflow-hidden shrink-0">
                <img 
                  src="/images/logo-rect.png" 
                  alt="Seekho Business Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Divider — md+ only */}
            <div className="hidden md:block w-px h-4 bg-white/10" />

            {/* Platform links */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-0">
              <span className="text-[10px] font-semibold uppercase tracking-widest mr-4 sm:block" style={{ color: "#444" }}>
                Platform
              </span>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {[
                  { name: "Courses", href: "/" },
                  { name: "Blog", href: "/blog" },
                  { name: "About", href: "/about" },
                  { name: "Contact", href: "/contact" },
                ].map((l) => (
                  <Link key={l.name} href={l.href}
                    className="text-[12px] text-gray-500 hover:text-[#FF7A00] transition-all duration-300 whitespace-nowrap px-2.5 py-1 rounded-lg hover:bg-[#FF7A00]/10 hover:shadow-[0_0_12px_rgba(255,122,0,0.05)]">
                    {l.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Divider — md+ only */}
            <div className="hidden md:block w-px h-4 bg-white/10" />

            {/* Legal links */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-0">
              <span className="text-[10px] font-semibold uppercase tracking-widest mr-4 sm:block" style={{ color: "#444" }}>
                Legal
              </span>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {[
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" },
                  { name: "Refund Policy", href: "/terms#refunds" },
                ].map((l) => (
                  <Link key={l.name} href={l.href}
                    className="text-[12px] text-gray-500 hover:text-[#FF7A00] transition-all duration-300 whitespace-nowrap px-2.5 py-1 rounded-lg hover:bg-[#FF7A00]/10 hover:shadow-[0_0_12px_rgba(255,122,0,0.05)]">
                    {l.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright — bottom on sm/md, right on lg */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between lg:justify-end gap-1 sm:gap-4 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/5">
            <p className="text-[11px]" style={{ color: "#3a3a3a" }}>
              © {new Date().getFullYear()} Seekho Business. All rights reserved.
            </p>
            <p className="text-[11px]" style={{ color: "#3a3a3a" }}>
              Made with ❤️ in India
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
