'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, Plus, Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { useStore } from '@/store/useStore';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

export default function CalendarPage() {
  const { activeWorkspaceId, toggleComposer } = useStore();
  const today = new Date();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['calendar-posts', activeWorkspaceId],
    queryFn: async () => {
      const response = await api.get(`/posts?workspaceId=${activeWorkspaceId}`);
      return response.data;
    },
    enabled: !!activeWorkspaceId
  });

  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase italic text-black">Content Calendar</h1>
          <p className="text-slate-500 mt-1 font-bold uppercase text-[10px] tracking-widest">Plan and manage your social media schedule.</p>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => toggleComposer(true)}
            className="flex items-center gap-2 px-8 py-3 bg-black hover:bg-slate-800 text-white font-black uppercase text-xs tracking-widest rounded-2xl transition-all shadow-xl shadow-black/10"
          >
            <Plus className="w-5 h-5" />
            New Post
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[40px] overflow-hidden shadow-sm">
        <div className="flex items-center justify-between p-8 border-b border-slate-100 bg-slate-50/30">
          <h2 className="text-xl font-black uppercase italic text-black">{format(today, 'MMMM yyyy')}</h2>
          <div className="flex gap-3">
            <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-black hover:shadow-md transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-black hover:shadow-md transition-all">
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
          {calendarDays.map((day, idx) => {
            const dayPosts = posts?.filter((p: any) => isSameDay(new Date(p.scheduledAt || p.createdAt), day));

            return (
              <div
                key={idx}
                className="min-h-[160px] border-r border-b border-slate-100 p-4 hover:bg-slate-50/50 transition-colors group cursor-pointer relative"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={cn(
                    "text-xs font-black w-8 h-8 flex items-center justify-center rounded-xl transition-all",
                    isSameDay(day, today) ? "bg-black text-white shadow-lg" : "text-slate-400 group-hover:text-black"
                  )}>
                    {format(day, 'd')}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {dayPosts?.map((post: any) => (
                    <div key={post.id} className="text-[9px] font-black bg-primary-50 text-primary-700 border border-primary-100 p-2 rounded-lg truncate shadow-sm uppercase tracking-tight">
                      {format(new Date(post.scheduledAt || post.createdAt), 'HH:mm')} • {post.content}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
