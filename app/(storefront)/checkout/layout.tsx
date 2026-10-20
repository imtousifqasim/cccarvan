import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Express Secure Checkout',
  description: 'Secure nationwide checkout with Cash on Delivery and Direct Bank Transfer at CC Carvan.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
