'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  addToCart,
  getStoreEventName,
  getWishlist,
  removeFromWishlist,
  type ProductSnapshot,
} from '../lib/commerceStore';

export default function WishlistPage() {
  const [items, setItems] = useState<ProductSnapshot[]>([]);

  useEffect(() => {
    const sync = () => setItems(getWishlist());
    sync();
    const eventName = getStoreEventName();
    window.addEventListener(eventName, sync);
    return () => window.removeEventListener(eventName, sync);
  }, []);

  return (
    <main style={{ minHeight: '70vh', background: '#faf7f8', padding: '34px 16px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <h1 style={{ margin: '0 0 20px', fontSize: 'clamp(1.45rem, 3vw, 2rem)' }}>Wishlist</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-3 p-4 text-center shadow-sm">
            <p className="mb-3">Your wishlist is empty.</p>
            <Link href="/sarees" className="btn btn-dark">Browse Products</Link>
          </div>
        ) : (
          <div className="row g-3">
            {items.map((item) => (
              <div key={item.id} className="col-12 col-md-6 col-lg-4">
                <div className="bg-white rounded-3 shadow-sm p-3 h-100 d-flex flex-column">
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 4', marginBottom: 12 }}>
                    <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} unoptimized />
                  </div>
                  <h6>{item.name}</h6>
                  <p className="text-muted mb-3">₹{item.price.toLocaleString('en-IN')}</p>
                  <div className="d-flex gap-2 mt-auto">
                    <button
                      className="btn btn-dark flex-fill btn-sm"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-outline-danger flex-fill btn-sm"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      Remove
                    </button>
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
