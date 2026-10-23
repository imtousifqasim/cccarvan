'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, AlertCircle, Lock, ShieldCheck, KeyRound, ArrowLeft } from 'lucide-react';

export default function AffiliateLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [requires2FA, setRequires2FA] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/affiliate/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          password,
          twoFactorCode: requires2FA ? twoFactorCode : undefined
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to sign in');
      }

      if (data.requires2FA) {
        setRequires2FA(true);
        setLoading(false);
        return;
      }

      if (data.affiliate?.status === 'approved') {
        router.push('/affiliate');
      } else {
        router.push('/affiliate/pending');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

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
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-900 border-l border-slate-200 pl-3 hidden sm:inline">
              Partner Portal
            </span>
          </Link>

          <Link
            href="/affiliate/register"
            className="text-xs uppercase tracking-wider text-amber-700 hover:text-amber-800 font-bold"
          >
            Apply to Join &rarr;
          </Link>
        </div>
      </header>

      {/* Main Form Card */}
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-lg relative">
          <div className="text-center mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="CC Carvan"
              className="h-12 w-auto mx-auto object-contain mb-4"
            />
            <h1 className="text-2xl font-serif text-slate-900 font-semibold tracking-tight">
              {requires2FA ? 'Two-Factor Verification' : 'Affiliate Partner Portal'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {requires2FA 
                ? 'Enter the 6-digit code from Google Authenticator to continue'
                : 'Sign in to manage your tracking links and monitor commissions'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!requires2FA ? (
              <>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-600 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs uppercase tracking-wider font-bold text-slate-600">
                      Password
                    </label>
                    <Link
                      href="/affiliate/forgot-password"
                      className="text-[11px] text-amber-700 hover:text-amber-800 font-semibold hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all disabled:opacity-50 mt-2"
                >
                  {loading ? 'Signing In...' : 'Sign In to Dashboard'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-center gap-3 mb-2">
                  <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Google Authenticator protection is active on your partner account.</span>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-700 mb-1.5 text-center">
                    6-Digit Google Authenticator Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    autoFocus
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-center text-lg tracking-[0.4em] font-mono font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-amber-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || twoFactorCode.length !== 6}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all disabled:opacity-50 mt-2"
                >
                  {loading ? 'Verifying Code...' : 'Verify & Enter Dashboard'}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRequires2FA(false);
                    setTwoFactorCode('');
                    setError(null);
                  }}
                  className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 text-center flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to credentials
                </button>
              </>
            )}
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Not registered yet?{' '}
              <Link href="/affiliate/register" className="text-amber-700 hover:underline font-semibold">
                Apply for an affiliate account
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 bg-white">
        <p>&copy; {new Date().getFullYear()} CC Carvan. Official Affiliate Network.</p>
      </footer>
    </div>
  );
}
