import type { Metadata } from 'next';
import TopHeader from '../components/TopHeader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SvgIcons from '../components/SvgIcons';

export const metadata: Metadata = {
  alternates: {
    canonical: '/sarees',
  },
};

export default function SareesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
