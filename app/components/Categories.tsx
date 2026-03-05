'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductImageByHash } from '../lib/productImage';
import { addToCart, addToWishlist } from '../lib/commerceStore';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  link: string;
}

const instaImg = (hash: string) => getProductImageByHash(hash);

export default function Categories() {
  const [activeTab, setActiveTab] = useState<'bestSellers' | 'newArrivals'>('bestSellers');

  const bestSellers: Product[] = [
    {
      id: 7,
      name: 'Cream Saree with Vibrant Pink Border & Traditional Motifs',
      image: instaImg('ba76809e38182a59fc059fd1b5ff8d54fbef1671671d7dc2d45e60da014280e0'),
      price: 11000,
      originalPrice: 16000,
      link: '/sarees/7'
    },
    {
      id: 31,
      name: 'Pearl Work Net Saree – Timeless Grace',
      image: instaImg('b412ff6e2520e71391d64b0560de436686b29db2cb76bd68e417bbda70211003'),
      price: 12000,
      originalPrice: 18000,
      link: '/sarees/31'
    },
    {
      id: 40,
      name: 'Patola Silk Saree – Rich Traditional Elegance',
      image: instaImg('d572b2ddeebc5c37c8eb4c63deb69e10c3543589c62374ec45558d4217058267'),
      price: 6000,
      originalPrice: 10000,
      link: '/sarees/40'
    }
  ];

  const newArrivals: Product[] = [
    {
      id: 18,
      name: 'Tissue Silk Saree – Timeless Elegance',
      image: instaImg('33b3c5ac84e7f428324c6d67f6a7f0732598ee87e26a0b165e594c3932725ac9'),
      price: 4999,
      originalPrice: 8000,
      link: '/sarees/18'
    },
    {
      id: 41,
      name: 'Soft Tissue Silk Saree with Thread & Sequin Work',
      image: instaImg('59faa94e5e6422d3d7e99a492e212774569ccc6fe656c8d961b1a24c46a99e51'),
      price: 4500,
      originalPrice: 7000,
      link: '/sarees/41'
    },
    {
      id: 36,
      name: 'Elegant Tissue Thread Work Saree – Floral Motifs',
      image: instaImg('a8873565af396d4c051d0dcdcfcd112fe4e43008361dabe2dcdcf5e0d39814e5'),
      price: 4500,
      originalPrice: 7000,
      link: '/sarees/36'
    }
  ];

  const displayProducts = activeTab === 'bestSellers' ? bestSellers : newArrivals;

  const addProductToCart = (product: Product) => {
    addToCart({
      id: String(product.id),
      name: product.name,
      image: product.image,
      price: product.price,
    });
  };

  const addProductToWishlist = (product: Product) => {
    addToWishlist({
      id: String(product.id),
      name: product.name,
      image: product.image,
      price: product.price,
    });
  };

  return (
    <section className="categories py-4 py-md-5" style={{ background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)' }}>
      <div className="container px-3 px-md-4">
        {/* Section Header */}
        <div className="text-center mb-4 mb-md-5">
          <h2 
            className="fw-bold mb-4" 
            style={{ 
              fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}
            data-aos="fade-up"
          >
            Curated Collection
          </h2>

          {/* Tabs */}
          <div 
            className="d-flex justify-content-center gap-4 gap-md-5 mb-4 mb-md-5"
            data-aos="fade-up" 
            data-aos-delay="200"
          >
            <button
              onClick={() => setActiveTab('bestSellers')}
              className="border-0 bg-transparent position-relative"
              style={{
                fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: activeTab === 'bestSellers' ? '#333' : '#999',
                padding: '10px 0',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }}
            >
              Best Sellers
              {activeTab === 'bestSellers' && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    height: '2px',
                    background: '#333'
                  }}
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab('newArrivals')}
              className="border-0 bg-transparent position-relative"
              style={{
                fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: activeTab === 'newArrivals' ? '#333' : '#999',
                padding: '10px 0',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }}
            >
              New Arrivals
              {activeTab === 'newArrivals' && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    height: '2px',
                    background: '#333'
                  }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="row g-3 g-md-4" data-aos="fade-up" data-aos-delay="400">
          {displayProducts.map((product, index) => (
            <div key={product.id} className="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={index * 100}>
              <Link href={product.link} className="text-decoration-none">
                <div
                  className="product-card"
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    height: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
                  }}
                >
                  {/* Product Image */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 'clamp(300px, 50vw, 450px)',
                      overflow: 'hidden',
                      background: '#f5f0ed'
                    }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        transition: 'transform 0.5s ease'
                      }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div style={{ padding: 'clamp(15px, 3vw, 20px)' }}>
                    <h3
                      style={{
                        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                        fontWeight: '600',
                        color: '#333',
                        marginBottom: '10px',
                        lineHeight: '1.4',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="d-flex align-items-center gap-2">
                      <span
                        style={{
                          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                          fontWeight: '700',
                          color: '#dc747d'
                        }}
                      >
                        Rs. {product.price.toLocaleString('en-IN')}
                      </span>
                      <span
                        style={{
                          fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                          fontWeight: '500',
                          color: '#999',
                          textDecoration: 'line-through'
                        }}
                      >
                        Rs. {product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Discount Badge */}
                    <div
                      style={{
                        display: 'inline-block',
                        marginTop: '8px',
                        padding: '4px 10px',
                        background: 'rgba(220, 116, 125, 0.1)',
                        color: '#dc747d',
                        fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)',
                        fontWeight: '600',
                        borderRadius: '4px'
                      }}
                    >
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                    <div className="d-flex gap-2 mt-3">
                      <button
                        type="button"
                        className="btn btn-sm btn-dark flex-fill"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addProductToCart(product);
                        }}
                      >
                        Add to Cart
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-dark flex-fill"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addProductToWishlist(product);
                        }}
                      >
                        Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-4 mt-md-5" data-aos="fade-up" data-aos-delay="600">
          <Link
            href="/sarees"
            className="btn text-uppercase"
            style={{
              padding: 'clamp(12px, 2vw, 15px) clamp(30px, 5vw, 50px)',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              fontWeight: '600',
              letterSpacing: '1px',
              border: '2px solid #333',
              background: 'transparent',
              color: '#333',
              transition: 'all 0.3s ease',
              borderRadius: '4px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#333';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#333';
            }}
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
