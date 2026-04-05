import type { Metadata } from 'next';
import TopHeader from './components/TopHeader';
import Header from './components/Header';
import BannerCarousel from './components/BannerCarousel';
import PromoMarquee from './components/PromoMarquee';
import ShopByCategory from './components/ShopByCategory';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Categories from './components/Categories';
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
  prods.map(p => ({
    id: p.id,
    name: p.name,
    price: `₹${p.price.toLocaleString('en-IN')}`,
    image: p.image
  }));

// New Arrivals: Latest products (tissue silk, designer sarees, suit sets)
const newArrivals = formatProductsForCarousel(
  products.filter(p => ['18', '36', '37', '38', '39', '40', '41'].includes(p.id))
);

// Best Sellers: Highest value products (sarees with premium prices)
const bestSellers = formatProductsForCarousel(
  products.filter(p => ['7', '5', '31', '35', '6', '40'].includes(p.id))
);

// Trending: Party wear and festive sarees
const trendingProducts = formatProductsForCarousel(
  products.filter(p => p.collection === 'Party Wear' || p.collection === 'Festive Collection').slice(0, 6)
);

export default function Home() {
  return (
    <>
      <AOSInit />
      <SvgIcons />
      <TopHeader />
      <Header />
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
      <ProductCarousel title="Our New Arrivals" products={newArrivals} sectionId="new-arrival" />
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
