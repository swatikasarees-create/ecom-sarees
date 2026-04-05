'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useEffect, useState } from 'react';

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

type ListRow = {
  orderId: string;
  customerName: string;
  amount: number;
  status: string;
  createdAt: string;
  itemCount: number;
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
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [single, setSingle] = useState<SingleOrder | null>(null);
  const [list, setList] = useState<ListRow[] | null>(null);
  const [listMessage, setListMessage] = useState('');

  useEffect(() => {
    const oid = searchParams.get('orderId')?.trim();
    if (oid) setOrderId(oid);
  }, [searchParams]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSingle(null);
    setList(null);
    setListMessage('');

    const oid = orderId.trim();
    const em = email.trim().toLowerCase();

    if (!oid && !em) {
      setError('Enter your order ID and/or the email used at checkout.');
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (oid) params.set('orderId', oid);
      if (em) params.set('email', em);

      const res = await fetch(`/api/orders/track?${params.toString()}`, { cache: 'no-store' });
      const data = await res.json();

      if (!res.ok) {
        setError(typeof data?.message === 'string' ? data.message : 'Something went wrong.');
        return;
      }

      if (data.kind === 'single' && data.order) {
        setSingle(data.order as SingleOrder);
        return;
      }

      if (data.kind === 'list') {
        setList((data.orders ?? []) as ListRow[]);
        if (typeof data.message === 'string') setListMessage(data.message);
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
          Enter the order ID from your confirmation, and/or the email you used at checkout. No account login is
          required.
        </p>

        <form
          onSubmit={onSubmit}
          className="bg-white rounded-3 shadow-sm p-3 p-md-4 mb-4"
          style={{ border: '1px solid #eee' }}
        >
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Order ID</label>
              <input
                className="form-control"
                value={orderId}
                onChange={(ev) => setOrderId(ev.target.value)}
                placeholder="e.g. SWA-20260405-ABC123"
                autoComplete="off"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                placeholder="Email used when placing the order"
                autoComplete="email"
              />
            </div>
          </div>
          <p className="small text-muted mt-2 mb-3">
            Use <strong>order ID only</strong> for a quick lookup, <strong>email only</strong> to see all orders on
            that address, or <strong>both</strong> together to verify the order belongs to you.
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

        {list && (
          <div className="bg-white rounded-3 shadow-sm p-3 p-md-4">
            <h2 className="h5 mb-3">Orders for this email</h2>
            {listMessage && <p className="text-muted small mb-3">{listMessage}</p>}
            {list.length === 0 ? (
              <p className="text-muted mb-0">No orders found.</p>
            ) : (
              <ul className="list-group list-group-flush">
                {list.map((row) => (
                  <li key={row.orderId} className="list-group-item px-0 d-flex flex-wrap justify-content-between gap-2 align-items-center">
                    <div>
                      <div className="fw-semibold" style={{ fontFamily: 'ui-monospace, monospace' }}>
                        {row.orderId}
                      </div>
                      <div className="small text-muted">
                        {new Date(row.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}{' '}
                        · {row.itemCount} item{row.itemCount === 1 ? '' : 's'}
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold">₹{row.amount.toLocaleString('en-IN')}</div>
                      <span className={`badge ${statusBadgeClass(row.status)}`}>{row.status}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {list.length > 0 && (
              <p className="small text-muted mt-3 mb-0">
                To see line items and full address, search again using that <strong>order ID</strong> alone (or order
                ID + email together).
              </p>
            )}
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
