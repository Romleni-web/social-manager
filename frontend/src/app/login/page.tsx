'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';
import api from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-6 shadow-xl shadow-black/10">
            <Sparkles className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black tracking-tight uppercase italic">Welcome Back</h1>
          <p className="text-slate-500 mt-2 font-bold uppercase text-[10px] tracking-widest">Sign in to manage your social presence.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-2xl shadow-slate-200/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-xs font-black uppercase tracking-widest text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <input
                required
                type="email"
                placeholder="name@company.com"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-primary-500 transition-colors text-sm font-bold"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                <button type="button" className="text-[10px] font-black text-primary-600 hover:text-primary-700 uppercase">Forgot?</button>
              </div>
              <input
                required
                type="password"
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-primary-500 transition-colors text-sm font-bold"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-4 bg-black hover:bg-slate-900 text-white font-black rounded-2xl transition-all shadow-xl shadow-black/20 flex items-center justify-center gap-2 group uppercase tracking-widest text-xs"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin text-white" /> : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] text-slate-500 font-black uppercase tracking-widest">
          New to SocialAI?{' '}
          <Link href="/register" className="text-primary-600 font-black hover:text-primary-700 border-b-2 border-primary-500/20">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
