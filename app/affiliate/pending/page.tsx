'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Clock, XCircle, AlertTriangle, RefreshCw, LogOut, CheckCircle, Mail } from 'lucide-react';
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
      <div className="min-h-screen bg-[#080b11] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500" />
      </div>
    );
  }

  const status = affiliate?.status || 'pending';

  return (
    <div className="min-h-screen bg-[#080b11] text-neutral-100 flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      {/* Header */}
      <header className="border-b border-neutral-900/80 bg-neutral-950/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.2em] font-light text-white">
            CC CARVAN
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Status Container */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-neutral-950/80 border border-neutral-800/80 rounded-2xl p-8 sm:p-10 shadow-2xl text-center relative overflow-hidden">
          {status === 'pending' && (
            <>
              <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
                <Clock className="w-8 h-8 animate-pulse" />
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Application Status: Under Review
              </span>
              <h1 className="text-2xl font-serif text-white mt-4 mb-2">Waiting for Approval</h1>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-md mx-auto mb-6">
                Hello <strong className="text-neutral-200">{affiliate?.full_name}</strong>. Your partner application is currently being reviewed by the CC Carvan admin team. We verify your promotion channels to assign your custom tracking code.
              </p>
              <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 text-left text-xs text-neutral-400 space-y-2 mb-8">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Applicant:</span>
                  <span className="text-neutral-200 font-medium">{affiliate?.full_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Email:</span>
                  <span className="text-neutral-200 font-medium">{affiliate?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Applied On:</span>
                  <span className="text-neutral-200 font-medium">
                    {affiliate?.created_at ? new Date(affiliate.created_at).toLocaleDateString() : 'Today'}
                  </span>
                </div>
              </div>
            </>
          )}

          {status === 'rejected' && (
            <>
              <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
                <XCircle className="w-8 h-8" />
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                Application Status: Declined
              </span>
              <h1 className="text-2xl font-serif text-white mt-4 mb-2">Application Not Approved</h1>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-md mx-auto mb-4">
                We are unable to approve your affiliate partnership request at this time.
              </p>
              {affiliate?.rejection_reason && (
                <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 text-rose-300 text-xs text-left mb-6">
                  <p className="font-semibold uppercase tracking-wider text-[10px] text-rose-400 mb-1">Feedback from Admin:</p>
                  <p>{affiliate.rejection_reason}</p>
                </div>
              )}
            </>
          )}

          {status === 'suspended' && (
            <>
              <div className="w-16 h-16 rounded-full bg-amber-600/10 text-amber-500 flex items-center justify-center mx-auto mb-4 border border-amber-600/20">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-amber-600/10 text-amber-500 border border-amber-600/20">
                Account Status: Suspended
              </span>
              <h1 className="text-2xl font-serif text-white mt-4 mb-2">Affiliate Account Suspended</h1>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-md mx-auto mb-6">
                Your affiliate account has been temporarily restricted by administration. Generating new links and recording new commissions is paused. Please reach out to affiliate support for assistance.
              </p>
            </>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={fetchStatus}
              disabled={checking}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-xs uppercase tracking-wider font-medium text-white flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
              {checking ? 'Refreshing...' : 'Refresh Status'}
            </button>

            <Link
              href="mailto:support@cccarvan.com"
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 text-xs uppercase tracking-wider font-medium text-amber-400 flex items-center justify-center gap-2 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              Contact Support
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-500">
        <p>&copy; {new Date().getFullYear()} CC Carvan. Official Partner Network.</p>
      </footer>
    </div>
  );
}
