import React from 'react';

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Editorial Header Skeleton */}
      <section className="bg-gradient-to-b from-[#fbf9f6] to-white border-b border-[#eae7e2] pt-8 sm:pt-12 pb-8 sm:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-3 w-12 bg-slate-200/80 rounded animate-pulse" />
            <span className="text-slate-300">/</span>
            <div className="h-3 w-24 bg-amber-200/60 rounded animate-pulse" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="h-3 w-28 bg-amber-600/30 rounded-full mb-2 animate-pulse" />
              <div className="h-8 sm:h-10 w-64 sm:w-80 bg-slate-200 rounded-lg animate-pulse" />
            </div>
            <div className="h-4 w-32 bg-slate-200/60 rounded animate-pulse" />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Category Pills & Filter Bar Skeleton */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#eae7e2] mb-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-9 w-24 sm:w-28 bg-slate-100 border border-slate-200/70 rounded-full animate-pulse shrink-0"
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="h-9 w-28 bg-slate-100 border border-slate-200/70 rounded-xl animate-pulse" />
            <div className="h-9 w-36 bg-slate-100 border border-slate-200/70 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* 4-Column Luxury Product Card Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 p-2 sm:p-3 space-y-3 shadow-xs overflow-hidden"
            >
              {/* Product Image Skeleton with Shimmer */}
              <div className="aspect-[3/4] w-full bg-gradient-to-tr from-slate-100 via-slate-50 to-amber-50/40 rounded-xl relative overflow-hidden animate-pulse">
                <div className="absolute top-2 left-2 h-4 w-12 bg-amber-500/20 rounded-full" />
              </div>

              {/* Product Info Skeletons */}
              <div className="space-y-2 px-1">
                <div className="h-2.5 w-16 bg-slate-200/80 rounded" />
                <div className="h-3.5 w-full bg-slate-200 rounded" />
                <div className="h-3.5 w-3/4 bg-slate-200 rounded" />
                <div className="flex items-center justify-between pt-1">
                  <div className="h-4 w-20 bg-amber-600/30 rounded" />
                  <div className="h-3 w-12 bg-slate-200/60 rounded" />
                </div>
              </div>

              {/* Add to bag button skeleton */}
              <div className="h-9 w-full bg-slate-100 rounded-xl animate-pulse mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
