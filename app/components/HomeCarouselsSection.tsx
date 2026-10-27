'use client';

import { useState, useEffect, useMemo } from 'react';
import HomeNewArrivalsCarousel from './HomeNewArrivalsCarousel';
import ProductCarousel from './ProductCarousel';
import Testimonials from './Testimonials';
import SectionSeparator from './SectionSeparator';
import type { Product } from '../lib/productData';
import { createProductMix, formatCarouselItem } from '../lib/productMix';
import { apiUrl } from '../lib/apiBase';

interface HomeCarouselsSectionProps {
  initialProducts: Product[];
}

export default function HomeCarouselsSection({ initialProducts }: HomeCarouselsSectionProps) {
  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    let active = true;
    fetch(apiUrl('/api/products'))
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && Array.isArray(data?.products) && data.products.length > 0) {
          setAllProducts(data.products);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // ── 1. Our New Arrivals: Mainly newly added products (75%) + classic favorites (25%) ──
  const newArrivals = useMemo(() => {
    return createProductMix(allProducts, {
      count: 8,
      newCount: 6,
      oldCount: 2,
      preferredOldIds: ['40', '18'],
      filter: (p) => !/suit|kurta/i.test(p.category),
    });
  }, [allProducts]);

  // ── 2. Best Selling Sarees: Mix of newly added highlights + all-time bestsellers ──
  const bestSellers = useMemo(() => {
    const mix = createProductMix(allProducts, {
      count: 8,
      newCount: 5,
      oldCount: 3,
      preferredOldIds: ['7', '5', '31'],
      filter: (p) => !/suit|kurta/i.test(p.category),
    });
    return mix.map(formatCarouselItem);
  }, [allProducts]);

  // ── 3. Trending Collection: Mix of new festive additions + classic trending styles ──
  const trendingProducts = useMemo(() => {
    const mix = createProductMix(allProducts, {
      count: 8,
      newCount: 5,
      oldCount: 3,
      preferredOldIds: ['6', '35', '40'],
      filter: (p) => !/suit|kurta/i.test(p.category),
    });
    return mix.map(formatCarouselItem);
  }, [allProducts]);

  return (
    <>
      <HomeNewArrivalsCarousel baseProducts={newArrivals} />
      <ProductCarousel title="Best Selling Sarees" products={bestSellers} sectionId="best-sellers" />
      <SectionSeparator />
      <Testimonials />
      <SectionSeparator />
      <ProductCarousel title="Trending Collection" products={trendingProducts} sectionId="trending-products" />
    </>
  );
}
