import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, AlertOctagon, CheckCircle2 } from 'lucide-react';

export default function AffiliateTermsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900 font-sans">
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="CC Carvan" className="h-10 sm:h-12 w-auto object-contain" />
          </Link>
          <Link
            href="/affiliate/register"
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-700 hover:text-amber-800 font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Application
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8 border-b border-slate-200 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs uppercase tracking-wider font-semibold mb-3">
            <Shield className="w-3.5 h-3.5 text-amber-600" />
            Official Guidelines
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-slate-900 font-semibold tracking-tight">Affiliate Program Terms & Conditions</h1>
          <p className="text-xs text-slate-500 mt-2">Effective Date: October 2026 &bull; CC Carvan Brand Partner Network</p>
        </div>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs">
            <h2 className="text-base font-serif text-slate-900 font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-600" />
              1. Commission Structure & Attribution
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600 text-xs sm:text-sm">
              <li><strong>Default Commission:</strong> Approved affiliates earn a standard 10% commission on the net product sale amount (excluding shipping and coupon deductions).</li>
              <li><strong>Custom Tiers:</strong> CC Carvan administration reserves the right to increase or set custom commission rates for high-volume creator partners.</li>
              <li><strong>30-Day Cookie Duration:</strong> When a user visits via your unique tracking link, a secure 30-day tracking cookie is stored. If the user places an order within 30 days, the sale is attributed to you.</li>
              <li><strong>Last-Click Attribution:</strong> If a customer clicks links from two different affiliates, the most recent link clicked prior to checkout earns the attribution.</li>
            </ul>
          </section>

          <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs">
            <h2 className="text-base font-serif text-slate-900 font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-600" />
              2. Approval, Hold Window & Withdrawals
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600 text-xs sm:text-sm">
              <li><strong>Holding Period:</strong> To safeguard against order returns, delivery refusals, and cancellations, all attributed commissions remain in <span className="text-amber-700 font-semibold">pending status</span> for 7 days post-delivery.</li>
              <li><strong>Order Cancellations:</strong> If an attributed order is cancelled, rejected at doorstep, or refunded, its associated commission is automatically reversed.</li>
              <li><strong>Minimum Payout Threshold:</strong> The minimum withdrawable balance is <strong>PKR 1,000</strong>.</li>
              <li><strong>Supported Payout Methods:</strong> Affiliates can withdraw earnings to Pakistani local accounts: Easypaisa, JazzCash, or any 1Link / Raast Pakistani bank account.</li>
              <li><strong>Manual Payment Audits:</strong> All withdrawal requests are reviewed by CC Carvan accounts and paid manually with an official transaction reference code within 2-3 business days.</li>
            </ul>
          </section>

          <section className="bg-white border border-rose-200 rounded-2xl p-6 sm:p-7 shadow-xs border-l-4 border-l-rose-500">
            <h2 className="text-base font-serif text-rose-800 font-semibold mb-3 flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-rose-600" />
              3. Strictly Prohibited Activities
            </h2>
            <p className="text-slate-600 text-xs mb-3">Violation of these guidelines results in immediate termination of the affiliate account and forfeiture of pending balances:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 text-xs sm:text-sm">
              <li><strong>Self-Referrals:</strong> Affiliates cannot purchase products for themselves through their own affiliate links. The system automatically detects and blocks self-referral attempts.</li>
              <li><strong>Misleading or False Claims:</strong> Making false promises regarding pricing, delivery times, or fabric specifications not published on the official CC Carvan website is strictly forbidden.</li>
              <li><strong>Search Engine Bidding (PPC Trademark Violations):</strong> Bidding on trademarked brand terms like &quot;CC Carvan&quot;, &quot;cccarvan.com&quot;, or variations in Google Ads / Bing Ads is prohibited.</li>
              <li><strong>Cookie Stuffing & Spams:</strong> Using pop-unders, iframe injections, hidden redirects, automated bot clicks, or spamming WhatsApp/SMS broadcasts is zero-tolerance.</li>
            </ul>
          </section>

          <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs">
            <h2 className="text-base font-serif text-slate-900 font-semibold mb-3">4. Modification & Termination</h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              CC Carvan reserves the right to modify commission rates, cookie durations, and terms at any time with prior notice. Continued participation in the partner network signifies your acceptance of updated terms.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 bg-white">
        <p>&copy; {new Date().getFullYear()} CC Carvan. All rights reserved.</p>
      </footer>
    </div>
  );
}
