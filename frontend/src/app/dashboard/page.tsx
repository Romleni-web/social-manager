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
  Database
} from 'lucide-react';

const stats = [
  { label: 'Total Followers', value: '128.4k', change: '+12%', icon: Users, color: 'text-primary-600' },
  { label: 'Avg Engagement', value: '4.2%', change: '+0.8%', icon: BarChart2, color: 'text-primary-500' },
  { label: 'Total Reach', value: '1.2M', change: '+24%', icon: TrendingUp, color: 'text-black' },
  { label: 'Link Clicks', value: '14.2k', change: '+5%', icon: MousePointer2, color: 'text-primary-400' },
];

const postStats = [
  { label: 'Scheduled', value: '24', icon: Calendar, color: 'text-slate-400' },
  { label: 'Published', value: '1,420', icon: CheckCircle2, color: 'text-primary-500' },
  { label: 'Drafts', value: '12', icon: FileText, color: 'text-slate-400' },
  { label: 'Failed', value: '2', icon: AlertCircle, color: 'text-rose-500' },
];

const usageStats = [
  { label: 'AI Credits', value: '840/1000', icon: Cpu, color: 'text-primary-500', progress: 84 },
  { label: 'Storage', value: '1.2GB/5GB', icon: Database, color: 'text-black', progress: 24 },
];

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight uppercase">Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back. Here's what's happening across your accounts.</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-slate-50 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-primary-600 bg-primary-500/10 px-2 py-1 rounded-lg uppercase">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-black mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Post Summary */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[32px] p-8">
          <h2 className="text-xl font-black mb-6 uppercase">Posting Activity</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {postStats.map((stat) => (
              <div key={stat.label}>
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</span>
                </div>
                <p className="text-2xl font-black">{stat.value}</p>
              </div>
            ))}
          </div>
          {/* Placeholder for a chart */}
          <div className="h-64 bg-slate-50 rounded-2xl mt-8 flex items-center justify-center border-2 border-dashed border-slate-200">
            <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">Engagement Chart Placeholder</span>
          </div>
        </div>

        {/* Usage & Limits */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-8">
          <h2 className="text-xl font-black mb-6 uppercase">Usage & Limits</h2>
          <div className="space-y-8">
            {usageStats.map((stat) => (
              <div key={stat.label} className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    <span className="font-bold text-sm uppercase">{stat.label}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500">{stat.value}</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-primary-500 transition-all duration-1000`}
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-[24px] bg-black text-white">
            <h4 className="text-sm font-black uppercase tracking-widest text-primary-400">Upgrade to Pro</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">Get unlimited AI credits and 50GB storage.</p>
            <button className="w-full mt-6 bg-primary-500 hover:bg-primary-600 text-white text-xs font-black uppercase tracking-widest py-3 rounded-xl transition-all shadow-lg shadow-primary-500/20">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
