'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { adminAuthHeaders, apiFetchCredentials, apiUrl, clearStoredAdminToken } from '../../lib/apiBase';

interface AdminProduct {
  id: number;
  name: string;
  description: string;
  category: string;
  inventory: number;
  price: number;
  image_url: string | null;
}

const initialForm = {
  id: null as number | null,
  name: '',
  description: '',
  category: '',
  inventory: 0,
  price: 0,
  image_url: '',
};

export default function ProductsAdminClient() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const loadProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(apiUrl('/api/admin/products'), {
        cache: 'no-store',
        credentials: apiFetchCredentials(),
        headers: adminAuthHeaders(),
      });
      if (res.status === 401) {
        window.location.href = '/admin/login';
        return;
      }
      const data = await res.json();
      setProducts(data.products ?? []);
    } catch {
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );
  }, [products, search]);

  const resetForm = () => setForm(initialForm);

  const onSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        category: form.category.trim(),
        inventory: Number(form.inventory),
        price: Number(form.price),
        image_url: form.image_url.trim() || null,
      };

      const isEdit = form.id !== null;
      const path = isEdit ? `/api/admin/products/${form.id}` : '/api/admin/products';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(apiUrl(path), {
        method,
        credentials: apiFetchCredentials(),
        headers: adminAuthHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message ?? 'Unable to save product.');
        return;
      }
      resetForm();
      await loadProducts();
    } finally {
      setSaving(false);
    }
  };

  const onEdit = (product: AdminProduct) => {
    setForm({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      inventory: product.inventory,
      price: product.price,
      image_url: product.image_url ?? '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onDelete = async (id: number) => {
    const confirmed = window.confirm('Delete this product?');
    if (!confirmed) return;
    const res = await fetch(apiUrl(`/api/admin/products/${id}`), {
      method: 'DELETE',
      credentials: apiFetchCredentials(),
      headers: adminAuthHeaders(),
    });
    if (res.ok) {
      await loadProducts();
    }
  };

  const onUploadImage = async (file: File) => {
    setUploading(true);
    setError('');
    try {
      // 1. Request signed authorization parameters from backend
      const signRes = await fetch(apiUrl('/api/admin/upload'), {
        method: 'POST',
        credentials: apiFetchCredentials(),
        headers: adminAuthHeaders(),
      });
      const signData = await signRes.json();
      if (!signRes.ok) {
        setError(signData?.message ?? 'Failed to get upload authorization.');
        return;
      }

      // 2. Upload file directly from browser to Cloudinary
      const cloudFd = new FormData();
      cloudFd.append('file', file);
      cloudFd.append('api_key', signData.apiKey);
      cloudFd.append('timestamp', String(signData.timestamp));
      cloudFd.append('signature', signData.signature);
      cloudFd.append('folder', signData.folder);

      const uploadRes = await fetch(signData.uploadUrl, {
        method: 'POST',
        body: cloudFd,
      });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) {
        setError(uploadData?.error?.message ?? 'Direct Cloudinary upload failed.');
        return;
      }

      setForm((prev) => ({ ...prev, image_url: uploadData.secure_url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const onLogout = async () => {
    clearStoredAdminToken();
    await fetch(apiUrl('/api/admin/logout'), {
      method: 'POST',
      credentials: apiFetchCredentials(),
      headers: adminAuthHeaders(),
    });
    window.location.href = '/admin/login';
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '26px 16px 38px' }}>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <div>
          <p style={{ margin: 0, letterSpacing: 1.5, fontSize: 12, color: '#9b4d57' }}>
            SWATIKA BACKEND PORTAL
          </p>
          <h1 style={{ margin: '6px 0 0', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>Manage Products</h1>
        </div>
        <button className="btn btn-outline-dark btn-sm" onClick={onLogout}>
          Logout
        </button>
      </div>

      <form
        onSubmit={onSave}
        style={{
          background: '#fff',
          borderRadius: 14,
          boxShadow: '0 10px 28px rgba(0,0,0,0.08)',
          padding: 16,
          marginBottom: 16,
        }}
      >
        <h2 style={{ fontSize: '1.1rem', marginTop: 0 }}>
          {form.id ? `Edit Product #${form.id}` : 'Add New Product'}
        </h2>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Category</label>
            <input
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Price (INR)</label>
            <input
              type="number"
              step="0.01"
              min={0}
              value={form.price}
              onChange={(e) => setForm((prev) => ({ ...prev, price: Number(e.target.value) }))}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Inventory</label>
            <input
              type="number"
              min={0}
              value={form.inventory}
              onChange={(e) => setForm((prev) => ({ ...prev, inventory: Number(e.target.value) }))}
              className="form-control"
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-8">
            <label className="form-label">Image URL</label>
            <input
              value={form.image_url}
              onChange={(e) => setForm((prev) => ({ ...prev, image_url: e.target.value }))}
              className="form-control"
              placeholder="/product_images/example.jpg"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Upload Image</label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.webp"
              className="form-control"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void onUploadImage(file);
              }}
            />
          </div>
        </div>

        {form.image_url && (
          <div style={{ marginTop: 12 }}>
            <Image
              src={form.image_url}
              alt="Preview"
              width={110}
              height={140}
              unoptimized
              style={{ objectFit: 'cover', borderRadius: 8, border: '1px solid #ddd' }}
            />
          </div>
        )}

        {error && <p style={{ marginTop: 10, color: '#c62828' }}>{error}</p>}

        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-dark" type="submit" disabled={saving || uploading}>
            {saving ? 'Saving...' : form.id ? 'Update Product' : 'Create Product'}
          </button>
          <button className="btn btn-outline-secondary" type="button" onClick={resetForm}>
            Reset
          </button>
          {uploading && <span style={{ alignSelf: 'center', fontSize: 13 }}>Uploading image...</span>}
        </div>
      </form>

      <div
        style={{
          background: '#fff',
          borderRadius: 14,
          boxShadow: '0 10px 28px rgba(0,0,0,0.08)',
          padding: 16,
        }}
      >
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h3 style={{ margin: 0, fontSize: '1.05rem' }}>
            Products ({filteredProducts.length})
          </h3>
          <input
            placeholder="Search name/category..."
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 260 }}
          />
        </div>

        {loading ? (
          <p className="mb-0">Loading products...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Inventory</th>
                  <th>Price</th>
                  <th style={{ minWidth: 160 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          width={56}
                          height={70}
                          unoptimized
                          style={{ objectFit: 'cover', borderRadius: 6 }}
                        />
                      ) : (
                        <span className="text-muted">No image</span>
                      )}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{product.name}</div>
                      <div className="text-muted" style={{ fontSize: 12, maxWidth: 320 }}>
                        {product.description}
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>{product.inventory}</td>
                    <td>₹{Number(product.price).toLocaleString('en-IN')}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-dark" onClick={() => onEdit(product)}>
                          Edit
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(product.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center text-muted py-4">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
