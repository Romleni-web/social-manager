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
          <h1 className="text-3xl font-bold tracking-tight">Content Library</h1>
          <p className="text-slate-400 mt-1">Centralize your brand assets and media.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl font-semibold text-slate-300 hover:bg-white/10 transition-colors">
            <FolderPlus className="w-4 h-4" />
            New Folder
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary-600/20">
            <Upload className="w-4 h-4" />
            Upload Media
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-[24px] p-2 pr-6">
        <div className="flex-1 flex items-center gap-3 pl-4">
          <Search className="w-5 h-5 text-slate-500" />
          <input
            placeholder="Search media, folders, tags..."
            className="flex-1 bg-transparent border-none outline-none text-sm py-3"
          />
        </div>
        <div className="h-6 w-px bg-white/10 mx-2" />
        <div className="flex gap-1">
          <button className="p-2 bg-white/10 rounded-xl text-primary-400"><Grid className="w-5 h-5" /></button>
          <button className="p-2 hover:bg-white/5 rounded-xl text-slate-500"><List className="w-5 h-5" /></button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-xl text-sm font-semibold text-slate-400 transition-colors ml-4">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {mediaItems.map((item) => (
          <div key={item.id} className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-primary-500/50 transition-all">
            <div className="aspect-square bg-slate-900 flex items-center justify-center relative overflow-hidden">
               {item.type === 'image' ? (
                 <ImageIcon className="w-10 h-10 text-slate-700 group-hover:scale-110 transition-transform duration-500" />
               ) : (
                 <Film className="w-10 h-10 text-slate-700 group-hover:scale-110 transition-transform duration-500" />
               )}
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                 <button className="p-2 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-primary-600 transition-colors">
                   <Upload className="w-4 h-4 rotate-180" />
                 </button>
                 <button className="p-2 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-rose-600 transition-colors">
                   <MoreVertical className="w-4 h-4" />
                 </button>
               </div>
            </div>
            <div className="p-4">
              <p className="text-xs font-bold truncate mb-1">{item.name}</p>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase">{item.size}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
