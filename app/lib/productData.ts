// Product data extracted from image filenames
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  fabric: string;
  color: string;
  availability: 'in_stock' | 'out_of_stock';
  collection?: string;
}

export const products: Product[] = [
  // Top Trending Sarees
  {
    id: '1',
    name: 'Designer Silk Saree - Trending Collection',
    price: 2903,
    originalPrice: 5805,
    image: '/images/sarees/top_trending_1_1.webp',
    category: 'Designer Sarees',
    fabric: 'Silk',
    color: 'Multi',
    availability: 'in_stock',
    collection: 'Trending Collection'
  },
  {
    id: '2',
    name: 'Premium Designer Saree',
    price: 2903,
    originalPrice: 5805,
    image: '/images/sarees/top_trending_2_2_987fb1ae-3e6e-46a5-8acf-69fad7aae011.webp',
    category: 'Designer Sarees',
    fabric: 'Silk',
    color: 'Multi',
    availability: 'in_stock',
    collection: 'Trending Collection'
  },
  {
    id: '3',
    name: 'Elegant Designer Saree',
    price: 3200,
    originalPrice: 6400,
    image: '/images/sarees/top_trending_3_1.webp',
    category: 'Designer Sarees',
    fabric: 'Georgette',
    color: 'Multi',
    availability: 'in_stock',
    collection: 'Trending Collection'
  },
  {
    id: '4',
    name: 'Luxury Designer Saree',
    price: 3500,
    originalPrice: 7000,
    image: '/images/sarees/top_trending_4_1.webp',
    category: 'Designer Sarees',
    fabric: 'Silk',
    color: 'Multi',
    availability: 'in_stock',
    collection: 'Trending Collection'
  },
  {
    id: '5',
    name: 'Exquisite Designer Saree',
    price: 3800,
    originalPrice: 7600,
    image: '/images/sarees/top_trending_5_1.webp',
    category: 'Designer Sarees',
    fabric: 'Silk',
    color: 'Multi',
    availability: 'in_stock',
    collection: 'Trending Collection'
  },
  // Premium Collection (318005 series)
  {
    id: '6',
    name: 'Premium Silk Saree with Embroidery',
    price: 4200,
    originalPrice: 8400,
    image: '/images/sarees/318005-1_52797673529_o.webp',
    category: 'Silk Sarees',
    fabric: 'Silk',
    color: 'Red',
    availability: 'in_stock',
    collection: 'Premium Collection'
  },
  // Wedding & Party Collection (408000 series)
  {
    id: '7',
    name: 'Wedding Special Banarasi Saree',
    price: 3900,
    originalPrice: 7800,
    image: '/images/sarees/408001.webp',
    category: 'Wedding Sarees',
    fabric: 'Banarasi Silk',
    color: 'Gold',
    availability: 'in_stock',
    collection: 'Wedding Collection'
  },
  {
    id: '8',
    name: 'Party Wear Designer Saree',
    price: 3200,
    originalPrice: 6400,
    image: '/images/sarees/408003.webp',
    category: 'Party Wear Sarees',
    fabric: 'Georgette',
    color: 'Multi',
    availability: 'in_stock',
    collection: 'Party Wear'
  },
  {
    id: '9',
    name: 'Festive Designer Saree',
    price: 3400,
    originalPrice: 6800,
    image: '/images/sarees/408004.webp',
    category: 'Party Wear Sarees',
    fabric: 'Silk',
    color: 'Multi',
    availability: 'in_stock',
    collection: 'Festival Collection'
  },
  // Elegant Collection (Image_1180 series)
  {
    id: '10',
    name: 'Classic Silk Saree',
    price: 2800,
    originalPrice: 5600,
    image: '/images/sarees/Image_1180_1.webp',
    category: 'Silk Sarees',
    fabric: 'Silk',
    color: 'Blue',
    availability: 'in_stock',
    collection: 'Classic Collection'
  },
  {
    id: '11',
    name: 'Traditional Silk Saree',
    price: 2900,
    originalPrice: 5800,
    image: '/images/sarees/Image_1180_5.webp',
    category: 'Silk Sarees',
    fabric: 'Silk',
    color: 'Green',
    availability: 'in_stock',
    collection: 'Traditional Collection'
  },
  // Additional products to fill the catalog
  {
    id: '12',
    name: 'Cotton Blend Casual Saree',
    price: 1200,
    originalPrice: 2400,
    image: '/images/sarees/top_trending_1_1.webp',
    category: 'Cotton Sarees',
    fabric: 'Cotton',
    color: 'Multi',
    availability: 'in_stock',
    collection: 'Casual Collection'
  },
  {
    id: '13',
    name: 'Georgette Party Saree',
    price: 1800,
    originalPrice: 3600,
    image: '/images/sarees/top_trending_2_2_987fb1ae-3e6e-46a5-8acf-69fad7aae011.webp',
    category: 'Georgette Sarees',
    fabric: 'Georgette',
    color: 'Pink',
    availability: 'in_stock',
    collection: 'Party Wear'
  },
  {
    id: '14',
    name: 'Chiffon Designer Saree',
    price: 2100,
    originalPrice: 4200,
    image: '/images/sarees/top_trending_3_1.webp',
    category: 'Chiffon Sarees',
    fabric: 'Chiffon',
    color: 'Yellow',
    availability: 'in_stock',
    collection: 'Designer Collection'
  },
  {
    id: '15',
    name: 'Patola Traditional Saree',
    price: 4500,
    originalPrice: 9000,
    image: '/images/sarees/408001.webp',
    category: 'Patola Sarees',
    fabric: 'Silk',
    color: 'Multi',
    availability: 'in_stock',
    collection: 'Traditional Collection'
  },
  {
    id: '16',
    name: 'Organza Elegant Saree',
    price: 2400,
    originalPrice: 4800,
    image: '/images/sarees/408003.webp',
    category: 'Organza Sarees',
    fabric: 'Organza',
    color: 'Purple',
    availability: 'in_stock',
    collection: 'Elegant Collection'
  },
  {
    id: '17',
    name: 'Satin Luxury Saree',
    price: 2600,
    originalPrice: 5200,
    image: '/images/sarees/408004.webp',
    category: 'Satin Sarees',
    fabric: 'Satin',
    color: 'Black',
    availability: 'in_stock',
    collection: 'Luxury Collection'
  },
  {
    id: '18',
    name: 'Crepe Casual Saree',
    price: 1500,
    originalPrice: 3000,
    image: '/images/sarees/Image_1180_1.webp',
    category: 'Crepe Sarees',
    fabric: 'Crepe',
    color: 'Blue',
    availability: 'in_stock',
    collection: 'Casual Collection'
  },
  {
    id: '19',
    name: 'Banarasi Wedding Saree',
    price: 4800,
    originalPrice: 9600,
    image: '/images/sarees/Image_1180_5.webp',
    category: 'Banarasi Sarees',
    fabric: 'Banarasi Silk',
    color: 'Red',
    availability: 'in_stock',
    collection: 'Bridal Collection'
  },
  {
    id: '20',
    name: 'Printed Floral Saree',
    price: 1400,
    originalPrice: 2800,
    image: '/images/sarees/top_trending_4_1.webp',
    category: 'Printed Sarees',
    fabric: 'Georgette',
    color: 'Multi',
    availability: 'in_stock',
    collection: 'Floral Collection'
  },
  {
    id: '21',
    name: 'Embroidered Silk Saree',
    price: 3600,
    originalPrice: 7200,
    image: '/images/sarees/top_trending_5_1.webp',
    category: 'Silk Sarees',
    fabric: 'Silk',
    color: 'Maroon',
    availability: 'in_stock',
    collection: 'Premium Collection'
  },
  {
    id: '22',
    name: 'Haldi Special Yellow Saree',
    price: 2200,
    originalPrice: 4400,
    image: '/images/sarees/318005-1_52797673529_o.webp',
    category: 'Wedding Sarees',
    fabric: 'Silk',
    color: 'Yellow',
    availability: 'in_stock',
    collection: 'Wedding Collection'
  },
  {
    id: '23',
    name: 'Net Designer Saree',
    price: 2000,
    originalPrice: 4000,
    image: '/images/sarees/408001.webp',
    category: 'Net Sarees',
    fabric: 'Net',
    color: 'White',
    availability: 'in_stock',
    collection: 'Designer Collection'
  },
  {
    id: '24',
    name: 'Reception Wear Saree',
    price: 3300,
    originalPrice: 6600,
    image: '/images/sarees/408003.webp',
    category: 'Wedding Sarees',
    fabric: 'Silk',
    color: 'Pink',
    availability: 'in_stock',
    collection: 'Reception Collection'
  },
];

// Filter functions
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
};

export const getProductsByFabric = (fabric: string): Product[] => {
  return products.filter(p => p.fabric.toLowerCase().includes(fabric.toLowerCase()));
};

export const getProductsByColor = (color: string): Product[] => {
  return products.filter(p => p.color.toLowerCase() === color.toLowerCase());
};

export const getProductsByPriceRange = (min: number, max: number): Product[] => {
  return products.filter(p => p.price >= min && p.price <= max);
};

export const getProductsByAvailability = (available: boolean): Product[] => {
  return products.filter(p => available ? p.availability === 'in_stock' : p.availability === 'out_of_stock');
};

export const getUniqueColors = (): string[] => {
  return [...new Set(products.map(p => p.color))].sort();
};

export const getUniqueCategories = (): string[] => {
  return [...new Set(products.map(p => p.category))].sort();
};

export const getUniqueFabrics = (): string[] => {
  return [...new Set(products.map(p => p.fabric))].sort();
};

export const getUniqueCollections = (): string[] => {
  return [...new Set(products.map(p => p.collection).filter(Boolean) as string[])].sort();
};
