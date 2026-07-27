'use client';

import React, { useState } from 'react';
import { Check, Sparkles, Shield, CreditCard, Zap, Loader2 } from 'lucide-react';
import api from '@/lib/api';

const plans = [
  {
    name: 'Starter',
    price: '2500',
    credits: '100 AI Credits',
    features: ['5 Social Accounts', 'AI Content Generator', 'Basic Analytics', 'Email Support'],
    color: 'border-slate-200',
  },
  {
    name: 'Pro',
    price: '7500',
    credits: '500 AI Credits',
    features: ['Unlimited Accounts', 'Advanced AI Tools', 'Full Analytics', 'Priority Support', 'Team Collaboration'],
    color: 'border-black shadow-2xl shadow-slate-200',
    popular: true,
  },
  {
    name: 'Business',
    price: '25000',
    credits: '2000 AI Credits',
    features: ['White-label Reports', 'Custom Domain', 'Dedicated Manager', 'API Access', '24/7 Phone Support'],
    color: 'border-slate-200',
  }
];

export default function SettingsPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (plan: any) => {
    try {
      setLoading(plan.name);
      const response = await api.post('/billing/checkout', {
        planName: plan.name.toUpperCase(),
        amount: parseInt(plan.price),
      });

      if (response.data.data.link) {
        window.location.href = response.data.data.link;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-black tracking-tight uppercase italic text-black">Settings & Billing</h1>
        <p className="text-slate-500 mt-1 font-bold uppercase text-[10px] tracking-widest">Manage your plan, billing information, and account preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-white border-2 rounded-[40px] p-10 flex flex-col transition-all hover:scale-[1.02] ${plan.color}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-lg shadow-primary-500/20">
                Most Popular
              </div>
            )}

            <div className="mb-10">
              <h3 className="text-xl font-black uppercase text-black italic mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-black tracking-tighter">KES {plan.price}</span>
                <span className="text-slate-400 text-xs font-black uppercase">/mo</span>
              </div>
            </div>

            <div className="space-y-5 mb-10 flex-1">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Zap className="w-5 h-5 text-primary-600" />
                <span className="text-xs font-black uppercase tracking-widest text-black">{plan.credits}</span>
              </div>
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary-50 flex items-center justify-center shrink-0 border border-primary-100">
                    <Check className="w-3.5 h-3.5 text-primary-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleSubscribe(plan)}
              disabled={loading !== null}
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 flex items-center justify-center gap-2 ${
                plan.popular
                  ? 'bg-black text-white hover:bg-slate-800 shadow-xl shadow-black/10'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {loading === plan.name ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {plan.name === 'Starter' ? 'Get Started' : 'Upgrade to ' + plan.name}
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
        <div className="bg-white border border-slate-200 rounded-[40px] p-10 space-y-8 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
              <Shield className="w-6 h-6 text-black" />
            </div>
            <h2 className="text-xl font-black uppercase italic text-black">Account Security</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <div>
                <p className="text-xs font-black uppercase text-black">Two-Factor Authentication</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase mt-1 tracking-widest">Add an extra layer of security.</p>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest text-primary-600 hover:text-primary-700">Enable</button>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[40px] p-10 space-y-8 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
              <CreditCard className="w-6 h-6 text-black" />
            </div>
            <h2 className="text-xl font-black uppercase italic text-black">Payment History</h2>
          </div>
          <div className="text-center py-10">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">No recent transactions found.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
