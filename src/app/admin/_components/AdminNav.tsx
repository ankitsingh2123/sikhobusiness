"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminNav() {
  const pathname = usePathname();
  const links = [
    { label: "Dashboard", icon: "dashboard", href: "/admin" },
    { label: "Creators", icon: "groups", href: "/admin/creators" },
    { label: "Pending Videos", icon: "pending_actions", href: "/admin/videos" },
  ];
  return (
    <div className="border-b border-white/5 bg-[#0D0D0D] sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-0 flex items-center gap-1">
        <Link href="/admin" className="flex items-center gap-2 py-4 mr-6 shrink-0">
          <span className="material-symbols-outlined text-[#FF7A00] text-[20px]">admin_panel_settings</span>
          <span className="text-sm font-black">Seekho Admin</span>
        </Link>
        {links.map(l => (
          <Link key={l.href} href={l.href}
            className={`flex items-center gap-2 px-4 py-4 text-sm font-bold border-b-2 transition-colors ${pathname === l.href || (l.href !== "/admin" && pathname.startsWith(l.href)) ? "border-[#FF7A00] text-white" : "border-transparent text-gray-500 hover:text-white"}`}
          >
            <span className="material-symbols-outlined text-[16px]">{l.icon}</span>
            {l.label}
          </Link>
        ))}
        <div className="flex-1" />
        <Link href="/" className="text-xs text-gray-500 hover:text-white flex items-center gap-1 transition-colors py-4">
          <span className="material-symbols-outlined text-[14px]">open_in_new</span> Site
        </Link>
      </div>
    </div>
  );
}
