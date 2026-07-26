'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, XCircle, Loader2, ArrowRight } from 'lucide-react';
import api from '@/lib/api';

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [plan, setPlan] = useState('');

  useEffect(() => {
    const verify = async () => {
      const transactionId = searchParams.get('transaction_id');
      const flwStatus = searchParams.get('status');

      if (flwStatus === 'cancelled') {
        setStatus('error');
        return;
      }

      if (transactionId) {
        try {
          const response = await api.get(`/billing/verify?transaction_id=${transactionId}`);
          if (response.data.success) {
            setStatus('success');
            setPlan(response.data.plan);
          } else {
            setStatus('error');
          }
        } catch (error) {
          setStatus('error');
        }
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-12 max-w-md w-full text-center space-y-8">
        {status === 'loading' && (
          <>
            <div className="flex justify-center">
              <Loader2 className="w-16 h-16 text-primary-500 animate-spin" />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">Verifying Payment</h1>
              <p className="text-slate-400">Please wait while we confirm your transaction with Flutterwave...</p>
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
              <p className="text-slate-400">Your account has been upgraded to the <span className="text-white font-bold">{plan}</span> plan and credits have been added.</p>
            </div>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full flex items-center justify-center gap-2 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-primary-600/20"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-rose-500/20 rounded-full flex items-center justify-center">
                <XCircle className="w-12 h-12 text-rose-500" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
              <p className="text-slate-400">We couldn't verify your payment. If this is an error, please contact support.</p>
            </div>
            <button
              onClick={() => router.push('/dashboard/settings')}
              className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl transition-all"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
