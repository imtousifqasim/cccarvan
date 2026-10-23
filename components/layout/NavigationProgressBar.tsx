'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';

function PageTransitionLoaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Admin pages have their own inline actions, skip transition loader for admin routes if preferred
  const isAdmin = pathname?.startsWith('/admin');

  // When route changes finish, complete progress to 100% and fade out cleanly
  useEffect(() => {
    if (loading) {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      setProgress(100);
      hideTimerRef.current = setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 250);
    }
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [pathname, searchParams]);

  // Intercept all internal navigation link clicks for instant feedback
  useEffect(() => {
    if (isAdmin) return;

    const startTransition = () => {
      setLoading(true);
      setProgress(25);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);

      // Smooth progression up to 85%
      progressTimerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 85) {
            if (progressTimerRef.current) clearInterval(progressTimerRef.current);
            return 85;
          }
          return prev + 12;
        });
      }, 100);

      // Safety timeout: auto dismiss after 8s in case navigation is cancelled
      safetyTimerRef.current = setTimeout(() => {
        setLoading(false);
        setProgress(0);
        if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      }, 8000);
    };

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Filter external links, actions, hashes, downloads
      if (
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#') ||
        href.startsWith('/admin') ||
        target.target === '_blank' ||
        target.getAttribute('download') !== null ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Skip if clicking exact current URL
      const currentUrl = window.location.pathname + window.location.search;
      if (href === currentUrl || href === window.location.pathname) {
        return;
      }

      startTransition();
    };

    const handlePopState = () => {
      startTransition();
    };

    document.addEventListener('click', handleClick, { capture: true });
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
      window.removeEventListener('popstate', handlePopState);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    };
  }, [isAdmin]);

  if (isAdmin || !loading) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[99999] pointer-events-none flex flex-col items-center justify-center transition-opacity duration-300 animate-in fade-in-50"
    >
      {/* Top glowing progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent overflow-hidden z-[100000]">
        <div
          className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 shadow-[0_0_12px_rgba(217,144,38,0.85)] transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Backdrop with modern glassmorphism blur */}
      <div className="absolute inset-0 bg-white/75 backdrop-blur-md backdrop-saturate-150 transition-opacity duration-300" />

      {/* Centered Brand Loading Card */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 space-y-4">
        <div className="relative flex items-center justify-center">
          {/* Ambient glowing radial aura */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-amber-500/25 via-amber-400/20 to-amber-200/20 blur-xl animate-pulse" />

          {/* Outer luxury spinning ring */}
          <div className="absolute w-24 h-24 rounded-full border-2 border-amber-500/25 border-t-amber-600 border-r-amber-400 animate-spin" />

          {/* Floating card with logo */}
          <div className="relative w-20 h-20 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center justify-center p-2.5">
            <Image
              src="/logo.png"
              alt="CC Carvan Logo"
              width={56}
              height={56}
              priority
              className="object-contain animate-pulse duration-1000"
            />
          </div>
        </div>

        {/* Brand Text & Status */}
        <div className="text-center space-y-1">
          <p className="text-xs font-bold tracking-widest text-[#141414] uppercase font-serif">
            CC CARVAN
          </p>
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
            <span>Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageTransitionLoader() {
  return (
    <Suspense fallback={null}>
      <PageTransitionLoaderInner />
    </Suspense>
  );
}

export const NavigationProgressBar = PageTransitionLoader;
