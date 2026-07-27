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
  Settings
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

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-black border-r border-white/10 flex flex-col p-4">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
          <Sparkles className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-bold tracking-tight">SocialAI</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-primary-600/10 text-primary-500 shadow-[inset_0_0_0_1px_rgba(139,92,246,0.2)]"
                  : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-primary-500" : "group-hover:text-slate-100"
              )} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
