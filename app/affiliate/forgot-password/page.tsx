'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, AlertCircle, CheckCircle2, Lock, KeyRound, Copy, Check, ArrowLeft } from 'lucide-react';

export default function AffiliateForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [email, setEmail] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Reset inputs
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Step 1: Request OTP
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/affiliate/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate reset code');

      if (data.resetCode) {
        setGeneratedCode(data.resetCode);
        setResetCode(data.resetCode);
      }
      setStep('reset');
      setSuccessMsg('Verification code generated successfully!');
    } catch (err: any) {
      setError(err.message || 'Error occurred. Please check your email.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Set New Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/affiliate/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          resetCode,
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Password reset failed');

      setSuccessMsg('Your password has been reset successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/affiliate/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
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
              Partner Security
            </span>
          </Link>

          <Link
            href="/affiliate/login"
            className="text-xs uppercase tracking-wider text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Login
          </Link>
        </div>
      </header>

      {/* Main Card */}
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-lg relative">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-3">
              <KeyRound className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-serif text-slate-900 font-semibold tracking-tight">
              {step === 'request' ? 'Reset Partner Password' : 'Enter Reset Code'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {step === 'request'
                ? 'Enter your registered affiliate email to receive a recovery code'
                : 'Enter your 6-digit verification code and set a new password'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <div>{successMsg}</div>
            </div>
          )}

          {step === 'request' ? (
            <form onSubmit={handleRequestCode} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-slate-600 mb-1.5">
                  Affiliate Email Address
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all disabled:opacity-50 mt-2"
              >
                {loading ? 'Generating Code...' : 'Get Recovery Code'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {generatedCode && (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-amber-800 block">Your Verification Code</span>
                    <span className="font-mono text-base font-bold text-amber-950 tracking-widest">{generatedCode}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(generatedCode)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-800 text-xs font-semibold hover:bg-amber-100 flex items-center gap-1 shadow-xs"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-slate-600 mb-1.5">
                  6-Digit Verification Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  placeholder="123456"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-center text-base tracking-[0.3em] font-mono font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-slate-600 mb-1.5">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-slate-600 mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all disabled:opacity-50 mt-2"
              >
                {loading ? 'Updating Password...' : 'Save & Continue to Sign In'}
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep('request');
                  setError(null);
                  setSuccessMsg(null);
                }}
                className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 text-center"
              >
                Request a different code
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Remembered your password?{' '}
              <Link href="/affiliate/login" className="text-amber-700 hover:underline font-semibold">
                Sign in here
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
