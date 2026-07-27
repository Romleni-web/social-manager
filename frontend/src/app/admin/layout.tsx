'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await api.get('/admin/stats');
        if (response.status === 200) {
          setIsAdmin(true);
        }
      } catch (error) {
        setIsAdmin(false);
        router.push('/dashboard');
      }
    };
    checkAdmin();
  }, [router]);

  if (isAdmin === null) {
    return (
      <div className="h-screen w-full bg-[#020617] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
      </div>
    );
  }

  if (isAdmin === false) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-black text-slate-100">
      {/* Admin Sidebar Branding */}
      <div className="w-64 h-screen bg-black border-r border-white/5 flex flex-col p-4">
        <div className="flex items-center gap-2 px-2 mb-8 text-blue-500">
          <ShieldCheck className="w-8 h-8" />
          <span className="text-xl font-black tracking-tighter uppercase italic">Admin Panel</span>
        </div>
        <nav className="flex-1 space-y-2">
           <a href="/admin" className="block px-4 py-2 rounded-xl bg-white/5 text-sm font-bold">Overview</a>
           <a href="/admin/users" className="block px-4 py-2 rounded-xl hover:bg-white/5 text-sm font-medium text-slate-400">User Management</a>
           <a href="/admin/payments" className="block px-4 py-2 rounded-xl hover:bg-white/5 text-sm font-medium text-slate-400">Transactions</a>
           <a href="/admin/settings" className="block px-4 py-2 rounded-xl hover:bg-white/5 text-sm font-medium text-slate-400">System Settings</a>
           <div className="pt-8 mt-8 border-t border-white/5">
             <a href="/dashboard" className="block px-4 py-2 rounded-xl hover:bg-white/5 text-sm font-medium text-primary-400">Back to Platform</a>
           </div>
        </nav>
      </div>

      <main className="flex-1 overflow-y-auto bg-black p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
