'use client';

import React from 'react';
import { Plus, CheckCircle2, Shield, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { useStore } from '@/store/useStore';

const platforms = [
  { id: 'facebook', name: 'Facebook', icon: 'F', color: 'bg-[#1877F2]' },
  { id: 'instagram', name: 'Instagram', icon: 'I', color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]' },
  { id: 'twitter', name: 'X (Twitter)', icon: 'X', color: 'bg-black' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'L', color: 'bg-[#0A66C2]' },
  { id: 'tiktok', name: 'TikTok', icon: 'T', color: 'bg-[#000000]' },
];

export default function AccountsPage() {
  const { activeWorkspaceId } = useStore();
  const queryClient = useQueryClient();

  const { data: accounts, isLoading } = useQuery({
    queryKey: ['social-accounts', activeWorkspaceId],
    queryFn: async () => {
      const response = await api.get(`/social/accounts?workspaceId=${activeWorkspaceId}`);
      return response.data;
    },
    enabled: !!activeWorkspaceId
  });

  const connectMutation = useMutation({
    mutationFn: async (platform: string) => {
      const response = await api.post('/social/connect', {
        platform,
        workspaceId: activeWorkspaceId
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-accounts'] });
      alert('Account connected successfully!');
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
          <h1 className="text-2xl md:text-3xl font-black tracking-tight uppercase italic text-black">Social Accounts</h1>
          <p className="text-slate-500 mt-1 font-bold uppercase text-[9px] md:text-[10px] tracking-widest">Manage and connect your social media profiles.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {platforms.map((platform) => {
          const connectedAccount = accounts?.find((a: any) => a.platform.toLowerCase() === platform.id);

          return (
            <div key={platform.id} className="group bg-white border border-slate-200 rounded-[32px] p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className={cn(
                  "w-14 h-14 rounded-[20px] flex items-center justify-center text-2xl font-black text-white shadow-xl shadow-black/20",
                  platform.color
                )}>
                  {platform.icon}
                </div>
                {connectedAccount ? (
                  <div className="flex items-center gap-1.5 bg-primary-50 text-primary-600 px-3 py-1 rounded-full border border-primary-100">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-wider">Connected</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 bg-slate-50 text-slate-400 px-3 py-1 rounded-full border border-slate-100">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-wider">Not Linked</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-black uppercase text-black">{platform.name}</h3>
                  <p className="text-xs font-bold text-slate-500 mt-1">
                    {connectedAccount
                      ? `Successfully linked to ${connectedAccount.name}`
                      : 'Reach more audience by connecting'}
                  </p>
                </div>

                {connectedAccount ? (
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors">Manage Account</button>
                    <button className="p-2 hover:bg-rose-50 rounded-xl text-slate-400 hover:text-rose-500 transition-all">
                      <Shield className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => connectMutation.mutate(platform.id)}
                    disabled={connectMutation.isPending}
                    className="w-full py-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-black transition-all flex items-center justify-center gap-2"
                  >
                    {connectMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : `Connect ${platform.name}`}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
