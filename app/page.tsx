import type { Metadata } from 'next';
import TopHeader from './components/TopHeader';
import HeaderShell from './components/HeaderShell';
import PromoBannerSlider from './components/PromoBannerSlider';
import BannerCarousel from './components/BannerCarousel';
import PromoMarquee from './components/PromoMarquee';
import ShopByCategory from './components/ShopByCategory';
import HeroSection from './components/HeroSection';
import Categories from './components/Categories';
import HomeCarouselsSection from './components/HomeCarouselsSection';
import Instagram from './components/Instagram';
import Footer from './components/Footer';
import SvgIcons from './components/SvgIcons';
import AOSInit from './components/AOSInit';
import SectionSeparator from './components/SectionSeparator';
import ScrollToTop from './components/ScrollToTop';
import { products } from './lib/productData';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  const inStockInitialProducts = products.filter(
    (p) => p.availability !== 'out_of_stock' && (typeof p.inventory !== 'number' || p.inventory > 0)
  );

  return (
    <>
      <AOSInit />
      <SvgIcons />
      <TopHeader />
      <HeaderShell />
      <PromoBannerSlider />
      <BannerCarousel />
      <PromoMarquee />
      <ShopByCategory />
      <SectionSeparator />
      <HeroSection />
      <SectionSeparator />
      <Instagram />
      <Categories />
      <SectionSeparator />
      <HomeCarouselsSection initialProducts={inStockInitialProducts} />
      <SectionSeparator />
      <Footer />
      <ScrollToTop />
    </>
  );
}
