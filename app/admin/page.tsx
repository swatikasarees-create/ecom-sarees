import Link from 'next/link';

export default function AdminRootPage() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 16px' }}>
      <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: 12 }}>
        Admin is disabled on static hosting
      </h1>
      <p style={{ color: '#555', marginBottom: 20 }}>
        This Hostinger static deployment includes only storefront pages. Admin and API routes are
        disabled in export mode.
      </p>
      <Link href="/" className="btn btn-dark">
        Go to Home
      </Link>
    </div>
  );
}
