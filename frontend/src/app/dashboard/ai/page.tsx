'use client';

import React, { useState } from 'react';
import { Send, Sparkles, User, Bot, Zap, Image as ImageIcon, Layout, MessageSquare } from 'lucide-react';

const suggestions = [
  { icon: MessageSquare, label: 'Generate a Twitter thread about SaaS' },
  { icon: Layout, label: 'Create a 30-day content plan' },
  { icon: ImageIcon, label: 'Suggest image prompts for luxury brand' },
  { icon: Zap, label: 'Optimize my posting schedule' },
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm your AI Social Media Strategist. How can I help you grow your presence today?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "That's a great idea! I'm analyzing your current audience data to generate the most effective campaign for you. Give me a second..."
      }]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
        <p className="text-slate-400 mt-1">Your personal strategist, copywriter, and analyst.</p>
      </div>

      <div className="flex-1 flex gap-8 min-h-0">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  msg.role === 'assistant' ? 'bg-primary-600 text-white' : 'bg-white/10 text-slate-300'
                }`}>
                  {msg.role === 'assistant' ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
                </div>
                <div className={`max-w-[80%] p-4 rounded-3xl ${
                  msg.role === 'assistant' ? 'bg-white/5 border border-white/10 rounded-tl-none' : 'bg-primary-600 text-white rounded-tr-none'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-white/[0.02] border-t border-white/5">
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-2 pl-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-slate-500"
              />
              <button
                onClick={handleSend}
                className="p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-all shadow-lg shadow-primary-600/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Suggestions */}
        <div className="w-80 space-y-6">
          <div className="bg-gradient-to-br from-primary-600/20 to-purple-600/20 border border-primary-500/20 rounded-[32px] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary-400" />
              <h3 className="font-bold">Quick Actions</h3>
            </div>
            <div className="space-y-3">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-3 p-3 text-left text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all group"
                >
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary-600/20 group-hover:text-primary-400 transition-colors">
                    <s.icon className="w-4 h-4" />
                  </div>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[32px] p-6">
            <h3 className="font-bold mb-4">Insights</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Success</p>
                <p className="text-xs text-slate-400">Your recent carousel post on Instagram is performing 40% better than average.</p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1">Recommendation</p>
                <p className="text-xs text-slate-400">Try posting on LinkedIn at 9:00 AM on Tuesdays for maximum reach.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
