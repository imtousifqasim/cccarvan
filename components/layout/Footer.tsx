'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Sparkles, ArrowUpRight } from 'lucide-react';
import { SEED_CATEGORIES } from '@/lib/data/seed-data';

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
        setSubMessage(data.message || 'You are on the VIP guest list for private releases.');
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
    <footer className="bg-[#0c0c0e] text-neutral-300 border-t border-white/[0.08] pt-24 pb-16 transition-colors font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter / Salon Pre-Order Banner with Generous Luxury Spacing */}
        <div className="mb-24 p-10 sm:p-16 lg:p-20 rounded-3xl bg-gradient-to-br from-[#16161c] via-[#121216] to-[#0c0c0e] border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
          <div className="max-w-xl text-center lg:text-left space-y-3">
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-[#d99026] flex items-center justify-center lg:justify-start gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CC Carvan Privilege Membership</span>
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Receive VIP Access to Private Pre-Orders
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans pt-1">
              Be the first to secure limited-edition unstitched lawn drops, bridal formals, and hand-woven Kashmiri pashminas before public release.
            </p>
          </div>

          <div className="w-full lg:max-w-md">
            {subscribed ? (
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">Privilege Membership Registered</p>
                  <p className="text-[11px] text-emerald-300 mt-0.5">{subMessage}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 px-5 py-4 text-xs bg-neutral-950/80 border border-neutral-700 rounded-full focus:outline-none focus:border-[#d99026] text-white placeholder-neutral-400 shadow-inner"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 rounded-full bg-[#d99026] hover:bg-[#c67d18] text-[#141414] font-bold text-xs uppercase tracking-[0.16em] transition shadow-lg shadow-[#d99026]/25 whitespace-nowrap cursor-pointer disabled:opacity-60"
                >
                  {loading ? 'Joining...' : 'Join Salon'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Major Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/[0.08]">
          
          {/* Column 1: Brand & Social */}
          <div className="space-y-4">
            <Link href="/" className="inline-block group">
              <img
                src="/logo.png"
                alt="CC Carvan"
                className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              CC Carvan defines contemporary Pakistani luxury fashion, combining heirloom artisanal craft with modern pret silhouettes for timeless luxury.
            </p>
            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400 block mb-3">
                Follow The Atelier
              </span>
              <div className="flex items-center gap-3 text-neutral-300">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center hover:text-[#d99026] hover:border-[#d99026] transition" aria-label="Instagram">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center hover:text-[#d99026] hover:border-[#d99026] transition" aria-label="Facebook">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center hover:text-[#d99026] hover:border-[#d99026] transition" aria-label="YouTube">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Customer Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white mb-5 font-sans">
              Customer Concierge
            </h3>
            <ul className="space-y-3 text-xs text-neutral-300 font-sans">
              <li>
                <Link href="/account" className="hover:text-white hover:underline transition">My Account Portal</Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-white hover:underline transition">Order History</Link>
              </li>
              <li>
                <Link href="/track-order" className="text-[#d99026] font-bold hover:underline transition">Track Consignment</Link>
              </li>
              <li>
                <Link href="/affiliate/register" className="text-[#d99026] font-semibold hover:underline transition">Affiliate Partner Network</Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white hover:underline transition">Curated Wishlist</Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white hover:underline transition">Compare Formals</Link>
              </li>
              <li>
                <Link href="/products?isBestDeal=true" className="hover:text-white hover:underline transition">Limited Edition Specials</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white mb-5 font-sans">
              Store Collections
            </h3>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-sans">
              <li>
                <Link href="/category/men" className="hover:text-[#d99026] hover:underline transition font-semibold text-white">
                  Men's Fashion & Suits
                </Link>
              </li>
              <li>
                <Link href="/category/women" className="hover:text-[#d99026] hover:underline transition font-semibold text-white">
                  Women's Suits & Abayas
                </Link>
              </li>
              <li>
                <Link href="/category/men-winter-wear" className="hover:text-white hover:underline transition">
                  Men's Winter Wear & Jackets
                </Link>
              </li>
              <li>
                <Link href="/category/women-night-suits-pajamas" className="hover:text-white hover:underline transition">
                  Women Night Suits & Pajamas
                </Link>
              </li>
              <li>
                <Link href="/category/women-handbags" className="hover:text-white hover:underline transition">
                  Leather Handbags & Purses
                </Link>
              </li>
              <li>
                <Link href="/category/fragrances" className="hover:text-white hover:underline transition">
                  Fragrances & Men's Perfumes
                </Link>
              </li>
              <li>
                <Link href="/category/beauty-makeup" className="hover:text-white hover:underline transition">
                  Beauty Deals & Skincare
                </Link>
              </li>
              <li>
                <Link href="/category/watches-gadgets" className="hover:text-white hover:underline transition">
                  Watches & Bluetooth Earbuds
                </Link>
              </li>
              <li className="pt-1.5 border-t border-white/10">
                <Link href="/category/winter-collection" className="text-[#d99026] font-bold hover:underline transition flex items-center gap-1">
                  <span>Winter Collection 2026</span>
                </Link>
              </li>
              <li>
                <Link href="/category/new-arrivals" className="text-[#d99026] font-semibold hover:underline transition">
                  New Season Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Flagship */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white mb-5 font-sans">
              Flagship Atelier
            </h3>
            <ul className="space-y-3 text-xs text-neutral-300 font-sans">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#d99026] shrink-0 mt-0.5" />
                <span>Near Meezan Bank Branch, Peco Road, Lahore, Punjab, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#d99026] shrink-0" />
                <a href="tel:+923267727318" className="hover:text-[#d99026] transition">
                  +92 326 7727318
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#d99026] shrink-0" />
                <span>concierge@cccarvan.com</span>
              </li>
              <li className="pt-2 text-[11px] text-neutral-400">
                Opening Hours: Mon - Sat: 11:00 AM - 9:00 PM PKT
              </li>
            </ul>
          </div>

        </div>

        {/* Modern Developer Credit & Architectural Showcase */}
        <div className="my-14 rounded-3xl bg-gradient-to-br from-[#121319] via-[#0d0e12] to-[#17140f] border border-white/[0.12] hover:border-amber-400/40 p-6 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl relative overflow-hidden group transition-all duration-500">
          {/* Subtle ambient auroral lighting */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-[#d99026]/20 to-purple-600/10 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#d99026]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">
              {/* Monogram Avatar with luxury gradient ring & live beacon */}
              <div className="relative shrink-0">
                <a
                  href="https://tousifqasim.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-[#d99026] to-[#804d08] text-slate-950 font-black text-2xl flex items-center justify-center shadow-[0_0_25px_rgba(217,144,38,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 ring-2 ring-white/20 hover:ring-amber-400/60 font-display"
                  title="Tousif Qasim — Principal Full-Stack Architect & Digital Craftsman"
                >
                  TQ
                </a>
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#0d0e12]" />
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-white/[0.05] border border-white/10 text-neutral-300">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Lead Architect &amp; Designer</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available for High-Impact Projects
                  </span>
                </div>

                <h3 className="text-white font-bold text-base sm:text-lg tracking-tight font-sans">
                  Engineered &amp; Designed with precision by{' '}
                  <a
                    href="https://tousifqasim.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-[#d99026] hover:from-amber-200 hover:to-amber-300 font-extrabold transition-all inline-flex items-center gap-1 hover:underline underline-offset-4 decoration-amber-400/40"
                  >
                    Tousif Qasim
                    <ArrowUpRight className="w-4 h-4 text-amber-400 inline transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </h3>

                <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed font-sans">
                  Specializing in modern full-stack web applications, ultra-fast headless luxury e-commerce, and multi-tenant architectures engineered for extreme scalability and conversion.
                </p>

                {/* Tech Pills */}
                <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                  {['Next.js 16 (Turbopack)', 'React 19', 'TypeScript', 'Multi-Shard DB', 'Tailwind CSS'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-medium bg-white/[0.03] text-neutral-400 border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Portfolio / Contact CTA */}
            <a
              href="https://tousifqasim.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-[#d99026] to-[#b87414] hover:from-amber-300 hover:to-[#c87e16] text-slate-950 font-extrabold text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-[0_0_30px_rgba(217,144,38,0.3)] hover:shadow-[0_0_45px_rgba(217,144,38,0.5)] hover:scale-[1.03] active:scale-[0.98] whitespace-nowrap shrink-0 group/cta"
            >
              <span>Visit Portfolio / Hire</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1" />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-sans">
          <p>
            © {new Date().getFullYear()} CC Carvan. All Rights Reserved. Designed &amp; Engineered with precision by{' '}
            <a
              href="https://tousifqasim.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1 hover:underline underline-offset-4 decoration-amber-400/40 transition-colors"
            >
              Tousif Qasim
              <ArrowUpRight className="w-3.5 h-3.5 inline text-amber-400" />
            </a>
          </p>
          <div className="flex items-center gap-4 text-[11px] text-neutral-300">
            <span>Cash on Delivery (COD)</span>
            <span>•</span>
            <span>Bank Transfer</span>
            <span>•</span>
            <span>EasyPaisa / JazzCash</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
