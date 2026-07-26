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
  Plus
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const PostComposer = ({ onClose }: { onClose: () => void }) => {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram', 'twitter']);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-white/10 w-full max-w-4xl max-h-[90vh] rounded-[32px] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">Create Post</h2>
            <span className="text-xs font-medium bg-primary-600/20 text-primary-400 px-2 py-0.5 rounded-full border border-primary-600/30">
              AI Powered
            </span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Side: Editor */}
          <div className="flex-1 flex flex-col border-r border-white/5 overflow-y-auto custom-scrollbar">
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
                      "w-10 h-10 rounded-xl flex items-center justify-center border transition-all",
                      selectedPlatforms.includes(p)
                        ? "bg-primary-600 border-primary-500 text-white"
                        : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                    )}
                  >
                    <span className="capitalize text-[10px] font-bold">{p[0]}</span>
                  </button>
                ))}
                <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-dashed border-white/20 text-slate-400 hover:bg-white/10">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Text Area */}
              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full h-48 bg-transparent text-lg resize-none outline-none placeholder:text-slate-600"
                />
                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-full transition-all shadow-lg shadow-primary-600/20">
                    <Sparkles className="w-3.5 h-3.5" />
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
          <div className="w-[360px] bg-black/20 p-6 overflow-y-auto custom-scrollbar">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Preview</h3>

            {/* Instagram Preview Example */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-3 flex items-center gap-2 border-b border-white/5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-0.5">
                  <div className="w-full h-full rounded-full bg-black" />
                </div>
                <span className="text-xs font-bold">youraccount</span>
              </div>
              <div className="aspect-square bg-white/5 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-slate-700" />
              </div>
              <div className="p-3 space-y-2">
                <div className="flex gap-3">
                  <div className="w-4 h-4 rounded-full bg-slate-700" />
                  <div className="w-4 h-4 rounded-full bg-slate-700" />
                  <div className="w-4 h-4 rounded-full bg-slate-700" />
                </div>
                <p className="text-xs text-slate-300 break-words">
                  <span className="font-bold mr-1">youraccount</span>
                  {content || 'Your content will appear here...'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 bg-white/5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="text-sm font-semibold text-slate-400 hover:text-white">Save Draft</button>
            <div className="h-4 w-px bg-white/10" />
            <button className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white">
              <Clock className="w-4 h-4" />
              Schedule
            </button>
          </div>
          <button className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-primary-600/20 active:scale-95">
            Post Now
          </button>
        </div>
      </div>
    </div>
  );
};
