'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Clock, XCircle, AlertTriangle, RefreshCw, LogOut, Mail } from 'lucide-react';
import { Affiliate } from '@/types/database';

export default function AffiliatePendingPage() {
  const router = useRouter();
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  const fetchStatus = async () => {
    try {
      setChecking(true);
      const res = await fetch('/api/affiliate/me');
      if (res.status === 401) {
        router.push('/affiliate/login');
        return;
      }
      const data = await res.json();
      if (data.affiliate) {
        setAffiliate(data.affiliate);
        if (data.affiliate.status === 'approved') {
          router.push('/affiliate');
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setChecking(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/affiliate/logout', { method: 'POST' });
    router.push('/affiliate/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="CC Carvan" className="h-10 w-auto object-contain animate-pulse" />
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-amber-600 border-t-transparent" />
        </div>
      </div>
    );
  }

  const status = affiliate?.status || 'pending';

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900 font-sans">
      {/* Header */}
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="CC Carvan"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-slate-600 hover:text-rose-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Status Container */}
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-lg bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-lg text-center relative overflow-hidden">
          {status === 'pending' && (
            <>
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
                <Clock className="w-8 h-8 animate-pulse" />
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold bg-amber-50 text-amber-800 border border-amber-200">
                Application Status: Under Review
              </span>
              <h1 className="text-2xl font-serif text-slate-900 font-semibold mt-4 mb-2">Waiting for Approval</h1>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
                Hello <strong className="text-slate-900">{affiliate?.full_name}</strong>. Your partner application is currently being reviewed by the CC Carvan team. We verify your promotion channels to assign your custom tracking code.
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-600 space-y-2 mb-8">
                <div className="flex justify-between">
                  <span className="text-slate-500">Applicant:</span>
                  <span className="text-slate-900 font-semibold">{affiliate?.full_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="text-slate-900 font-semibold">{affiliate?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Applied On:</span>
                  <span className="text-slate-900 font-semibold">
                    {affiliate?.created_at ? new Date(affiliate.created_at).toLocaleDateString() : 'Today'}
                  </span>
                </div>
              </div>
            </>
          )}

          {status === 'rejected' && (
            <>
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-200">
                <XCircle className="w-8 h-8" />
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold bg-rose-50 text-rose-800 border border-rose-200">
                Application Status: Declined
              </span>
              <h1 className="text-2xl font-serif text-slate-900 font-semibold mt-4 mb-2">Application Not Approved</h1>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto mb-4">
                We are unable to approve your affiliate partnership request at this time.
              </p>
              {affiliate?.rejection_reason && (
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-rose-800 text-xs text-left mb-6">
                  <p className="font-bold uppercase tracking-wider text-[10px] text-rose-700 mb-1">Feedback from Admin:</p>
                  <p>{affiliate.rejection_reason}</p>
                </div>
              )}
            </>
          )}

          {status === 'suspended' && (
            <>
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4 border border-amber-300">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold bg-amber-100 text-amber-800 border border-amber-300">
                Account Status: Suspended
              </span>
              <h1 className="text-2xl font-serif text-slate-900 font-semibold mt-4 mb-2">Account Temporarily Suspended</h1>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
                Your affiliate account has been restricted by administration. Generating new links and recording new commissions is paused. Please reach out to partner support for review.
              </p>
            </>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={fetchStatus}
              disabled={checking}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs uppercase tracking-wider font-semibold text-white flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
              {checking ? 'Refreshing...' : 'Refresh Status'}
            </button>

            <Link
              href="mailto:support@cccarvan.com"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 text-xs uppercase tracking-wider font-semibold text-amber-800 flex items-center justify-center gap-2 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              Contact Support
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 bg-white">
        <p>&copy; {new Date().getFullYear()} CC Carvan. Official Partner Network.</p>
      </footer>
    </div>
  );
}
