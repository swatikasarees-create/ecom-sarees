'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getProductImageByHash } from '../lib/productImage';
import { addToCart } from '../lib/commerceStore';
import { getWishlist, toggleWishlist, getWishlistEventName } from '../lib/wishlistStore';
import { showSnackbar } from '../lib/snackbar';
import { getCatalogProducts, type Product as FullProduct } from '../lib/productData';
import { apiUrl } from '../lib/apiBase';
import ProductModal from './ProductModal';

const instaImg = (hash: string) => getProductImageByHash(hash);

interface BannerItem {
  id: number;
  productId: string;
  src: string;
  alt: string;
  name: string;
  price: string;
  tag: string;
}

const banners: BannerItem[] = [
  {
    id: 1,
    productId: '7',
    src: instaImg('ba76809e38182a59fc059fd1b5ff8d54fbef1671671d7dc2d45e60da014280e0'),
    alt: 'Cream Saree with Vibrant Pink Border',
    name: 'Cream Saree – Pink Border',
    price: '₹11,000',
    tag: 'Wedding Collection',
  },
  {
    id: 2,
    productId: '5',
    src: instaImg('46a257b9b9f758da7849f836bf71346d414778c4382aac9c626a44c1c91301b9'),
    alt: 'Net Embellished Saree with Mirror Work',
    name: 'Net Embellished Saree',
    price: '₹8,000',
    tag: 'Bridal Collection',
  },
  {
    id: 3,
    productId: '40',
    src: instaImg('d572b2ddeebc5c37c8eb4c63deb69e10c3543589c62374ec45558d4217058267'),
    alt: 'Patola Silk Saree',
    name: 'Patola Silk Saree',
    price: '₹6,000',
    tag: 'Traditional Elegance',
  },
  {
    id: 4,
    productId: '31',
    src: instaImg('b412ff6e2520e71391d64b0560de436686b29db2cb76bd68e417bbda70211003'),
    alt: 'Pearl Work Net Saree',
    name: 'Pearl Work Net Saree',
    price: '₹12,000',
    tag: 'Premium Collection',
  },
  {
    id: 5,
    productId: '18',
    src: instaImg('33b3c5ac84e7f428324c6d67f6a7f0732598ee87e26a0b165e594c3932725ac9'),
    alt: 'Tissue Silk Saree',
    name: 'Tissue Silk Saree',
    price: '₹4,999',
    tag: 'Festive Wear',
  },
  {
    id: 6,
    productId: '35',
    src: instaImg('8f984c7487be2c119a063599ec22580bfdb5b1a3476cd89793531fe8ddc9c3a6'),
    alt: 'Stone Work Net Saree',
    name: 'Stone Work Net Saree',
    price: '₹11,000',
    tag: 'Premium Collection',
  },
];

const TOTAL = banners.length;
const AUTO_INTERVAL = 5000;
const BG = '#dc747d';

export default function BannerCarousel() {
  const [isMobile, setIsMobile] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const isOutOfStock = (productId: string) => {
    const stock = stockMap[productId];
    if (stock) {
      return stock.inventory <= 0 || stock.availability === 'out_of_stock';
    }
    const cat = allProducts.find((p) => String(p.id) === productId);
    if (cat) {
      return cat.availability === 'out_of_stock' || (cat.inventory !== undefined && cat.inventory <= 0);
    }
    return false;
  };

  const openProductModal = (banner: BannerItem) => {
    const full = allProducts.find((p) => String(p.id) === banner.productId);
    if (full) {
      const stock = stockMap[banner.productId];
      const inv = stock ? stock.inventory : full.inventory;
      const avail = stock ? stock.availability : full.availability;
      setSelectedProduct({
        ...full,
        inventory: inv,
        availability: (avail === 'out_of_stock' || (inv !== undefined && inv <= 0)) ? 'out_of_stock' : 'in_stock',
      });
    } else {
      const numericPrice = Number(banner.price.replace(/[^\d]/g, '')) || 0;
      setSelectedProduct({
        id: banner.productId,
        name: banner.name,
        price: numericPrice,
        image: banner.src,
        category: 'Sarees',
        fabric: 'Silk',
        color: 'Multi',
        availability: isOutOfStock(banner.productId) ? 'out_of_stock' : 'in_stock',
        inventory: stockMap[banner.productId]?.inventory ?? 10,
        description: banner.name,
      });
    }
  };

  // Detect mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
    handler(mq);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const visibleCount = isMobile ? 1 : 3;

  const startProgress = useCallback(() => {
    setProgress(0);
    if (progressRef.current) clearInterval(progressRef.current);
    progressRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressRef.current!);
          return 100;
        }
        return p + 100 / (AUTO_INTERVAL / 50);
      });
    }, 50);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    startProgress();
    timerRef.current = setInterval(() => {
      setDirection('next');
      setStartIndex((prev) => (prev + 1) % TOTAL);
      setAnimKey((k) => k + 1);
      startProgress();
    }, AUTO_INTERVAL);
  }, [startProgress]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [resetTimer]);

  const handleNav = (dir: 'next' | 'prev') => {
    setDirection(dir);
    setStartIndex((prev) => {
      if (dir === 'next') return (prev + 1) % TOTAL;
      return (prev - 1 + TOTAL) % TOTAL;
    });
    setAnimKey((k) => k + 1);
    resetTimer();
  };

  const handleDot = (idx: number) => {
    if (idx === startIndex) return;
    setDirection(idx > startIndex ? 'next' : 'prev');
    setStartIndex(idx);
    setAnimKey((k) => k + 1);
    resetTimer();
  };

  // Pick visible items (1 on mobile, 3 on desktop)
  const visibleBanners: BannerItem[] = [];
  for (let i = 0; i < visibleCount; i++) {
    visibleBanners.push(banners[(startIndex + i) % TOTAL]);
  }

  // Center card index for desktop
  const centerIndex = isMobile ? 0 : 1;

  return (
    <section
      style={{
        background: BG,
        padding: isMobile ? '36px 0 32px' : '48px 0 44px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── Keyframe Animations ── */}
      <style>{`
        @keyframes cardSlideIn {
          from {
            opacity: 0;
            transform: ${direction === 'next' ? 'translateX(40px)' : 'translateX(-40px)'} scale(0.94);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(0.95);
          }
        }
        @keyframes centerCardSlideIn {
          from {
            opacity: 0;
            transform: ${direction === 'next' ? 'translateX(40px)' : 'translateX(-40px)'} translateY(0) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(-10px) scale(1.03);
          }
        }
        @keyframes infoFadeUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .bc-nav-btn {
          transition: background 0.2s, transform 0.15s, border-color 0.2s;
        }
        .bc-nav-btn:hover {
          background: rgba(255,255,255,0.35) !important;
          border-color: #fff !important;
          transform: scale(1.08);
        }
        .bc-nav-btn:active {
          transform: scale(0.96);
        }
        .bc-card-img {
          transition: transform 0.4s ease;
        }
        .bc-card-wrap:hover .bc-card-img {
          transform: scale(1.04) !important;
        }
        .bc-card-wrap:hover .bc-shop-link {
          letter-spacing: 2.2px !important;
          color: #dc747d !important;
          border-color: #dc747d !important;
        }
      `}</style>

      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 20px' }}>
        {/* ── Section Title ── */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '24px' : '36px' }}>
          <p
            style={{
              fontSize: '0.72rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.75)',
              fontWeight: 600,
              marginBottom: '6px',
            }}
          >
            Handcrafted Luxury
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)',
              fontWeight: 800,
              letterSpacing: '1px',
              color: '#fff',
              marginBottom: 0,
            }}
          >
            Featured Collection
          </h2>
          {/* Decorative rule */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginTop: '12px',
            }}
          >
            <div
              style={{
                height: '1px',
                width: '60px',
                background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.6))',
              }}
            />
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.8)' }} />
            <div
              style={{
                height: '1px',
                width: '60px',
                background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.6))',
              }}
            />
          </div>
        </div>

        {/* ── Cards Row ── */}
        <div
          key={animKey}
          style={{
            display: 'flex',
            gap: isMobile ? '10px' : '12px',
            alignItems: 'flex-start',
            justifyContent: isMobile ? 'center' : 'stretch',
          }}
        >
          {visibleBanners.map((banner, i) => {
            const isCenter = i === centerIndex;
            const delay = `${i * 55}ms`;
            const sideCardScale = isMobile ? 1 : 0.95;

            return (
              <div
                key={`${banner.id}-${animKey}`}
                style={{
                  flex: isMobile ? '0 0 min(90vw, 360px)' : 1,
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  animation: isCenter
                    ? `centerCardSlideIn 0.6s cubic-bezier(0.22,1,0.36,1) ${delay} both`
                    : `cardSlideIn 0.6s cubic-bezier(0.22,1,0.36,1) ${delay} both`,
                }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => openProductModal(banner)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openProductModal(banner);
                    }
                  }}
                  className="bc-card-wrap"
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#ffffff',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    boxShadow: isCenter ? '0 16px 34px rgba(0,0,0,0.22)' : '0 7px 18px rgba(0,0,0,0.14)',
                    transform: isCenter && !isMobile ? 'translateY(-10px) scale(1.03)' : `translateY(0) scale(${sideCardScale})`,
                    opacity: isCenter ? 1 : 0.96,
                    transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                  }}
                >
                  {/* ── Image card ── */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '3 / 4',
                      overflow: 'hidden',
                      borderRadius: '14px 14px 0 0',
                      background: '#fff',
                    }}
                  >
                    <div className="bc-card-img" style={{ position: 'absolute', inset: 0, transform: 'scale(1)' }}>
                      <Image
                        src={banner.src}
                        alt={banner.alt}
                        fill
                        sizes="(max-width: 767px) 85vw, 30vw"
                        style={{
                          objectFit: 'contain',
                          objectPosition: 'center',
                          filter: isOutOfStock(banner.productId) ? 'grayscale(35%) opacity(0.85)' : 'none',
                        }}
                        priority={i === 0}
                        unoptimized
                      />
                    </div>

                    {/* Collection tag badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'rgba(220,116,125,0.92)',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        color: '#fff',
                        animation: `infoFadeUp 0.5s ease ${parseInt(delay) + 250}ms both`,
                      }}
                    >
                      {banner.tag}
                    </div>

                    {/* Out of stock badge */}
                    {isOutOfStock(banner.productId) && (
                      <span
                        className="badge position-absolute"
                        style={{
                          top: '12px',
                          right: '12px',
                          backgroundColor: '#1c1b1f',
                          color: 'white',
                          padding: '4px 10px',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          letterSpacing: '1px',
                          borderRadius: '4px',
                          zIndex: 3,
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        OUT OF STOCK
                      </span>
                    )}

                    {/* Gradient footer inside image */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '30%',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 100%)',
                        borderRadius: '0 0 12px 12px',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>

                  {/* ── Info below card ── */}
                  <div
                    style={{
                      padding: isMobile ? '12px 10px 11px' : '12px 10px 10px',
                      textAlign: 'center',
                      background: '#fff',
                      animation: `infoFadeUp 0.55s ease ${parseInt(delay) + 200}ms both`,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 'clamp(0.76rem, 1.2vw, 0.86rem)',
                        fontWeight: 700,
                        letterSpacing: '0.6px',
                        textTransform: 'uppercase',
                        color: '#2b2b2b',
                        marginBottom: '4px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {banner.name}
                    </p>
                    <p
                      style={{
                        fontSize: 'clamp(0.92rem, 1.6vw, 1rem)',
                        fontWeight: 800,
                        color: BG,
                        marginBottom: '8px',
                      }}
                    >
                      {banner.price}
                    </p>
                    <span
                      className="bc-shop-link"
                      style={{
                        fontSize: '0.66rem',
                        fontWeight: 700,
                        letterSpacing: '1.8px',
                        textTransform: 'uppercase',
                        color: '#666',
                        borderBottom: '1.5px solid #d8d8d8',
                        paddingBottom: '3px',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      {isOutOfStock(banner.productId) ? 'Out of Stock' : 'Quick View'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Navigation ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: isMobile ? '14px' : '16px',
            marginTop: isMobile ? '20px' : '24px',
          }}
        >
          {/* Prev */}
          <button
            className="bc-nav-btn"
            onClick={() => handleNav('prev')}
            aria-label="Previous"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.6)',
              background: 'rgba(255,255,255,0.15)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              outline: 'none',
              flexShrink: 0,
              backdropFilter: 'blur(4px)',
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDot(i)}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: i === startIndex ? '32px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  border: 'none',
                  background: i === startIndex ? 'white' : 'rgba(255,255,255,0.35)',
                  cursor: 'pointer',
                  transition: 'width 0.4s cubic-bezier(0.22,1,0.36,1), background 0.3s ease',
                  padding: 0,
                  outline: 'none',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {i === startIndex && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: `${progress}%`,
                      background: 'rgba(220,116,125,0.55)',
                      borderRadius: '4px',
                      transition: 'width 0.05s linear',
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            className="bc-nav-btn"
            onClick={() => handleNav('next')}
            aria-label="Next"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.6)',
              background: 'rgba(255,255,255,0.15)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              outline: 'none',
              flexShrink: 0,
              backdropFilter: 'blur(4px)',
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

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
