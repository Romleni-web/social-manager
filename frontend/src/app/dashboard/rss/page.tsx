import React from 'react';
import { Rss, Plus, RefreshCw } from 'lucide-react';

export default function RSSPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">RSS Feeds</h1>
          <p className="text-slate-400 mt-1">Connect your favorite news sources and blogs.</p>
        </div>
        <div className="flex gap-3">
          <button className="p-2.5 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white transition-colors">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary-600/20">
            <Plus className="w-5 h-5" />
            Add Feed
          </button>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-12 text-center space-y-4">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto">
          <Rss className="w-8 h-8 text-slate-500" />
        </div>
        <h2 className="text-xl font-bold">No RSS feeds connected</h2>
        <p className="text-slate-500 max-w-sm mx-auto">Stay up to date with your industry by connecting RSS feeds from your favorite websites.</p>
      </div>
    </div>
  );
}
