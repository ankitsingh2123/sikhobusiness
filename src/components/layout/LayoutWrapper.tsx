"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // We no longer hide elements on auth pages as per user request
  const isAuthPage = pathname?.startsWith("/auth");
  const isForgotPassword = pathname === "/auth/forgot-password";
  const isWatchPage = pathname?.startsWith("/watch");
  const isCheckoutSuccess = pathname === "/checkout/success";
  const isAdminPage = pathname?.startsWith("/admin");

  // Admin pages: completely clean layout (handled by /admin/layout.tsx)
  if (isAdminPage) {
    return <>{children}</>;
  }

  // Watch page: show Sidebar and Header, but no footer for immersive experience
    if (isWatchPage) {
    return (
      <div className="flex min-h-screen bg-[#111111] pt-16">
        <Header />
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen min-w-0 md:ml-20">
          <main className="flex-1 flex flex-col min-w-0">
            {children}
          </main>
        </div>
      </div>
    );
  }

  if (isCheckoutSuccess || isForgotPassword) {
    return (
      <div className="min-h-screen bg-[#111111]">
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0A0A0A] pt-16 overflow-hidden w-full">
      <Header />
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen min-w-0 w-full max-w-full overflow-x-hidden md:ml-20">
        <main className="flex-1 flex flex-col min-w-0 w-full">
          {children}
        </main>
        {/* Only hide footer on auth pages if they are meant to be full-screen forms */}
        {!isAuthPage && <Footer />}
      </div>
    </div>
  );
}
