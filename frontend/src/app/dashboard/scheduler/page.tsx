'use client';

import React from 'react';
import { Clock, Plus, Loader2, Calendar as CalendarIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { useStore } from '@/store/useStore';
import { format } from 'date-fns';

export default function SchedulerPage() {
  const { activeWorkspaceId, toggleComposer } = useStore();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['scheduled-posts', activeWorkspaceId],
    queryFn: async () => {
      const response = await api.get(`/posts?workspaceId=${activeWorkspaceId}`);
      return response.data;
    },
    enabled: !!activeWorkspaceId
  });

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
      </div>
    );
  }

  const scheduledPosts = posts?.filter((p: any) => p.status === 'SCHEDULED' || p.status === 'PENDING');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase italic text-black">Post Scheduler</h1>
          <p className="text-slate-500 mt-1 font-bold uppercase text-[10px] tracking-widest">Manage your queue and upcoming content.</p>
        </div>
        <button
          onClick={() => toggleComposer(true)}
          className="flex items-center gap-2 px-8 py-3 bg-black hover:bg-slate-800 text-white font-black uppercase text-xs tracking-widest rounded-2xl transition-all shadow-xl shadow-black/10"
        >
          <Plus className="w-5 h-5" />
          Queue New
        </button>
      </div>

      {!scheduledPosts || scheduledPosts.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-[40px] p-20 text-center space-y-6 shadow-sm">
          <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-[28px] flex items-center justify-center mx-auto shadow-sm">
            <Clock className="w-10 h-10 text-slate-300" />
          </div>
          <h2 className="text-xl font-black uppercase italic">Your queue is empty</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] max-w-sm mx-auto leading-loose">Start scheduling posts to see them here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {scheduledPosts.map((post: any) => (
            <div key={post.id} className="bg-white border border-slate-200 rounded-[32px] p-8 flex items-center gap-8 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-100">
                <span className="text-[10px] font-black uppercase text-slate-400">{format(new Date(post.scheduledAt || post.createdAt), 'MMM')}</span>
                <span className="text-xl font-black text-black">{format(new Date(post.scheduledAt || post.createdAt), 'dd')}</span>
              </div>
              <div className="flex-1">
                <p className="font-bold text-black leading-relaxed">{post.content}</p>
                <div className="flex items-center gap-4 mt-3">
                   <span className="text-[9px] font-black uppercase tracking-widest bg-primary-50 text-primary-600 px-2 py-0.5 rounded-md border border-primary-100">
                     {post.status}
                   </span>
                   <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                     <CalendarIcon className="w-3 h-3" />
                     {format(new Date(post.scheduledAt || post.createdAt), 'hh:mm a')}
                   </span>
                </div>
              </div>
              <button className="px-6 py-3 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Edit Post</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
