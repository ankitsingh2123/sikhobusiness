"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../ui/Logo";

const navItems = [
  { icon: "grid_view", label: "Dashboard", href: "/" },
  { icon: "search", label: "Search", href: "/search" },
  { icon: "menu_book", label: "Library", href: "/courses" },
  { icon: "settings", label: "Settings", href: "/settings" },
  { icon: "receipt_long", label: "Billing", href: "/billing" },
  { icon: "history", label: "Transactions", href: "/transactions" },
  { icon: "shopping_cart", label: "Cart", href: "/cart" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex w-20 h-screen border-r fixed left-0 top-0 bottom-0 z-40 flex-col items-center py-6"
        style={{
          backgroundColor: "#131313",
          borderColor: "rgba(255,255,255,0.02)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="mb-6 group">
          <Logo showText={false} />
        </Link>

        {/* Divider */}
        <div className="w-8 h-[1px] bg-white/5 mb-6" />

        {/* Navigation */}
        <nav className="flex-1 w-full flex flex-col items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center justify-center w-12 h-12 rounded-[16px] transition-all duration-200 group ${
                  isActive ? "bg-[#FF7A00]/10" : "hover:bg-white/5"
                }`}
                style={{
                  color: isActive ? "#FF7A00" : "#888",
                }}
                title={item.label}
                aria-label={item.label}
              >
                <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                  {item.icon}
                </span>
                {isActive && (
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#FF7A00] rounded-l-full"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="mt-auto flex flex-col items-center gap-6 mb-2">
          {/* Account Profile */}
          <Link
            href="/account"
            className={`relative flex items-center justify-center w-12 h-12 rounded-[16px] transition-all duration-200 group ${
              pathname === "/account" ? "bg-[#FF7A00]/10" : "hover:bg-white/5"
            }`}
            style={{
              color: pathname === "/account" ? "#FF7A00" : "#888",
            }}
            title="Account"
          >
            <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform" style={pathname === "/account" ? { fontVariationSettings: "'FILL' 1" } : {}}>
              person
            </span>
            {pathname === "/account" && (
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#FF7A00] rounded-l-full"></div>
            )}
          </Link>

        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around py-2 px-4"
        style={{
          backgroundColor: "rgba(19, 19, 19, 0.95)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {navItems.filter(item => ["Dashboard", "Search", "Library", "Cart"].includes(item.label)).concat({ icon: "person", label: "Account", href: "/account" }).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 py-1 px-3 transition-all duration-200"
              style={{ 
                color: isActive ? "#FF7A00" : "#6b6b6b",
                transform: isActive ? "scale(1.1)" : "scale(1)"
              }}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {item.icon}
              </span>
              <span className={`text-[9px] font-bold uppercase tracking-wider ${isActive ? "opacity-100" : "opacity-60"}`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
