'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, Suspense } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  addToCart,
  clearCart,
  getCart,
  getStoreEventName,
  removeFromCart,
  type CartItem,
  updateCartQty,
} from '../lib/commerceStore';
import { apiFetchCredentials, apiUrl } from '../lib/apiBase';
import { getCatalogProducts, TEST_CATALOG_PRODUCT_ID } from '../lib/productData';

const RAZORPAY_SCRIPT_ID = 'razorpay-checkout-js';

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  handler: (response: RazorpaySuccessResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => { open: () => void };
  }
}

function CartContent() {
  const searchParams = useSearchParams();
  const productIdFromQuery = searchParams.get('productId');
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
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'razorpay'>('cod');
  const [razorpaySuccess, setRazorpaySuccess] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const includeTestCatalog = useMemo(
    () =>
      searchParams.has('test') ||
      items.some((item) => item.id === TEST_CATALOG_PRODUCT_ID) ||
      productIdFromQuery?.trim() === TEST_CATALOG_PRODUCT_ID,
    [searchParams, items, productIdFromQuery]
  );
  const catalogProducts = useMemo(
    () => getCatalogProducts(includeTestCatalog),
    [includeTestCatalog]
  );

  const [orderVoucher, setOrderVoucher] = useState<{
    orderId: string;
    amount: number;
    placedAt: string;
    paymentMode: 'COD' | 'RAZORPAY';
    status: string;
    paymentId: string | null;
    items: { name: string; qty: number; lineTotal: number }[];
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    addressSummary: string;
  } | null>(null);

  useEffect(() => {
    const sync = () => setItems(getCart());
    sync();
    const eventName = getStoreEventName();
    window.addEventListener(eventName, sync);
    return () => window.removeEventListener(eventName, sync);
  }, []);

  useEffect(() => {
    if (!productIdFromQuery) return;
    const requestedProductId = productIdFromQuery.trim();
    if (!requestedProductId) return;

    const matchedProduct = catalogProducts.find((product) => product.id === requestedProductId);
    if (!matchedProduct) return;

    const cartItems = getCart();
    if (cartItems.some((item) => item.id === requestedProductId)) return;

    addToCart({
      id: matchedProduct.id,
      name: matchedProduct.name,
      price: matchedProduct.price,
      image: matchedProduct.image,
    });
    setItems(getCart());
  }, [productIdFromQuery, catalogProducts]);

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

  /**
   * Razorpay charge in INR. Defaults to cart subtotal. Set NEXT_PUBLIC_RAZORPAY_CHARGE_INR to a
   * number only for test overrides. Amount is clamped to ≥ ₹1 (100 paise) for Indian UPI/QR minimum.
   */
  const razorpayChargeInr = useMemo(() => {
    const raw = process.env.NEXT_PUBLIC_RAZORPAY_CHARGE_INR;
    if (raw === undefined || raw === '' || raw === 'subtotal' || raw === 'full') return subtotal;
    const n = Number(raw);
    return Number.isFinite(n) && n > 0 ? n : subtotal;
  }, [subtotal]);

  const razorpayAmountPaise = useMemo(
    () => Math.max(100, Math.round(razorpayChargeInr * 100)),
    [razorpayChargeInr]
  );

  const razorpayBilledInr = razorpayAmountPaise / 100;

  const createOrderRecord = async (opts: {
    paymentMode: 'COD' | 'RAZORPAY';
    status: 'PLACED' | 'PAID';
    paymentId?: string | null;
  }) => {
    const response = await fetch(apiUrl('/api/orders'), {
      method: 'POST',
      credentials: apiFetchCredentials(),
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          qty: item.qty,
          image: item.image,
        })),
        amount: subtotal,
        paymentMode: opts.paymentMode,
        status: opts.status,
        paymentId: opts.paymentId ?? undefined,
        customer: {
          name,
          phone,
          email,
          addressLine1,
          addressLine2,
          city,
          stateName,
          pincode,
          notes,
        },
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message ?? 'Failed to save order.');
    }
    return data as {
      success: boolean;
      orderId: string;
      paymentMode: 'COD' | 'RAZORPAY';
      status: string;
      amount: number;
      paymentId?: string | null;
    };
  };

  const onCashOnDelivery = async (event: FormEvent) => {
    event.preventDefault();
    if (!isValid) return;
    setPaymentError('');
    setRazorpaySuccess('');
    setIsProcessingPayment(true);

    const snapshotItems = [...items];

    try {
      const placed = await createOrderRecord({ paymentMode: 'COD', status: 'PLACED' });

      const addressSummary = [
        addressLine1.trim(),
        addressLine2.trim(),
        `${city.trim()}, ${stateName.trim()} - ${pincode.trim()}`,
      ]
        .filter(Boolean)
        .join(' · ');

      setOrderVoucher({
        orderId: placed.orderId,
        amount: placed.amount,
        placedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
        paymentMode: placed.paymentMode,
        status: placed.status,
        paymentId: placed.paymentId ?? null,
        items: snapshotItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          lineTotal: item.price * item.qty,
        })),
        customerName: name.trim(),
        customerPhone: phone.trim(),
        customerEmail: email.trim(),
        addressSummary,
      });

      clearCart();
      setItems(getCart());
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to place order.';
      setPaymentError(message);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const ensureRazorpayLoaded = async () => {
    if (typeof window === 'undefined') return false;
    if (window.Razorpay) return true;

    const existingScript = document.getElementById(RAZORPAY_SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      return new Promise<boolean>((resolve) => {
        existingScript.addEventListener('load', () => resolve(true), { once: true });
        existingScript.addEventListener('error', () => resolve(false), { once: true });
      });
    }

    return new Promise<boolean>((resolve) => {
      const script = document.createElement('script');
      script.id = RAZORPAY_SCRIPT_ID;
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const onRazorpayPayment = async (event: FormEvent) => {
    event.preventDefault();
    if (!isValid) return;

    setPaymentError('');
    setRazorpaySuccess('');
    setIsProcessingPayment(true);

    const scriptReady = await ensureRazorpayLoaded();
    if (!scriptReady || !window.Razorpay) {
      setPaymentError('Unable to load Razorpay checkout. Please try again.');
      setIsProcessingPayment(false);
      return;
    }

    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!key) {
      setPaymentError('Razorpay key is missing. Add NEXT_PUBLIC_RAZORPAY_KEY_ID in environment.');
      setIsProcessingPayment(false);
      return;
    }

    const snapshotItems = [...items];

    try {
      const checkout = new window.Razorpay({
        key,
        amount: razorpayAmountPaise,
        currency: 'INR',
        name: 'Swatika Sarees',
        description:
          razorpayChargeInr < subtotal
            ? `Test charge ₹${razorpayBilledInr.toFixed(2)} (order total ₹${subtotal.toFixed(2)})`
            : 'Order payment',
        handler: (response) => {
          void (async () => {
            try {
              const placed = await createOrderRecord({
                paymentMode: 'RAZORPAY',
                status: 'PAID',
                paymentId: response.razorpay_payment_id,
              });

              const addressSummary = [
                addressLine1.trim(),
                addressLine2.trim(),
                `${city.trim()}, ${stateName.trim()} - ${pincode.trim()}`,
              ]
                .filter(Boolean)
                .join(' · ');

              setOrderVoucher({
                orderId: placed.orderId,
                amount: placed.amount,
                placedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
                paymentMode: 'RAZORPAY',
                status: placed.status,
                paymentId: response.razorpay_payment_id,
                items: snapshotItems.map((item) => ({
                  name: item.name,
                  qty: item.qty,
                  lineTotal: item.price * item.qty,
                })),
                customerName: name.trim(),
                customerPhone: phone.trim(),
                customerEmail: email.trim(),
                addressSummary,
              });

              clearCart();
              setItems(getCart());
              setRazorpaySuccess('');
              setPaymentError('');
            } catch (error) {
              const message = error instanceof Error ? error.message : 'Payment succeeded but order could not be saved.';
              setPaymentError(message);
            } finally {
              setIsProcessingPayment(false);
            }
          })();
        },
        prefill: {
          name: name.trim(),
          email: email.trim(),
          contact: phone.trim(),
        },
        notes: {
          address_line_1: addressLine1.trim(),
          city: city.trim(),
          state: stateName.trim(),
          pincode: pincode.trim(),
        },
        theme: {
          color: '#dc747d',
        },
        modal: {
          ondismiss: () => {
            setIsProcessingPayment(false);
          },
        },
      });
      checkout.open();
    } catch {
      setPaymentError('Unable to open Razorpay checkout.');
      setIsProcessingPayment(false);
    }
  };

  return (
    <main style={{ minHeight: '70vh', background: '#faf7f8', padding: 'clamp(20px, 4vw, 34px) 12px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div
          className={`d-flex align-items-center flex-wrap gap-2 mb-4 ${
            orderVoucher ? 'justify-content-center' : 'justify-content-between'
          }`}
        >
          <h1
            className={orderVoucher ? 'text-center w-100' : ''}
            style={{
              margin: 0,
              fontFamily: 'var(--font-marcellus), "Times New Roman", serif',
              fontWeight: 400,
              fontSize: orderVoucher ? 'clamp(1.85rem, 4.5vw, 2.5rem)' : 'clamp(1.45rem, 3vw, 2rem)',
              letterSpacing: orderVoucher ? '0.04em' : '0.02em',
              lineHeight: 1.25,
              color: orderVoucher ? '#3d2f32' : '#1a1a1a',
            }}
          >
            {orderVoucher
              ? orderVoucher.paymentMode === 'RAZORPAY'
                ? 'Payment confirmed'
                : 'Order successfully placed'
              : 'Checkout'}
          </h1>
          {items.length > 0 && !orderVoucher && (
            <button className="btn btn-outline-danger btn-sm" onClick={clearCart}>
              Clear Cart
            </button>
          )}
        </div>

        {orderVoucher ? (
          <div
            id="order-voucher-print"
            className="bg-white rounded-3 shadow-sm p-4 p-md-5 mx-auto"
            style={{ maxWidth: 560, border: '2px dashed #dc747d' }}
          >
            <div className="text-center mb-4">
              <div
                className={`mb-2 ${orderVoucher.paymentMode === 'RAZORPAY' ? 'text-success' : ''}`}
                style={{
                  fontSize: '2.5rem',
                  lineHeight: 1,
                  color: orderVoucher.paymentMode === 'COD' ? '#dc747d' : undefined,
                }}
                aria-hidden
              >
                ✓
              </div>
              <p
                className="text-uppercase small mb-1"
                style={{
                  fontFamily: 'var(--font-jost), system-ui, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  fontSize: '0.72rem',
                  color: orderVoucher.paymentMode === 'RAZORPAY' ? '#198754' : '#c45d68',
                }}
              >
                {orderVoucher.paymentMode === 'RAZORPAY' ? 'Payment confirmed' : 'Order placed'}
              </p>
              <h2
                className="mb-2"
                style={{
                  fontFamily: 'var(--font-marcellus), "Times New Roman", serif',
                  fontWeight: 400,
                  fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                  letterSpacing: '0.03em',
                  lineHeight: 1.35,
                  color: '#4a3f42',
                }}
              >
                Thank you for your order
              </h2>
              <p
                className="text-muted mb-0 small"
                style={{
                  fontFamily: 'var(--font-jost), system-ui, sans-serif',
                  fontWeight: 400,
                  lineHeight: 1.55,
                  maxWidth: '28rem',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                Your order is saved with the details below. Use your order ID anytime on Track order to see status.
              </p>
            </div>

            <div className="border-bottom pb-3 mb-3">
              <div className="small text-muted text-uppercase mb-1">Order ID</div>
              <div className="fw-bold fs-5" style={{ fontFamily: 'ui-monospace, monospace' }}>
                {orderVoucher.orderId}
              </div>
            </div>

            <div className="row g-2 small mb-3">
              <div className="col-6">
                <span className="text-muted">Placed on</span>
                <div>{orderVoucher.placedAt}</div>
              </div>
              <div className="col-6 text-md-end">
                <span className="text-muted">Order status</span>
                <div>
                  <span className="badge text-bg-primary">{orderVoucher.status}</span>
                </div>
              </div>
              <div className="col-6">
                <span className="text-muted">Payment status</span>
                <div>
                  {orderVoucher.paymentMode === 'COD' ? (
                    <>
                      Pay on delivery
                      <div className="text-muted mt-1" style={{ fontSize: '0.8rem' }}>
                        You will pay when your order arrives.
                      </div>
                    </>
                  ) : (
                    <>
                      Paid online
                      {orderVoucher.paymentId && (
                        <div className="mt-1" style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.85rem' }}>
                          Ref: {orderVoucher.paymentId}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="col-6 text-md-end">
                <span className="text-muted">Amount</span>
                <div className="fw-bold">₹{orderVoucher.amount.toLocaleString('en-IN')}</div>
              </div>
            </div>

            <div className="mb-3 small">
              <div className="text-muted text-uppercase mb-1">Deliver to</div>
              <div className="fw-semibold">{orderVoucher.customerName}</div>
              <div>{orderVoucher.customerPhone}</div>
              {orderVoucher.customerEmail ? (
                <div className="text-muted">{orderVoucher.customerEmail}</div>
              ) : null}
              <div className="text-muted mt-1">{orderVoucher.addressSummary}</div>
            </div>

            <div className="table-responsive mb-4">
              <table className="table table-sm table-bordered mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Item</th>
                    <th className="text-center">Qty</th>
                    <th className="text-end">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orderVoucher.items.map((line, index) => (
                    <tr key={`${line.name}-${index}`}>
                      <td>{line.name}</td>
                      <td className="text-center">{line.qty}</td>
                      <td className="text-end">₹{line.lineTotal.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="small text-muted mb-3">
              Save or print this voucher for your records. You can track this order anytime from the header.
            </p>

            <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
              <button type="button" className="btn btn-outline-dark" onClick={() => window.print()}>
                Print voucher
              </button>
              <Link
                href={`/track-order?orderId=${encodeURIComponent(orderVoucher.orderId)}`}
                className="btn btn-outline-secondary"
              >
                Track this order
              </Link>
              <Link href="/sarees" className="btn btn-dark" onClick={() => setOrderVoucher(null)}>
                Continue shopping
              </Link>
            </div>
          </div>
        ) : items.length === 0 ? (
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
                <div className="border rounded-2 p-3 mb-2 bg-light">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="cod-option"
                      checked={paymentMethod === 'cod'}
                      onChange={() => {
                        setPaymentMethod('cod');
                        setPaymentError('');
                        setRazorpaySuccess('');
                      }}
                    />
                    <label className="form-check-label fw-semibold" htmlFor="cod-option">
                      Cash on Delivery
                    </label>
                  </div>
                  <small className="text-muted d-block mt-1">
                    Pay when your order is delivered. You will see a confirmation with your order ID on this page.
                  </small>
                </div>
                <div className="border rounded-2 p-3 mb-3 bg-light">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="razorpay-option"
                      checked={paymentMethod === 'razorpay'}
                      onChange={() => {
                        setPaymentMethod('razorpay');
                        setPaymentError('');
                        setRazorpaySuccess('');
                      }}
                    />
                    <label className="form-check-label fw-semibold" htmlFor="razorpay-option">
                      Razorpay (UPI / card / netbanking)
                    </label>
                  </div>
                  <small className="text-muted d-block mt-1">
                    {razorpayChargeInr < subtotal ? (
                      <>
                        Test override: gateway charges <strong>₹{razorpayBilledInr.toFixed(2)}</strong> (cart total{' '}
                        <strong>₹{subtotal.toLocaleString('en-IN')}</strong>). Remove{' '}
                        <code className="small">NEXT_PUBLIC_RAZORPAY_CHARGE_INR</code> to charge the full cart.
                        {razorpayBilledInr > razorpayChargeInr && (
                          <span className="d-block mt-1">
                            Amount raised to at least ₹1 for Razorpay&apos;s minimum.
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        Pay securely online. Amount charged: ₹
                        {razorpayBilledInr.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.
                      </>
                    )}
                  </small>
                </div>
                {razorpaySuccess && (
                  <div className="alert alert-success py-2 px-3 mb-3" role="alert">
                    {razorpaySuccess}
                  </div>
                )}
                {paymentError && (
                  <div className="alert alert-danger py-2 px-3 mb-3" role="alert">
                    {paymentError}
                  </div>
                )}
                {paymentMethod === 'cod' ? (
                  <button
                    className="btn w-100"
                    style={{ background: isValid && !isProcessingPayment ? '#dc747d' : '#c7c7c7', color: '#fff' }}
                    onClick={onCashOnDelivery}
                    disabled={!isValid || isProcessingPayment}
                  >
                    {isProcessingPayment ? 'Processing...' : 'Place Order (Cash on Delivery)'}
                  </button>
                ) : (
                  <button
                    className="btn w-100"
                    style={{ background: isValid && !isProcessingPayment ? '#dc747d' : '#c7c7c7', color: '#fff' }}
                    onClick={onRazorpayPayment}
                    disabled={!isValid || isProcessingPayment}
                  >
                    {isProcessingPayment
                      ? 'Opening Razorpay...'
                      : `Pay ₹${razorpayBilledInr.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} with Razorpay`}
                  </button>
                )}
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

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <main style={{ minHeight: '70vh', background: '#faf7f8', padding: 'clamp(20px, 4vw, 34px) 12px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div className="bg-white rounded-3 p-4 text-center shadow-sm">
              <h1 style={{ margin: 0, fontSize: 'clamp(1.45rem, 3vw, 2rem)' }}>Checkout</h1>
              <p className="mb-0 mt-2">Loading checkout details...</p>
            </div>
          </div>
        </main>
      }
    >
      <CartContent />
    </Suspense>
  );
}
