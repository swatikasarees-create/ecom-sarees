'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCarousel from './ProductCarousel';
import type { Product } from '../lib/productData';
import { testCatalogProduct } from '../lib/productData';

function formatProductsForCarousel(prods: Product[]) {
  return prods.map((p) => ({
    id: p.id,
    name: p.name,
    price: `₹${p.price.toLocaleString('en-IN')}`,
    image: p.image,
  }));
}

function NewArrivalsInner({ baseProducts }: { baseProducts: Product[] }) {
  const searchParams = useSearchParams();
  const carouselProducts = useMemo(() => {
    const formatted = formatProductsForCarousel(baseProducts);
    if (searchParams.has('test')) {
      const [testRow] = formatProductsForCarousel([testCatalogProduct]);
      return [testRow, ...formatted];
    }
    return formatted;
  }, [searchParams, baseProducts]);

  return <ProductCarousel title="Our New Arrivals" products={carouselProducts} sectionId="new-arrival" />;
}

export default function HomeNewArrivalsCarousel({ baseProducts }: { baseProducts: Product[] }) {
  const fallback = formatProductsForCarousel(baseProducts);
  return (
    <Suspense
      fallback={<ProductCarousel title="Our New Arrivals" products={fallback} sectionId="new-arrival" />}
    >
      <NewArrivalsInner baseProducts={baseProducts} />
    </Suspense>
  );
}
