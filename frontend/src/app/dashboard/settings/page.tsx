'use client';

import React, { useState } from 'react';
import { Check, Sparkles, Shield, CreditCard, Zap } from 'lucide-react';
import api from '@/lib/api';

const plans = [
  {
    name: 'Starter',
    price: '2500',
    credits: '100 AI Credits',
    features: ['5 Social Accounts', 'AI Content Generator', 'Basic Analytics', 'Email Support'],
    color: 'border-slate-800',
  },
  {
    name: 'Pro',
    price: '7500',
    credits: '500 AI Credits',
    features: ['Unlimited Accounts', 'Advanced AI Tools', 'Full Analytics', 'Priority Support', 'Team Collaboration'],
    color: 'border-primary-500 shadow-xl shadow-primary-500/10',
    popular: true,
  },
  {
    name: 'Business',
    price: '25000',
    credits: '2000 AI Credits',
    features: ['White-label Reports', 'Custom Domain', 'Dedicated Manager', 'API Access', '24/7 Phone Support'],
    color: 'border-slate-800',
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
        <h1 className="text-3xl font-bold tracking-tight">Settings & Billing</h1>
        <p className="text-slate-400 mt-1">Manage your plan, billing information, and account preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-white/5 backdrop-blur-md border-2 rounded-[32px] p-8 flex flex-col ${plan.color}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-primary-600/30">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black">KES {plan.price}</span>
                <span className="text-slate-500 text-sm font-medium">/month</span>
              </div>
            </div>

            <div className="space-y-4 mb-8 flex-1">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                <Zap className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-bold text-slate-200">{plan.credits}</span>
              </div>
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-emerald-500" />
                  </div>
                  <span className="text-sm text-slate-400 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleSubscribe(plan)}
              disabled={loading !== null}
              className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 ${
                plan.popular
                  ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-xl shadow-primary-600/20'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {loading === plan.name ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-8 space-y-6">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary-400" />
            <h2 className="text-xl font-bold">Account Security</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
              <div>
                <p className="text-sm font-bold">Two-Factor Authentication</p>
                <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
              </div>
              <button className="text-xs font-bold text-primary-400 hover:text-primary-300">Enable</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
              <div>
                <p className="text-sm font-bold">Active Sessions</p>
                <p className="text-xs text-slate-500">Manage your currently logged in devices.</p>
              </div>
              <button className="text-xs font-bold text-slate-400 hover:text-white">Manage</button>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-8 space-y-6">
          <div className="flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-primary-400" />
            <h2 className="text-xl font-bold">Payment History</h2>
          </div>
          <div className="text-center py-8">
            <p className="text-slate-500 text-sm">No recent transactions found.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
