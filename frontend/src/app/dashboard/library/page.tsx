'use client';

import React from 'react';
import { Search, Upload, Filter, Grid, List, FolderPlus, MoreVertical, Image as ImageIcon, Film, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { useStore } from '@/store/useStore';
import { formatDistanceToNow } from 'date-fns';

export default function ContentLibraryPage() {
  const { activeWorkspaceId } = useStore();
  const queryClient = useQueryClient();

  const { data: media, isLoading } = useQuery({
    queryKey: ['media-library', activeWorkspaceId],
    queryFn: async () => {
      const response = await api.get(`/media?workspaceId=${activeWorkspaceId}`);
      return response.data;
    },
    enabled: !!activeWorkspaceId
  });

  const uploadMutation = useMutation({
    mutationFn: async () => {
      // Simulate file upload
      const response = await api.post('/media/upload', {
        workspaceId: activeWorkspaceId,
        name: `Asset ${Date.now()}.jpg`,
        url: 'https://placeholder.com/image.jpg',
        type: 'image',
        size: Math.floor(Math.random() * 5000000)
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media-library'] });
    }
  });

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight uppercase italic text-black">Content Library</h1>
          <p className="text-slate-500 mt-1 font-bold uppercase text-[9px] md:text-[10px] tracking-widest">Centralize your brand assets and media.</p>
        </div>
        <div className="flex w-full sm:w-auto gap-2 md:gap-4">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-white border border-slate-200 rounded-xl md:rounded-2xl font-black uppercase text-[9px] md:text-[10px] tracking-widest text-slate-600 hover:bg-slate-50 transition-colors">
            <FolderPlus className="w-3.5 h-3.5 md:w-4 md:h-4" />
            New
          </button>
          <button
            onClick={() => uploadMutation.mutate()}
            disabled={uploadMutation.isPending}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-8 py-2.5 md:py-3 bg-black hover:bg-slate-800 text-white font-black uppercase text-[9px] md:text-[10px] tracking-widest rounded-xl md:rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2"
          >
            {uploadMutation.isPending ? <Loader2 className="w-3.5 h-3.5 md:w-4 md:h-4 animate-spin" /> : <Upload className="w-3.5 h-3.5 md:w-4 md:h-4" />}
            Upload
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6 bg-white border border-slate-200 rounded-2xl md:rounded-[32px] p-2 pr-4 md:pr-8 shadow-sm">
        <div className="flex-1 flex items-center gap-3 md:gap-4 pl-3 md:pl-6">
          <Search className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />
          <input
            placeholder="Search assets..."
            className="flex-1 bg-transparent border-none outline-none text-xs md:text-sm font-bold py-3 md:py-4 placeholder:text-slate-300 min-w-0"
          />
        </div>
      </div>

      {media?.length === 0 ? (
        <div className="py-12 md:py-20 text-center bg-slate-50 rounded-[32px] md:rounded-[40px] border-2 border-dashed border-slate-200">
           <ImageIcon className="w-12 h-12 md:w-16 md:h-16 text-slate-300 mx-auto mb-4" />
           <h3 className="font-black uppercase text-slate-400 tracking-widest text-sm">Library is empty</h3>
           <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase">Upload your first asset</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-8">
          {media?.map((item: any) => (
            <div key={item.id} className="group relative bg-white border border-slate-200 rounded-[32px] overflow-hidden hover:shadow-2xl transition-all">
              <div className="aspect-square bg-slate-50 flex items-center justify-center relative overflow-hidden">
                {item.type === 'image' ? (
                  <ImageIcon className="w-12 h-12 text-slate-200 group-hover:scale-110 transition-all duration-700" />
                ) : (
                  <Film className="w-12 h-12 text-slate-200 group-hover:scale-110 transition-all duration-700" />
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                  <button className="p-3 bg-white text-black rounded-xl hover:bg-primary-500 hover:text-white transition-all shadow-xl">
                    <Upload className="w-5 h-5 rotate-180" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs font-black text-black truncate mb-2 uppercase tracking-tight">{item.name}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{(item.size / 1024 / 1024).toFixed(1)} MB</span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{formatDistanceToNow(new Date(item.createdAt))} ago</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
