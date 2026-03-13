import Link from 'next/link';

export default function AdminLoginPage() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 16px' }}>
      <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: 12 }}>
        Admin login disabled
      </h1>
      <p style={{ color: '#555', marginBottom: 20 }}>
        Static Hostinger deployment does not run server APIs. Admin login is available only on a
        Node/server deployment.
      </p>
      <Link href="/" className="btn btn-dark">
        Back to Store
      </Link>
    </div>
  );
}
