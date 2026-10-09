'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  clearWishlist,
  getWishlist,
  getWishlistEventName,
  removeFromWishlist,
} from '../lib/wishlistStore';
import { addToCart, type ProductSnapshot } from '../lib/commerceStore';
import { apiUrl } from '../lib/apiBase';
import { getCatalogProducts, Product } from '../lib/productData';

export default function WishlistPage() {
  const [items, setItems] = useState<ProductSnapshot[]>([]);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [liveProducts, setLiveProducts] = useState<Product[]>([]);

  useEffect(() => {
    let active = true;
    fetch(apiUrl('/api/products'))
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && Array.isArray(data?.products)) {
          setLiveProducts(data.products);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const sync = () => setItems(getWishlist());
    sync();
    const eventName = getWishlistEventName();
    window.addEventListener(eventName, sync);
    return () => window.removeEventListener(eventName, sync);
  }, []);

  const handleMoveToCart = (item: ProductSnapshot) => {
    setMessage('');
    setErrorMessage('');
    const live = liveProducts.find((p) => String(p.id) === String(item.id));
    const cat = getCatalogProducts(true).find((p) => String(p.id) === String(item.id));
    const maxStock = live?.inventory ?? cat?.inventory ?? 10;

    const res = addToCart(item, maxStock);
    if (!res.success) {
      if (res.reason === 'out_of_stock') {
        setErrorMessage(`"${item.name}" is currently out of stock.`);
      } else if (res.reason === 'max_reached') {
        setErrorMessage(
          `Only ${res.maxStock} piece${(res.maxStock ?? 1) > 1 ? 's' : ''} available for "${item.name}". You already have ${res.currentQty} in your cart.`
        );
      }
      return;
    }
    removeFromWishlist(item.id);
    setMessage(`Added "${item.name}" to cart!`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <main style={{ minHeight: '70vh', background: '#faf7f8', padding: 'clamp(24px, 4vw, 48px) 16px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-marcellus), "Times New Roman", serif',
                fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                margin: 0,
                color: '#1a1a1a',
              }}
            >
              My Wishlist
            </h1>
            <p className="text-muted small mb-0 mt-1">
              {items.length === 1 ? '1 saved item' : `${items.length} saved items`}
            </p>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={clearWishlist}
            >
              Clear Wishlist
            </button>
          )}
        </div>

        {message && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {message}
            <Link href="/cart" className="alert-link ms-2">
              View Cart & Checkout &rarr;
            </Link>
          </div>
        )}

        {errorMessage && (
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
            {errorMessage}
            <Link href="/cart" className="alert-link ms-2">
              View Cart &rarr;
            </Link>
          </div>
        )}

        {items.length === 0 ? (
          <div
            className="bg-white rounded-3 shadow-sm text-center p-5 mx-auto"
            style={{ maxWidth: 540 }}
          >
            <div style={{ fontSize: '3rem', color: '#dc747d', marginBottom: 12 }}>♡</div>
            <h2
              className="h4 mb-2"
              style={{ fontFamily: 'var(--font-marcellus), serif' }}
            >
              Your Wishlist is Empty
            </h2>
            <p className="text-muted mb-4 small">
              Explore our exquisite collection of sarees and suits, and tap the heart icon on any design to save it here for later.
            </p>
            <div className="d-flex gap-2 justify-content-center flex-wrap">
              <Link href="/sarees" className="btn btn-dark px-4">
                Explore Sarees
              </Link>
              <Link href="/suit" className="btn btn-outline-dark px-4">
                Explore Suits
              </Link>
            </div>
          </div>
        ) : (
          <div className="row g-3 g-md-4">
            {items.map((item) => (
              <div key={item.id} className="col-6 col-md-4 col-lg-3">
                <div
                  className="bg-white rounded-3 shadow-sm h-100 d-flex flex-column overflow-hidden position-relative"
                  style={{ border: '1px solid #f0eaeb' }}
                >
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(item.id)}
                    className="btn btn-sm btn-light position-absolute"
                    style={{
                      top: 8,
                      right: 8,
                      zIndex: 2,
                      borderRadius: '50%',
                      width: 32,
                      height: 32,
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                      color: '#dc747d',
                    }}
                    title="Remove from wishlist"
                    aria-label="Remove from wishlist"
                  >
                    ✕
                  </button>

                  <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', background: '#f5f5f5' }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  </div>

                  <div className="p-3 d-flex flex-column flex-grow-1 justify-content-between">
                    <div>
                      <h3
                        className="h6 mb-1 text-truncate"
                        title={item.name}
                        style={{
                          fontSize: '0.92rem',
                          fontFamily: 'var(--font-jost), sans-serif',
                          fontWeight: 500,
                        }}
                      >
                        {item.name}
                      </h3>
                      <div className="fw-bold mb-3" style={{ color: '#dc747d' }}>
                        ₹{item.price.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div className="d-grid gap-2">
                      <button
                        type="button"
                        className="btn btn-dark btn-sm text-uppercase"
                        style={{ fontSize: '0.78rem', letterSpacing: '0.05em' }}
                        onClick={() => handleMoveToCart(item)}
                      >
                        Move to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
