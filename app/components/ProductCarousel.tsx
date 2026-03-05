'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { addToCart, addToWishlist } from '../lib/commerceStore';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Product {
  id: number | string;
  name: string;
  price: string;
  image: string;
}

interface ProductCarouselProps {
  title: string;
  products: Product[];
  sectionId?: string;
}

export default function ProductCarousel({ title, products, sectionId }: ProductCarouselProps) {
  const parsePrice = (price: string) => {
    const numeric = Number(price.replace(/[^\d]/g, ''));
    return Number.isFinite(numeric) ? numeric : 0;
  };

  return (
    <section id={sectionId} className="product-carousel py-4 py-md-5 position-relative overflow-hidden" style={{ background: '#fafafa' }}>
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 mb-md-5 px-2 px-md-0">
          <div className="mb-3 mb-md-0">
            <h2 className="text-uppercase fw-bold mb-2" style={{ letterSpacing: 'clamp(0.5px, 1vw, 2px)', fontSize: 'clamp(1.3rem, 4vw, 2rem)' }}>{title}</h2>
            <div style={{ width: 'clamp(60px, 15vw, 80px)', height: '4px', background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', borderRadius: '2px' }}></div>
          </div>
          <Link href="/sarees" className="btn btn-outline-dark text-uppercase px-3 px-md-4 py-2" style={{ 
            fontWeight: '600',
            letterSpacing: '1px',
            transition: 'all 0.3s',
            fontSize: 'clamp(0.75rem, 2vw, 0.95rem)'
          }}>
            View All →
          </Link>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="swiper product-swiper open-up position-relative" data-aos="zoom-out">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ 
              clickable: true,
              el: '.swiper-pagination'
            }}
            navigation={{
              nextEl: '.icon-arrow-right',
              prevEl: '.icon-arrow-left',
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
          >
            {products.map((product, index) => (
              <SwiperSlide key={product.id}>
                <div className="product-item" style={{ 
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
                  const quickView = e.currentTarget.querySelector('.quick-view-btn') as HTMLElement;
                  if (quickView) {
                    quickView.style.opacity = '1';
                    quickView.style.transform = 'translateY(0)';
                  }
                  const img = e.currentTarget.querySelector('.product-image') as HTMLElement;
                  if (img) img.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 15px rgba(0,0,0,0.08)';
                  const quickView = e.currentTarget.querySelector('.quick-view-btn') as HTMLElement;
                  if (quickView) {
                    quickView.style.opacity = '0';
                    quickView.style.transform = 'translateY(100%)';
                  }
                  const img = e.currentTarget.querySelector('.product-image') as HTMLElement;
                  if (img) img.style.transform = 'scale(1)';
                }}>
                  <div className="image-holder position-relative" style={{ height: '400px', overflow: 'hidden', background: '#f8f8f8' }}>
                    <Link href="/sarees">
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center top', transition: 'transform 0.4s ease' }}
                        unoptimized
                      />
                    </Link>
                    
                    {/* NEW Badge for first 2 items */}
                    {index < 2 && (
                      <span className="badge position-absolute" style={{
                        top: '15px',
                        left: '15px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '6px 14px',
                        fontSize: '11px',
                        fontWeight: '700',
                        letterSpacing: '1px',
                        borderRadius: '20px',
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                      }}>
                        NEW
                      </span>
                    )}
                    
                    {/* Wishlist Button */}
                    <button className="btn btn-icon position-absolute" style={{
                      top: '15px',
                      right: '15px',
                      width: '40px',
                      height: '40px',
                      background: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#ff4757';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToWishlist({
                        id: String(product.id),
                        name: product.name,
                        image: product.image,
                        price: parsePrice(product.price),
                      });
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <use xlinkHref="#heart"></use>
                      </svg>
                    </button>
                    
                    {/* Quick View Button - Shows on hover */}
                    <Link href="/sarees" className="btn btn-dark text-uppercase position-absolute w-100 quick-view-btn" style={{
                      bottom: '0',
                      left: '0',
                      padding: '12px',
                      fontSize: '13px',
                      fontWeight: '600',
                      letterSpacing: '1px',
                      borderRadius: '0',
                      opacity: '0',
                      transform: 'translateY(100%)',
                      transition: 'all 0.3s ease'
                    }}>
                      Quick View
                    </Link>
                  </div>
                  
                  {/* Product Info */}
                  <div className="product-content p-3" style={{ minHeight: '120px' }}>
                    <h6 className="mb-2" style={{ 
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#333',
                      lineHeight: '1.4',
                      minHeight: '40px'
                    }}>
                      <Link href="/sarees" className="text-decoration-none text-dark">
                        {product.name}
                      </Link>
                    </h6>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                      <span className="price fw-bold" style={{ 
                        fontSize: '18px',
                        color: '#667eea',
                        fontWeight: '700'
                      }}>
                        {product.price}
                      </span>
                      <Link href="/sarees" className="text-decoration-none" style={{
                        fontSize: '12px',
                        color: '#666',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        View Details →
                      </Link>
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm btn-dark w-100 mt-3"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart({
                          id: String(product.id),
                          name: product.name,
                          image: product.image,
                          price: parsePrice(product.price),
                        });
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination" style={{ marginTop: '30px' }}></div>
          <div className="icon-arrow icon-arrow-left" style={{
            width: '50px',
            height: '50px',
            background: 'white',
            borderRadius: '50%',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.transform = 'scale(1)';
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <use xlinkHref="#arrow-left"></use>
            </svg>
          </div>
          <div className="icon-arrow icon-arrow-right" style={{
            width: '50px',
            height: '50px',
            background: 'white',
            borderRadius: '50%',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.transform = 'scale(1)';
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
