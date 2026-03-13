import Link from 'next/link';

export default function AdminProductsPage() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 16px' }}>
      <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: 12 }}>
        Product admin is unavailable
      </h1>
      <p style={{ color: '#555', marginBottom: 20 }}>
        Product management needs server APIs and database access, which are disabled for static
        export deployment.
      </p>
      <Link href="/" className="btn btn-dark">
        Continue to Store
      </Link>
    </div>
  );
}
