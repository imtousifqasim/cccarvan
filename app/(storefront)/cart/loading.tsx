import React from 'react';

export default function CartLoading() {
  return (
    <div className="min-h-screen bg-white py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Cart Items List Skeleton (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex gap-4 items-center shadow-xs"
              >
                <div className="w-20 h-26 bg-slate-100 border border-slate-200 rounded-xl animate-pulse shrink-0" />
                <div className="flex-1 space-y-2.5">
                  <div className="h-4 w-3/4 bg-slate-200 rounded" />
                  <div className="h-3 w-1/3 bg-slate-200/60 rounded" />
                  <div className="h-5 w-24 bg-amber-600/30 rounded" />
                </div>
                <div className="h-9 w-24 bg-slate-100 rounded-xl animate-pulse" />
              </div>
            ))}
          </div>

          {/* Cart Summary Skeleton (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-[#fcfbfa] border border-slate-200/90 rounded-3xl p-6 sm:p-7 space-y-4">
              <div className="h-5 w-36 bg-slate-200 rounded animate-pulse" />
              <div className="space-y-2 py-3 border-y border-slate-200">
                <div className="flex justify-between">
                  <div className="h-3.5 w-20 bg-slate-200/60 rounded" />
                  <div className="h-3.5 w-16 bg-slate-200/80 rounded" />
                </div>
                <div className="flex justify-between">
                  <div className="h-3.5 w-20 bg-slate-200/60 rounded" />
                  <div className="h-3.5 w-16 bg-slate-200/80 rounded" />
                </div>
              </div>
              <div className="h-12 w-full bg-slate-900/20 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
