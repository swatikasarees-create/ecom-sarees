'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getProductImageByHash } from '../lib/productImage';

const instaImg = (hash: string) => getProductImageByHash(hash);

const banners = [
  {
    id: 1,
    href: '/checkout?productId=7&product=Cream%20Saree%20%E2%80%93%20Pink%20Border',
    src: instaImg('ba76809e38182a59fc059fd1b5ff8d54fbef1671671d7dc2d45e60da014280e0'),
    alt: 'Cream Saree with Vibrant Pink Border',
    name: 'Cream Saree – Pink Border',
    price: '₹11,000',
    tag: 'Wedding Collection',
  },
  {
    id: 2,
    href: '/checkout?productId=5&product=Net%20Embellished%20Saree',
    src: instaImg('46a257b9b9f758da7849f836bf71346d414778c4382aac9c626a44c1c91301b9'),
    alt: 'Net Embellished Saree with Mirror Work',
    name: 'Net Embellished Saree',
    price: '₹8,000',
    tag: 'Bridal Collection',
  },
  {
    id: 3,
    href: '/checkout?productId=40&product=Patola%20Silk%20Saree',
    src: instaImg('d572b2ddeebc5c37c8eb4c63deb69e10c3543589c62374ec45558d4217058267'),
    alt: 'Patola Silk Saree',
    name: 'Patola Silk Saree',
    price: '₹6,000',
    tag: 'Traditional Elegance',
  },
  {
    id: 4,
    href: '/checkout?productId=31&product=Pearl%20Work%20Net%20Saree',
    src: instaImg('b412ff6e2520e71391d64b0560de436686b29db2cb76bd68e417bbda70211003'),
    alt: 'Pearl Work Net Saree',
    name: 'Pearl Work Net Saree',
    price: '₹12,000',
    tag: 'Premium Collection',
  },
  {
    id: 5,
    href: '/checkout?productId=18&product=Tissue%20Silk%20Saree',
    src: instaImg('33b3c5ac84e7f428324c6d67f6a7f0732598ee87e26a0b165e594c3932725ac9'),
    alt: 'Tissue Silk Saree',
    name: 'Tissue Silk Saree',
    price: '₹4,999',
    tag: 'Festive Wear',
  },
  {
    id: 6,
    href: '/checkout?productId=35&product=Stone%20Work%20Net%20Saree',
    src: instaImg('8f984c7487be2c119a063599ec22580bfdb5b1a3476cd89793531fe8ddc9c3a6'),
    alt: 'Stone Work Net Saree',
    name: 'Stone Work Net Saree',
    price: '₹11,000',
    tag: 'Premium Collection',
  },
];

const TOTAL = banners.length;
const AUTO_INTERVAL = 5000;
const BG = '#dc747d';

export default function BannerCarousel() {
  const [isMobile, setIsMobile] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Detect mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
    handler(mq);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const visibleCount = isMobile ? 1 : 3;

  const startProgress = useCallback(() => {
    setProgress(0);
    if (progressRef.current) clearInterval(progressRef.current);
    progressRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(progressRef.current!); return 100; }
        return p + 100 / (AUTO_INTERVAL / 50);
      });
    }, 50);
  }, []);

  const go = useCallback((dir: 'next' | 'prev') => {
    setDirection(dir);
    setStartIndex(prev => (prev + (dir === 'next' ? 1 : -1) + TOTAL) % TOTAL);
    setAnimKey(k => k + 1);
    startProgress();
  }, [startProgress]);

  // Auto-rotate
  useEffect(() => {
    startProgress();
    timerRef.current = setInterval(() => go('next'), AUTO_INTERVAL);
    return () => {
      clearInterval(timerRef.current!);
      clearInterval(progressRef.current!);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNav = (dir: 'next' | 'prev') => {
    clearInterval(timerRef.current!);
    go(dir);
    timerRef.current = setInterval(() => go('next'), AUTO_INTERVAL);
  };

  const handleDot = (i: number) => {
    clearInterval(timerRef.current!);
    setDirection(i > startIndex ? 'next' : 'prev');
    setStartIndex(i);
    setAnimKey(k => k + 1);
    startProgress();
    timerRef.current = setInterval(() => go('next'), AUTO_INTERVAL);
  };

  const visibleBanners = Array.from({ length: visibleCount }, (_, i) =>
    banners[(startIndex + i) % TOTAL]
  );

  const slideFrom = direction === 'next' ? '80px' : '-80px';
  // On mobile the single card is always "center"
  const centerIndex = isMobile ? 0 : 1;

  return (
    <section
      className="banner-carousel-section"
      style={{ background: BG, padding: isMobile ? '28px 0 24px' : '36px 0 28px' }}
    >
      {/* Injected keyframes + utility classes */}
      <style>{`
        @keyframes cardSlideIn {
          0%   { opacity: 0; transform: translateX(${slideFrom}) scale(0.93); }
          65%  { opacity: 1; }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes centerCardSlideIn {
          0%   { opacity: 0; transform: translateX(${slideFrom}) scale(0.95); }
          65%  { opacity: 1; }
          100% { opacity: 1; transform: translateX(0) scale(1.04); }
        }
        @keyframes infoFadeUp {
          0%   { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .bc-card-img { transition: transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .bc-card-img:hover { transform: scale(1.07) !important; }
        .bc-shop-link {
          transition: color 0.25s ease, letter-spacing 0.25s ease, border-color 0.25s ease;
        }
        .bc-shop-link:hover {
          color: ${BG} !important;
          letter-spacing: 2.8px !important;
          border-color: ${BG} !important;
        }
        .bc-nav-btn {
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.2s ease;
        }
        .bc-nav-btn:hover {
          background: white !important;
          border-color: white !important;
          transform: scale(1.1);
        }
        .bc-nav-btn:hover svg { stroke: ${BG}; }
        .bc-nav-btn:active { transform: scale(0.94); }
      `}</style>

      <div className="container-fluid px-3 px-md-4" style={{ maxWidth: '1180px', margin: '0 auto' }}>

        {/* ── Header ── */}
        <div className="text-center mb-4" style={{ marginBottom: isMobile ? '18px' : '22px' }}>
          <p style={{
            fontSize: '0.72rem', letterSpacing: '4px',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)',
            marginBottom: '6px', fontWeight: 600,
          }}>
            Handpicked Elegance
          </p>
          <h2 style={{
            fontSize: 'clamp(1.3rem, 3.2vw, 1.95rem)', fontWeight: 800,
            letterSpacing: '2px', textTransform: 'uppercase',
            color: '#fff', marginBottom: 0,
          }}>
            Featured Collection
          </h2>
          {/* Decorative rule */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '12px' }}>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.6))' }} />
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.8)' }} />
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.6))' }} />
          </div>
        </div>

        {/* ── Cards Row ── */}
        <div
          key={animKey}
          style={{
            display: 'flex',
            gap: isMobile ? '10px' : '12px',
            alignItems: 'flex-start',
            /* On mobile, center the single card */
            justifyContent: isMobile ? 'center' : 'stretch',
          }}
        >
          {visibleBanners.map((banner, i) => {
            const isCenter = i === centerIndex;
            const delay = `${i * 55}ms`;
            const sideCardScale = isMobile ? 1 : 0.95;

            return (
              <div
                key={`${banner.id}-${animKey}`}
                style={{
                  flex: isMobile ? '0 0 min(90vw, 360px)' : 1,
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  animation: isCenter
                    ? `centerCardSlideIn 0.6s cubic-bezier(0.22,1,0.36,1) ${delay} both`
                    : `cardSlideIn 0.6s cubic-bezier(0.22,1,0.36,1) ${delay} both`,
                }}
              >
                <Link
                  href={banner.href}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#ffffff',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    boxShadow: isCenter
                      ? '0 16px 34px rgba(0,0,0,0.22)'
                      : '0 7px 18px rgba(0,0,0,0.14)',
                    transform: isCenter && !isMobile
                      ? 'translateY(-10px) scale(1.03)'
                      : `translateY(0) scale(${sideCardScale})`,
                    opacity: isCenter ? 1 : 0.96,
                    transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                  }}
                >
                  {/* ── Image card ── */}
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '3 / 4',
                    overflow: 'hidden',
                    borderRadius: '14px 14px 0 0',
                    background: '#fff',
                  }}>
                    <div className="bc-card-img" style={{ position: 'absolute', inset: 0, transform: 'scale(1)' }}>
                      <Image
                        src={banner.src}
                        alt={banner.alt}
                        fill
                        sizes="(max-width: 767px) 85vw, 30vw"
                        style={{ objectFit: 'contain', objectPosition: 'center' }}
                        priority={i === 0}
                        unoptimized
                      />
                    </div>

                    {/* Collection tag badge */}
                    <div style={{
                      position: 'absolute', top: '12px', left: '12px',
                      background: 'rgba(220,116,125,0.92)',
                      padding: '4px 10px', borderRadius: '4px',
                      fontSize: '0.6rem', fontWeight: 700,
                      letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fff',
                      animation: `infoFadeUp 0.5s ease ${parseInt(delay) + 250}ms both`,
                    }}>
                      {banner.tag}
                    </div>

                    {/* Gradient footer inside image */}
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      height: '30%',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 100%)',
                      borderRadius: '0 0 12px 12px',
                      pointerEvents: 'none',
                    }} />
                  </div>

                  {/* ── Info below card ── */}
                  <div style={{
                    padding: isMobile ? '12px 10px 11px' : '12px 10px 10px',
                    textAlign: 'center',
                    background: '#fff',
                    animation: `infoFadeUp 0.55s ease ${parseInt(delay) + 200}ms both`,
                  }}>
                    <p style={{
                      fontSize: 'clamp(0.76rem, 1.2vw, 0.86rem)',
                      fontWeight: 700, letterSpacing: '0.6px',
                      textTransform: 'uppercase', color: '#2b2b2b',
                      marginBottom: '4px',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {banner.name}
                    </p>
                    <p style={{
                      fontSize: 'clamp(0.92rem, 1.6vw, 1rem)',
                      fontWeight: 800, color: BG, marginBottom: '8px',
                    }}>
                      {banner.price}
                    </p>
                    <span
                      className="bc-shop-link"
                      style={{
                        fontSize: '0.66rem', fontWeight: 700,
                        letterSpacing: '1.8px', textTransform: 'uppercase',
                        color: '#666',
                        borderBottom: '1.5px solid #d8d8d8',
                        paddingBottom: '3px',
                      }}
                    >
                      Shop Now
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* ── Navigation ── */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          alignItems: 'center', gap: isMobile ? '14px' : '16px', marginTop: isMobile ? '20px' : '24px',
        }}>
          {/* Prev */}
          <button
            className="bc-nav-btn"
            onClick={() => handleNav('prev')}
            aria-label="Previous"
            style={{
              width: '44px', height: '44px', borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.6)',
              background: 'rgba(255,255,255,0.15)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              outline: 'none', flexShrink: 0, backdropFilter: 'blur(4px)',
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDot(i)}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: i === startIndex ? '32px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  border: 'none',
                  background: i === startIndex ? 'white' : 'rgba(255,255,255,0.35)',
                  cursor: 'pointer',
                  transition: 'width 0.4s cubic-bezier(0.22,1,0.36,1), background 0.3s ease',
                  padding: 0, outline: 'none',
                  overflow: 'hidden', position: 'relative',
                }}
              >
                {i === startIndex && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, height: '100%',
                    width: `${progress}%`,
                    background: 'rgba(220,116,125,0.55)',
                    borderRadius: '4px',
                    transition: 'width 0.05s linear',
                  }} />
                )}
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            className="bc-nav-btn"
            onClick={() => handleNav('next')}
            aria-label="Next"
            style={{
              width: '44px', height: '44px', borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.6)',
              background: 'rgba(255,255,255,0.15)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              outline: 'none', flexShrink: 0, backdropFilter: 'blur(4px)',
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
