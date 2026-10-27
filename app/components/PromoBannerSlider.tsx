'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

interface BannerSlide {
  id: number;
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  title: string;
  href: string;
}

const BANNER_SLIDES: BannerSlide[] = [
  {
    id: 1,
    desktopSrc:
      'https://res.cloudinary.com/p8wgrpnr/image/upload/f_auto,q_auto,w_2400/swatika_banners/desktop/banner_1.webp',
    mobileSrc:
      'https://res.cloudinary.com/p8wgrpnr/image/upload/f_auto,q_auto,w_1080/swatika_banners/mobile/banner_1.webp',
    alt: 'The Grand Diwali Sale - Flat 40% Off on Sarees',
    title: 'The Grand Diwali Sale - Flat 40% Off',
    href: '/sarees',
  },
  {
    id: 2,
    desktopSrc:
      'https://res.cloudinary.com/p8wgrpnr/image/upload/f_auto,q_auto,w_2400/swatika_banners/desktop/banner_2.webp',
    mobileSrc:
      'https://res.cloudinary.com/p8wgrpnr/image/upload/f_auto,q_auto,w_1080/swatika_banners/mobile/banner_2.webp',
    alt: 'Diwali Sale - Festive Edit (30 Oct - 8 Nov) - Timeless Drapes',
    title: 'Diwali Sale Festive Edit',
    href: '/sarees',
  },
  {
    id: 3,
    desktopSrc:
      'https://res.cloudinary.com/p8wgrpnr/image/upload/f_auto,q_auto,w_2400/swatika_banners/desktop/banner_3.webp',
    mobileSrc:
      'https://res.cloudinary.com/p8wgrpnr/image/upload/f_auto,q_auto,w_1080/swatika_banners/mobile/banner_3.webp',
    alt: 'Buy 2 Sarees Get Up to 60% Off - Special Festive Offer',
    title: 'Buy 2 Sarees Get Up to 60% Off',
    href: '/sarees',
  },
  {
    id: 4,
    desktopSrc:
      'https://res.cloudinary.com/p8wgrpnr/image/upload/f_auto,q_auto,w_2400/swatika_banners/desktop/banner_4.webp',
    mobileSrc:
      'https://res.cloudinary.com/p8wgrpnr/image/upload/f_auto,q_auto,w_1080/swatika_banners/mobile/banner_4.webp',
    alt: 'Karwa Chauth Special - Flat 50% Off - Celebration of Love & Elegance',
    title: 'Karwa Chauth Special - Flat 50% Off',
    href: '/sarees',
  },
];

const AUTOPLAY_DELAY = 5000;

export default function PromoBannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % BANNER_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    const threshold = 40;
    if (diff > threshold) {
      nextSlide();
    } else if (diff < -threshold) {
      prevSlide();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <section
      className="promo-banner-section"
      aria-label="Festive Promo Banners"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#fbf7f4',
        userSelect: 'none',
      }}
    >
      <style>{`
        .promo-banner-aspect {
          width: 100%;
          display: block;
          aspect-ratio: 6000 / 1875;
        }
        @media (max-width: 767px) {
          .promo-banner-aspect {
            aspect-ratio: 2344 / 1875;
          }
        }
        .promo-banner-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(220, 116, 125, 0.2);
          color: #8B1E3F;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
          z-index: 10;
          opacity: 0.85;
        }
        .promo-banner-nav-btn:hover {
          background: #ffffff;
          color: #dc747d;
          transform: translateY(-50%) scale(1.08);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
          opacity: 1;
        }
        .promo-banner-nav-btn.prev {
          left: 16px;
        }
        .promo-banner-nav-btn.next {
          right: 16px;
        }
        @media (max-width: 767px) {
          .promo-banner-nav-btn {
            width: 34px;
            height: 34px;
            opacity: 0.75;
          }
          .promo-banner-nav-btn.prev {
            left: 8px;
          }
          .promo-banner-nav-btn.next {
            right: 8px;
          }
        }
        .promo-banner-dots {
          position: absolute;
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 10;
          padding: 6px 14px;
          border-radius: 20px;
          background: rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(6px);
        }
        @media (max-width: 767px) {
          .promo-banner-dots {
            bottom: 10px;
            gap: 6px;
            padding: 4px 10px;
          }
        }
        .promo-banner-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.55);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .promo-banner-dot.active {
          width: 26px;
          border-radius: 10px;
          background: #ffffff;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }
      `}</style>

      {/* Slide Container */}
      <div
        style={{
          display: 'flex',
          width: `${BANNER_SLIDES.length * 100}%`,
          transform: `translateX(-${(currentIndex * 100) / BANNER_SLIDES.length}%)`,
          transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        {BANNER_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            style={{
              width: `${100 / BANNER_SLIDES.length}%`,
              flexShrink: 0,
              position: 'relative',
            }}
          >
            <Link
              href={slide.href}
              title={slide.title}
              style={{
                display: 'block',
                width: '100%',
                lineHeight: 0,
                textDecoration: 'none',
              }}
            >
              <picture className="promo-banner-aspect">
                <source media="(max-width: 767px)" srcSet={slide.mobileSrc} />
                <source media="(min-width: 768px)" srcSet={slide.desktopSrc} />
                <img
                  src={slide.desktopSrc}
                  alt={slide.alt}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  // @ts-expect-error fetchPriority supported in modern browsers
                  fetchpriority={idx === 0 ? 'high' : 'auto'}
                  className="promo-banner-aspect"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </picture>
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        className="promo-banner-nav-btn prev"
        onClick={(e) => {
          e.preventDefault();
          prevSlide();
        }}
        aria-label="Previous promotional banner"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        type="button"
        className="promo-banner-nav-btn next"
        onClick={(e) => {
          e.preventDefault();
          nextSlide();
        }}
        aria-label="Next promotional banner"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="promo-banner-dots" role="tablist" aria-label="Banner pagination">
        {BANNER_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            className={`promo-banner-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              goToSlide(idx);
            }}
            aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
            aria-selected={idx === currentIndex}
            role="tab"
          />
        ))}
      </div>
    </section>
  );
}
