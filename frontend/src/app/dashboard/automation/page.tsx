import React from 'react';
import { Zap, Plus, Play } from 'lucide-react';

export default function AutomationPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Smart Automation</h1>
          <p className="text-slate-400 mt-1">Create rules to automate your social media workflow.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary-600/20">
          <Plus className="w-5 h-5" />
          Create Rule
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-8 space-y-6 opacity-50 grayscale">
          <div className="flex justify-between items-start">
             <div className="w-12 h-12 bg-primary-600/20 rounded-2xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary-500" />
             </div>
             <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase">Inactive</div>
          </div>
          <div>
            <h3 className="text-lg font-bold">New Blog Post → LinkedIn</h3>
            <p className="text-sm text-slate-500 mt-1">Automatically create and schedule a LinkedIn post when a new article is published on your blog.</p>
          </div>
          <button className="w-full py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold uppercase">Configure Rule</button>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-8 border-dashed flex flex-col items-center justify-center gap-4 py-20">
           <Plus className="w-10 h-10 text-slate-700" />
           <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Add Custom Rule</p>
        </div>
      </div>
    </div>
  );
}
