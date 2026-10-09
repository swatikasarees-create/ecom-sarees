'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { getProductImageByHash } from '../lib/productImage';
import { addToCart } from '../lib/commerceStore';
import { getWishlist, toggleWishlist, getWishlistEventName } from '../lib/wishlistStore';
import { showSnackbar } from '../lib/snackbar';
import { getCatalogProducts, type Product as FullProduct } from '../lib/productData';
import { apiUrl } from '../lib/apiBase';
import ProductModal from './ProductModal';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const instaImg = (hash: string) => getProductImageByHash(hash);

interface HeroProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

const trendingList: HeroProduct[] = [
  {
    id: '7',
    name: 'Cream Saree – Pink Border',
    price: 11000,
    image: instaImg('ba76809e38182a59fc059fd1b5ff8d54fbef1671671d7dc2d45e60da014280e0'),
    description: 'Classic cream base meets a striking pink border and ornate motif detailing—ideal for wedding rituals and special occasions. ₹11,000',
  },
  {
    id: '40',
    name: 'Patola Silk Saree',
    price: 6000,
    image: instaImg('d572b2ddeebc5c37c8eb4c63deb69e10c3543589c62374ec45558d4217058267'),
    description: 'Stunning Patola silk saree with intricate traditional patterns, vibrant red base and contrasting golden border. ₹6,000',
  },
  {
    id: '18',
    name: 'Tissue Silk Saree',
    price: 4999,
    image: instaImg('33b3c5ac84e7f428324c6d67f6a7f0732598ee87e26a0b165e594c3932725ac9'),
    description: 'Luxurious tissue silk saree with a graceful silhouette and subtle natural sheen—perfect for weddings and festive celebrations. ₹4,999',
  },
  {
    id: '5',
    name: 'Net Embellished Saree',
    price: 8000,
    image: instaImg('46a257b9b9f758da7849f836bf71346d414778c4382aac9c626a44c1c91301b9'),
    description: 'Seafoam saree with detailed embroidered border and sequin work for a refined shine. Sophisticated for weddings and evening celebrations. ₹8,000',
  },
  {
    id: '6',
    name: 'Rust Orange Silk Saree',
    price: 4500,
    image: instaImg('b9606fa353f07c69822a7f45e9dff88435ded645dc85564219b7027cf3b5ac5f'),
    description: 'Rich rust-orange saree with bandhani-inspired pattern and standout metallic pallu—perfect for cultural events and wedding functions. ₹4,500',
  },
  {
    id: '35',
    name: 'Stone Work Net Saree',
    price: 11000,
    image: instaImg('8f984c7487be2c119a063599ec22580bfdb5b1a3476cd89793531fe8ddc9c3a6'),
    description: 'Graceful net saree adorned with intricate stone work and elegant detailing—designed for luxurious sparkle at weddings and receptions. ₹11,000',
  },
];

export default function HeroSection() {
  const [stockMap, setStockMap] = useState<Record<string, { inventory: number; availability: string }>>({});
  const [allProducts, setAllProducts] = useState<FullProduct[]>(() => getCatalogProducts(true));
  const [selectedProduct, setSelectedProduct] = useState<FullProduct | null>(null);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    let active = true;
    fetch(apiUrl('/api/products'))
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && Array.isArray(data?.products)) {
          setAllProducts(data.products);
          const map: Record<string, { availability: string; inventory: number }> = {};
          for (const p of data.products) {
            map[String(p.id)] = {
              availability: p.availability,
              inventory: p.inventory ?? 0,
            };
          }
          setStockMap(map);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const syncWishlist = () => {
      setWishlistIds(new Set(getWishlist().map((w) => String(w.id))));
    };
    syncWishlist();
    const eventName = getWishlistEventName();
    window.addEventListener(eventName, syncWishlist);
    return () => window.removeEventListener(eventName, syncWishlist);
  }, []);

  const isOutOfStock = (product: HeroProduct) => {
    const stock = stockMap[product.id];
    if (stock) {
      return stock.inventory <= 0 || stock.availability === 'out_of_stock';
    }
    const cat =
      allProducts.find((p) => String(p.id) === String(product.id)) ||
      allProducts.find((p) => p.name.trim().toLowerCase() === product.name.trim().toLowerCase()) ||
      allProducts.find((p) => p.name.toLowerCase().includes(product.name.toLowerCase()));
    if (cat) {
      return cat.availability === 'out_of_stock' || (cat.inventory !== undefined && cat.inventory <= 0);
    }
    return false;
  };

  const openProductModal = (product: HeroProduct) => {
    const full =
      allProducts.find((p) => String(p.id) === String(product.id)) ||
      allProducts.find((p) => p.name.trim().toLowerCase() === product.name.trim().toLowerCase()) ||
      allProducts.find((p) => p.name.toLowerCase().includes(product.name.toLowerCase()));
    if (full) {
      const stock = stockMap[String(full.id)];
      const inv = stock ? stock.inventory : full.inventory;
      const avail = stock ? stock.availability : full.availability;
      setSelectedProduct({
        ...full,
        inventory: inv,
        availability: (avail === 'out_of_stock' || (inv !== undefined && inv <= 0)) ? 'out_of_stock' : 'in_stock',
      });
    } else {
      setSelectedProduct({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: 'Sarees',
        fabric: 'Silk',
        color: 'Multi',
        availability: isOutOfStock(product) ? 'out_of_stock' : 'in_stock',
        inventory: stockMap[product.id]?.inventory ?? 10,
        description: product.description,
      });
    }
  };

  return (
    <section id="billboard" className="bg-light py-3 py-md-5">
      <div className="container">
        <div className="row justify-content-center">
          <h1 className="section-title text-center mt-2 mt-md-4 px-3" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }} data-aos="fade-up">OUR TOP TRENDING</h1>
          <div className="col-md-8 col-lg-6 text-center px-3 px-md-2" data-aos="fade-up" data-aos-delay="300">
            <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>Discover the finest collection of traditional and contemporary sarees. From luxurious silk to elegant georgette, wedding to party wear, find your perfect six yards of grace at swatika Sarees. Each saree is crafted with care to celebrate the beauty of Indian tradition.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="swiper main-swiper py-4 position-relative" data-aos="fade-up" data-aos-delay="600">
              <Swiper
                modules={[Pagination, Navigation]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ 
                  clickable: true,
                  el: '.swiper-pagination'
                }}
                navigation={{
                  nextEl: '.icon-arrow-right',
                  prevEl: '.icon-arrow-left',
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                className="border-animation-left"
              >
                {trendingList.map((product, idx) => (
                  <SwiperSlide key={product.id}>
                    <div
                      className="banner-item image-zoom-effect"
                      role="button"
                      tabIndex={0}
                      onClick={() => openProductModal(product)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openProductModal(product);
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => openProductModal(product)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openProductModal(product);
                          }
                        }}
                        className="image-holder position-relative"
                        style={{ height: 'clamp(300px, 60vw, 500px)', overflow: 'hidden', cursor: 'pointer' }}
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          style={{
                            objectFit: 'cover',
                            objectPosition: 'center top',
                            filter: isOutOfStock(product) ? 'grayscale(35%) opacity(0.85)' : 'none',
                          }}
                          priority={idx === 0}
                          unoptimized
                        />
                        {isOutOfStock(product) && (
                          <span
                            className="badge position-absolute"
                            style={{
                              top: '15px',
                              left: '15px',
                              backgroundColor: '#1c1b1f',
                              color: 'white',
                              padding: '6px 14px',
                              fontSize: '11px',
                              fontWeight: '700',
                              letterSpacing: '1px',
                              borderRadius: '20px',
                              zIndex: 3,
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                            }}
                          >
                            OUT OF STOCK
                          </span>
                        )}
                      </div>
                      <div className="banner-content py-3 py-md-4 px-2 px-md-0">
                        <h5 className="element-title text-uppercase" style={{ fontSize: 'clamp(0.9rem, 3vw, 1.25rem)' }}>
                          <span
                            role="button"
                            tabIndex={0}
                            className="item-anchor"
                            style={{ cursor: 'pointer' }}
                            onClick={() => openProductModal(product)}
                          >
                            {product.name}
                          </span>
                        </h5>
                        <p className="d-none d-md-block" style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
                          {product.description}
                        </p>
                        <div className="btn-left">
                          <button
                            type="button"
                            onClick={() => openProductModal(product)}
                            className="btn-link text-uppercase item-anchor text-decoration-none border-0 bg-transparent p-0"
                            style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)', cursor: 'pointer', fontWeight: '600' }}
                          >
                            {isOutOfStock(product) ? 'Out of Stock' : 'View Details →'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="swiper-pagination"></div>
              <div className="icon-arrow icon-arrow-left">
                <svg width="50" height="50" viewBox="0 0 24 24">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </div>
              <div className="icon-arrow icon-arrow-right">
                <svg width="50" height="50" viewBox="0 0 24 24">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 767.98px) {
          #billboard .icon-arrow {
            display: none !important;
          }

          #billboard .swiper.main-swiper {
            padding-bottom: 8px !important;
          }
        }
      `}</style>
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p) => {
          const maxStock = p.inventory;
          const res = addToCart({
            id: String(p.id),
            name: p.name,
            image: p.image,
            price: p.price,
          }, maxStock);
          if (!res.success) {
            if (res.reason === 'out_of_stock') {
              showSnackbar(`"${p.name}" is currently out of stock.`, 'warning');
            } else if (res.reason === 'max_reached') {
              showSnackbar(
                `Only ${res.maxStock} piece${(res.maxStock ?? 1) > 1 ? 's' : ''} available for "${p.name}". You already have ${res.currentQty} in your cart.`,
                'warning'
              );
            }
            return;
          }
          showSnackbar(`Added "${p.name}" to cart!`, 'success');
        }}
        isWishlisted={selectedProduct ? wishlistIds.has(String(selectedProduct.id)) : false}
        onToggleWishlist={(p) => {
          toggleWishlist({
            id: String(p.id),
            name: p.name,
            price: p.price,
            image: p.image,
          });
        }}
      />
    </section>
  );
}
