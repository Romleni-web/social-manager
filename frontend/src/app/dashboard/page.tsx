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
  { label: 'Total Followers', value: '128.4k', change: '+12%', icon: Users, color: 'text-blue-500' },
  { label: 'Avg Engagement', value: '4.2%', change: '+0.8%', icon: BarChart2, color: 'text-blue-400' },
  { label: 'Total Reach', value: '1.2M', change: '+24%', icon: TrendingUp, color: 'text-blue-600' },
  { label: 'Link Clicks', value: '14.2k', change: '+5%', icon: MousePointer2, color: 'text-blue-300' },
];

const postStats = [
  { label: 'Scheduled', value: '24', icon: Calendar, color: 'text-blue-400' },
  { label: 'Published', value: '1,420', icon: CheckCircle2, color: 'text-blue-500' },
  { label: 'Drafts', value: '12', icon: FileText, color: 'text-slate-400' },
  { label: 'Failed', value: '2', icon: AlertCircle, color: 'text-blue-800' },
];

const usageStats = [
  { label: 'AI Credits', value: '840/1000', icon: Cpu, color: 'text-blue-400', progress: 84 },
  { label: 'Storage', value: '1.2GB/5GB', icon: Database, color: 'text-blue-600', progress: 24 },
];

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-slate-400 mt-1">Welcome back. Here's what's happening across your accounts.</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Post Summary */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-6">Posting Activity</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {postStats.map((stat) => (
              <div key={stat.label}>
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-slate-400 text-sm">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
          {/* Placeholder for a chart */}
          <div className="h-64 bg-white/5 rounded-2xl mt-8 flex items-center justify-center border border-dashed border-white/10">
            <span className="text-slate-500 italic">Engagement Chart Placeholder</span>
          </div>
        </div>

        {/* Usage & Limits */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-6">Usage & Limits</h2>
          <div className="space-y-8">
            {usageStats.map((stat) => (
              <div key={stat.label} className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    <span className="font-medium">{stat.label}</span>
                  </div>
                  <span className="text-sm text-slate-400">{stat.value}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-primary-600 to-primary-400 transition-all duration-1000`}
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-4 rounded-2xl bg-primary-600/10 border border-primary-600/20">
            <h4 className="text-sm font-semibold text-primary-400">Upgrade to Pro</h4>
            <p className="text-xs text-slate-400 mt-1">Get unlimited AI credits and 50GB storage.</p>
            <button className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold py-2 rounded-xl transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
