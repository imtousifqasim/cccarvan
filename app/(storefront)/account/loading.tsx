import React from 'react';

export default function AccountLoading() {
  return (
    <div className="min-h-screen bg-[#fcfbfa] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Account Header Skeleton */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 animate-pulse" />
            <div className="space-y-2">
              <div className="h-5 w-44 bg-slate-200 rounded animate-pulse" />
              <div className="h-3.5 w-32 bg-slate-200/60 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-10 w-28 bg-slate-100 rounded-xl animate-pulse" />
        </div>

        {/* Account Nav Tabs Skeleton */}
        <div className="flex gap-2 border-b border-slate-200 pb-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-9 w-28 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>

        {/* Content Body Skeletons */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
                <div className="h-6 w-20 bg-amber-500/20 rounded-full animate-pulse" />
              </div>
              <div className="h-3 w-48 bg-slate-200/60 rounded" />
              <div className="h-12 w-full bg-slate-50 rounded-xl animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
