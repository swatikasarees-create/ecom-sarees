'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.message ?? 'Login failed.');
        return;
      }
      router.push('/admin/orders');
      router.refresh();
    } catch {
      setError('Unable to connect to admin API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 440, margin: '0 auto', padding: '56px 16px' }}>
      <div className="bg-white rounded-3 shadow-sm p-4">
        <h1 style={{ fontSize: '1.5rem', marginBottom: 8 }}>Admin Login</h1>
        <p className="text-muted mb-3">Sign in to manage orders.</p>
        <form onSubmit={onSubmit} className="d-grid gap-3">
          <div>
            <label className="form-label fw-semibold">Username</label>
            <input
              className="form-control"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div>
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger py-2 px-3 mb-0">{error}</div>}
          <button className="btn btn-dark" disabled={loading} type="submit">
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <Link href="/" className="btn btn-link p-0 mt-3 text-decoration-none">
          Back to Store
        </Link>
      </div>
    </div>
  );
}
