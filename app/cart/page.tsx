'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  clearCart,
  getCart,
  getStoreEventName,
  removeFromCart,
  type CartItem,
  updateCartQty,
} from '../lib/commerceStore';

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const sync = () => setItems(getCart());
    sync();
    const eventName = getStoreEventName();
    window.addEventListener(eventName, sync);
    return () => window.removeEventListener(eventName, sync);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  return (
    <main style={{ minHeight: '70vh', background: '#faf7f8', padding: '34px 16px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
          <h1 style={{ margin: 0, fontSize: 'clamp(1.45rem, 3vw, 2rem)' }}>Shopping Cart</h1>
          {items.length > 0 && (
            <button className="btn btn-outline-danger btn-sm" onClick={clearCart}>
              Clear Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3 p-4 text-center shadow-sm">
            <p className="mb-3">Your cart is empty.</p>
            <Link href="/sarees" className="btn btn-dark">Continue Shopping</Link>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="bg-white rounded-3 shadow-sm p-3 p-md-4">
                <div className="d-grid gap-3">
                  {items.map((item) => (
                    <div key={item.id} className="d-flex gap-3 border rounded-3 p-2 p-md-3 align-items-center">
                      <div style={{ position: 'relative', width: 90, height: 120, flexShrink: 0 }}>
                        <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} unoptimized />
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{item.name}</h6>
                        <p className="mb-2 text-muted">₹{item.price.toLocaleString('en-IN')}</p>
                        <div className="d-flex align-items-center gap-2">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => updateCartQty(item.id, Math.max(1, item.qty - 1))}
                          >
                            -
                          </button>
                          <span style={{ minWidth: 22, textAlign: 'center' }}>{item.qty}</span>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => updateCartQty(item.id, item.qty + 1)}
                          >
                            +
                          </button>
                          <button
                            className="btn btn-sm btn-link text-danger text-decoration-none ms-2"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="fw-bold">₹{(item.price * item.qty).toLocaleString('en-IN')}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="bg-white rounded-3 shadow-sm p-3 p-md-4">
                <h5 className="mb-3">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Items</span>
                  <span>{items.reduce((sum, item) => sum + item.qty, 0)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <strong>Subtotal</strong>
                  <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
                </div>
                <Link
                  href={`/checkout?product=${encodeURIComponent(items[0]?.name ?? '')}`}
                  className="btn w-100"
                  style={{ background: '#dc747d', color: '#fff' }}
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
