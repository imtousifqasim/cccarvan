'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PwaContextValue {
  isApp: boolean;
  isMobile: boolean;
  canInstall: boolean;
  showBanner: boolean;
  showIosGuide: boolean;
  showAndroidGuide: boolean;
  dismissBanner: () => void;
  installApp: () => Promise<void>;
  closeIosGuide: () => void;
  closeAndroidGuide: () => void;
}

const PwaContext = createContext<PwaContextValue | undefined>(undefined);

export function PwaProvider({ children }: { children: React.ReactNode }) {
  const [isApp, setIsApp] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [canInstall, setCanInstall] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showIosGuide, setShowIosGuide] = useState<boolean>(false);
  const [showAndroidGuide, setShowAndroidGuide] = useState<boolean>(false);
  const [isIos, setIsIos] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Detect if the user is ALREADY inside the installed app (Standalone PWA mode)
    const isStandaloneDisplay = window.matchMedia('(display-mode: standalone)').matches;
    const isIosStandalone = (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    const isAndroidAppWrapper = document.referrer.includes('android-app://');
    const urlParams = new URLSearchParams(window.location.search);
    const hasPwaSource = urlParams.get('source') === 'pwa';
    const isMarkedInStorage = localStorage.getItem('cc_is_pwa_standalone') === 'true';

    const runningAsApp = isStandaloneDisplay || isIosStandalone || isAndroidAppWrapper || hasPwaSource || isMarkedInStorage;

    if (runningAsApp) {
      setIsApp(true);
      localStorage.setItem('cc_is_pwa_standalone', 'true');
      return; // Do not initialize install banner if already in the app
    }

    // 2. Detect mobile device
    const userAgent = window.navigator.userAgent || '';
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const isMobileDevice = mobileRegex.test(userAgent) || (window.innerWidth < 1024 && window.matchMedia('(pointer: coarse)').matches);
    setIsMobile(isMobileDevice);

    const iosDevice = /iPhone|iPad|iPod/i.test(userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;
    setIsIos(iosDevice);

    // 3. Register Service Worker for PWA compliance in Chrome Android
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((reg) => {
          console.log('[PWA] Service Worker registered with scope:', reg.scope);
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration failed:', err);
        });
    }

    // 4. Capture native beforeinstallprompt event (Google Chrome Android / Desktop)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setCanInstall(true);

      // Check if user dismissed the prompt in this session
      const dismissedThisSession = sessionStorage.getItem('cc_pwa_dismissed') === 'true';
      if (isMobileDevice && !dismissedThisSession) {
        // Show after a gentle 1.5s delay for luxury user experience
        const timer = setTimeout(() => {
          setShowBanner(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 5. Handle appinstalled event
    const handleAppInstalled = () => {
      console.log('[PWA] CC Carvan App was installed successfully');
      setIsApp(true);
      setShowBanner(false);
      localStorage.setItem('cc_is_pwa_standalone', 'true');
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // If mobile Chrome or iOS Safari and beforeinstallprompt hasn't fired after 2 seconds,
    // still show banner if not dismissed (so mobile web users get the prompt)
    const fallbackTimer = setTimeout(() => {
      const dismissedThisSession = sessionStorage.getItem('cc_pwa_dismissed') === 'true';
      if (isMobileDevice && !runningAsApp && !dismissedThisSession) {
        setShowBanner(true);
      }
    }, 2000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const dismissBanner = useCallback(() => {
    setShowBanner(false);
    sessionStorage.setItem('cc_pwa_dismissed', 'true');
  }, []);

  const installApp = useCallback(async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsApp(true);
          setShowBanner(false);
          localStorage.setItem('cc_is_pwa_standalone', 'true');
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.error('[PWA] Prompt error:', err);
      }
    } else if (isIos) {
      setShowIosGuide(true);
    } else {
      setShowAndroidGuide(true);
    }
  }, [deferredPrompt, isIos]);

  const closeIosGuide = useCallback(() => {
    setShowIosGuide(false);
  }, []);

  const closeAndroidGuide = useCallback(() => {
    setShowAndroidGuide(false);
  }, []);

  return (
    <PwaContext.Provider
      value={{
        isApp,
        isMobile,
        canInstall,
        showBanner,
        showIosGuide,
        showAndroidGuide,
        dismissBanner,
        installApp,
        closeIosGuide,
        closeAndroidGuide,
      }}
    >
      {children}
    </PwaContext.Provider>
  );
}

export function usePwa() {
  const context = useContext(PwaContext);
  if (!context) {
    throw new Error('usePwa must be used within a PwaProvider');
  }
  return context;
}
