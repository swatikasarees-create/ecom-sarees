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

// Sample product data
const newArrivals = [
  { id: 1, name: 'Dark florish onepiece', price: '$95.00', image: '/images/product-item-1.jpg' },
  { id: 2, name: 'Baggy Shirt', price: '$55.00', image: '/images/product-item-2.jpg' },
  { id: 3, name: 'Cotton off-white shirt', price: '$65.00', image: '/images/product-item-3.jpg' },
  { id: 4, name: 'Crop sweater', price: '$50.00', image: '/images/product-item-4.jpg' },
  { id: 5, name: 'Crop sweater', price: '$70.00', image: '/images/product-item-10.jpg' },
];

const bestSellers = [
  { id: 1, name: 'Dark florish onepiece', price: '$95.00', image: '/images/product-item-4.jpg' },
  { id: 2, name: 'Baggy Shirt', price: '$55.00', image: '/images/product-item-3.jpg' },
  { id: 3, name: 'Cotton off-white shirt', price: '$65.00', image: '/images/product-item-5.jpg' },
  { id: 4, name: 'Handmade crop sweater', price: '$50.00', image: '/images/product-item-6.jpg' },
  { id: 5, name: 'Dark florish onepiece', price: '$70.00', image: '/images/product-item-9.jpg' },
  { id: 6, name: 'Cotton off-white shirt', price: '$70.00', image: '/images/product-item-10.jpg' },
];

const relatedProducts = [
  { id: 1, name: 'Dark florish onepiece', price: '$95.00', image: '/images/product-item-5.jpg' },
  { id: 2, name: 'Baggy Shirt', price: '$55.00', image: '/images/product-item-6.jpg' },
  { id: 3, name: 'Cotton off-white shirt', price: '$65.00', image: '/images/product-item-7.jpg' },
  { id: 4, name: 'Handmade crop sweater', price: '$50.00', image: '/images/product-item-8.jpg' },
  { id: 5, name: 'Handmade crop sweater', price: '$70.00', image: '/images/product-item-1.jpg' },
];

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
      <ProductCarousel title="Best Selling Items" products={bestSellers} sectionId="best-sellers" />
      <Testimonials />
      <ProductCarousel title="You May Also Like" products={relatedProducts} sectionId="related-products" />
      <Blog />
      <LogoBar />
      <Newsletter />
      <Instagram />
      <Footer />
    </>
  );
}
