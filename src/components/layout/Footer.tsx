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

            {/* Brand */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #FF7A00, #ff9a3c)" }}
              >
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-white font-semibold text-sm">Seekho Business</span>
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
                    className="text-[12px] transition-colors hover:text-white whitespace-nowrap"
                    style={{ color: "#555" }}>
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
                    className="text-[12px] transition-colors hover:text-white whitespace-nowrap"
                    style={{ color: "#555" }}>
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
