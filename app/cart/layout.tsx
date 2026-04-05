import type { Metadata } from 'next';
import Footer from '../components/Footer';
import HeaderShell from '../components/HeaderShell';
import SvgIcons from '../components/SvgIcons';
import TopHeader from '../components/TopHeader';

export const metadata: Metadata = {
  alternates: {
    canonical: '/cart',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartLayout({
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
