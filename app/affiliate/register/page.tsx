'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, ShieldCheck, DollarSign, Share2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AffiliateRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    website_or_social: '',
    promo_details: '',
    agree_terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.full_name || !formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match.');
      return;
    }

    if (!formData.agree_terms) {
      setError('Please agree to the CC Carvan Affiliate Terms & Conditions.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/affiliate/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          website_or_social: formData.website_or_social,
          promo_details: formData.promo_details,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/affiliate/pending');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900 font-sans">
      {/* Top Navigation */}
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="CC Carvan"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-900 border-l border-slate-200 pl-3 hidden sm:inline">
              Affiliate Network
            </span>
          </Link>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-500 hidden sm:inline">Already an approved partner?</span>
            <Link
              href="/affiliate/login"
              className="px-4 py-2 rounded-xl uppercase tracking-wider font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Hero Pitch */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Official Creator & Partner Program
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-slate-900 tracking-tight mb-4">
            Partner With CC Carvan Luxury Fashion
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Promote CC Carvan&#39;s luxury pret, festive formals, unstitched collections, and accessories. Earn generous commissions on every attributed sale with real-time analytics and fast payouts.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-50 text-amber-600 shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">10% Standard Commission</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Earn 10%+ on every delivered order, with custom tiered rates for top fashion creators.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600 shrink-0">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">30-Day Cookie Window</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Attribution cookies stay active for 30 full days. Last-click wins ensure your referral is rewarded.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Direct Local Payouts</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Withdraw your earnings directly to Easypaisa, JazzCash, or any Pakistani Bank Account.</p>
            </div>
          </div>
        </div>

        {/* Registration Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          {success ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-serif text-slate-900 font-semibold mb-2">Application Submitted!</h2>
              <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                Thank you for applying to the CC Carvan Affiliate Network. Your account is currently in review. Redirecting to your status portal...
              </p>
              <div className="inline-block animate-pulse text-xs text-amber-700 font-mono font-semibold">
                Redirecting...
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-xl font-serif text-slate-900 font-semibold mb-1">Partner Application Form</h2>
                <p className="text-xs text-slate-500">Complete the form below. Applications are reviewed within 24 hours.</p>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>{error}</div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-700 mb-1.5">
                    Full Name <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="e.g. Ayesha Khan"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-700 mb-1.5">
                    Email Address <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ayesha@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-700 mb-1.5">
                    WhatsApp / Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0300 1234567"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-700 mb-1.5">
                    Instagram, TikTok or Website
                  </label>
                  <input
                    type="text"
                    value={formData.website_or_social}
                    onChange={(e) => setFormData({ ...formData, website_or_social: e.target.value })}
                    placeholder="instagram.com/yourhandle or website"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-700 mb-1.5">
                    Password <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="At least 6 characters"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-700 mb-1.5">
                    Confirm Password <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.confirm_password}
                    onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                    placeholder="Re-type your password"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-slate-700 mb-1.5">
                  How Do You Plan to Promote CC Carvan?
                </label>
                <textarea
                  rows={3}
                  value={formData.promo_details}
                  onChange={(e) => setFormData({ ...formData, promo_details: e.target.value })}
                  placeholder="Share details about your audience, social media channels, WhatsApp broadcast groups, YouTube channel, or fashion blog..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors"
                />
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="agree_terms"
                  checked={formData.agree_terms}
                  onChange={(e) => setFormData({ ...formData, agree_terms: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="agree_terms" className="text-xs text-slate-600 leading-normal">
                  I agree to the{' '}
                  <Link href="/affiliate/terms" target="_blank" className="text-amber-700 underline font-semibold hover:text-amber-800">
                    CC Carvan Affiliate Marketing Terms & Conditions
                  </Link>
                  . I understand that fraudulent clicks, self-referrals, and misleading advertisements are strictly prohibited.
                </label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all disabled:opacity-50"
                >
                  {loading ? 'Submitting Application...' : 'Submit Application'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 bg-white">
        <p>&copy; {new Date().getFullYear()} CC Carvan. All rights reserved. Built for creators and fashion ambassadors.</p>
      </footer>
    </div>
  );
}
