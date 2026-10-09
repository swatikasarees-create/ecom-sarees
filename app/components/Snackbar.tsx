'use client';

import { useState, useEffect } from 'react';
import { getSnackbarEventName, type SnackbarEventDetail } from '../lib/snackbar';

export default function Snackbar() {
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleEvent = (event: Event) => {
      const customEvent = event as CustomEvent<SnackbarEventDetail>;
      if (customEvent.detail?.message) {
        setToast({
          message: customEvent.detail.message,
          type: customEvent.detail.type || 'warning',
        });
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setToast(null);
        }, 4000);
      }
    };

    window.addEventListener(getSnackbarEventName(), handleEvent);
    return () => {
      window.removeEventListener(getSnackbarEventName(), handleEvent);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!toast) return null;

  return (
    <div
      className="position-fixed bottom-0 start-50 translate-middle-x mb-4 px-3"
      style={{
        zIndex: 999999,
        maxWidth: '92vw',
      }}
      role="alert"
      aria-live="assertive"
    >
      <div
        className="d-flex align-items-center gap-2 px-3 py-2 text-white shadow-lg rounded-pill"
        style={{
          backgroundColor: '#1c1b1f',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
          fontSize: '0.92rem',
        }}
      >
        <span style={{ fontSize: '1.15rem', lineHeight: 1 }}>
          {toast.type === 'error' ? '🚫' : toast.type === 'success' ? '✅' : '⚠️'}
        </span>
        <span className="fw-medium">{toast.message}</span>
        <button
          type="button"
          className="btn-close btn-close-white ms-2"
          style={{ width: 8, height: 8, padding: 0 }}
          onClick={() => setToast(null)}
          aria-label="Close"
        />
      </div>
    </div>
  );
}
