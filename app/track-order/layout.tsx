import type { Metadata } from 'next';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SvgIcons from '../components/SvgIcons';
import TopHeader from '../components/TopHeader';

export const metadata: Metadata = {
  title: 'Track order',
  description: 'Track your order with your order ID or email — no login required.',
  alternates: {
    canonical: '/track-order',
  },
};

export default function TrackOrderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SvgIcons />
      <TopHeader />
      <Header />
      {children}
      <Footer />
    </>
  );
}
