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
    <div className="min-h-screen bg-[#080b11] text-neutral-100 flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      {/* Top Navigation */}
      <header className="border-b border-neutral-900/80 bg-neutral-950/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="font-serif text-2xl tracking-[0.2em] font-light text-white group-hover:text-amber-400 transition-colors">
              CC CARVAN
            </span>
            <span className="text-xs uppercase tracking-widest text-amber-500/80 border-l border-neutral-800 pl-3">
              Affiliate Network
            </span>
          </Link>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-neutral-400 hidden sm:inline">Already an approved partner?</span>
            <Link
              href="/affiliate/login"
              className="px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-medium text-amber-400 border border-amber-500/30 hover:bg-amber-500/10 transition-colors"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Official Creator & Partner Program
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white tracking-tight mb-4">
            Partner With Luxury Fashion
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Promote CC Carvan&#39;s luxury pret, festive formals, unstitched collections, and accessories. Earn generous commissions on every attributed sale with real-time analytics and fast payouts.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800/60 flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white mb-1">10% Standard Commission</h3>
              <p className="text-xs text-neutral-400">Earn up to 10%+ on every delivered order, with custom tiered rates for top fashion creators.</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800/60 flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white mb-1">30-Day Cookie Window</h3>
              <p className="text-xs text-neutral-400">Attribution cookies stay active for 30 full days. Last-click wins ensure your referral is rewarded.</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800/60 flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white mb-1">Direct Local Payouts</h3>
              <p className="text-xs text-neutral-400">Withdraw your earnings directly to Easypaisa, JazzCash, or any Pakistani Bank Account.</p>
            </div>
          </div>
        </div>

        {/* Registration Card */}
        <div className="bg-neutral-950/80 border border-neutral-800/80 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {success ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-serif text-white mb-2">Application Submitted!</h2>
              <p className="text-neutral-400 text-sm max-w-md mx-auto mb-6">
                Thank you for applying to the CC Carvan Affiliate Network. Your account is currently in review. Redirecting to your status portal...
              </p>
              <div className="inline-block animate-pulse text-xs text-amber-400 font-mono">
                Redirecting...
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-xl font-serif text-white mb-1">Partner Application</h2>
                <p className="text-xs text-neutral-400">Complete the form below. Applications are reviewed within 24 hours.</p>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>{error}</div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-1.5">
                    Full Name <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="e.g. Ayesha Khan"
                    className="w-full bg-neutral-900/80 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-1.5">
                    Email Address <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ayesha@example.com"
                    className="w-full bg-neutral-900/80 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-1.5">
                    WhatsApp / Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0300 1234567"
                    className="w-full bg-neutral-900/80 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-1.5">
                    Instagram, TikTok or Website
                  </label>
                  <input
                    type="text"
                    value={formData.website_or_social}
                    onChange={(e) => setFormData({ ...formData, website_or_social: e.target.value })}
                    placeholder="instagram.com/yourhandle or website"
                    className="w-full bg-neutral-900/80 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-1.5">
                    Password <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="At least 6 characters"
                    className="w-full bg-neutral-900/80 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-1.5">
                    Confirm Password <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.confirm_password}
                    onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                    placeholder="Re-type your password"
                    className="w-full bg-neutral-900/80 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-300 font-medium mb-1.5">
                  How Do You Plan to Promote CC Carvan?
                </label>
                <textarea
                  rows={3}
                  value={formData.promo_details}
                  onChange={(e) => setFormData({ ...formData, promo_details: e.target.value })}
                  placeholder="Share details about your audience, social media channels, WhatsApp groups, YouTube channel, or fashion blog..."
                  className="w-full bg-neutral-900/80 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="agree_terms"
                  checked={formData.agree_terms}
                  onChange={(e) => setFormData({ ...formData, agree_terms: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-neutral-700 bg-neutral-900 text-amber-500 focus:ring-amber-500 focus:ring-offset-neutral-900"
                />
                <label htmlFor="agree_terms" className="text-xs text-neutral-400 leading-normal">
                  I agree to the{' '}
                  <Link href="/affiliate/terms" target="_blank" className="text-amber-400 underline hover:text-amber-300">
                    CC Carvan Affiliate Marketing Terms & Conditions
                  </Link>
                  . I understand that fraudulent clicks, self-referrals, and misleading advertisements are strictly prohibited.
                </label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
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
      <footer className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-500">
        <p>&copy; {new Date().getFullYear()} CC Carvan. All rights reserved. Built for creators and fashion ambassadors.</p>
      </footer>
    </div>
  );
}
