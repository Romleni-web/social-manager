import React from 'react';
import { Download, Filter, TrendingUp, Users, Eye, MousePointer2 } from 'lucide-react';

const metrics = [
  { label: 'Impressions', value: '425.2k', change: '+18.4%', icon: Eye, color: 'text-primary-600' },
  { label: 'Engagement Rate', value: '3.82%', change: '+2.1%', icon: TrendingUp, color: 'text-black' },
  { label: 'Link Clicks', value: '8,420', change: '+12.5%', icon: MousePointer2, color: 'text-primary-500' },
  { label: 'New Followers', value: '1,240', change: '+5.2%', icon: Users, color: 'text-slate-800' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight uppercase italic text-black">Analytics</h1>
          <p className="text-slate-500 mt-1 font-bold uppercase text-[9px] md:text-[10px] tracking-widest">Deep dive into your performance metrics.</p>
        </div>
        <div className="flex w-full sm:w-auto gap-2 md:gap-3">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-white border border-slate-200 rounded-xl md:rounded-2xl font-black uppercase text-[9px] md:text-[10px] tracking-widest text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-3.5 h-3.5 md:w-4 md:h-4" />
            Last 30 Days
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-black hover:bg-slate-800 text-white font-black uppercase text-[9px] md:text-[10px] tracking-widest rounded-xl md:rounded-2xl transition-all shadow-xl shadow-black/10">
            <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 md:p-2.5 rounded-xl bg-slate-50 ${metric.color}`}>
                <metric.icon className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">{metric.label}</span>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-xl md:text-2xl font-black text-black">{metric.value}</h3>
              <span className="text-[9px] md:text-[10px] font-black text-primary-600 mb-1">{metric.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 md:p-8 shadow-sm min-h-[350px] md:min-h-[400px]">
          <h2 className="text-lg md:text-xl font-black uppercase mb-8 text-black">Audience Growth</h2>
          <div className="h-48 md:h-64 flex items-end justify-between gap-2 md:gap-3">
             {/* Simulated Chart Bars */}
             {Array.from({ length: 12 }).map((_, i) => (
               <div key={i} className="flex-1 space-y-3">
                 <div
                   className="w-full bg-primary-100 hover:bg-primary-500 transition-all rounded-t-lg md:rounded-t-xl"
                   style={{ height: `${Math.random() * 80 + 20}%` }}
                 />
                 <span className="block text-[8px] md:text-[9px] text-center text-slate-400 font-black uppercase">M{i+1}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[32px] p-6 md:p-8 shadow-sm">
          <h2 className="text-lg md:text-xl font-black uppercase mb-8 text-black">Top Posts</h2>
          <div className="space-y-4 md:space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all cursor-pointer">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-slate-200 shrink-0 overflow-hidden">
                  {/* Image Placeholder */}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-black text-black truncate uppercase">Future of social media...</p>
                  <div className="flex gap-3 md:gap-4 mt-1.5 md:mt-2">
                    <span className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest text-nowrap">12.4k Likes</span>
                    <span className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest text-nowrap">1.2k Shares</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] md:text-xs font-black text-primary-600">+24%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
