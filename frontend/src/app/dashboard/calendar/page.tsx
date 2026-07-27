import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { cn } from '@/utils/cn';

export default function CalendarPage() {
  const days = Array.from({ length: 35 }, (_, i) => i + 1);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase italic text-black">Content Calendar</h1>
          <p className="text-slate-500 mt-1 font-bold uppercase text-[10px] tracking-widest">Plan and manage your social media schedule.</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex bg-slate-100 rounded-2xl p-1.5 border border-slate-200 shadow-sm">
            <button className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl bg-white text-black shadow-sm">Month</button>
            <button className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl text-slate-500 hover:text-black">Week</button>
            <button className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl text-slate-500 hover:text-black">Day</button>
          </div>
          <button className="flex items-center gap-2 px-8 py-3 bg-black hover:bg-slate-800 text-white font-black uppercase text-xs tracking-widest rounded-2xl transition-all shadow-xl shadow-black/10">
            <Plus className="w-5 h-5" />
            New Post
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[40px] overflow-hidden shadow-sm">
        <div className="flex items-center justify-between p-8 border-b border-slate-100 bg-slate-50/30">
          <h2 className="text-xl font-black uppercase italic text-black">June 2026</h2>
          <div className="flex gap-3">
            <button className="p-3 hover:bg-white rounded-xl border border-slate-200 text-slate-400 hover:text-black hover:shadow-md transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-3 hover:bg-white rounded-xl border border-slate-200 text-slate-400 hover:text-black hover:shadow-md transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 border-b border-slate-100">
          {weekDays.map(day => (
            <div key={day} className="py-6 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50/50">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {days.map(day => (
            <div
              key={day}
              className="min-h-[160px] border-r border-b border-slate-100 p-4 hover:bg-slate-50/50 transition-colors group cursor-pointer relative"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={cn(
                  "text-xs font-black w-8 h-8 flex items-center justify-center rounded-xl transition-all",
                  day === 5 ? "bg-black text-white shadow-lg shadow-black/20" : "text-slate-400 group-hover:text-black"
                )}>
                  {day > 30 ? day - 30 : day}
                </span>
                <button className="opacity-0 group-hover:opacity-100 p-2 bg-slate-100 rounded-lg text-slate-600 hover:bg-black hover:text-white transition-all shadow-sm">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {day === 5 && (
                  <>
                    <div className="text-[9px] font-black bg-primary-50 text-primary-700 border border-primary-100 p-2 rounded-xl truncate shadow-sm uppercase tracking-tight">
                      10:00 AM • Product Launch
                    </div>
                    <div className="text-[9px] font-black bg-slate-50 text-slate-700 border border-slate-100 p-2 rounded-xl truncate shadow-sm uppercase tracking-tight">
                      04:30 PM • Team Update
                    </div>
                  </>
                )}
                {day === 7 && (
                  <div className="text-[9px] font-black bg-primary-50 text-primary-700 border border-primary-100 p-2 rounded-xl truncate shadow-sm uppercase tracking-tight">
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
