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
    <div className="h-[calc(100vh-120px)] flex gap-8">
      {/* Sidebar List */}
      <div className="w-96 flex flex-col bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-100 space-y-4">
          <h1 className="text-2xl font-black uppercase italic text-black">Inbox</h1>
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
            <Search className="w-4 h-4 text-slate-400" />
            <input placeholder="Search messages..." className="bg-transparent border-none outline-none text-sm font-bold w-full placeholder:text-slate-400" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.id)}
              className={`w-full p-6 flex gap-4 transition-all border-b border-slate-50 ${
                activeTab === c.id ? 'bg-primary-50 border-l-4 border-l-primary-500' : 'hover:bg-slate-50'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-200 shrink-0 flex items-center justify-center font-black text-slate-500 text-xs">
                {c.name[0]}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-black text-black truncate uppercase">{c.name}</h4>
                  <span className="text-[10px] font-black text-slate-400 uppercase">{c.time}</span>
                </div>
                <p className={`text-xs truncate ${c.unread ? 'text-black font-black' : 'text-slate-500 font-bold'}`}>
                  {c.message}
                </p>
                <div className="mt-3">
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary-600 px-2 py-0.5 bg-primary-100 rounded-md">
                    {c.platform}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-200" />
            <div>
              <h3 className="text-sm font-black text-black uppercase">John Doe</h3>
              <p className="text-[10px] text-primary-600 font-black uppercase tracking-[0.2em]">Online</p>
            </div>
          </div>
          <button className="p-2.5 hover:bg-white rounded-xl text-slate-400 border border-transparent hover:border-slate-200 transition-all"><MoreVertical className="w-5 h-5" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-white">
          <div className="flex justify-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">Today</span>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-2xl bg-slate-100" />
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl rounded-tl-none max-w-md shadow-sm">
              <p className="text-sm text-black font-bold leading-relaxed">Hey, I had a question about the latest post on your Instagram. Is that product available for international shipping?</p>
              <span className="text-[9px] font-black text-slate-400 mt-3 block uppercase tracking-widest">10:42 AM</span>
            </div>
          </div>

          <div className="flex gap-4 flex-row-reverse">
            <div className="w-10 h-10 rounded-2xl bg-black" />
            <div className="bg-primary-500 p-6 rounded-3xl rounded-tr-none max-w-md shadow-lg">
              <p className="text-sm text-white font-bold leading-relaxed">Hi John! Yes, we ship to over 50 countries. You can check the full list on our website.</p>
              <span className="text-[9px] font-black text-primary-100 mt-3 block text-right uppercase tracking-widest">10:45 AM</span>
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-2 pl-6 shadow-sm focus-within:border-primary-500 transition-all">
            <button className="text-slate-400 hover:text-black transition-colors"><ImageIcon className="w-5 h-5" /></button>
            <button className="text-slate-400 hover:text-black transition-colors"><Smile className="w-5 h-5" /></button>
            <input placeholder="Type your message..." className="flex-1 bg-transparent border-none outline-none text-sm font-bold placeholder:text-slate-300" />
            <button className="p-4 bg-black hover:bg-slate-800 text-white rounded-xl transition-all shadow-xl shadow-black/20 active:scale-95">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
