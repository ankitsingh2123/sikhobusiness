export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Admin pages get a clean full-screen layout without the main Header/Sidebar/Footer
  return <div className="min-h-screen bg-[#0A0A0A]">{children}</div>;
}
