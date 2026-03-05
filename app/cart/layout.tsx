import Footer from '../components/Footer';
import Header from '../components/Header';
import SvgIcons from '../components/SvgIcons';
import TopHeader from '../components/TopHeader';

export default function CartLayout({
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
