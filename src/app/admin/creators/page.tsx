"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AdminNav } from "../_components/AdminNav";

interface User {
  id: string; name: string; email: string; avatar: string | null;
  role: string; isVerified: boolean; legalName: string | null;
  phone: string | null; category: string | null; experience: string | null;
  createdAt: string;
  _count: { courses: number; purchases: number };
}

function AdminCreatorsContent() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const f = searchParams.get("filter");
    if (f) setFilter(f);
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push("/login"); return; }
      const meData = await fetch("/api/user/me", { headers: { Authorization: `Bearer ${session.access_token}` } }).then(r => r.json());
      if (meData.user?.role !== "ADMIN") { router.push("/"); return; }
      setToken(session.access_token);
    })();
  }, [router]);

  const fetchUsers = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "10", search, filter });
      const data = await fetch(`/api/admin/creators?${params}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json());
      setUsers(data.users || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } finally { setLoading(false); }
  }, [token, page, search, filter]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  async function verifyCreator(id: string) {
    await fetch(`/api/admin/verify-creator/${id}`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    fetchUsers();
  }

  async function revokeCreator(id: string) {
    if (!confirm("Revoke this creator's access?")) return;
    await fetch(`/api/admin/revoke-creator/${id}`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    fetchUsers();
  }

  const filters = [
    { label: "All Users", value: "all" },
    { label: "Verified Creators", value: "verified" },
    { label: "Pending Approval", value: "pending" },
    { label: "Students", value: "student" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <AdminNav />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black">Creators & Users</h2>
            <p className="text-gray-500 text-sm">{total} total users</p>
          </div>
          {/* Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[18px]">search</span>
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by name or email..."
              className="bg-[#161616] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF7A00]/50 w-72"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {filters.map(f => (
            <button key={f.value} onClick={() => { setFilter(f.value); setPage(1); }}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${filter === f.value ? "bg-[#FF7A00] text-black" : "bg-[#161616] text-gray-400 hover:text-white"}`}
            >{f.label}</button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-4 border-[#FF7A00] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5">
                    <th className="px-5 py-3.5 text-[11px] font-black text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-5 py-3.5 text-[11px] font-black text-gray-500 uppercase tracking-wider">Role / Status</th>
                    <th className="px-5 py-3.5 text-[11px] font-black text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-5 py-3.5 text-[11px] font-black text-gray-500 uppercase tracking-wider">Courses</th>
                    <th className="px-5 py-3.5 text-[11px] font-black text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.length === 0 && (
                    <tr><td colSpan={5} className="py-16 text-center text-gray-500">No users found.</td></tr>
                  )}
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#1C1C1C] overflow-hidden shrink-0 relative">
                            {u.avatar ? <Image src={u.avatar} alt={u.name || ""} fill className="object-cover" /> : (
                              <div className="w-full h-full flex items-center justify-center text-[13px] font-black text-gray-500">{(u.name || u.email)[0].toUpperCase()}</div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm">{u.name || "—"}</div>
                            <div className="text-[12px] text-gray-500">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black ${u.role === "ADMIN" ? "bg-red-500/20 text-red-400" : u.role === "CREATOR" ? "bg-blue-500/20 text-blue-400" : "bg-white/5 text-gray-500"}`}>{u.role}</span>
                          {u.legalName && !u.isVerified && <span className="px-2 py-0.5 rounded text-[10px] font-black bg-yellow-500/20 text-yellow-400">PENDING</span>}
                          {u.isVerified && <span className="px-2 py-0.5 rounded text-[10px] font-black bg-green-500/20 text-green-400">VERIFIED</span>}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-400">{u.category || "—"}</td>
                      <td className="px-5 py-4">
                        <Link href={`/admin/creators/${u.id}`} className="text-sm text-[#FF7A00] hover:underline font-bold">{u._count.courses} courses →</Link>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 justify-end">
                          <Link href={`/admin/creators/${u.id}`} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                          </Link>
                          {!u.isVerified && u.legalName && (
                            <button onClick={() => verifyCreator(u.id)} className="px-3 py-1.5 bg-[#3CE36A] text-[#0A2E12] text-xs font-black rounded-lg hover:bg-[#32c95d] transition-all">Verify</button>
                          )}
                          {u.role === "CREATOR" && u.isVerified && (
                            <button onClick={() => revokeCreator(u.id)} className="px-3 py-1.5 bg-red-500/20 text-red-400 text-xs font-black rounded-lg hover:bg-red-500/30 transition-all">Revoke</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-500">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="px-4 py-2 bg-[#161616] border border-white/10 rounded-xl text-sm font-bold disabled:opacity-30 hover:bg-white/5 transition-all">← Prev</button>
              <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="px-4 py-2 bg-[#161616] border border-white/10 rounded-xl text-sm font-bold disabled:opacity-30 hover:bg-white/5 transition-all">Next →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminCreatorsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#FF7A00] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <AdminCreatorsContent />
    </Suspense>
  );
}
