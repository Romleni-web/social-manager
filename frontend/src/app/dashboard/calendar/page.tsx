import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export default function CalendarPage() {
  const days = Array.from({ length: 35 }, (_, i) => i + 1);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Calendar</h1>
          <p className="text-slate-400 mt-1">Plan and manage your social media schedule.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white/5 rounded-2xl p-1 border border-white/10">
            <button className="px-4 py-2 text-sm font-semibold rounded-xl bg-primary-600 text-white shadow-lg shadow-primary-600/20 transition-all">Month</button>
            <button className="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 hover:text-white transition-all">Week</button>
            <button className="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 hover:text-white transition-all">Day</button>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl transition-all">
            <Plus className="w-5 h-5" />
            New Post
          </button>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-xl font-bold">June 2026</h2>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-white/5 rounded-xl border border-white/10 text-slate-400">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-xl border border-white/10 text-slate-400">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 border-b border-white/5">
          {weekDays.map(day => (
            <div key={day} className="py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 bg-white/[0.02]">
          {days.map(day => (
            <div
              key={day}
              className="min-h-[140px] border-r border-b border-white/5 p-3 hover:bg-white/[0.04] transition-colors group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <span className={cn(
                  "text-sm font-bold w-7 h-7 flex items-center justify-center rounded-lg transition-colors",
                  day === 5 ? "bg-primary-600 text-white" : "text-slate-500 group-hover:text-slate-300"
                )}>
                  {day > 30 ? day - 30 : day}
                </span>
                <button className="opacity-0 group-hover:opacity-100 p-1 bg-white/10 rounded-lg text-white transition-opacity">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                {day === 5 && (
                  <>
                    <div className="text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 p-1.5 rounded-lg truncate">
                      10:00 AM • Product Launch
                    </div>
                    <div className="text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 p-1.5 rounded-lg truncate">
                      04:30 PM • Team Update
                    </div>
                  </>
                )}
                {day === 7 && (
                  <div className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 p-1.5 rounded-lg truncate">
                    09:00 AM • Weekly News
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
