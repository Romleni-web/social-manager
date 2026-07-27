import React from 'react';
import { Plus, CheckCircle2, Shield, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

const platforms = [
  { id: 'facebook', name: 'Facebook', icon: 'F', color: 'bg-[#1877F2]', connected: true, accounts: 2 },
  { id: 'instagram', name: 'Instagram', icon: 'I', color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]', connected: true, accounts: 1 },
  { id: 'twitter', name: 'X (Twitter)', icon: 'X', color: 'bg-black', connected: false, accounts: 0 },
  { id: 'linkedin', name: 'LinkedIn', icon: 'L', color: 'bg-[#0A66C2]', connected: true, accounts: 1 },
  { id: 'tiktok', name: 'TikTok', icon: 'T', color: 'bg-[#000000]', connected: false, accounts: 0 },
  { id: 'youtube', name: 'YouTube', icon: 'Y', color: 'bg-[#FF0000]', connected: false, accounts: 0 },
  { id: 'pinterest', name: 'Pinterest', icon: 'P', color: 'bg-[#E60023]', connected: false, accounts: 0 },
  { id: 'threads', name: 'Threads', icon: '@', color: 'bg-black', connected: false, accounts: 0 },
  { id: 'bluesky', name: 'Bluesky', icon: 'B', color: 'bg-[#0560ff]', connected: false, accounts: 0 },
  { id: 'mastodon', name: 'Mastodon', icon: 'M', color: 'bg-[#6364ff]', connected: false, accounts: 0 },
];

export default function AccountsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase italic text-black">Social Accounts</h1>
          <p className="text-slate-500 mt-1 font-bold uppercase text-[10px] tracking-widest">Manage and connect your social media profiles.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-black hover:bg-slate-800 text-white font-black uppercase text-xs tracking-widest rounded-2xl transition-all shadow-xl shadow-black/10">
          <Plus className="w-5 h-5" />
          Connect New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <div key={platform.id} className="group bg-white border border-slate-200 rounded-[32px] p-6 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className={cn(
                "w-14 h-14 rounded-[20px] flex items-center justify-center text-2xl font-black text-white shadow-xl shadow-black/20",
                platform.color
              )}>
                {platform.icon}
              </div>
              {platform.connected ? (
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
                  {platform.connected
                    ? `${platform.accounts} account${platform.accounts > 1 ? 's' : ''} linked`
                    : 'Reach more audience by connecting'}
                </p>
              </div>

              {platform.connected ? (
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors">Manage Accounts</button>
                  <button className="p-2 hover:bg-rose-50 rounded-xl text-slate-400 hover:text-rose-500 transition-all">
                    <Shield className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button className="w-full py-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-black transition-all active:scale-95">
                  Connect {platform.name}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
