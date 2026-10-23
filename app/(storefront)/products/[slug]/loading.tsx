import React from 'react';

export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Skeleton */}
      <div className="border-b border-[#eae7e2] py-4 bg-[#fdfcfb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
          <div className="h-3 w-12 bg-slate-200 rounded animate-pulse" />
          <span className="text-slate-300">/</span>
          <div className="h-3 w-16 bg-slate-200 rounded animate-pulse" />
          <span className="text-slate-300">/</span>
          <div className="h-3 w-32 bg-amber-200/70 rounded animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Left Column: Image Gallery Skeleton (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-[4/5] sm:aspect-[3/4] w-full bg-gradient-to-tr from-slate-100 via-slate-50 to-amber-50/40 rounded-3xl border border-slate-200/80 animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>

            {/* Thumbnails row */}
            <div className="flex items-center gap-3 overflow-x-auto py-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-20 h-24 rounded-xl bg-slate-100 border border-slate-200 animate-pulse shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Right Column: Product Specs & Actions Skeleton (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3 pb-6 border-b border-[#eae7e2]">
              <div className="h-3.5 w-24 bg-amber-600/30 rounded-full animate-pulse" />
              <div className="h-8 sm:h-10 w-full bg-slate-200 rounded-lg animate-pulse" />
              <div className="h-8 w-3/4 bg-slate-200 rounded-lg animate-pulse" />

              {/* Rating stars & SKU */}
              <div className="flex items-center gap-3 pt-1">
                <div className="h-4 w-28 bg-slate-200/80 rounded animate-pulse" />
                <div className="h-4 w-20 bg-slate-200/60 rounded animate-pulse" />
              </div>

              {/* Price skeleton */}
              <div className="flex items-baseline gap-3 pt-2">
                <div className="h-8 w-36 bg-amber-600/40 rounded-lg animate-pulse" />
                <div className="h-5 w-24 bg-slate-200/60 rounded line-through animate-pulse" />
              </div>
            </div>

            {/* Variants skeleton */}
            <div className="space-y-3">
              <div className="h-3.5 w-28 bg-slate-200/80 rounded" />
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-16 bg-slate-100 border border-slate-200 rounded-xl animate-pulse" />
                ))}
              </div>
            </div>

            {/* Quantity & CTA Buttons skeleton */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3">
                <div className="h-13 w-28 bg-slate-100 border border-slate-200 rounded-2xl animate-pulse" />
                <div className="h-13 flex-1 bg-amber-500/30 rounded-2xl animate-pulse" />
              </div>
              <div className="h-13 w-full bg-slate-900/20 rounded-2xl animate-pulse" />
            </div>

            {/* Feature badges skeleton */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <div className="h-12 bg-slate-50 border border-slate-100 rounded-xl animate-pulse" />
              <div className="h-12 bg-slate-50 border border-slate-100 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
