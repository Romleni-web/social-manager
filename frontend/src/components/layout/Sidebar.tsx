'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  Calendar,
  Clock,
  Sparkles,
  Library,
  Share2,
  Inbox,
  Zap,
  Rss,
  TrendingUp,
  Users,
  Settings,
  X
} from 'lucide-react';
import { cn } from '@/utils/cn';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Calendar, label: 'Calendar', href: '/dashboard/calendar' },
  { icon: Clock, label: 'Scheduler', href: '/dashboard/scheduler' },
  { icon: Sparkles, label: 'AI Assistant', href: '/dashboard/ai' },
  { icon: Library, label: 'Content Library', href: '/dashboard/library' },
  { icon: Share2, label: 'Accounts', href: '/dashboard/accounts' },
  { icon: Inbox, label: 'Inbox', href: '/dashboard/inbox' },
  { icon: Zap, label: 'Automation', href: '/dashboard/automation' },
  { icon: Rss, label: 'RSS Feed', href: '/dashboard/rss' },
  { icon: TrendingUp, label: 'Trending', href: '/dashboard/trending' },
  { icon: Users, label: 'Team', href: '/dashboard/team' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export const Sidebar = ({ isOpen, onClose }: { isOpen?: boolean, onClose?: () => void }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 flex flex-col p-6 transition-transform duration-300 transform lg:relative lg:translate-x-0 shadow-2xl lg:shadow-none",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic">SocialAI</span>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 hover:bg-slate-50 rounded-xl">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-2 custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group",
                  isActive
                    ? "bg-primary-500 text-white shadow-xl shadow-primary-500/20"
                    : "text-slate-500 hover:text-black hover:bg-slate-50"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-white" : "group-hover:text-black"
                )} />
                <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};
