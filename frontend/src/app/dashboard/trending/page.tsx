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
          <h1 className="text-3xl font-black tracking-tight uppercase italic text-black">Trending Content</h1>
          <p className="text-slate-500 mt-1 font-bold uppercase text-[10px] tracking-widest">Discover what's viral and trending in your industry.</p>
        </div>
        <div className="flex bg-slate-100 rounded-2xl p-1.5 border border-slate-200">
          <button className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl bg-white text-black shadow-sm">Global</button>
          <button className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl text-slate-500 hover:text-black">Industry</button>
          <button className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl text-slate-500 hover:text-black">Custom</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Trending Topics */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-slate-200 rounded-[40px] p-10 shadow-sm">
            <h2 className="text-xl font-black uppercase mb-10 flex items-center gap-3 text-black">
              <TrendingUp className="w-7 h-7 text-primary-600" />
              Hot Topics & Hashtags
            </h2>
            <div className="space-y-4">
              {trends.map((trend) => (
                <div key={trend.id} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-100 border border-transparent hover:border-slate-200 transition-all group cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-slate-100">
                      {trend.type === 'hashtag' ? <Hash className="w-6 h-6 text-black" /> : <Globe className="w-6 h-6 text-black" />}
                    </div>
                    <div>
                      <h4 className="font-black text-black uppercase tracking-tight">{trend.title}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{trend.volume}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-6">
                    <span className="text-sm font-black text-primary-600">{trend.growth}</span>
                    <button className="p-3 bg-black text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-lg shadow-black/20">
                      <Zap className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[40px] p-10 shadow-sm">
            <h2 className="text-xl font-black uppercase mb-10 flex items-center gap-3 text-black">
              <Newspaper className="w-7 h-7 text-primary-600" />
              Industry News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-4 group">
                  <div className="aspect-video rounded-3xl bg-slate-200 overflow-hidden relative border border-slate-100">
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-black text-white text-[9px] font-black uppercase tracking-widest rounded-lg">TechCrunch</div>
                  </div>
                  <h3 className="font-black text-sm leading-tight hover:text-primary-600 transition-colors cursor-pointer uppercase tracking-tight">
                    Meta announces new AI tools for advertisers to create more engaging video content...
                  </h3>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">4 mins read</span>
                    <button className="text-black text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 group-hover:text-primary-600 transition-colors">
                      Quick Post <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Viral Posts */}
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-[40px] p-10 shadow-sm">
            <h2 className="text-xl font-black uppercase mb-10 text-black">Viral Posts</h2>
            <div className="space-y-8">
              {viralPosts.map((post) => (
                <div key={post.id} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-4 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-300" />
                      <span className="text-[10px] font-black uppercase text-black">{post.author}</span>
                    </div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{post.platform}</span>
                  </div>
                  <p className="text-sm text-slate-700 font-bold italic leading-relaxed">"{post.content}"</p>
                  <div className="flex items-center gap-6 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                      <TrendingUp className="w-3.5 h-3.5" /> {post.engagement}
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                      <MessageSquare className="w-3.5 h-3.5" /> Analysis
                    </div>
                  </div>
                  <button className="w-full py-4 bg-white border border-slate-200 hover:border-black rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] text-black transition-all shadow-sm">
                    Create AI Variation
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary-500 rounded-[40px] p-10 shadow-xl shadow-primary-500/20 text-white">
            <h3 className="font-black text-xl uppercase italic mb-4">Trend Alert!</h3>
            <p className="text-sm font-bold text-primary-50 leading-relaxed mb-10">"Short-form video engagement is up 35% this week in your niche."</p>
            <button className="w-full py-5 bg-white text-primary-600 text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all hover:bg-primary-50 shadow-lg active:scale-95">
              Generate Strategy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
