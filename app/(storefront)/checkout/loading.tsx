import React from 'react';

export default function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-[#fcfbfa] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header / Stepper Skeleton */}
        <div className="text-center max-w-md mx-auto mb-10 space-y-3">
          <div className="h-6 w-36 bg-slate-200 mx-auto rounded animate-pulse" />
          <div className="h-4 w-56 bg-slate-200/60 mx-auto rounded animate-pulse" />

          {/* Stepper pills */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="h-2 w-16 bg-amber-500/40 rounded-full animate-pulse" />
            <div className="h-2 w-16 bg-slate-200 rounded-full" />
            <div className="h-2 w-16 bg-slate-200 rounded-full" />
          </div>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Forms Skeleton (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Contact details card */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="h-5 w-40 bg-slate-200 rounded animate-pulse" />
              <div className="h-11 w-full bg-slate-50 border border-slate-200 rounded-xl animate-pulse" />
              <div className="h-11 w-full bg-slate-50 border border-slate-200 rounded-xl animate-pulse" />
            </div>

            {/* Shipping address card */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="h-5 w-44 bg-slate-200 rounded animate-pulse" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-11 bg-slate-50 border border-slate-200 rounded-xl animate-pulse" />
                <div className="h-11 bg-slate-50 border border-slate-200 rounded-xl animate-pulse" />
              </div>
              <div className="h-11 w-full bg-slate-50 border border-slate-200 rounded-xl animate-pulse" />
              <div className="grid grid-cols-3 gap-3">
                <div className="h-11 bg-slate-50 border border-slate-200 rounded-xl animate-pulse" />
                <div className="h-11 bg-slate-50 border border-slate-200 rounded-xl animate-pulse" />
                <div className="h-11 bg-slate-50 border border-slate-200 rounded-xl animate-pulse" />
              </div>
            </div>

            {/* Payment method card */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="h-5 w-36 bg-slate-200 rounded animate-pulse mb-2" />
              <div className="h-14 w-full bg-amber-50/50 border border-amber-200/70 rounded-2xl animate-pulse" />
              <div className="h-14 w-full bg-slate-50 border border-slate-200 rounded-2xl animate-pulse" />
            </div>
          </div>

          {/* Right Column: Order Summary Skeleton (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs sticky top-28">
              <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />

              {/* Items row skeletons */}
              <div className="space-y-3 py-4 border-y border-slate-100">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-14 h-18 bg-slate-100 border border-slate-200 rounded-xl animate-pulse shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3.5 w-3/4 bg-slate-200 rounded" />
                      <div className="h-3 w-1/3 bg-slate-200/60 rounded" />
                    </div>
                    <div className="h-4 w-16 bg-slate-200 rounded" />
                  </div>
                ))}
              </div>

              {/* Price calculation rows */}
              <div className="space-y-2.5 pt-1">
                <div className="flex justify-between">
                  <div className="h-3.5 w-20 bg-slate-200/60 rounded" />
                  <div className="h-3.5 w-16 bg-slate-200/80 rounded" />
                </div>
                <div className="flex justify-between">
                  <div className="h-3.5 w-24 bg-slate-200/60 rounded" />
                  <div className="h-3.5 w-14 bg-slate-200/80 rounded" />
                </div>
                <div className="flex justify-between pt-3 border-t border-slate-100">
                  <div className="h-5 w-24 bg-slate-900/60 rounded" />
                  <div className="h-6 w-28 bg-amber-600/40 rounded" />
                </div>
              </div>

              {/* Confirm button skeleton */}
              <div className="h-13 w-full bg-slate-900/20 rounded-2xl animate-pulse pt-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
