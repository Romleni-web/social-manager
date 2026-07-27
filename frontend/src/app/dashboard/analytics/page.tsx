import React from 'react';
import { Download, Filter, TrendingUp, Users, Eye, MousePointer2 } from 'lucide-react';

const metrics = [
  { label: 'Impressions', value: '425.2k', change: '+18.4%', icon: Eye, color: 'text-blue-400' },
  { label: 'Engagement Rate', value: '3.82%', change: '+2.1%', icon: TrendingUp, color: 'text-blue-500' },
  { label: 'Link Clicks', value: '8,420', change: '+12.5%', icon: MousePointer2, color: 'text-blue-600' },
  { label: 'New Followers', value: '1,240', change: '+5.2%', icon: Users, color: 'text-blue-300' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-slate-400 mt-1">Deep dive into your performance metrics.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl font-semibold text-slate-300 hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl transition-all">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl bg-white/5 ${metric.color}`}>
                <metric.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-slate-400">{metric.label}</span>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold">{metric.value}</h3>
              <span className="text-xs font-bold text-emerald-400 mb-1">{metric.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-8 min-h-[400px]">
          <h2 className="text-xl font-bold mb-8">Audience Growth</h2>
          <div className="h-64 flex items-end justify-between gap-2">
             {/* Simulated Chart Bars */}
             {Array.from({ length: 12 }).map((_, i) => (
               <div key={i} className="flex-1 space-y-2">
                 <div
                   className="w-full bg-blue-600/40 hover:bg-blue-600 transition-all rounded-t-lg"
                   style={{ height: `${Math.random() * 80 + 20}%` }}
                 />
                 <span className="block text-[10px] text-center text-slate-500 font-bold">M{i+1}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-8">
          <h2 className="text-xl font-bold mb-8">Top Performing Posts</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="w-16 h-16 rounded-xl bg-slate-800 shrink-0 overflow-hidden">
                  {/* Image Placeholder */}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">The future of social media is AI-driven content...</p>
                  <div className="flex gap-4 mt-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">12.4k Likes</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">1.2k Shares</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-400">+24%</span>
                  <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">ROI</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
