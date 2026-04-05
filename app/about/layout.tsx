import type { Metadata } from 'next';
import Footer from '../components/Footer';
import HeaderShell from '../components/HeaderShell';
import TopHeader from '../components/TopHeader';
import SvgIcons from '../components/SvgIcons';
import AOSInit from '../components/AOSInit';

export const metadata: Metadata = {
  alternates: {
    canonical: '/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AOSInit />
      <SvgIcons />
      <TopHeader />
      <HeaderShell />
      {children}
      <Footer />
    </>
  );
}
