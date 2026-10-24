'use client';

import React from 'react';
import { usePwa } from './PwaContext';
import { Download, X, Share, PlusSquare, MoreVertical, Smartphone, CheckCircle2, Sparkles } from 'lucide-react';

export function InstallPromptBanner() {
  const {
    isApp,
    isMobile,
    showBanner,
    showIosGuide,
    showAndroidGuide,
    dismissBanner,
    installApp,
    closeIosGuide,
    closeAndroidGuide,
  } = usePwa();

  // RULE 1: If user is ALREADY inside the installed app (PWA standalone mode), DO NOT SHOW ANYTHING.
  if (isApp) {
    return null;
  }

  // RULE 2: Only show on mobile web when banner is active
  return (
    <>
      {/* Floating Bottom Install Banner */}
      {showBanner && isMobile && (
        <div className="fixed bottom-3 inset-x-3 sm:max-w-md sm:mx-auto z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="relative bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-[#b87414]/30 ring-1 ring-black/5 flex items-center gap-3">
            {/* Dismiss Button */}
            <button
              type="button"
              onClick={dismissBanner}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#141414] text-white hover:bg-neutral-800 flex items-center justify-center shadow-md text-xs cursor-pointer transition-transform active:scale-90"
              aria-label="Close install prompt"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* App Icon */}
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-white border border-[#eae7e2] shadow-sm flex items-center justify-center p-1">
              <img
                src="/icons/icon-192x192.png"
                alt="CC Carvan App"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Text details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold text-[#141414] truncate tracking-tight">
                  CC Carvan App
                </h4>
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-[#b87414]/10 text-[#b87414]">
                  <Sparkles className="w-2.5 h-2.5" />
                  Official
                </span>
              </div>
              <p className="text-[11px] text-[#6b6b6b] truncate mt-0.5">
                Tez tareen shopping & fast checkout (0 MB)
              </p>
            </div>

            {/* Install CTA Button */}
            <button
              type="button"
              onClick={installApp}
              className="shrink-0 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#b87414] via-[#c8821d] to-[#b87414] hover:brightness-105 active:scale-95 text-white font-bold text-xs shadow-md shadow-[#b87414]/25 flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Download className="w-3.5 h-3.5 animate-bounce" />
              <span>Install</span>
            </button>
          </div>
        </div>
      )}

      {/* iOS Installation Instructions Bottom Sheet */}
      {showIosGuide && (
        <div 
          onClick={closeIosGuide}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-[#eae7e2] space-y-4 animate-in slide-in-from-bottom duration-300"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#eae7e2]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl overflow-hidden border border-[#eae7e2] p-1 bg-white">
                  <img src="/icons/icon-192x192.png" alt="CC Carvan" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#141414]">Install on iPhone / iPad</h3>
                  <p className="text-[10px] text-[#6b6b6b]">3 simple steps via Safari</p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeIosGuide}
                className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#141414]">
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#faf8f5] border border-[#eae7e2]">
                <div className="w-6 h-6 rounded-lg bg-[#b87414] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                  1
                </div>
                <div>
                  <p className="font-semibold flex items-center gap-1.5">
                    Tap the Share button
                    <Share className="w-3.5 h-3.5 text-blue-600 inline" />
                  </p>
                  <p className="text-[11px] text-[#6b6b6b] mt-0.5">
                    Safari browser ke nichay bar par Share icon dabaiye.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#faf8f5] border border-[#eae7e2]">
                <div className="w-6 h-6 rounded-lg bg-[#b87414] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                  2
                </div>
                <div>
                  <p className="font-semibold flex items-center gap-1.5">
                    Select &quot;Add to Home Screen&quot;
                    <PlusSquare className="w-3.5 h-3.5 text-[#b87414] inline" />
                  </p>
                  <p className="text-[11px] text-[#6b6b6b] mt-0.5">
                    List ko scroll kr ky &apos;Add to Home Screen&apos; par click karein.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#faf8f5] border border-[#eae7e2]">
                <div className="w-6 h-6 rounded-lg bg-[#b87414] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                  3
                </div>
                <div>
                  <p className="font-semibold flex items-center gap-1.5">
                    Tap &quot;Add&quot;
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                  </p>
                  <p className="text-[11px] text-[#6b6b6b] mt-0.5">
                    Top right corner me &apos;Add&apos; par tap kr k app install ho jayegi.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={closeIosGuide}
              className="w-full py-2.5 rounded-xl bg-[#141414] text-white text-xs font-bold hover:bg-neutral-800 transition"
            >
              Samajh Gaya (Done)
            </button>
          </div>
        </div>
      )}

      {/* Android Chrome Instructions Fallback */}
      {showAndroidGuide && (
        <div 
          onClick={closeAndroidGuide}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-[#eae7e2] space-y-4 animate-in slide-in-from-bottom duration-300"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#eae7e2]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl overflow-hidden border border-[#eae7e2] p-1 bg-white">
                  <img src="/icons/icon-192x192.png" alt="CC Carvan" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#141414]">Install on Android Chrome</h3>
                  <p className="text-[10px] text-[#6b6b6b]">Google Chrome Browser</p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeAndroidGuide}
                className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#141414]">
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#faf8f5] border border-[#eae7e2]">
                <div className="w-6 h-6 rounded-lg bg-[#b87414] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                  1
                </div>
                <div>
                  <p className="font-semibold flex items-center gap-1.5">
                    Chrome Menu (3 Dots)
                    <MoreVertical className="w-3.5 h-3.5 text-neutral-700 inline" />
                  </p>
                  <p className="text-[11px] text-[#6b6b6b] mt-0.5">
                    Top-right me 3 dots par click karein.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#faf8f5] border border-[#eae7e2]">
                <div className="w-6 h-6 rounded-lg bg-[#b87414] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                  2
                </div>
                <div>
                  <p className="font-semibold flex items-center gap-1.5">
                    &quot;Install app&quot; ya &quot;Add to Home screen&quot;
                    <Smartphone className="w-3.5 h-3.5 text-[#b87414] inline" />
                  </p>
                  <p className="text-[11px] text-[#6b6b6b] mt-0.5">
                    Option par tap karein aur Install confirm karein.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={closeAndroidGuide}
              className="w-full py-2.5 rounded-xl bg-[#b87414] text-white text-xs font-bold hover:bg-[#a0630e] transition"
            >
              Theek Hai (Got it)
            </button>
          </div>
        </div>
      )}
    </>
  );
}
