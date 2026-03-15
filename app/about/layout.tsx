import type { Metadata } from 'next';
import Footer from '../components/Footer';
import Header from '../components/Header';
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
      <Header />
      {children}
      <Footer />
    </>
  );
}
