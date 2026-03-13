'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
  clearCart,
  getCart,
  getStoreEventName,
  removeFromCart,
  type CartItem,
  updateCartQty,
} from '../lib/commerceStore';

const WHATSAPP_NUMBER = '918130033637';

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [pincode, setPincode] = useState('');
  const [notes, setNotes] = useState('');
  const [codSuccess, setCodSuccess] = useState(false);

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

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items]
  );

  const isValid = useMemo(() => {
    return (
      items.length > 0 &&
      name.trim().length > 1 &&
      /^[6-9]\d{9}$/.test(phone.trim()) &&
      addressLine1.trim().length > 3 &&
      city.trim().length > 1 &&
      stateName.trim().length > 1 &&
      /^\d{6}$/.test(pincode.trim())
    );
  }, [items.length, name, phone, addressLine1, city, stateName, pincode]);

  const buildMessage = () => {
    const orderedProducts = items
      .map((item) => `${item.name} (Qty: ${item.qty}) - Rs ${item.price * item.qty}`)
      .join(', ');

    return [
      'New Checkout Request',
      `Items: ${orderedProducts || 'No products'}`,
      `Total: Rs ${subtotal}`,
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Email: ${email.trim() || 'N/A'}`,
      `Address Line 1: ${addressLine1.trim()}`,
      `Address Line 2: ${addressLine2.trim() || 'N/A'}`,
      `City: ${city.trim()}`,
      `State: ${stateName.trim()}`,
      `Pincode: ${pincode.trim()}`,
      `Notes: ${notes.trim() || 'N/A'}`,
      'Payment Mode: Cash on Delivery',
    ].join('\n');
  };

  const onCashOnDelivery = (event: FormEvent) => {
    event.preventDefault();
    if (!isValid) return;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
    const popup = window.open(url, '_blank', 'noopener,noreferrer');
    if (!popup) {
      window.location.assign(url);
    }
    setCodSuccess(true);
  };

  return (
    <main style={{ minHeight: '70vh', background: '#faf7f8', padding: 'clamp(20px, 4vw, 34px) 12px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
          <h1 style={{ margin: 0, fontSize: 'clamp(1.45rem, 3vw, 2rem)' }}>Checkout</h1>
          {items.length > 0 && (
            <button className="btn btn-outline-danger btn-sm" onClick={clearCart}>
              Clear Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3 p-4 text-center shadow-sm">
            <p className="mb-3">Your checkout cart is empty.</p>
            <Link href="/sarees" className="btn btn-dark">Continue Shopping</Link>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="bg-white rounded-3 shadow-sm p-3 p-md-4">
                <div className="d-grid gap-3">
                  {items.map((item) => (
                    <div key={item.id} className="checkout-item d-flex gap-3 border rounded-3 p-2 p-md-3 align-items-start align-items-sm-center">
                      <div className="checkout-item-image" style={{ position: 'relative', width: 90, height: 120, flexShrink: 0 }}>
                        <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} unoptimized />
                      </div>
                      <div className="flex-grow-1 w-100">
                        <h6 className="mb-1">{item.name}</h6>
                        <p className="mb-2 text-muted">₹{item.price.toLocaleString('en-IN')}</p>
                        <div className="d-flex align-items-center gap-2 flex-wrap">
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
                      <div className="fw-bold checkout-item-total">₹{(item.price * item.qty).toLocaleString('en-IN')}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3 shadow-sm p-3 p-md-4 mt-4">
                <h5 className="mb-3">User Details</h5>
                <form className="d-grid gap-3">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Full Name *</label>
                      <input
                        className="form-control"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Phone *</label>
                      <input
                        className="form-control"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))}
                        inputMode="numeric"
                        placeholder="10-digit mobile"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label fw-semibold">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>

                  <div>
                    <label className="form-label fw-semibold">Address Line 1 *</label>
                    <input
                      className="form-control"
                      value={addressLine1}
                      onChange={(event) => setAddressLine1(event.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label fw-semibold">Address Line 2</label>
                    <input
                      className="form-control"
                      value={addressLine2}
                      onChange={(event) => setAddressLine2(event.target.value)}
                    />
                  </div>

                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">City *</label>
                      <input
                        className="form-control"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">State *</label>
                      <input
                        className="form-control"
                        value={stateName}
                        onChange={(event) => setStateName(event.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Pincode *</label>
                      <input
                        className="form-control"
                        value={pincode}
                        onChange={(event) => setPincode(event.target.value.replace(/\D/g, '').slice(0, 6))}
                        inputMode="numeric"
                        placeholder="6-digit pincode"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label fw-semibold">Notes</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      placeholder="Any customization, preferred call time, etc."
                    />
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="bg-white rounded-3 shadow-sm p-3 p-md-4">
                <h5 className="mb-3">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <strong>Subtotal</strong>
                  <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              <div className="bg-white rounded-3 shadow-sm p-3 p-md-4 mt-4">
                <h5 className="mb-3">Payment Options</h5>
                <div className="border rounded-2 p-3 mb-3 bg-light">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" checked readOnly id="cod-option" />
                    <label className="form-check-label fw-semibold" htmlFor="cod-option">
                      Cash on Delivery
                    </label>
                  </div>
                  <small className="text-muted d-block mt-1">
                    Your order request will be shared on WhatsApp with all checkout details.
                  </small>
                </div>
                {codSuccess && (
                  <div className="alert alert-success py-2 px-3 mb-3" role="alert">
                    COD request captured. Opening WhatsApp for confirmation.
                  </div>
                )}
                <button
                  className="btn w-100"
                  style={{ background: isValid ? '#dc747d' : '#c7c7c7', color: '#fff' }}
                  onClick={onCashOnDelivery}
                  disabled={!isValid}
                >
                  Place Order (Cash on Delivery)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        @media (max-width: 575.98px) {
          .checkout-item {
            display: grid !important;
            grid-template-columns: 72px 1fr;
            gap: 10px !important;
          }

          .checkout-item-image {
            width: 72px !important;
            height: 96px !important;
          }

          .checkout-item-total {
            grid-column: 1 / -1;
            text-align: right;
            margin-top: 4px;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </main>
  );
}
