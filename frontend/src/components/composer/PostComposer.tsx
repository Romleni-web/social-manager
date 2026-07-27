'use client';

import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Video,
  FileText,
  Smile,
  Hash,
  AtSign,
  MapPin,
  BarChart,
  Link as LinkIcon,
  Sparkles,
  X,
  Plus,
  Clock,
  Loader2
} from 'lucide-react';
import { cn } from '@/utils/cn';
import api from '@/lib/api';

export const PostComposer = ({ onClose }: { onClose: () => void }) => {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram', 'twitter']);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIRewrite = async () => {
    if (!content) return;
    setIsGenerating(true);
    try {
      const response = await api.post('/ai/rewrite', {
        content,
        instruction: 'Make this more engaging and professional for ' + selectedPlatforms.join(', ')
      });
      setContent(response.data.rewritten);
    } catch (error) {
      console.error('AI Rewrite failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePostNow = async () => {
    try {
      await api.post('/posts', {
        content,
        workspaceId: 'default', // In a real app, get from context
        accountId: 'default',   // In a real app, get from selected platforms
      });
      alert('Post created successfully!');
      onClose();
    } catch (error) {
      console.error('Posting failed:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-white border border-slate-200 w-full max-w-4xl max-h-[90vh] rounded-[32px] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black uppercase italic">Create Post</h2>
            <span className="text-[10px] font-black bg-primary-500/10 text-primary-600 px-2 py-1 rounded-full border border-primary-500/20 uppercase tracking-widest">
              AI Powered
            </span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Side: Editor */}
          <div className="flex-1 flex flex-col border-r border-slate-100 overflow-y-auto custom-scrollbar">
            <div className="p-6 space-y-6">
              {/* Platform Selector */}
              <div className="flex gap-2">
                {['facebook', 'instagram', 'twitter', 'linkedin', 'tiktok'].map(p => (
                  <button
                    key={p}
                    onClick={() => setSelectedPlatforms(prev =>
                      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
                    )}
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all font-black uppercase text-[10px]",
                      selectedPlatforms.includes(p)
                        ? "bg-black border-black text-white"
                        : "bg-white border-slate-100 text-slate-400 hover:border-slate-300"
                    )}
                  >
                    {p[0]}
                  </button>
                ))}
                <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 border-2 border-dashed border-slate-200 text-slate-400 hover:bg-slate-100">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Text Area */}
              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full h-48 bg-transparent text-lg font-bold resize-none outline-none placeholder:text-slate-300"
                />
                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                  <button
                    onClick={handleAIRewrite}
                    disabled={isGenerating}
                    className="flex items-center gap-1.5 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all shadow-lg shadow-primary-500/20 disabled:opacity-50"
                  >
                    {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                    AI Rewrite
                  </button>
                </div>
              </div>

              {/* Media Upload Placeholder */}
              <div className="grid grid-cols-4 gap-4">
                <button className="aspect-square rounded-2xl bg-white/5 border-2 border-dashed border-white/10 hover:border-primary-500/50 hover:bg-primary-500/5 transition-all flex flex-col items-center justify-center gap-2 text-slate-500">
                  <Plus className="w-6 h-6" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Add Media</span>
                </button>
              </div>

              {/* Toolbar */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {[
                  { icon: ImageIcon, label: 'Image' },
                  { icon: Video, label: 'Video' },
                  { icon: FileText, label: 'Doc' },
                  { icon: BarChart, label: 'Poll' },
                  { icon: MapPin, label: 'Location' },
                  { icon: Hash, label: 'Hashtags' },
                  { icon: AtSign, label: 'Mentions' },
                  { icon: LinkIcon, label: 'Link' },
                ].map(item => (
                  <button key={item.label} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-slate-300">
                    <item.icon className="w-4 h-4" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Preview */}
          <div className="w-[360px] bg-slate-50 p-6 overflow-y-auto custom-scrollbar">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 text-center">Live Preview</h3>

            {/* Instagram Preview Example */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
              <div className="p-4 flex items-center gap-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-full bg-slate-200 p-0.5">
                  <div className="w-full h-full rounded-full bg-white" />
                </div>
                <span className="text-xs font-black uppercase tracking-tight">youraccount</span>
              </div>
              <div className="aspect-square bg-slate-50 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-slate-200" />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex gap-4">
                  <div className="w-4 h-4 rounded-full bg-slate-100" />
                  <div className="w-4 h-4 rounded-full bg-slate-100" />
                  <div className="w-4 h-4 rounded-full bg-slate-100" />
                </div>
                <p className="text-sm text-black font-medium break-words leading-relaxed">
                  <span className="font-black mr-2 uppercase text-[10px]">youraccount</span>
                  {content || 'Your content will appear here...'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="text-xs font-black text-slate-400 hover:text-black uppercase tracking-widest">Save Draft</button>
            <div className="h-4 w-px bg-slate-200" />
            <button className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-black uppercase tracking-widest">
              <Clock className="w-4 h-4" />
              Schedule
            </button>
          </div>
          <button
            onClick={handlePostNow}
            className="px-10 py-4 bg-black hover:bg-slate-800 text-white font-black uppercase tracking-[0.1em] text-xs rounded-2xl transition-all shadow-xl shadow-black/20 active:scale-95"
          >
            Post Now
          </button>
        </div>
      </div>
    </div>
  );
};
