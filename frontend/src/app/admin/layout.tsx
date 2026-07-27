'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { ShieldCheck, Loader2, LayoutDashboard, Users, CreditCard, Settings, LogOut } from 'lucide-react';
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
      <div className="h-screen w-full bg-white flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
      </div>
    );
  }

  if (isAdmin === false) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-white text-black">
      {/* Admin Sidebar Branding */}
      <div className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col p-4">
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic">Admin</span>
        </div>
        <nav className="flex-1 space-y-2">
           <a href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-black/20">
             <LayoutDashboard className="w-4 h-4" />
             Overview
           </a>
           <a href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-xs font-black uppercase tracking-widest text-slate-500 transition-colors">
             <Users className="w-4 h-4" />
             Users
           </a>
           <a href="/admin/payments" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-xs font-black uppercase tracking-widest text-slate-500 transition-colors">
             <CreditCard className="w-4 h-4" />
             Payments
           </a>
           <a href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-xs font-black uppercase tracking-widest text-slate-500 transition-colors">
             <Settings className="w-4 h-4" />
             System
           </a>
           <div className="pt-8 mt-8 border-t border-slate-100">
             <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 text-xs font-black uppercase tracking-widest text-primary-600 transition-colors">
               <LogOut className="w-4 h-4" />
               Exit Admin
             </a>
           </div>
        </nav>
      </div>

      <main className="flex-1 overflow-y-auto bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
