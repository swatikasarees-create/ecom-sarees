import Link from 'next/link';

export default function AdminRootPage() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 16px' }}>
      <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: 12 }}>Admin Dashboard</h1>
      <p style={{ color: '#555', marginBottom: 20 }}>
        Manage your storefront operations from the admin panel.
      </p>
      <div className="d-flex flex-wrap gap-2">
        <Link href="/admin/orders" className="btn btn-dark">
          Manage Orders
        </Link>
        <Link href="/admin/products" className="btn btn-outline-dark">
          Manage Products
        </Link>
        <Link href="/admin/login" className="btn btn-outline-secondary">
          Admin Login
        </Link>
      </div>
    </div>
  );
}
