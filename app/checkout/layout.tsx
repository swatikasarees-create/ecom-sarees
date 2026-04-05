import type { Metadata } from 'next';
import TopHeader from '../components/TopHeader';
import HeaderShell from '../components/HeaderShell';
import Footer from '../components/Footer';
import SvgIcons from '../components/SvgIcons';

export const metadata: Metadata = {
  alternates: {
    canonical: '/checkout',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SvgIcons />
      <TopHeader />
      <HeaderShell />
      {children}
      <Footer />
    </>
  );
}

