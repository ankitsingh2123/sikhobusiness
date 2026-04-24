import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="border-t mt-10 md:mt-16 pt-8 md:pt-12 pb-28 md:pb-12"
      style={{ borderColor: "rgba(255,255,255,0.05)" }}
    >
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto">

        {/* Brand row — always full width on top */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #FF7A00, #ff9a3c)" }}
            >
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-semibold text-sm" style={{ color: "#e5e2e1" }}>
              Seekho Business
            </span>
          </div>
          <p className="text-sm mb-4 max-w-sm" style={{ color: "#6b6b6b" }}>
            India&apos;s #1 video learning platform for business books, NCERT &amp; life skills.
          </p>
          <div className="flex gap-3">
            {[
              { label: "X (Twitter)", icon: "tag" },
              { label: "YouTube", icon: "play_circle" },
              { label: "Instagram", icon: "photo_camera" },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#6b6b6b" }}
              >
                <span className="material-symbols-outlined text-[16px]">{s.icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Link columns — 3 equal columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-8 mb-8">
          {/* Platform */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-3" style={{ color: "#e5e2e1" }}>
              Platform
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Browse Courses", href: "/courses" },
                { name: "Blog", href: "/blog" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[11px] sm:text-sm transition-colors hover:text-orange-400 leading-relaxed"
                    style={{ color: "#6b6b6b" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-3" style={{ color: "#e5e2e1" }}>
              Categories
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Business Books", href: "/courses?category=business" },
                { name: "NCERT Physics", href: "/courses?category=ncert" },
                { name: "Finance", href: "/courses?category=finance" },
                { name: "Self Help", href: "/courses?category=self-help" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[11px] sm:text-sm transition-colors hover:text-orange-400 leading-relaxed"
                    style={{ color: "#6b6b6b" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-3" style={{ color: "#e5e2e1" }}>
              Legal
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Refund Policy", href: "/terms#refunds" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[11px] sm:text-sm transition-colors hover:text-orange-400 leading-relaxed"
                    style={{ color: "#6b6b6b" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-[11px] text-center sm:text-left" style={{ color: "#584235" }}>
            © {new Date().getFullYear()} Seekho Business. All rights reserved.
          </p>
          <p className="text-[11px]" style={{ color: "#584235" }}>
            Made with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
}
