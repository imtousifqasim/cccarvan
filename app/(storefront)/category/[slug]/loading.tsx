import React from 'react';

export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Category Hero Banner Skeleton */}
      <section className="bg-gradient-to-br from-[#141414] via-[#1c1917] to-[#141414] text-white pt-10 sm:pt-16 pb-12 sm:pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-3 w-12 bg-white/20 rounded animate-pulse" />
            <span className="text-white/30">/</span>
            <div className="h-3 w-16 bg-white/20 rounded animate-pulse" />
            <span className="text-white/30">/</span>
            <div className="h-3 w-28 bg-amber-400/50 rounded animate-pulse" />
          </div>

          <div className="max-w-2xl space-y-3">
            <div className="h-3 w-32 bg-amber-400/40 rounded-full animate-pulse" />
            <div className="h-10 sm:h-12 w-72 sm:w-96 bg-white/20 rounded-xl animate-pulse" />
            <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-white/10 rounded animate-pulse" />
          </div>
        </div>

        {/* Ambient glow accent */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Main Grid Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Controls skeleton */}
        <div className="flex items-center justify-between pb-6 border-b border-[#eae7e2] mb-8">
          <div className="h-4 w-32 bg-slate-200/80 rounded animate-pulse" />
          <div className="h-9 w-36 bg-slate-100 border border-slate-200 rounded-xl animate-pulse" />
        </div>

        {/* Product Card Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 p-2 sm:p-3 space-y-3 shadow-xs overflow-hidden"
            >
              <div className="aspect-[3/4] w-full bg-gradient-to-tr from-slate-100 via-slate-50 to-amber-50/40 rounded-xl animate-pulse" />
              <div className="space-y-2 px-1">
                <div className="h-2.5 w-16 bg-slate-200/80 rounded" />
                <div className="h-3.5 w-full bg-slate-200 rounded" />
                <div className="h-3.5 w-3/4 bg-slate-200 rounded" />
                <div className="flex items-center justify-between pt-1">
                  <div className="h-4 w-20 bg-amber-600/30 rounded" />
                  <div className="h-3 w-12 bg-slate-200/60 rounded" />
                </div>
              </div>
              <div className="h-9 w-full bg-slate-100 rounded-xl animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
