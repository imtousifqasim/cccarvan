import React from 'react';

export default function AffiliateLoading() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      {/* Header Skeleton */}
      <header className="border-b border-slate-200/80 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="CC Carvan" className="h-10 w-auto object-contain animate-pulse" />
            <div className="h-4 w-28 bg-slate-200 rounded border-l border-slate-200 pl-3 hidden sm:block animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-32 bg-slate-100 rounded-xl animate-pulse" />
            <div className="h-8 w-20 bg-slate-100 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* Tab Subnav Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 border-t border-slate-100 py-2.5 overflow-x-auto no-scrollbar">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-8 w-28 sm:w-36 bg-slate-100 rounded-xl animate-pulse shrink-0" />
          ))}
        </div>
      </header>

      {/* Main Body Skeleton */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Welcome Banner Skeleton */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white space-y-3 relative overflow-hidden">
          <div className="h-4 w-28 bg-amber-400/40 rounded-full animate-pulse" />
          <div className="h-7 sm:h-9 w-64 sm:w-80 bg-white/20 rounded-lg animate-pulse" />
          <div className="h-3.5 w-72 bg-white/10 rounded animate-pulse" />
        </div>

        {/* 4 Financial Stat Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="h-3.5 w-24 bg-slate-200 rounded" />
                <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200/60 animate-pulse" />
              </div>
              <div className="h-7 w-32 bg-slate-900/40 rounded-lg animate-pulse" />
              <div className="h-3 w-20 bg-slate-200/60 rounded" />
            </div>
          ))}
        </div>

        {/* Master Link Card Skeleton */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xs">
          <div className="h-5 w-48 bg-slate-200 rounded animate-pulse" />
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="h-12 flex-1 bg-slate-50 border border-slate-200 rounded-xl animate-pulse" />
            <div className="h-12 w-28 bg-amber-500/30 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-xs">
          <div className="h-5 w-40 bg-slate-200 rounded animate-pulse" />
          <div className="space-y-3 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 w-full bg-slate-50 border border-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
