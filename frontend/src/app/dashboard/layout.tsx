'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { useState } from 'react';
import { Menu, User, Bell, Plus } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { PostComposer } from '@/components/composer/PostComposer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isComposerOpen, toggleComposer, user } = useStore();

  return (
    <div className="flex h-screen overflow-hidden bg-white text-black">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {isComposerOpen && <PostComposer onClose={() => toggleComposer(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-slate-100 bg-white sticky top-0 z-30">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-slate-50 rounded-xl">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-black italic">S</span>
            </div>
            <span className="font-black uppercase text-sm tracking-tighter">SocialAI</span>
          </div>
          <button className="p-2 hover:bg-slate-50 rounded-xl">
            <User className="w-6 h-6" />
          </button>
        </header>

        {/* Top Desktop Bar */}
        <header className="hidden lg:flex items-center justify-between px-10 py-6 bg-white border-b border-slate-50">
          <div className="flex items-center gap-4">
            <button
              onClick={() => toggleComposer(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-black hover:bg-slate-800 text-white font-black uppercase text-xs tracking-widest rounded-2xl transition-all shadow-xl shadow-black/10"
            >
              <Plus className="w-4 h-4" />
              New Post
            </button>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-black transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-px bg-slate-100" />
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right">
                <p className="text-xs font-black uppercase tracking-tight">{user?.name || 'User'}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">{user?.plan || 'Free'} Plan</p>
              </div>
              <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-transparent group-hover:border-primary-500 transition-all">
                <User className="w-5 h-5 text-slate-600" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-50 lg:p-10 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
