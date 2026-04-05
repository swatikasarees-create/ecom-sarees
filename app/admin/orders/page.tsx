'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { apiFetchCredentials, apiUrl } from '../../lib/apiBase';

type OrderStatus =
  | 'PLACED'
  | 'PAID'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

interface AdminOrderItem {
  id: number;
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  imageUrl: string | null;
}

interface AdminOrder {
  id: number;
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
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  items: AdminOrderItem[];
}

const statusOptions: OrderStatus[] = [
  'PLACED',
  'PAID',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [statusDraft, setStatusDraft] = useState<Record<number, OrderStatus>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState<number | null>(null);

  const loadOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const sessionRes = await fetch(apiUrl('/api/admin/session'), {
        cache: 'no-store',
        credentials: apiFetchCredentials(),
      });
      const sessionData = await sessionRes.json();
      if (!sessionData?.authenticated) {
        window.location.href = '/admin/login';
        return;
      }

      const ordersRes = await fetch(apiUrl('/api/admin/orders'), {
        cache: 'no-store',
        credentials: apiFetchCredentials(),
      });
      if (ordersRes.status === 401) {
        window.location.href = '/admin/login';
        return;
      }
      const data = await ordersRes.json();
      const nextOrders = (data.orders ?? []) as AdminOrder[];
      setOrders(nextOrders);
      setStatusDraft(
        nextOrders.reduce<Record<number, OrderStatus>>((acc, order) => {
          acc[order.id] = order.status;
          return acc;
        }, {})
      );
    } catch {
      setError('Unable to load orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadOrders();
  }, []);

  const totalRevenue = useMemo(
    () => orders.reduce((sum, order) => sum + Number(order.amount), 0),
    [orders]
  );

  const updateStatus = async (order: AdminOrder) => {
    const nextStatus = statusDraft[order.id] ?? order.status;
    if (nextStatus === order.status) return;
    setSavingId(order.id);
    setError('');
    try {
      const response = await fetch(apiUrl(`/api/admin/orders/${order.id}`), {
        method: 'PATCH',
        credentials: apiFetchCredentials(),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.message ?? 'Failed to update status.');
        return;
      }
      await loadOrders();
    } catch {
      setError('Unable to update order status.');
    } finally {
      setSavingId(null);
    }
  };

  const onLogout = async () => {
    await fetch(apiUrl('/api/admin/logout'), { method: 'POST', credentials: apiFetchCredentials() });
    window.location.href = '/admin/login';
  };

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 14px 40px' }}>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <div>
          <p style={{ margin: 0, letterSpacing: 1.5, fontSize: 12, color: '#9b4d57' }}>
            SWATIKA BACKEND PORTAL
          </p>
          <h1 style={{ margin: '6px 0 0', fontSize: 'clamp(1.45rem, 3vw, 2rem)' }}>Order Management</h1>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <Link className="btn btn-outline-dark btn-sm" href="/admin/products">
            Products
          </Link>
          <button className="btn btn-outline-dark btn-sm" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3 shadow-sm p-3 p-md-4 mb-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <h2 style={{ margin: 0, fontSize: '1.05rem' }}>Orders: {orders.length}</h2>
          <div style={{ fontWeight: 600 }}>Total Amount: ₹{totalRevenue.toLocaleString('en-IN')}</div>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="bg-white rounded-3 shadow-sm p-2 p-md-3">
        {loading ? (
          <div className="p-3">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="p-3 text-muted">No orders placed yet.</div>
        ) : (
          <div className="d-grid gap-3">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-3 p-3">
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                  <div>
                    <div style={{ fontWeight: 700 }}>{order.orderId}</div>
                    <div className="text-muted" style={{ fontSize: 13 }}>
                      {new Date(order.createdAt).toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <span className="badge text-bg-light border">
                      {order.paymentMode} {order.paymentId ? `• ${order.paymentId}` : ''}
                    </span>
                    <strong>₹{Number(order.amount).toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <div className="row g-2 mt-2">
                  <div className="col-md-6">
                    <div style={{ fontWeight: 600 }}>{order.customerName}</div>
                    <div>{order.customerPhone}</div>
                    {order.customerEmail && <div>{order.customerEmail}</div>}
                    <div>
                      {order.addressLine1}
                      {order.addressLine2 ? `, ${order.addressLine2}` : ''}, {order.city},{' '}
                      {order.stateName} - {order.pincode}
                    </div>
                    {order.notes && <div className="text-muted">Notes: {order.notes}</div>}
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <select
                        className="form-select form-select-sm"
                        value={statusDraft[order.id] ?? order.status}
                        onChange={(event) =>
                          setStatusDraft((prev) => ({
                            ...prev,
                            [order.id]: event.target.value as OrderStatus,
                          }))
                        }
                        style={{ maxWidth: 200 }}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <button
                        className="btn btn-sm btn-dark"
                        onClick={() => updateStatus(order)}
                        disabled={savingId === order.id}
                      >
                        {savingId === order.id ? 'Saving...' : 'Update'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="table-responsive mt-3">
                  <table className="table table-sm align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Unit Price</th>
                        <th>Line Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr key={item.id}>
                          <td>{item.productName}</td>
                          <td>{item.quantity}</td>
                          <td>₹{Number(item.unitPrice).toLocaleString('en-IN')}</td>
                          <td>₹{Number(item.lineTotal).toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
