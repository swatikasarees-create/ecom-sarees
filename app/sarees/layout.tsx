import Header from '../components/Header';
import Footer from '../components/Footer';
import SvgIcons from '../components/SvgIcons';

export default function SareesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SvgIcons />
      <Header />
      {children}
      <Footer />
    </>
  );
}
