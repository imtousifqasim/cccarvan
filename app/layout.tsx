import type { Metadata } from 'next';
import './globals.css';
import { NavigationProgressBar } from '@/components/layout/NavigationProgressBar';
import { PwaProvider } from '@/components/pwa/PwaContext';
import { InstallPromptBanner } from '@/components/pwa/InstallPromptBanner';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cccarvan.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/icon-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icons/icon-512x512.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CC Carvan',
  },
  title: {
    default: 'CC Carvan | Haute Couture & Luxury Fashion Atelier',
    template: '%s | CC Carvan',
  },
  description:
    'Official online store for CC Carvan (cccarvan.com). Discover handcrafted luxury Pakistani unstitched lawn, festive velvet formals, bespoke pret, and heirloom pashmina shawls with nationwide express delivery.',
  keywords: [
    'CC Carvan',
    'cccarvan.com',
    'Pakistani luxury fashion',
    'haute couture lawn',
    'pret wear',
    'festive formals',
    'pashmina shawls',
    'bespoke atelier',
    'unstitched suits online Pakistan',
    'designer menswear Lahore',
    'leather wallets Pakistan',
  ],
  authors: [{ name: 'CC Carvan Atelier', url: siteUrl }],
  creator: 'CC Carvan',
  publisher: 'CC Carvan',
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'CC Carvan | Haute Couture & Luxury Fashion Atelier',
    description:
      'Centuries of Lahore artisan heritage tailored for the contemporary connoisseur. Discover handcrafted festive formals and luxury pret at cccarvan.com.',
    url: siteUrl,
    siteName: 'CC Carvan',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CC Carvan | Haute Couture & Luxury Fashion Atelier',
    description:
      'Centuries of Lahore artisan heritage tailored for the contemporary connoisseur at cccarvan.com.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased bg-white text-[#141414] selection:bg-[#d99026]/20 selection:text-[#141414]">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="theme-color" content="#141414" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CC Carvan" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://i.postimg.cc" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://i.postimg.cc" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-[#141414] overflow-x-hidden">
        <PwaProvider>
          <NavigationProgressBar />
          {children}
          <InstallPromptBanner />
        </PwaProvider>
      </body>
    </html>
  );
}

