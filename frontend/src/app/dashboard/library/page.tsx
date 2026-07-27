import React from 'react';
import { Search, Upload, Filter, Grid, List, FolderPlus, MoreVertical, Image as ImageIcon, Film } from 'lucide-react';

const mediaItems = [
  { id: 1, type: 'image', name: 'Summer Campaign.jpg', size: '2.4 MB', date: '2 hours ago' },
  { id: 2, type: 'video', name: 'Product Demo.mp4', size: '45.8 MB', date: 'Yesterday' },
  { id: 3, type: 'image', name: 'Team Photo.png', size: '1.1 MB', date: 'Jun 12, 2026' },
  { id: 4, type: 'image', name: 'Logo Light.svg', size: '12 KB', date: 'Jun 10, 2026' },
  { id: 5, type: 'video', name: 'Behind the Scenes.mov', size: '128 MB', date: 'Jun 08, 2026' },
  { id: 6, type: 'image', name: 'Instagram Story.jpg', size: '840 KB', date: 'Jun 05, 2026' },
];

export default function ContentLibraryPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase italic text-black">Content Library</h1>
          <p className="text-slate-500 mt-1 font-bold uppercase text-[10px] tracking-widest">Centralize your brand assets and media.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black uppercase text-[10px] tracking-widest text-slate-600 hover:bg-slate-50 transition-colors">
            <FolderPlus className="w-4 h-4" />
            New Folder
          </button>
          <button className="flex items-center gap-2 px-8 py-3 bg-black hover:bg-slate-800 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl transition-all shadow-xl shadow-black/10">
            <Upload className="w-4 h-4" />
            Upload Media
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6 bg-white border border-slate-200 rounded-[32px] p-2 pr-8 shadow-sm">
        <div className="flex-1 flex items-center gap-4 pl-6">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            placeholder="Search media, folders, tags..."
            className="flex-1 bg-transparent border-none outline-none text-sm font-bold py-4 placeholder:text-slate-300"
          />
        </div>
        <div className="h-8 w-px bg-slate-100 mx-2" />
        <div className="flex gap-2">
          <button className="p-3 bg-slate-50 text-primary-600 rounded-xl border border-slate-100"><Grid className="w-5 h-5" /></button>
          <button className="p-3 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors"><List className="w-5 h-5" /></button>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 hover:bg-slate-50 border border-transparent hover:border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 transition-all ml-4">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
        {mediaItems.map((item) => (
          <div key={item.id} className="group relative bg-white border border-slate-200 rounded-[32px] overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 hover:border-primary-500 transition-all">
            <div className="aspect-square bg-slate-50 flex items-center justify-center relative overflow-hidden">
               {item.type === 'image' ? (
                 <ImageIcon className="w-12 h-12 text-slate-200 group-hover:scale-110 group-hover:text-primary-200 transition-all duration-700" />
               ) : (
                 <Film className="w-12 h-12 text-slate-200 group-hover:scale-110 group-hover:text-primary-200 transition-all duration-700" />
               )}
               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                 <button className="p-3 bg-white text-black rounded-xl hover:bg-primary-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 shadow-xl">
                   <Upload className="w-5 h-5 rotate-180" />
                 </button>
                 <button className="p-3 bg-white text-black rounded-xl hover:bg-rose-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 delay-75 shadow-xl">
                   <MoreVertical className="w-5 h-5" />
                 </button>
               </div>
            </div>
            <div className="p-6">
              <p className="text-xs font-black text-black truncate mb-2 uppercase tracking-tight">{item.name}</p>
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.size}</span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
