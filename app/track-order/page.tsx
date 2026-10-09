'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useEffect, useState } from 'react';
import { apiFetchCredentials, apiUrl } from '../lib/apiBase';

type TrackItem = {
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  imageUrl: string | null;
};

type SingleOrder = {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  stateName: string;
  pincode: string;
  notes: string | null;
  paymentMode: 'COD' | 'RAZORPAY';
  paymentId: string | null;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: TrackItem[];
};


function statusBadgeClass(status: string) {
  switch (status) {
    case 'DELIVERED':
      return 'text-bg-success';
    case 'CANCELLED':
      return 'text-bg-secondary';
    case 'SHIPPED':
    case 'PROCESSING':
      return 'text-bg-info';
    case 'PAID':
    case 'PLACED':
      return 'text-bg-primary';
    default:
      return 'text-bg-dark';
  }
}

function TrackOrderInner() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState('');
  const [verifyMethod, setVerifyMethod] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [single, setSingle] = useState<SingleOrder | null>(null);

  useEffect(() => {
    const oid = searchParams.get('orderId')?.trim();
    if (oid) setOrderId(oid);
  }, [searchParams]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSingle(null);

    const oid = orderId.trim();

    if (!oid) {
      setError('Please enter your Order ID.');
      return;
    }

    const params = new URLSearchParams();
    params.set('orderId', oid);

    if (verifyMethod === 'phone') {
      const ph = phone.replace(/\D/g, '').slice(-10);
      if (ph.length !== 10) {
        setError('Please enter the 10-digit mobile number used when placing the order.');
        return;
      }
      params.set('phone', ph);
    } else {
      const em = email.trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(em)) {
        setError('Please enter the email address used when placing the order.');
        return;
      }
      params.set('email', em);
    }

    setLoading(true);
    try {
      const res = await fetch(apiUrl(`/api/orders/track?${params.toString()}`), {
        cache: 'no-store',
        credentials: apiFetchCredentials(),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(typeof data?.message === 'string' ? data.message : 'Unable to find matching order.');
        return;
      }

      if (data.kind === 'single' && data.order) {
        setSingle(data.order as SingleOrder);
        return;
      }

      setError('Unexpected response from server.');
    } catch {
      setError('Unable to reach the server. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '70vh', background: '#faf7f8', padding: 'clamp(20px, 4vw, 34px) 12px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(1.45rem, 3vw, 2rem)', marginBottom: 8 }}>Track your order</h1>
        <p className="text-muted mb-4" style={{ maxWidth: 520 }}>
          Enter the Order ID from your confirmation receipt along with your contact number or email ID to view shipment status.
        </p>

        <form
          onSubmit={onSubmit}
          className="bg-white rounded-3 shadow-sm p-3 p-md-4 mb-4"
          style={{ border: '1px solid #eee' }}
        >
          <div className="mb-3">
            <label className="form-label fw-semibold">Order ID *</label>
            <input
              className="form-control"
              value={orderId}
              onChange={(ev) => setOrderId(ev.target.value)}
              placeholder="e.g. SWA-20261003-ABC123"
              autoComplete="off"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold d-block">Verification Method *</label>
            <div className="btn-group w-100" role="group">
              <button
                type="button"
                className={`btn btn-sm ${verifyMethod === 'phone' ? 'btn-dark' : 'btn-outline-secondary'}`}
                onClick={() => {
                  setVerifyMethod('phone');
                  setError('');
                }}
              >
                Verify by Contact Number
              </button>
              <button
                type="button"
                className={`btn btn-sm ${verifyMethod === 'email' ? 'btn-dark' : 'btn-outline-secondary'}`}
                onClick={() => {
                  setVerifyMethod('email');
                  setError('');
                }}
              >
                Verify by Email ID
              </button>
            </div>
          </div>

          <div className="mb-3">
            {verifyMethod === 'phone' ? (
              <div>
                <label className="form-label fw-semibold">10-Digit Mobile Number *</label>
                <input
                  type="tel"
                  className="form-control"
                  value={phone}
                  onChange={(ev) => setPhone(ev.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="e.g. 9876543210"
                  inputMode="numeric"
                  autoComplete="tel"
                  required
                />
              </div>
            ) : (
              <div>
                <label className="form-label fw-semibold">Email Address *</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  placeholder="e.g. customer@example.com"
                  autoComplete="email"
                  required
                />
              </div>
            )}
          </div>

          <p className="small text-muted mt-2 mb-3">
            For security and privacy, your Order ID and matching contact number or email address are required to view order details.
          </p>
          <button
            type="submit"
            className="btn text-white w-100 w-md-auto"
            style={{ background: loading ? '#c7c7c7' : '#dc747d', border: 'none' }}
            disabled={loading}
          >
            {loading ? 'Searching…' : 'Track order'}
          </button>
        </form>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {single && (
          <div
            className="bg-white rounded-3 shadow-sm p-3 p-md-4 mb-4"
            style={{ border: '2px dashed #dc747d' }}
            id="track-result-print"
          >
            <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
              <div>
                <div className="small text-muted text-uppercase">Order ID</div>
                <div className="fw-bold fs-5" style={{ fontFamily: 'ui-monospace, monospace' }}>
                  {single.orderId}
                </div>
              </div>
              <span className={`badge ${statusBadgeClass(single.status)}`}>{single.status}</span>
            </div>

            <div className="row g-2 small mb-3">
              <div className="col-sm-6">
                <span className="text-muted">Placed on</span>
                <div>
                  {new Date(single.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                </div>
              </div>
              <div className="col-sm-6">
                <span className="text-muted">Payment</span>
                <div>
                  {single.paymentMode === 'COD' ? 'Cash on Delivery' : 'Online (Razorpay)'}
                  {single.paymentId ? ` · Ref ${single.paymentId}` : ''}
                </div>
              </div>
              <div className="col-sm-6">
                <span className="text-muted">Amount</span>
                <div className="fw-bold">₹{single.amount.toLocaleString('en-IN')}</div>
              </div>
              <div className="col-sm-6">
                <span className="text-muted">Last updated</span>
                <div>
                  {new Date(single.updatedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                </div>
              </div>
            </div>

            <div className="mb-3 small">
              <div className="text-muted text-uppercase mb-1">Shipping details</div>
              <div className="fw-semibold">{single.customerName}</div>
              <div>{single.customerPhone}</div>
              {single.customerEmail && <div className="text-muted">{single.customerEmail}</div>}
              <div className="mt-1">
                {single.addressLine1}
                {single.addressLine2 ? `, ${single.addressLine2}` : ''}
              </div>
              <div>
                {single.city}, {single.stateName} — {single.pincode}
              </div>
              {single.notes && (
                <div className="mt-2">
                  <span className="text-muted">Notes: </span>
                  {single.notes}
                </div>
              )}
            </div>

            <div className="table-responsive">
              <table className="table table-sm table-bordered mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Item</th>
                    <th className="text-center">Qty</th>
                    <th className="text-end">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {single.items.map((line) => (
                    <tr key={`${line.productId}-${line.productName}`}>
                      <td>{line.productName}</td>
                      <td className="text-center">{line.quantity}</td>
                      <td className="text-end">₹{line.lineTotal.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex flex-wrap gap-2 mt-3">
              <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => window.print()}>
                Print
              </button>
              <Link href="/sarees" className="btn btn-dark btn-sm">
                Continue shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <main style={{ minHeight: '70vh', background: '#faf7f8', padding: 'clamp(20px, 4vw, 34px) 12px' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <h1 style={{ fontSize: 'clamp(1.45rem, 3vw, 2rem)' }}>Track your order</h1>
            <p className="text-muted">Loading…</p>
          </div>
        </main>
      }
    >
      <TrackOrderInner />
    </Suspense>
  );
}
