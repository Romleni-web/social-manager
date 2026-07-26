import React from 'react';
import { TrendingUp, Globe, Hash, Zap, Newspaper, ArrowUpRight, MessageSquare } from 'lucide-react';

const trends = [
  { id: 1, title: 'Generative AI in Marketing', volume: '124k posts', growth: '+45%', type: 'topic' },
  { id: 2, title: '#SustainableTech', volume: '82k posts', growth: '+22%', type: 'hashtag' },
  { id: 3, title: 'New Instagram Algorithm Update', volume: '56k posts', growth: '+120%', type: 'news' },
  { id: 4, title: 'Remote Work Productivity', volume: '44k posts', growth: '+12%', type: 'topic' },
  { id: 5, title: '#DigitalMinimalism', volume: '38k posts', growth: '+8%', type: 'hashtag' },
];

const viralPosts = [
  { id: 1, author: 'Tech Insider', content: 'Why 2026 is the year of spatial computing...', engagement: '45.2k', platform: 'twitter' },
  { id: 2, author: 'Creative Bloom', content: '10 design trends you can\'t ignore this summer', engagement: '12.8k', platform: 'instagram' },
];

export default function TrendingPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trending Content</h1>
          <p className="text-slate-400 mt-1">Discover what's viral and trending in your industry.</p>
        </div>
        <div className="flex bg-white/5 rounded-2xl p-1 border border-white/10">
          <button className="px-4 py-2 text-sm font-semibold rounded-xl bg-primary-600 text-white">Global</button>
          <button className="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400">Industry</button>
          <button className="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400">Custom</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Trending Topics */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-8">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary-400" />
              Hot Topics & Hashtags
            </h2>
            <div className="space-y-4">
              {trends.map((trend) => (
                <div key={trend.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                      {trend.type === 'hashtag' ? <Hash className="w-5 h-5 text-purple-400" /> : <Globe className="w-5 h-5 text-blue-400" />}
                    </div>
                    <div>
                      <h4 className="font-bold">{trend.title}</h4>
                      <p className="text-xs text-slate-500">{trend.volume}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <span className="text-sm font-bold text-emerald-400">{trend.growth}</span>
                    <button className="p-2 bg-primary-600/10 text-primary-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Zap className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-8">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
              <Newspaper className="w-6 h-6 text-emerald-400" />
              Industry News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-video rounded-2xl bg-slate-800 overflow-hidden relative">
                    <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] font-bold uppercase">TechCrunch</div>
                  </div>
                  <h3 className="font-bold text-sm leading-snug hover:text-primary-400 transition-colors cursor-pointer">
                    Meta announces new AI tools for advertisers to create more engaging video content...
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">4 mins read</span>
                    <button className="text-primary-400 text-[10px] font-bold uppercase flex items-center gap-1">
                      Quick Post <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Viral Posts */}
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-8">
            <h2 className="text-xl font-bold mb-8">Viral Posts</h2>
            <div className="space-y-6">
              {viralPosts.map((post) => (
                <div key={post.id} className="p-4 rounded-2xl bg-slate-900 border border-white/5 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-700" />
                      <span className="text-xs font-bold">{post.author}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">{post.platform}</span>
                  </div>
                  <p className="text-xs text-slate-300 italic">"{post.content}"</p>
                  <div className="flex items-center gap-4 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                      <TrendingUp className="w-3 h-3" /> {post.engagement}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                      <MessageSquare className="w-3 h-3" /> Analysis
                    </div>
                  </div>
                  <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold uppercase transition-all">
                    Create Variation with AI
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600/20 to-blue-600/20 border border-indigo-500/20 rounded-[32px] p-8">
            <h3 className="font-bold mb-2">Trend Alert!</h3>
            <p className="text-xs text-slate-400 mb-6">"Short-form video engagement is up 35% this week in your niche."</p>
            <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-2xl transition-all shadow-xl shadow-indigo-600/20">
              Generate Video Strategy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
