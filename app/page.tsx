import type { Metadata } from 'next';
import TopHeader from './components/TopHeader';
import HeaderShell from './components/HeaderShell';
import BannerCarousel from './components/BannerCarousel';
import PromoMarquee from './components/PromoMarquee';
import ShopByCategory from './components/ShopByCategory';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Categories from './components/Categories';
import HomeNewArrivalsCarousel from './components/HomeNewArrivalsCarousel';
import ProductCarousel from './components/ProductCarousel';
import Collection from './components/Collection';
import Testimonials from './components/Testimonials';
import LogoBar from './components/LogoBar';
import Newsletter from './components/Newsletter';
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

// Convert products to carousel format
const formatProductsForCarousel = (prods: typeof products) =>
  prods.map((p) => ({
    id: p.id,
    name: p.name,
    price: `₹${p.price.toLocaleString('en-IN')}`,
    image: p.image,
  }));

export default function Home() {
  const newArrivalIds = ['18', '36', '37', '38', '39', '40', '41'];
  const newArrivalBaseProducts = products.filter((p) => newArrivalIds.includes(p.id));

  const bestSellers = formatProductsForCarousel(
    products.filter((p) => ['7', '5', '31', '35', '6', '40'].includes(p.id))
  );

  const trendingProducts = formatProductsForCarousel(
    products
      .filter((p) => p.collection === 'Party Wear' || p.collection === 'Festive Collection')
      .slice(0, 6)
  );

  return (
    <>
      <AOSInit />
      <SvgIcons />
      <TopHeader />
      <HeaderShell />
      <BannerCarousel />
      <PromoMarquee />
      <ShopByCategory />
      <SectionSeparator />
      <HeroSection />
      <SectionSeparator />
      <Instagram />
      {/* <SectionSeparator /> */}
      {/* <Features /> */}
      {/* <SectionSeparator /> */}
      <Categories />
      <SectionSeparator />
      <HomeNewArrivalsCarousel baseProducts={newArrivalBaseProducts} />
      {/* <SectionSeparator />
      <Collection />
      <SectionSeparator /> */}
      <ProductCarousel title="Best Selling Sarees" products={bestSellers} sectionId="best-sellers" />
      <SectionSeparator />
      <Testimonials />
      <SectionSeparator />
      <ProductCarousel title="Trending Collection" products={trendingProducts} sectionId="trending-products" />
      <SectionSeparator />
      {/* <LogoBar /> */}
      {/* <Newsletter /> */}
      <Footer />
      <ScrollToTop />
    </>
  );
}

