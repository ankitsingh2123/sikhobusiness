import Link from "next/link";

const footerLinks = {
  Platform: [
    { name: "Browse Courses", href: "/courses" },
    { name: "Blog", href: "/blog" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  Categories: [
    { name: "Business Books", href: "/courses?category=business" },
    { name: "NCERT Physics", href: "/courses?category=ncert" },
    { name: "Finance", href: "/courses?category=finance" },
    { name: "Self Help", href: "/courses?category=self-help" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Refund Policy", href: "/terms#refunds" },
  ],
};

export function Footer() {
  return (
    <footer
      className="border-t mt-16 pt-12 pb-24 md:pb-12"
      style={{ borderColor: "rgba(255,255,255,0.05)" }}
    >
      <div className="px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #FF7A00, #ff9a3c)",
                }}
              >
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span
                className="font-semibold text-sm"
                style={{ color: "#e5e2e1" }}
              >
                Seekho Business
              </span>
            </div>
            <p className="text-sm mb-4" style={{ color: "#6b6b6b" }}>
              India&apos;s #1 video learning platform for business books, NCERT & life skills.
            </p>
            <div className="flex gap-3">
              {["X (Twitter)", "YouTube", "Instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#6b6b6b",
                  }}
                  aria-label={social}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {social === "X (Twitter)"
                      ? "tag"
                      : social === "YouTube"
                        ? "play_circle"
                        : "photo_camera"}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3
                className="text-sm font-semibold mb-4"
                style={{ color: "#e5e2e1" }}
              >
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-orange-400"
                      style={{ color: "#6b6b6b" }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-xs" style={{ color: "#584235" }}>
            © {new Date().getFullYear()} Seekho Business. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "#584235" }}>
            Made with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
}
