'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

export default function ShopByCategory() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      id: 1,
      name: 'Wedding Sarees',
      image: '/images/banner-image-1.jpg',
      link: '/sarees?type=wedding'
    },
    {
      id: 2,
      name: 'Georgette Sarees',
      image: '/images/banner-image-5.jpg',
      link: '/sarees?type=georgette'
    },
    {
      id: 3,
      name: 'Casual Sarees',
      image: '/images/banner-image-3.jpg',
      link: '/sarees?type=cotton'
    },
    {
      id: 4,
      name: 'Haldi Sarees',
      image: '/images/banner-image-4.jpg',
      link: '/sarees?type=silk'
    },
   {
      id: 5,
      name: 'Partywear Sarees',
      image: '/images/banner-image-2.jpg',
      link: '/sarees?type=party'
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
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                  sizes="(max-width: 768px) 150px, 220px"
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
