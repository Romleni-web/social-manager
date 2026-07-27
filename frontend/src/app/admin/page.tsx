import React from 'react';
import { Users, CreditCard, Share2, Activity, ShieldAlert, Cpu } from 'lucide-react';

const stats = [
  { label: 'Total Users', value: '1,284', change: '+12%', icon: Users, color: 'text-blue-400' },
  { label: 'Active Subscriptions', value: '420', change: '+5%', icon: CreditCard, color: 'text-emerald-400' },
  { label: 'Total Posts Created', value: '14,200', change: '+18%', icon: Share2, color: 'text-purple-400' },
  { label: 'System Uptime', value: '99.9%', change: 'Stable', icon: Activity, color: 'text-amber-400' },
];

export default function AdminOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight">System Overview</h1>
        <p className="text-slate-500 mt-1">Real-time platform performance and management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-slate-800/50 border border-white/5 rounded-3xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-black mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-800/50 border border-white/5 rounded-[32px] p-8">
          <h2 className="text-xl font-black mb-6 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            Security Alerts
          </h2>
          <div className="space-y-4">
             <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 flex items-center justify-between">
               <div>
                 <p className="text-sm font-bold">Failed Login Attempts</p>
                 <p className="text-xs text-slate-500">12 attempts from IP 192.168.1.1</p>
               </div>
               <button className="text-[10px] font-bold uppercase text-rose-500">Block IP</button>
             </div>
             <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-between">
               <div>
                 <p className="text-sm font-bold">Unusual AI Activity</p>
                 <p className="text-xs text-slate-500">User 'alex@test.com' generated 50 posts in 1 min</p>
               </div>
               <button className="text-[10px] font-bold uppercase text-amber-500">Inspect</button>
             </div>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-white/5 rounded-[32px] p-8">
          <h2 className="text-xl font-black mb-6 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-500" />
            Infrastructure
          </h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase text-slate-500">
                <span>CPU Usage</span>
                <span>42%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[42%]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase text-slate-500">
                <span>Memory</span>
                <span>2.4GB / 8GB</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-[30%]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase text-slate-500">
                <span>Storage (MinIO)</span>
                <span>124GB / 500GB</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[24%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
