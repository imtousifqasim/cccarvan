import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, AlertOctagon, CheckCircle2 } from 'lucide-react';

export default function AffiliateTermsPage() {
  return (
    <div className="min-h-screen bg-[#080b11] text-neutral-100 flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      <header className="border-b border-neutral-900 bg-neutral-950/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.2em] font-light text-white">
            CC CARVAN
          </Link>
          <Link
            href="/affiliate/register"
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Application
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8 border-b border-neutral-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs uppercase tracking-widest mb-3">
            <Shield className="w-3.5 h-3.5" />
            Official Guidelines
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">Affiliate Program Terms & Conditions</h1>
          <p className="text-xs text-neutral-400 mt-2">Effective Date: October 2026 &bull; CC Carvan Brand Partner Network</p>
        </div>

        <div className="space-y-8 text-sm text-neutral-300 leading-relaxed font-light">
          <section className="bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-6">
            <h2 className="text-lg font-serif text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-500" />
              1. Commission Structure & Attribution
            </h2>
            <ul className="list-disc list-inside space-y-2 text-neutral-400 text-xs sm:text-sm">
              <li><strong>Default Commission:</strong> Approved affiliates earn a standard 10% commission on the net product sale amount (excluding shipping and coupon deductions).</li>
              <li><strong>Custom Tiers:</strong> CC Carvan administration reserves the right to increase or set custom commission rates for high-volume creator partners.</li>
              <li><strong>30-Day Cookie Duration:</strong> When a user visits via your unique tracking link, a secure 30-day tracking cookie is stored. If the user places an order within 30 days, the sale is attributed to you.</li>
              <li><strong>Last-Click Attribution:</strong> If a customer clicks links from two different affiliates, the most recent link clicked prior to checkout earns the attribution.</li>
            </ul>
          </section>

          <section className="bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-6">
            <h2 className="text-lg font-serif text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-500" />
              2. Approval, Hold Window & Withdrawals
            </h2>
            <ul className="list-disc list-inside space-y-2 text-neutral-400 text-xs sm:text-sm">
              <li><strong>Holding Period:</strong> To safeguard against order returns, delivery refusals, and cancellations, all attributed commissions remain in <span className="text-amber-400">pending status</span> for 7 days post-delivery.</li>
              <li><strong>Order Cancellations:</strong> If an attributed order is cancelled, rejected at doorstep, or refunded, its associated commission is automatically reversed.</li>
              <li><strong>Minimum Payout Threshold:</strong> The minimum withdrawable balance is <strong>PKR 1,000</strong>.</li>
              <li><strong>Supported Payout Methods:</strong> Affiliates can withdraw earnings to Pakistani local accounts: Easypaisa, JazzCash, or any 1Link / Raast Pakistani bank account.</li>
              <li><strong>Manual Payment Audits:</strong> All withdrawal requests are reviewed by CC Carvan accounts and paid manually with an official transaction reference code within 2-3 business days.</li>
            </ul>
          </section>

          <section className="bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-6 border-l-4 border-l-rose-500">
            <h2 className="text-lg font-serif text-white mb-3 flex items-center gap-2 text-rose-400">
              <AlertOctagon className="w-5 h-5 text-rose-500" />
              3. Strictly Prohibited Activities
            </h2>
            <p className="text-neutral-400 text-xs mb-3">Violation of these guidelines results in immediate termination of the affiliate account and forfeiture of pending balances:</p>
            <ul className="list-disc list-inside space-y-2 text-neutral-400 text-xs sm:text-sm">
              <li><strong>Self-Referrals:</strong> Affiliates cannot purchase products for themselves through their own affiliate links. The system automatically detects and blocks self-referral attempts.</li>
              <li><strong>Misleading or False Claims:</strong> Making false promises regarding pricing, delivery times, or fabric specifications not published on the official CC Carvan website is strictly forbidden.</li>
              <li><strong>Search Engine Bidding (PPC Trademark Violations):</strong> Bidding on trademarked brand terms like &quot;CC Carvan&quot;, &quot;cccarvan.com&quot;, or variations in Google Ads / Bing Ads is prohibited.</li>
              <li><strong>Cookie Stuffing & Spams:</strong> Using pop-unders, iframe injections, hidden redirects, automated bot clicks, or spamming WhatsApp/SMS broadcasts is zero-tolerance.</li>
            </ul>
          </section>

          <section className="bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-6">
            <h2 className="text-lg font-serif text-white mb-3">4. Modification & Termination</h2>
            <p className="text-neutral-400 text-xs sm:text-sm">
              CC Carvan reserves the right to modify commission rates, cookie durations, and terms at any time with prior notice. Continued participation in the partner network signifies your acceptance of updated terms.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-500">
        <p>&copy; {new Date().getFullYear()} CC Carvan. All rights reserved.</p>
      </footer>
    </div>
  );
}
