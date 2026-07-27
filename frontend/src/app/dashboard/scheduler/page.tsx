import React from 'react';
import { Clock, Plus } from 'lucide-react';

export default function SchedulerPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase italic text-black">Post Scheduler</h1>
          <p className="text-slate-500 mt-1 font-bold uppercase text-[10px] tracking-widest">Manage your queue and upcoming content.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-black hover:bg-slate-800 text-white font-black uppercase text-xs tracking-widest rounded-2xl transition-all shadow-xl shadow-black/10">
          <Plus className="w-5 h-5" />
          Queue New
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-[40px] p-20 text-center space-y-6 shadow-sm">
        <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-[28px] flex items-center justify-center mx-auto shadow-sm">
          <Clock className="w-10 h-10 text-slate-300" />
        </div>
        <h2 className="text-xl font-black uppercase italic">Your queue is empty</h2>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] max-w-sm mx-auto leading-loose">Start scheduling posts to see them here. You can drag and drop them in the calendar view as well.</p>
      </div>
    </div>
  );
}
