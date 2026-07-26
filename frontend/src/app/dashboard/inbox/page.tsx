'use client';

import React, { useState } from 'react';
import { Search, Filter, Send, MoreVertical, Image as ImageIcon, Smile } from 'lucide-react';

const conversations = [
  { id: 1, name: 'John Doe', message: 'Hey, I had a question about the latest post...', time: '12m', unread: true, platform: 'instagram' },
  { id: 2, name: 'Marketing Team', message: 'The new campaign looks great!', time: '1h', unread: false, platform: 'linkedin' },
  { id: 3, name: 'Sarah Smith', message: 'When is the next sale starting?', time: '3h', unread: false, platform: 'facebook' },
  { id: 4, name: 'Tech Guru', message: 'Just shared your post on my story.', time: '5h', unread: false, platform: 'twitter' },
];

export default function InboxPage() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="h-[calc(100vh-120px)] flex gap-6">
      {/* Sidebar List */}
      <div className="w-96 flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] overflow-hidden">
        <div className="p-6 border-b border-white/5 space-y-4">
          <h1 className="text-2xl font-bold">Inbox</h1>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-2">
            <Search className="w-4 h-4 text-slate-500" />
            <input placeholder="Search messages..." className="bg-transparent border-none outline-none text-sm w-full" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.id)}
              className={`w-full p-6 flex gap-4 transition-all border-b border-white/[0.02] ${
                activeTab === c.id ? 'bg-primary-600/10 border-l-4 border-l-primary-600' : 'hover:bg-white/[0.02]'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-800 shrink-0 flex items-center justify-center font-bold text-slate-400">
                {c.name[0]}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-bold truncate">{c.name}</h4>
                  <span className="text-[10px] font-medium text-slate-500">{c.time}</span>
                </div>
                <p className={`text-xs truncate ${c.unread ? 'text-white font-semibold' : 'text-slate-500'}`}>
                  {c.message}
                </p>
                <div className="mt-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-primary-400 px-1.5 py-0.5 bg-primary-400/10 rounded-md">
                    {c.platform}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800" />
            <div>
              <h3 className="text-sm font-bold">John Doe</h3>
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Online</p>
            </div>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-xl text-slate-400"><MoreVertical className="w-5 h-5" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-white/[0.01]">
          <div className="flex justify-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">Today</span>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-slate-800" />
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none max-w-md">
              <p className="text-sm text-slate-300">Hey, I had a question about the latest post on your Instagram. Is that product available for international shipping?</p>
              <span className="text-[10px] text-slate-500 mt-2 block">10:42 AM</span>
            </div>
          </div>

          <div className="flex gap-4 flex-row-reverse">
            <div className="w-8 h-8 rounded-lg bg-primary-600" />
            <div className="bg-primary-600 p-4 rounded-2xl rounded-tr-none max-w-md">
              <p className="text-sm text-white font-medium">Hi John! Yes, we ship to over 50 countries. You can check the full list on our website.</p>
              <span className="text-[10px] text-primary-200 mt-2 block text-right">10:45 AM</span>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-2 pl-4">
            <button className="text-slate-500 hover:text-white"><ImageIcon className="w-5 h-5" /></button>
            <button className="text-slate-500 hover:text-white"><Smile className="w-5 h-5" /></button>
            <input placeholder="Type your message..." className="flex-1 bg-transparent border-none outline-none text-sm" />
            <button className="p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-all shadow-lg shadow-primary-600/20">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
