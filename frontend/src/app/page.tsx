import Link from 'next/link';
import { Sparkles, ArrowRight, Shield, Zap, BarChart3 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-primary-500/30">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic">SocialAI</span>
        </div>
        <div className="flex items-center gap-8">
          <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-black transition-colors">Login</Link>
          <Link href="/register" className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary-500/20">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-600 text-xs font-bold uppercase tracking-widest mb-8">
          <Zap className="w-4 h-4" />
          Now with GPT-4 Turbo Integration
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
          SCALE YOUR <span className="text-primary-500">SOCIAL</span> <br />
          WITH PURE <span className="text-black">AI POWER.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-600 text-lg mb-12 font-medium">
          The ultimate SaaS platform for modern social media management.
          Generate, schedule, and analyze your content across all platforms
          using industry-leading AI models.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link href="/dashboard" className="w-full md:w-auto px-10 py-5 bg-black text-white font-black text-lg rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group">
            Go to Dashboard
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/admin" className="w-full md:w-auto px-10 py-5 bg-white border border-black text-black font-black text-lg rounded-2xl hover:bg-slate-50 transition-all">
            Admin Demo
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-200 text-left hover:border-primary-500/50 transition-all">
            <div className="w-12 h-12 bg-primary-500/20 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">AI Composer</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Generate platform-specific content in seconds. Rewrite, improve, and optimize your posts with one click.
            </p>
          </div>
          <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-200 text-left hover:border-primary-500/50 transition-all">
            <div className="w-12 h-12 bg-primary-500/20 rounded-2xl flex items-center justify-center mb-6">
              <BarChart3 className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Deep Analytics</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Understand your growth with beautiful, data-dense charts. Track engagement across all your connected accounts.
            </p>
          </div>
          <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-200 text-left hover:border-primary-500/50 transition-all">
            <div className="w-12 h-12 bg-primary-500/20 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Admin Suite</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Full control over your platform. Manage users, monitor system health, and oversee billing seamlessly.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-12 text-center text-slate-400 text-sm font-bold uppercase tracking-widest">
        &copy; 2026 SocialAI Platform. Built for the future of marketing.
      </footer>
    </div>
  );
}
