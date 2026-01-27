import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Categories from './components/Categories';
import ProductCarousel from './components/ProductCarousel';
import Collection from './components/Collection';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import LogoBar from './components/LogoBar';
import Newsletter from './components/Newsletter';
import Instagram from './components/Instagram';
import Footer from './components/Footer';
import SvgIcons from './components/SvgIcons';
import AOSInit from './components/AOSInit';
import { products } from './lib/productData';

// Convert products to carousel format
const formatProductsForCarousel = (prods: typeof products) => 
  prods.map(p => ({
    id: p.id,
    name: p.name,
    price: `₹${p.price.toLocaleString('en-IN')}`,
    image: p.image
  }));

// Get specific product sets
const newArrivals = formatProductsForCarousel(products.slice(0, 6));
const bestSellers = formatProductsForCarousel(
  [...products]
    .sort((a, b) => (b.originalPrice || 0) - (a.originalPrice || 0))
    .slice(0, 6)
);
const trendingProducts = formatProductsForCarousel(
  products.filter(p => p.collection === 'Designer Collection' || p.collection === 'Silk Collection').slice(0, 6)
);

export default function Home() {
  return (
    <>
      <AOSInit />
      <SvgIcons />
      <Header />
      <HeroSection />
      <Features />
      <Categories />
      <ProductCarousel title="Our New Arrivals" products={newArrivals} sectionId="new-arrival" />
      <Collection />
      <ProductCarousel title="Best Selling Sarees" products={bestSellers} sectionId="best-sellers" />
      <Testimonials />
      <ProductCarousel title="Trending Collection" products={trendingProducts} sectionId="trending-products" />
      <Blog />
      <LogoBar />
      <Newsletter />
      <Instagram />
      <Footer />
    </>
  );
}
