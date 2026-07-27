import React from 'react';
import { Clock, Plus } from 'lucide-react';

export default function SchedulerPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Post Scheduler</h1>
          <p className="text-slate-400 mt-1">Manage your queue and upcoming content.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary-600/20">
          <Plus className="w-5 h-5" />
          Queue New
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-12 text-center space-y-4">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto">
          <Clock className="w-8 h-8 text-slate-500" />
        </div>
        <h2 className="text-xl font-bold">Your queue is empty</h2>
        <p className="text-slate-500 max-w-sm mx-auto">Start scheduling posts to see them here. You can drag and drop them in the calendar view as well.</p>
      </div>
    </div>
  );
}
