'use client';

import React, { useState } from 'react';
import { Send, Sparkles, User, Bot, Zap, Image as ImageIcon, Layout, MessageSquare, Loader2 } from 'lucide-react';
import api from '@/lib/api';

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
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await api.post('/ai/generate', {
        prompt: input,
        platform: 'all',
        tone: 'professional'
      });

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.data.content
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm sorry, I encountered an error while generating content. Please check your API credits."
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight uppercase italic">AI Assistant</h1>
        <p className="text-slate-500 mt-1 font-bold uppercase text-[10px] tracking-widest">Your personal strategist, copywriter, and analyst.</p>
      </div>

      <div className="flex-1 flex gap-8 min-h-0">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-slate-50 border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
          <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                  msg.role === 'assistant' ? 'bg-primary-500 text-white' : 'bg-black text-white'
                }`}>
                  {msg.role === 'assistant' ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
                </div>
                <div className={`max-w-[80%] p-4 rounded-3xl font-bold text-sm leading-relaxed ${
                  msg.role === 'assistant' ? 'bg-white border border-slate-200 text-black rounded-tl-none' : 'bg-primary-500 text-white rounded-tr-none'
                }`}>
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-primary-500 text-white flex items-center justify-center shrink-0 animate-pulse">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-3xl rounded-tl-none">
                  <Loader2 className="w-5 h-5 animate-spin text-primary-500" />
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white border-t border-slate-200">
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-2 pl-4 focus-within:border-primary-500 transition-colors">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent border-none outline-none text-sm font-bold placeholder:text-slate-400"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="p-3 bg-black hover:bg-slate-800 text-white rounded-xl transition-all shadow-lg disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Suggestions */}
        <div className="w-80 space-y-6">
          <div className="bg-primary-50 border border-primary-100 rounded-[32px] p-6">
            <div className="flex items-center gap-2 mb-4 text-primary-700">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-black uppercase text-xs tracking-widest">Quick Actions</h3>
            </div>
            <div className="space-y-3">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-3 p-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-600 bg-white hover:bg-primary-500 hover:text-white border border-slate-100 rounded-2xl transition-all group"
                >
                  <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-white/20 transition-colors">
                    <s.icon className="w-4 h-4" />
                  </div>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm">
            <h3 className="font-black uppercase text-xs tracking-widest mb-4">AI Insights</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-primary-50 border border-primary-100">
                <p className="text-[9px] font-black text-primary-700 uppercase tracking-[0.2em] mb-1">Success</p>
                <p className="text-xs font-bold text-slate-600 leading-relaxed">Your recent carousel post on Instagram is performing 40% better than average.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Tip</p>
                <p className="text-xs font-bold text-slate-600 leading-relaxed">Try posting on LinkedIn at 9:00 AM on Tuesdays for maximum reach.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
