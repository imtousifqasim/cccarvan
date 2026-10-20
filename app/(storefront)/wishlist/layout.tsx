import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Curated Atelier Wishlist',
  description:
    'Your personal salon curation of handcrafted silhouettes, bespoke festive formals, and bridal couture at CC Carvan.',
  alternates: {
    canonical: 'https://cccarvan.com/wishlist',
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Curated Atelier Wishlist | CC Carvan',
    description: 'Personal salon curation of luxury Pakistani couture silhouettes.',
    url: 'https://cccarvan.com/wishlist',
    siteName: 'CC Carvan',
    type: 'website',
  },
};

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
