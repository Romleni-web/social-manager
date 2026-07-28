'use client';

import React from 'react';
import {
  Users,
  MousePointer2,
  BarChart2,
  TrendingUp,
  Calendar,
  CheckCircle2,
  FileText,
  AlertCircle,
  Cpu,
  Database,
  Loader2
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { useStore } from '@/store/useStore';

export default function OverviewPage() {
  const { activeWorkspaceId, user } = useStore();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['overview-stats', activeWorkspaceId],
    queryFn: async () => {
      const response = await api.get(`/dashboard/overview?workspaceId=${activeWorkspaceId}`);
      return response.data;
    },
    enabled: !!activeWorkspaceId
  });

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
      </div>
    );
  }

  const mainStats = [
    { label: 'Total Followers', value: '128.4k', change: '+12%', icon: Users, color: 'text-primary-600' },
    { label: 'Avg Engagement', value: '4.2%', change: '+0.8%', icon: BarChart2, color: 'text-primary-500' },
    { label: 'Total Reach', value: '1.2M', change: '+24%', icon: TrendingUp, color: 'text-black' },
    { label: 'Connected Accounts', value: stats?.accounts || 0, change: 'Active', icon: MousePointer2, color: 'text-primary-400' },
  ];

  const postStats = [
    { label: 'Scheduled', value: stats?.scheduled || 0, icon: Calendar, color: 'text-slate-400' },
    { label: 'Published', value: stats?.published || 0, icon: CheckCircle2, color: 'text-primary-500' },
    { label: 'Drafts', value: stats?.drafts || 0, icon: FileText, color: 'text-slate-400' },
    { label: 'Failed', value: stats?.failed || 0, icon: AlertCircle, color: 'text-rose-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight uppercase italic">Overview</h1>
        <p className="text-slate-500 mt-1 font-bold uppercase text-[10px] tracking-widest">Welcome back, {user?.name}. Here's what's happening.</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {mainStats.map((stat) => (
          <div key={stat.label} className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2.5 md:p-3 rounded-2xl bg-slate-50 ${stat.color}`}>
                <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className="text-[9px] md:text-[10px] font-black text-primary-600 bg-primary-50 px-2 py-1 rounded-lg uppercase">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-xl md:text-2xl font-black mt-1 text-black">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[32px] p-6 md:p-8">
          <h2 className="text-lg md:text-xl font-black mb-6 uppercase text-black">Posting Activity</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            {postStats.map((stat) => (
              <div key={stat.label}>
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${stat.color}`} />
                  <span className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">{stat.label}</span>
                </div>
                <p className="text-xl md:text-2xl font-black text-black">{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="h-48 md:h-64 bg-slate-50 rounded-2xl mt-8 flex items-center justify-center border-2 border-dashed border-slate-200">
            <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest px-4 text-center">Growth Analytics Chart</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[32px] p-6 md:p-8">
          <h2 className="text-lg md:text-xl font-black mb-6 uppercase text-black">Usage & Limits</h2>
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-primary-600" />
                  <span className="font-bold text-sm uppercase">AI Credits</span>
                </div>
                <span className="text-xs font-bold text-slate-500">{user?.creditsRemaining || 0} / 1000</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-500 transition-all duration-1000"
                  style={{ width: `${((user?.creditsRemaining || 0) / 1000) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-10 p-6 rounded-[24px] bg-black text-white">
            <h4 className="text-sm font-black uppercase tracking-widest text-primary-400">Upgrade to Pro</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">Get unlimited AI credits and 50GB storage.</p>
            <button className="w-full mt-6 bg-primary-500 hover:bg-primary-600 text-white text-xs font-black uppercase tracking-widest py-3 rounded-xl transition-all shadow-lg">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
