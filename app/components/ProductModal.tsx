'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '../lib/productData';
import { showSnackbar } from '../lib/snackbar';
import { getCartItemQty } from '../lib/commerceStore';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}: ProductModalProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const imageViewportRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startPanX: number;
    startPanY: number;
  } | null>(null);

  useEffect(() => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setIsDraggingImage(false);
    dragStateRef.current = null;
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [product, onClose]);

  if (!product) return null;

  const isOutOfStock =
    product.availability === 'out_of_stock' ||
    (product.inventory !== undefined && product.inventory <= 0);

  const currentInCart = getCartItemQty(String(product.id));
  const maxStock = typeof product.inventory === 'number' ? product.inventory : undefined;
  const isMaxInCart = maxStock !== undefined && currentInCart >= maxStock;

  const clampPan = (x: number, y: number, zoom = zoomLevel) => {
    if (!imageViewportRef.current || zoom <= 1) {
      return { x: 0, y: 0 };
    }
    const viewportWidth = imageViewportRef.current.clientWidth;
    const viewportHeight = imageViewportRef.current.clientHeight;
    const maxX = ((zoom - 1) * viewportWidth) / 2;
    const maxY = ((zoom - 1) * viewportHeight) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  };

  const onImagePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const targetElement = event.target as HTMLElement;
    if (targetElement.closest('button')) return;
    if (zoomLevel <= 1) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startPanX: panPosition.x,
      startPanY: panPosition.y,
    };
    setIsDraggingImage(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onImagePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current || dragStateRef.current.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - dragStateRef.current.startX;
    const deltaY = event.clientY - dragStateRef.current.startY;
    setPanPosition(
      clampPan(dragStateRef.current.startPanX + deltaX, dragStateRef.current.startPanY + deltaY)
    );
  };

  const endImageDrag = () => {
    dragStateRef.current = null;
    setIsDraggingImage(false);
  };

  const shopNowHref = `/checkout?productId=${encodeURIComponent(String(product.id))}&product=${encodeURIComponent(product.name)}`;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClose}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          onClose();
        }
      }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        zIndex: 10500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
        style={{
          width: 'min(980px, 100%)',
          maxHeight: '90vh',
          background: '#fff',
          borderRadius: '14px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
        }}
      >
        <div className="row g-0">
          <div className="col-md-6">
            <div
              ref={imageViewportRef}
              onPointerDown={onImagePointerDown}
              onPointerMove={onImagePointerMove}
              onPointerUp={endImageDrag}
              onPointerCancel={endImageDrag}
              style={{
                position: 'relative',
                width: '100%',
                minHeight: '55vh',
                background: '#f8f8f8',
                overflow: 'hidden',
                cursor: zoomLevel > 1 ? (isDraggingImage ? 'grabbing' : 'grab') : 'default',
                touchAction: zoomLevel > 1 ? 'none' : 'auto',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  transform: `matrix(${zoomLevel}, 0, 0, ${zoomLevel}, ${panPosition.x}, ${panPosition.y})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.2s ease',
                }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                    filter: isOutOfStock ? 'grayscale(35%) opacity(0.85)' : 'none',
                  }}
                  unoptimized
                />
              </div>

              {isOutOfStock && (
                <span
                  className="badge position-absolute"
                  style={{
                    top: 15,
                    left: 15,
                    backgroundColor: '#1c1b1f',
                    color: 'white',
                    padding: '6px 14px',
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '1px',
                    borderRadius: '20px',
                    zIndex: 5,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  OUT OF STOCK
                </span>
              )}

              <div
                className="badge text-bg-dark"
                style={{ position: 'absolute', left: isOutOfStock ? 135 : 12, top: 12, zIndex: 2, fontSize: '0.8rem' }}
              >
                {zoomLevel.toFixed(1)}x
              </div>

              <div
                className="d-flex flex-column gap-2"
                style={{ position: 'absolute', right: 12, top: 12, zIndex: 2 }}
              >
                <button
                  type="button"
                  className="btn btn-light border"
                  style={{ width: 36, height: 36, padding: 0, fontSize: '1.1rem', lineHeight: 1 }}
                  onClick={(event) => {
                    event.stopPropagation();
                    setZoomLevel((prev) => {
                      const next = Math.min(3, Number((prev + 0.2).toFixed(1)));
                      setPanPosition((currentPan) => clampPan(currentPan.x, currentPan.y, next));
                      return next;
                    });
                  }}
                  aria-label="Zoom in"
                >
                  +
                </button>
                <button
                  type="button"
                  className="btn btn-light border"
                  style={{ width: 36, height: 36, padding: 0, fontSize: '1.2rem', lineHeight: 1 }}
                  onClick={(event) => {
                    event.stopPropagation();
                    setZoomLevel((prev) => {
                      const next = Math.max(1, Number((prev - 0.2).toFixed(1)));
                      setPanPosition((currentPan) => clampPan(currentPan.x, currentPan.y, next));
                      return next;
                    });
                  }}
                  aria-label="Zoom out"
                >
                  -
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-start gap-3">
                <h4 className="mb-2">{product.name}</h4>
                <button type="button" className="btn-close" onClick={onClose} aria-label="Close" />
              </div>
              {isOutOfStock ? (
                <div className="mb-2">
                  <span className="badge bg-dark text-uppercase px-2 py-1" style={{ letterSpacing: '0.5px' }}>
                    Out of Stock
                  </span>
                </div>
              ) : maxStock !== undefined && maxStock <= 5 ? (
                <div className="mb-2">
                  <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1" style={{ letterSpacing: '0.5px' }}>
                    Only {maxStock} piece{maxStock > 1 ? 's' : ''} left in stock!
                  </span>
                </div>
              ) : null}
              <p className="text-muted mb-2">
                {product.category} {product.fabric ? `• ${product.fabric}` : ''}
              </p>
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="fw-bold fs-5">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && (
                  <span className="text-muted text-decoration-line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <p className="text-muted mb-4">{product.description || 'No description available.'}</p>
              <div className="d-flex flex-wrap gap-2">
                <button
                  type="button"
                  className={`btn ${isOutOfStock ? 'btn-outline-danger' : isMaxInCart ? 'btn-secondary' : 'btn-dark'}`}
                  onClick={() => {
                    if (isOutOfStock) {
                      showSnackbar(`"${product.name}" is currently out of stock.`, 'warning');
                      return;
                    }
                    if (isMaxInCart) {
                      showSnackbar(`Only ${maxStock} piece(s) available for "${product.name}". You already have ${currentInCart} in your cart.`, 'warning');
                      return;
                    }
                    onAddToCart(product);
                  }}
                >
                  {isOutOfStock ? 'Out of Stock' : isMaxInCart ? `Max in Cart (${currentInCart})` : 'Add to Cart'}
                </button>
                {isOutOfStock ? (
                  <button
                    type="button"
                    className="btn btn-outline-secondary text-muted"
                    onClick={() => showSnackbar(`"${product.name}" is currently out of stock.`, 'warning')}
                  >
                    Unavailable
                  </button>
                ) : (
                  <Link href={shopNowHref} className="btn btn-outline-dark">
                    Shop now
                  </Link>
                )}
                <button
                  type="button"
                  className={`btn ${isWishlisted ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => onToggleWishlist(product)}
                >
                  {isWishlisted ? '♥ Saved in Wishlist' : '♡ Add to Wishlist'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
