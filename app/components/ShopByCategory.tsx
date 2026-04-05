'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { getProductImageByHash } from '../lib/productImage';

export default function ShopByCategory() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const instaImg = (hash: string) => getProductImageByHash(hash);

  const categories = [
    {
      id: 1,
      name: 'Wedding Sarees',
      image: instaImg('ba76809e38182a59fc059fd1b5ff8d54fbef1671671d7dc2d45e60da014280e0'),
      link: '/sarees?type=wedding'
    },
    {
      id: 2,
      name: 'Georgette Sarees',
      image: instaImg('46a257b9b9f758da7849f836bf71346d414778c4382aac9c626a44c1c91301b9'),
      link: '/sarees?type=georgette'
    },
    {
      id: 3,
      name: 'Casual Sarees',
      image: instaImg('3876d6356902934f89c32ff17a01069cbecd69a3f5ed463a3e3d2cf989ee847d'),
      link: '/sarees?type=cotton'
    },
    {
      id: 4,
      name: 'Haldi Sarees',
      image: instaImg('15ff321335eca96ad3ae10207dc3e64dc57578cc932fa81e1fe20de55de7de1d'),
      link: '/sarees?type=silk'
    },
   {
      id: 5,
      name: 'Partywear Sarees',
      image: instaImg('5cc317d0105e936b6b2fa225210e55064f5cf16bd6c0137a4572165ee7c27d15'),
      link: '/sarees?type=party'
    },
    {
      id: 6,
      name: 'Suit',
      image: instaImg('49faf2cd234e3d788bf0f9d46ae15cdbb8f5773d30954f7f92265dc1c75372c8'),
      link: '/suit'
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="shop-by-category py-4 py-md-5" style={{ background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)' }}>
      <div className="container-fluid px-3 px-md-4">
        {/* Section Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 mb-md-5">
          <div>
            <h2 className="fw-bold mb-0" style={{ 
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              Shop By Category
            </h2>
            <div style={{
              width: 'clamp(60px, 10vw, 80px)',
              height: '3px',
              background: 'linear-gradient(90deg, #dc747d, #667eea)',
              marginTop: '10px'
            }}></div>
          </div>

          {/* Navigation Arrows */}
          <div className="d-none d-md-flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: '45px',
                height: '45px',
                border: '2px solid #333',
                background: 'white',
                transition: 'all 0.3s ease',
                padding: '0',
                outline: 'none',
                boxShadow: 'none',
                cursor: 'pointer',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#333';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#333';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ←
            </button>
            <button 
              onClick={() => scroll('right')}
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: '45px',
                height: '45px',
                border: '2px solid #333',
                background: 'white',
                transition: 'all 0.3s ease',
                padding: '0',
                outline: 'none',
                boxShadow: 'none',
                cursor: 'pointer',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#333';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#333';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              →
            </button>
          </div>
        </div>

        {/* Categories Horizontal Scroll */}
        <div 
          ref={scrollContainerRef}
          className="category-scroll-container"
          style={{
            display: 'flex',
            gap: 'clamp(30px, 5vw, 60px)',
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollBehavior: 'smooth',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            padding: 'clamp(10px, 2vw, 20px) 0'
          }}
        >
          {categories.map((category) => (
            <Link 
              key={category.id}
              href={category.link}
              className="category-item text-decoration-none"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'clamp(12px, 2vw, 20px)',
                minWidth: 'clamp(150px, 20vw, 220px)',
                flexShrink: 0,
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Circular Image */}
              <div 
                style={{
                  position: 'relative',
                  width: 'clamp(150px, 20vw, 220px)',
                  height: 'clamp(150px, 20vw, 220px)',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                  border: '4px solid white',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.25)';
                  e.currentTarget.style.borderColor = '#dc747d';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
                  e.currentTarget.style.borderColor = 'white';
                }}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  sizes="(max-width: 768px) 150px, 220px"
                  unoptimized
                />
              </div>

              {/* Category Name */}
              <h3 
                className="text-dark text-center fw-bold mb-0"
                style={{
                  fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
                  letterSpacing: '0.5px'
                }}
              >
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .category-scroll-container::-webkit-scrollbar {
          display: none;
        }

        .category-scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Touch scrolling for mobile */
        .category-scroll-container {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </section>
  );
}
