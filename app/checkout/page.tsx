'use client';

import { FormEvent, Suspense, useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCart } from '../lib/commerceStore';

const WHATSAPP_NUMBER = '918130033637';

function CheckoutForm() {
  const searchParams = useSearchParams();
  const queryProductName = searchParams.get('product') ?? '';
  const [productName, setProductName] = useState(queryProductName);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [pincode, setPincode] = useState('');
  const [notes, setNotes] = useState('');
  const [codSuccess, setCodSuccess] = useState(false);

  useEffect(() => {
    if (queryProductName) {
      setProductName(queryProductName);
      return;
    }
    const firstCartProduct = getCart()[0];
    if (firstCartProduct?.name) {
      setProductName(firstCartProduct.name);
    }
  }, [queryProductName]);

  const isValid = useMemo(() => {
    return (
      name.trim().length > 1 &&
      /^[6-9]\d{9}$/.test(phone.trim()) &&
      addressLine1.trim().length > 3 &&
      city.trim().length > 1 &&
      stateName.trim().length > 1 &&
      /^\d{6}$/.test(pincode.trim())
    );
  }, [name, phone, addressLine1, city, stateName, pincode]);

  const buildMessage = () => {
    return [
      'New Checkout Request',
      `Product: ${productName || 'Not specified'}`,
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Email: ${email.trim() || 'N/A'}`,
      `Address Line 1: ${addressLine1.trim()}`,
      `Address Line 2: ${addressLine2.trim() || 'N/A'}`,
      `City: ${city.trim()}`,
      `State: ${stateName.trim()}`,
      `Pincode: ${pincode.trim()}`,
      `Notes: ${notes.trim() || 'N/A'}`,
      'Payment Mode: Cash on Delivery',
    ].join('\n');
  };

  const onCashOnDelivery = (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
    const popup = window.open(url, '_blank', 'noopener,noreferrer');
    if (!popup) {
      window.location.assign(url);
    }
    setCodSuccess(true);
  };

  return (
    <main style={{ minHeight: '70vh', background: '#faf7f8', padding: '36px 16px' }}>
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <div style={{ marginBottom: 18 }}>
          <h1 style={{ margin: 0, color: '#2b2b2b', fontSize: 'clamp(1.5rem, 3.2vw, 2rem)' }}>
            Checkout
          </h1>
          <p style={{ margin: '6px 0 0', color: '#666' }}>
            Complete your details to place order and get confirmation.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <div style={{ background: '#dc747d', color: '#fff', padding: '12px 16px', fontWeight: 600 }}>
            Product: {productName || 'Selected Saree'}
          </div>

          <form style={{ padding: 18, display: 'grid', gap: 14 }}>
            <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              <label>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Full Name *</div>
                <input value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
              </label>
              <label>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Phone *</div>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  inputMode="numeric"
                  required
                  style={inputStyle}
                  placeholder="10-digit mobile"
                />
              </label>
            </div>

            <label>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Email</div>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
            </label>

            <label>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Address Line 1 *</div>
              <input value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} required style={inputStyle} />
            </label>

            <label>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Address Line 2</div>
              <input value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} style={inputStyle} />
            </label>

            <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
              <label>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>City *</div>
                <input value={city} onChange={(e) => setCity(e.target.value)} required style={inputStyle} />
              </label>
              <label>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>State *</div>
                <input value={stateName} onChange={(e) => setStateName(e.target.value)} required style={inputStyle} />
              </label>
              <label>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Pincode *</div>
                <input
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  inputMode="numeric"
                  required
                  style={inputStyle}
                  placeholder="6-digit pincode"
                />
              </label>
            </div>

            <label>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Notes</div>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="Any customization, preferred call time, etc."
              />
            </label>

            {codSuccess && (
              <div style={{ background: '#e9f8ef', color: '#146c43', border: '1px solid #b7e4c7', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                Cash on Delivery request captured. We are opening WhatsApp to notify our team.
              </div>
            )}

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button
                onClick={onCashOnDelivery}
                type="button"
                disabled={!isValid}
                style={{
                  border: 'none',
                  background: isValid ? '#dc747d' : '#c7c7c7',
                  color: '#fff',
                  padding: '11px 16px',
                  borderRadius: 8,
                  fontWeight: 600,
                  cursor: isValid ? 'pointer' : 'not-allowed',
                }}
              >
                Cash on Delivery
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main style={{ minHeight: '70vh', background: '#faf7f8', padding: '36px 16px' }}>
          <div style={{ maxWidth: 920, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.08)', padding: 24 }}>
            <h1 style={{ margin: 0, color: '#2b2b2b' }}>Checkout</h1>
            <p style={{ marginTop: 8, color: '#666' }}>Loading checkout details...</p>
          </div>
        </main>
      }
    >
      <CheckoutForm />
    </Suspense>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #ddd',
  borderRadius: 8,
  fontSize: 14,
};

