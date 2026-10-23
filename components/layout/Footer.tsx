'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, Phone, MapPin, Sparkles, ArrowUpRight, 
  Truck, ShieldCheck, RefreshCw, MessageCircle, 
  Clock, CheckCircle2, ChevronRight, Lock
} from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subMessage, setSubMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubscribed(true);
        setSubMessage(data.message || 'You have been added to the private salon reservation list.');
      } else {
        alert(data.error || 'Failed to subscribe.');
      }
    } catch {
      setSubscribed(true);
      setSubMessage('Thank you for joining CC Carvan Privilege Club.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#09090b] text-neutral-300 border-t border-white/[0.08] relative overflow-hidden font-sans">
      
      {/* Subtle ambient luxury background glows */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-[#d99026]/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-96 h-96 bg-purple-900/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* 1. Value Proposition & Trust Guarantee Ribbon */}
      <div className="border-b border-white/[0.06] bg-[#0d0e12]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-amber-400/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Truck className="w-5 h-5 text-[#d99026]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white tracking-wide uppercase font-sans">Flat Rs. 100 Express</h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">Nationwide shipping via TCS &amp; Leopards</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-amber-400/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-[#d99026]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white tracking-wide uppercase font-sans">100% Authentic Quality</h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">Generational weavers &amp; pure fabrics</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-amber-400/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <RefreshCw className="w-5 h-5 text-[#d99026]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white tracking-wide uppercase font-sans">7-Day Seamless Return</h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">Doorstep inspection &amp; easy exchange</p>
              </div>
            </div>

            <a 
              href="https://wa.me/923038212360" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white tracking-wide uppercase font-sans">VIP Concierge</h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[11px] text-emerald-400/90 font-mono mt-0.5">+92 303 8212360</p>
              </div>
            </a>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* 2. VIP Salon Pre-Order & Gazette Banner */}
        <div className="mb-20 rounded-3xl bg-gradient-to-br from-[#15151c] via-[#101015] to-[#0a0a0d] border border-white/10 hover:border-amber-400/30 p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden transition-all duration-500">
          
          {/* Subtle auroral gold ambient element */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#d99026]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-xl text-center lg:text-left space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase bg-amber-400/10 border border-amber-400/25 text-[#d99026]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Privilege Atelier Membership</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                Unlock Private Pre-Orders &amp; Seasonal Drops
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                Reserve limited unstitched silk ensembles, winter fleece capsules, and bespoke festive drops before public release.
              </p>
            </div>

            <div className="w-full lg:max-w-md">
              {subscribed ? (
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-bold text-white">Privilege Membership Activated</p>
                    <p className="text-[11px] text-emerald-300 mt-0.5">{subMessage}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your private email..."
                        className="w-full pl-11 pr-4 py-3.5 text-xs bg-black/60 border border-white/15 rounded-full focus:outline-none focus:border-[#d99026] text-white placeholder-neutral-400 shadow-inner transition"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-[#d99026] to-[#b87414] hover:from-amber-300 hover:to-[#c87e16] text-slate-950 font-extrabold text-xs uppercase tracking-[0.14em] transition-all duration-300 shadow-[0_0_20px_rgba(217,144,38,0.25)] hover:shadow-[0_0_30px_rgba(217,144,38,0.4)] whitespace-nowrap cursor-pointer disabled:opacity-60"
                    >
                      {loading ? 'Joining...' : 'Join Privilege'}
                    </button>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-1.5 text-[11px] text-neutral-400">
                    <Lock className="w-3 h-3 text-[#d99026]" />
                    <span>Zero spam. Only private salon releases. Instant unsubscribe.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 3. Main 4-Column Navigation Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-white/[0.08]">
          
          {/* Column 1: Brand & Atelier Presence */}
          <div className="space-y-5">
            <Link href="/" className="inline-block group">
              <img
                src="/logo.png"
                alt="CC Carvan"
                className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_12px_rgba(217,144,38,0.15)]"
              />
            </Link>

            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
              CC Carvan redefines contemporary Pakistani luxury fashion, marrying centuries-old artisanal craft with modern pret silhouettes for the discerning connoisseur.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[11px] text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Flagship Atelier: <strong>Okara, Pakistan</strong></span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400 block mb-3 font-sans">
                Follow The Atelier
              </span>
              <div className="flex items-center gap-2.5 text-neutral-300">
                <a 
                  href="https://wa.me/923038212360" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center hover:text-emerald-400 hover:border-emerald-400/50 hover:bg-emerald-500/10 transition duration-300" 
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center hover:text-[#d99026] hover:border-[#d99026]/50 hover:bg-amber-500/10 transition duration-300" 
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center hover:text-[#d99026] hover:border-[#d99026]/50 hover:bg-amber-500/10 transition duration-300" 
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center hover:text-[#d99026] hover:border-[#d99026]/50 hover:bg-amber-500/10 transition duration-300" 
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Curated Collections */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white mb-5 font-sans flex items-center gap-2">
              <span>Haute Collections</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-sans">
              <li>
                <Link href="/category/men" className="hover:text-amber-400 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all text-white font-medium">
                  <ChevronRight className="w-3 h-3 text-[#d99026]" />
                  <span>Men's Fashion &amp; Suits</span>
                </Link>
              </li>
              <li>
                <Link href="/category/men-winter-wear" className="hover:text-amber-400 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ChevronRight className="w-3 h-3 text-neutral-500" />
                  <span>Men's Winter Wear &amp; Fleece</span>
                  <span className="ml-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">Hot</span>
                </Link>
              </li>
              <li>
                <Link href="/category/women" className="hover:text-amber-400 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all text-white font-medium">
                  <ChevronRight className="w-3 h-3 text-[#d99026]" />
                  <span>Women's Festive &amp; Abayas</span>
                </Link>
              </li>
              <li>
                <Link href="/category/women-night-suits-pajamas" className="hover:text-amber-400 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ChevronRight className="w-3 h-3 text-neutral-500" />
                  <span>Night Suits &amp; Velvet Sets</span>
                </Link>
              </li>
              <li>
                <Link href="/category/women-handbags" className="hover:text-amber-400 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ChevronRight className="w-3 h-3 text-neutral-500" />
                  <span>Leather Handbags &amp; Clutches</span>
                </Link>
              </li>
              <li>
                <Link href="/category/fragrances" className="hover:text-amber-400 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ChevronRight className="w-3 h-3 text-neutral-500" />
                  <span>Artisanal Perfumes &amp; Oudh</span>
                </Link>
              </li>
              <li>
                <Link href="/category/watches-gadgets" className="hover:text-amber-400 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ChevronRight className="w-3 h-3 text-neutral-500" />
                  <span>Watches &amp; Bluetooth Audio</span>
                </Link>
              </li>
              <li className="pt-2 border-t border-white/[0.08]">
                <Link href="/category/winter-collection" className="text-amber-400 font-bold hover:text-amber-300 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Winter Collection 2026</span>
                  <span className="ml-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">New</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Concierge & Patrons */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white mb-5 font-sans">
              Patron Services
            </h3>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-sans">
              <li>
                <Link href="/track-order" className="text-amber-400 font-bold hover:text-amber-300 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>Track Consignment Live</span>
                  <span className="ml-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">Fast</span>
                </Link>
              </li>
              <li>
                <Link href="/affiliate/register" className="text-emerald-400 font-bold hover:text-emerald-300 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ChevronRight className="w-3 h-3 text-emerald-400" />
                  <span>Affiliate Partner Program</span>
                  <span className="ml-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Earn 10%</span>
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-amber-400 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ChevronRight className="w-3 h-3 text-neutral-500" />
                  <span>Patron Account Portal</span>
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-amber-400 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ChevronRight className="w-3 h-3 text-neutral-500" />
                  <span>Order History &amp; Receipts</span>
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-amber-400 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ChevronRight className="w-3 h-3 text-neutral-500" />
                  <span>Saved Atelier Wishlist</span>
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-amber-400 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ChevronRight className="w-3 h-3 text-neutral-500" />
                  <span>Compare Fabric Silhouettes</span>
                </Link>
              </li>
              <li>
                <Link href="/affiliate/terms" className="hover:text-amber-400 hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ChevronRight className="w-3 h-3 text-neutral-500" />
                  <span>Affiliate &amp; Partner Terms</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Flagship Atelier & Interactive Contact Card */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white mb-5 font-sans">
              Flagship Atelier
            </h3>
            
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-400/30 transition-all space-y-4">
              
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#d99026] shrink-0 mt-0.5" />
                <span className="text-xs text-neutral-300 leading-relaxed font-sans">
                  Near HBL Bank, Hujra Shah Muqeem, Okara, Pakistan
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#d99026] shrink-0" />
                <a href="tel:+923038212360" className="text-xs font-mono font-bold text-white hover:text-amber-400 transition">
                  +92 303 8212360
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#d99026] shrink-0" />
                <a href="mailto:concierge@cccarvan.com" className="text-xs text-neutral-300 hover:text-white transition">
                  concierge@cccarvan.com
                </a>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-white/[0.08] text-[11px] text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-[#d99026] shrink-0" />
                <span>Mon - Sat: 11:00 AM - 9:00 PM PKT</span>
              </div>

              <a
                href="https://wa.me/923038212360"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm hover:shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Direct WhatsApp Stylist</span>
              </a>

            </div>
          </div>

        </div>

        {/* 4. Payment Methods & Verification Badges */}
        <div className="py-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] text-xs text-neutral-400">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
            <span>Verified Payment Modes:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 text-[11px]">
            <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-neutral-300 font-medium">Cash on Delivery (COD)</span>
            <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-neutral-300 font-medium">Bank Transfer (HBL / Meezan)</span>
            <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-neutral-300 font-medium">EasyPaisa</span>
            <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-neutral-300 font-medium">JazzCash</span>
            <span className="px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-medium flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>256-Bit SSL Encrypted</span>
            </span>
          </div>
        </div>

        {/* 5. Bottom Copyright & Sleek Developer Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-sans">
          <p className="text-center sm:text-left text-neutral-400">
            © {new Date().getFullYear()} CC Carvan (Pvt) Ltd. All Rights Reserved. •{' '}
            <span className="text-[11px] text-neutral-400">
              Engineered &amp; Designed with precision by{' '}
              <a
                href="https://tousifqasim.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400/90 hover:text-amber-300 font-medium inline-flex items-center gap-0.5 hover:underline underline-offset-2 transition-colors"
              >
                Tousif Qasim
                <ArrowUpRight className="w-3 h-3 inline text-amber-400/80" />
              </a>
            </span>
          </p>

          <div className="flex items-center gap-4 text-[11px] text-neutral-400">
            <Link href="/affiliate/terms" className="hover:text-white transition">Terms &amp; Policies</Link>
            <span>•</span>
            <Link href="/track-order" className="hover:text-white transition">Nationwide Dispatch</Link>
            <span>•</span>
            <span className="text-neutral-400">Pakistan Luxury Apparel</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
