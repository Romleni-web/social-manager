import React from 'react';
import { Zap, Plus } from 'lucide-react';

export default function AutomationPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase italic text-black">Smart Automation</h1>
          <p className="text-slate-500 mt-1 font-bold uppercase text-[10px] tracking-widest">Create rules to automate your social media workflow.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-black hover:bg-slate-800 text-white font-black uppercase text-xs tracking-widest rounded-2xl transition-all shadow-xl shadow-black/10">
          <Plus className="w-5 h-5" />
          Create Rule
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-[40px] p-10 space-y-8 shadow-sm">
          <div className="flex justify-between items-start">
             <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center border border-primary-100 shadow-sm">
                <Zap className="w-8 h-8 text-primary-600" />
             </div>
             <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-400">Inactive</div>
          </div>
          <div>
            <h3 className="text-lg font-black uppercase tracking-tight italic">New Blog Post → LinkedIn</h3>
            <p className="text-sm font-bold text-slate-500 mt-2 leading-relaxed">Automatically create and schedule a LinkedIn post when a new article is published on your blog.</p>
          </div>
          <button className="w-full py-5 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-all">Configure Rule</button>
        </div>

        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] p-10 flex flex-col items-center justify-center gap-6 py-24 hover:bg-white hover:border-black transition-all group cursor-pointer">
           <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:border-black transition-all">
            <Plus className="w-10 h-10 text-slate-300 group-hover:text-black transition-colors" />
           </div>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] group-hover:text-black transition-colors">Add Custom Rule</p>
        </div>
      </div>
    </div>
  );
}
