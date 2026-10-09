'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getProductImageByHash } from '../lib/productImage';
import { addToCart } from '../lib/commerceStore';
import { getWishlist, toggleWishlist, getWishlistEventName } from '../lib/wishlistStore';
import { showSnackbar } from '../lib/snackbar';
import { getCatalogProducts, type Product as FullProduct } from '../lib/productData';
import { apiUrl } from '../lib/apiBase';
import ProductModal from './ProductModal';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
}

const instaImg = (hash: string) => getProductImageByHash(hash);

export default function Categories() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'bestSellers' | 'newArrivals'>('bestSellers');
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

  const isOutOfStock = (product: Product) => {
    const stock = stockMap[String(product.id)];
    if (stock) {
      return stock.inventory <= 0 || stock.availability === 'out_of_stock';
    }
    const cat =
      allProducts.find((p) => String(p.id) === String(product.id)) ||
      allProducts.find((p) => p.name.trim().toLowerCase() === product.name.trim().toLowerCase());
    if (cat) {
      return cat.availability === 'out_of_stock' || (cat.inventory !== undefined && cat.inventory <= 0);
    }
    return false;
  };

  const openProductModal = (product: Product) => {
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
        id: String(product.id),
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: 'Sarees',
        fabric: 'Silk',
        color: 'Multi',
        availability: isOutOfStock(product) ? 'out_of_stock' : 'in_stock',
        inventory: stockMap[String(product.id)]?.inventory ?? 10,
        description: product.name,
      });
    }
  };

  const getCheckoutHref = (product: Product) => {
    const full =
      allProducts.find((p) => String(p.id) === String(product.id)) ||
      allProducts.find((p) => p.name.trim().toLowerCase() === product.name.trim().toLowerCase());
    const targetId = full ? full.id : product.id;
    return `/checkout?productId=${targetId}&product=${encodeURIComponent(product.name)}`;
  };

  const bestSellers: Product[] = [
    {
      id: 7,
      name: 'Cream Saree with Vibrant Pink Border & Traditional Motifs',
      image: instaImg('ba76809e38182a59fc059fd1b5ff8d54fbef1671671d7dc2d45e60da014280e0'),
      price: 11000,
      originalPrice: 16000,
    },
    {
      id: 31,
      name: 'Pearl Work Net Saree – Timeless Grace',
      image: instaImg('b412ff6e2520e71391d64b0560de436686b29db2cb76bd68e417bbda70211003'),
      price: 12000,
      originalPrice: 18000,
    },
    {
      id: 40,
      name: 'Patola Silk Saree – Rich Traditional Elegance',
      image: instaImg('d572b2ddeebc5c37c8eb4c63deb69e10c3543589c62374ec45558d4217058267'),
      price: 6000,
      originalPrice: 10000,
    }
  ];

  const newArrivals: Product[] = [
    {
      id: 18,
      name: 'Tissue Silk Saree – Timeless Elegance',
      image: instaImg('33b3c5ac84e7f428324c6d67f6a7f0732598ee87e26a0b165e594c3932725ac9'),
      price: 4999,
      originalPrice: 8000,
    },
    {
      id: 41,
      name: 'Soft Tissue Silk Saree with Thread & Sequin Work',
      image: instaImg('59faa94e5e6422d3d7e99a492e212774569ccc6fe656c8d961b1a24c46a99e51'),
      price: 4500,
      originalPrice: 7000,
    },
    {
      id: 36,
      name: 'Elegant Tissue Thread Work Saree – Floral Motifs',
      image: instaImg('a8873565af396d4c051d0dcdcfcd112fe4e43008361dabe2dcdcf5e0d39814e5'),
      price: 4500,
      originalPrice: 7000,
    }
  ];

  const displayProducts = activeTab === 'bestSellers' ? bestSellers : newArrivals;

  const getProductStock = (productId: string | number): number => {
    const stock = stockMap[String(productId)];
    if (stock && typeof stock.inventory === 'number') {
      return stock.inventory;
    }
    const cat = allProducts.find((p) => String(p.id) === String(productId));
    if (cat && typeof cat.inventory === 'number') {
      return cat.inventory;
    }
    return 10;
  };

  const addProductToCart = (product: Product) => {
    const maxStock = getProductStock(product.id);
    const res = addToCart({
      id: String(product.id),
      name: product.name,
      image: product.image,
      price: product.price,
    }, maxStock);

    if (!res.success) {
      if (res.reason === 'out_of_stock') {
        showSnackbar(`"${product.name}" is currently out of stock.`, 'warning');
      } else if (res.reason === 'max_reached') {
        showSnackbar(
          `Only ${res.maxStock} piece${(res.maxStock ?? 1) > 1 ? 's' : ''} available for "${product.name}". You already have ${res.currentQty} in your cart.`,
          'warning'
        );
      }
      return;
    }
    showSnackbar(`Added "${product.name}" to cart!`, 'success');
  };

  return (
    <section className="categories py-4 py-md-5" style={{ background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)' }}>
      <div className="container px-3 px-md-4">
        {/* Section Header */}
        <div className="text-center mb-4 mb-md-5">
          <h2 
            className="fw-bold mb-4" 
            style={{ 
              fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}
            data-aos="fade-up"
          >
            Curated Collection
          </h2>

          {/* Tabs */}
          <div 
            className="d-flex flex-wrap justify-content-center gap-3 gap-md-5 mb-4 mb-md-5"
            data-aos="fade-up" 
            data-aos-delay="200"
          >
            <button
              onClick={() => setActiveTab('bestSellers')}
              className="border-0 bg-transparent position-relative"
              style={{
                fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: activeTab === 'bestSellers' ? '#333' : '#999',
                padding: '10px 0',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }}
            >
              Best Sellers
              {activeTab === 'bestSellers' && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    height: '2px',
                    background: '#333'
                  }}
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab('newArrivals')}
              className="border-0 bg-transparent position-relative"
              style={{
                fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: activeTab === 'newArrivals' ? '#333' : '#999',
                padding: '10px 0',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }}
            >
              New Arrivals
              {activeTab === 'newArrivals' && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    height: '2px',
                    background: '#333'
                  }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="row g-3 g-md-4" data-aos="fade-up" data-aos-delay="400">
          {displayProducts.map((product, index) => (
            <div key={product.id} className="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={index * 100}>
              <div
                role="button"
                tabIndex={0}
                className="product-card"
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
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
                }}
              >
                {/* Product Image */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: 'clamp(300px, 50vw, 450px)',
                    overflow: 'hidden',
                    background: '#f5f0ed'
                  }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      transition: 'transform 0.5s ease',
                      filter: isOutOfStock(product) ? 'grayscale(35%) opacity(0.85)' : 'none',
                    }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                  {isOutOfStock(product) && (
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
                  )}
                </div>

                {/* Product Info */}
                <div style={{ padding: 'clamp(15px, 3vw, 20px)' }}>
                  <h3
                    style={{
                      fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                      fontWeight: '600',
                      color: '#333',
                      marginBottom: '10px',
                      lineHeight: '1.4',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="d-flex align-items-center gap-2">
                    <span
                      style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                        fontWeight: '700',
                        color: '#dc747d'
                      }}
                    >
                      Rs. {product.price.toLocaleString('en-IN')}
                    </span>
                    <span
                      style={{
                        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                        fontWeight: '500',
                        color: '#999',
                        textDecoration: 'line-through'
                      }}
                    >
                      Rs. {product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Discount Badge */}
                  <div
                    style={{
                      display: 'inline-block',
                      marginTop: '8px',
                      padding: '4px 10px',
                      background: 'rgba(220, 116, 125, 0.1)',
                      color: '#dc747d',
                      fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)',
                      fontWeight: '600',
                      borderRadius: '4px'
                    }}
                  >
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                  <div className="d-flex gap-2 mt-3">
                    <button
                      type="button"
                      className={`btn btn-sm flex-fill ${isOutOfStock(product) ? 'btn-outline-danger' : 'btn-dark'}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isOutOfStock(product)) {
                          showSnackbar(`"${product.name}" is currently out of stock.`, 'warning');
                          return;
                        }
                        addProductToCart(product);
                      }}
                    >
                      {isOutOfStock(product) ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-dark flex-fill"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isOutOfStock(product)) {
                          showSnackbar(`"${product.name}" is currently out of stock.`, 'warning');
                          return;
                        }
                        router.push(getCheckoutHref(product));
                      }}
                    >
                      Shop now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-4 mt-md-5" data-aos="fade-up" data-aos-delay="600">
          <Link
            href="/sarees"
            className="btn text-uppercase"
            style={{
              padding: 'clamp(12px, 2vw, 15px) clamp(30px, 5vw, 50px)',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              fontWeight: '600',
              letterSpacing: '1px',
              border: '2px solid #333',
              background: 'transparent',
              color: '#333',
              transition: 'all 0.3s ease',
              borderRadius: '4px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#333';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#333';
            }}
          >
            View All Products
          </Link>
        </div>
      </div>
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p) => {
          const maxStock = p.inventory ?? getProductStock(p.id);
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
