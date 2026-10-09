'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { addToCart } from '../lib/commerceStore';
import { getWishlist, getWishlistEventName, toggleWishlist } from '../lib/wishlistStore';
import { showSnackbar } from '../lib/snackbar';
import { apiUrl } from '../lib/apiBase';
import { getCatalogProducts, type Product as FullProduct } from '../lib/productData';
import ProductModal from './ProductModal';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Product {
  id: number | string;
  name: string;
  price: string;
  image: string;
}

interface ProductCarouselProps {
  title: string;
  products: Product[];
  sectionId?: string;
}

export default function ProductCarousel({ title, products, sectionId }: ProductCarouselProps) {
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [stockMap, setStockMap] = useState<Record<string, { availability: string; inventory: number }>>({});
  const [allProducts, setAllProducts] = useState<FullProduct[]>(() => getCatalogProducts(true));
  const [selectedProduct, setSelectedProduct] = useState<FullProduct | null>(null);

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

  const isOutOfStock = (product: { id: number | string }) => {
    const stock = stockMap[String(product.id)];
    if (stock) {
      return stock.availability === 'out_of_stock' || stock.inventory <= 0;
    }
    const cat = allProducts.find((p) => String(p.id) === String(product.id));
    if (cat) {
      return cat.availability === 'out_of_stock' || (cat.inventory !== undefined && cat.inventory <= 0);
    }
    return false;
  };

  const openProductModal = (product: Product) => {
    const full = allProducts.find((p) => String(p.id) === String(product.id));
    if (full) {
      setSelectedProduct(full);
    } else {
      setSelectedProduct({
        id: String(product.id),
        name: product.name,
        price: parsePrice(product.price),
        image: product.image,
        category: 'Saree',
        fabric: 'Silk',
        color: 'Multi',
        availability: isOutOfStock(product) ? 'out_of_stock' : 'in_stock',
        inventory: stockMap[String(product.id)]?.inventory ?? 10,
        description: product.name,
      });
    }
  };

  useEffect(() => {
    const syncWishlist = () => {
      setWishlistIds(new Set(getWishlist().map((w) => String(w.id))));
    };
    syncWishlist();
    const eventName = getWishlistEventName();
    window.addEventListener(eventName, syncWishlist);
    return () => window.removeEventListener(eventName, syncWishlist);
  }, []);

  const parsePrice = (price: string) => {
    const numeric = Number(price.replace(/[^\d]/g, ''));
    return Number.isFinite(numeric) ? numeric : 0;
  };
  const getCheckoutHref = (product: Product) =>
    `/checkout?productId=${product.id}&product=${encodeURIComponent(product.name)}`;

  const handleToggleWishlist = (product: Product) => {
    toggleWishlist({
      id: String(product.id),
      name: product.name,
      price: parsePrice(product.price),
      image: product.image,
    });
  };

  return (
    <section id={sectionId} className="product-carousel py-4 py-md-5 position-relative overflow-hidden" style={{ background: '#fafafa' }}>
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 mb-md-5 px-2 px-md-0">
          <div className="mb-3 mb-md-0">
            <h2 className="text-uppercase fw-bold mb-2" style={{ letterSpacing: 'clamp(0.5px, 1vw, 2px)', fontSize: 'clamp(1.3rem, 4vw, 2rem)' }}>{title}</h2>
            <div style={{ width: 'clamp(60px, 15vw, 80px)', height: '4px', background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', borderRadius: '2px' }}></div>
          </div>
          <Link href="/sarees" className="btn btn-outline-dark text-uppercase px-3 px-md-4 py-2" style={{ 
            fontWeight: '600',
            letterSpacing: '1px',
            transition: 'all 0.3s',
            fontSize: 'clamp(0.75rem, 2vw, 0.95rem)'
          }}>
            View All →
          </Link>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="swiper product-swiper open-up position-relative" data-aos="zoom-out">
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
              768: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
          >
            {products.map((product, index) => (
              <SwiperSlide key={product.id}>
                <div
                  className="product-item"
                  role="button"
                  tabIndex={0}
                  onClick={() => openProductModal(product)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openProductModal(product);
                    }
                  }}
                  style={{ 
                    background: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
                    transition: 'all 0.4s ease',
                    cursor: 'pointer'
                  }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
                  const quickView = e.currentTarget.querySelector('.quick-view-btn') as HTMLElement;
                  if (quickView) {
                    quickView.style.opacity = '1';
                    quickView.style.transform = 'translateY(0)';
                  }
                  const img = e.currentTarget.querySelector('.product-image') as HTMLElement;
                  if (img) img.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 15px rgba(0,0,0,0.08)';
                  const quickView = e.currentTarget.querySelector('.quick-view-btn') as HTMLElement;
                  if (quickView) {
                    quickView.style.opacity = '0';
                    quickView.style.transform = 'translateY(100%)';
                  }
                  const img = e.currentTarget.querySelector('.product-image') as HTMLElement;
                  if (img) img.style.transform = 'scale(1)';
                }}>
                  <div className="image-holder product-image-holder position-relative" style={{ height: '400px', overflow: 'hidden', background: '#f8f8f8' }}>
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
                      style={{ cursor: 'pointer', width: '100%', height: '100%', position: 'relative' }}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                        fill
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center top',
                          transition: 'transform 0.4s ease',
                          filter: isOutOfStock(product) ? 'grayscale(35%) opacity(0.85)' : 'none',
                        }}
                        unoptimized
                      />
                    </div>
                    
                    {/* Out of Stock or NEW Badge */}
                    {isOutOfStock(product) ? (
                      <span className="badge position-absolute" style={{
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
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                      }}>
                        OUT OF STOCK
                      </span>
                    ) : index < 2 ? (
                      <span className="badge position-absolute" style={{
                        top: '15px',
                        left: '15px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '6px 14px',
                        fontSize: '11px',
                        fontWeight: '700',
                        letterSpacing: '1px',
                        borderRadius: '20px',
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                      }}>
                        NEW
                      </span>
                    ) : null}

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      className={`btn btn-sm position-absolute rounded-circle d-flex align-items-center justify-content-center shadow-sm ${
                        wishlistIds.has(String(product.id)) ? 'btn-danger text-white' : 'btn-light text-muted'
                      }`}
                      style={{ top: '15px', right: '15px', width: '36px', height: '36px', zIndex: 4, padding: 0 }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleToggleWishlist(product);
                      }}
                      aria-label={wishlistIds.has(String(product.id)) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      title={wishlistIds.has(String(product.id)) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlistIds.has(String(product.id)) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button>

                    {/* Quick View Button - Shows on hover */}
                    <button
                      type="button"
                      className="btn btn-dark text-uppercase position-absolute w-100 quick-view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openProductModal(product);
                      }}
                      style={{
                        bottom: '0',
                        left: '0',
                        padding: '12px',
                        fontSize: '13px',
                        fontWeight: '600',
                        letterSpacing: '1px',
                        borderRadius: '0',
                        opacity: '0',
                        transform: 'translateY(100%)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {isOutOfStock(product) ? 'Out of Stock' : 'Quick View'}
                    </button>
                  </div>
                  
                  {/* Product Info */}
                  <div className="product-content p-3" style={{ minHeight: '120px' }}>
                    <h6 className="mb-2" style={{ 
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#333',
                      lineHeight: '1.4',
                      minHeight: '40px'
                    }}>
                      <span
                        role="button"
                        tabIndex={0}
                        className="text-dark"
                        style={{ cursor: 'pointer' }}
                        onClick={() => openProductModal(product)}
                      >
                        {product.name}
                      </span>
                    </h6>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                      <span className="price fw-bold" style={{ 
                        fontSize: '18px',
                        color: '#667eea',
                        fontWeight: '700'
                      }}>
                        {product.price}
                      </span>
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={() => openProductModal(product)}
                        style={{
                          fontSize: '12px',
                          color: '#666',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          cursor: 'pointer'
                        }}
                      >
                        {isOutOfStock(product) ? 'Out of Stock' : 'View Details →'}
                      </span>
                    </div>
                    <button
                      type="button"
                      className={`btn btn-sm w-100 mt-3 ${
                        isOutOfStock(product) ? 'btn-outline-danger' : 'btn-dark'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isOutOfStock(product)) {
                          showSnackbar(`"${product.name}" is currently out of stock.`, 'warning');
                          return;
                        }
                        const stock = stockMap[String(product.id)]?.inventory ?? allProducts.find((p) => String(p.id) === String(product.id))?.inventory;
                        const res = addToCart({
                          id: String(product.id),
                          name: product.name,
                          image: product.image,
                          price: parsePrice(product.price),
                        }, stock);
                        if (!res.success) {
                          if (res.reason === 'max_reached') {
                            showSnackbar(`Only ${res.maxStock} piece(s) available for "${product.name}". You already have ${res.maxStock} in your cart.`, 'warning');
                          } else {
                            showSnackbar(`"${product.name}" is currently out of stock.`, 'warning');
                          }
                          return;
                        }
                        showSnackbar(`Added "${product.name}" to cart!`, 'success');
                      }}
                    >
                      {isOutOfStock(product) ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination" style={{ marginTop: '30px' }}></div>
          <div className="icon-arrow icon-arrow-left" style={{
            width: '50px',
            height: '50px',
            background: 'white',
            borderRadius: '50%',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.transform = 'scale(1)';
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <use xlinkHref="#arrow-left"></use>
            </svg>
          </div>
          <div className="icon-arrow icon-arrow-right" style={{
            width: '50px',
            height: '50px',
            background: 'white',
            borderRadius: '50%',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.transform = 'scale(1)';
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 767.98px) {
          .product-swiper .icon-arrow {
            display: none !important;
          }

          .product-swiper .quick-view-btn {
            display: none !important;
          }

          .product-swiper .product-image-holder {
            height: clamp(240px, 62vw, 320px) !important;
          }

          .product-swiper .product-content {
            min-height: auto !important;
            padding: 12px !important;
          }
        }
      `}</style>
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p) => {
          const stock = typeof p.inventory === 'number' ? p.inventory : stockMap[String(p.id)]?.inventory;
          const res = addToCart({
            id: String(p.id),
            name: p.name,
            image: p.image,
            price: p.price,
          }, stock);
          if (!res.success) {
            if (res.reason === 'max_reached') {
              showSnackbar(`Only ${res.maxStock} piece(s) available for "${p.name}". You already have ${res.maxStock} in your cart.`, 'warning');
            } else {
              showSnackbar(`"${p.name}" is currently out of stock.`, 'warning');
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
