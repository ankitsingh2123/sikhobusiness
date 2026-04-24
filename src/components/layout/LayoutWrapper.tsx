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

  if (isWatchPage || isCheckoutSuccess || isForgotPassword) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen md:ml-20">
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        {/* Only hide footer on auth pages if they are meant to be full-screen forms */}
        {!isAuthPage && <Footer />}
      </div>
    </div>
  );
}
