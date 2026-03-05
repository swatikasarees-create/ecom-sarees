'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      text: 'Absolutely stunning saree! The silk quality is exceptional and the embroidery work is so intricate. I wore it to my sister\'s wedding and received countless compliments. Worth every penny!',
      author: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      initial: 'P',
      color: '#667eea'
    },
    {
      id: 2,
      text: 'The designer saree I ordered exceeded my expectations. The colors are vibrant, the fabric drapes beautifully, and the customer service was excellent. Will definitely order again!',
      author: 'Anjali Reddy',
      location: 'Hyderabad',
      rating: 5,
      initial: 'A',
      color: '#f093fb'
    },
    {
      id: 3,
      text: 'Beautiful collection of sarees! I bought a Banarasi silk saree and the quality is premium. The packaging was elegant too. Highly recommend swatika Sarees for authentic traditional wear.',
      author: 'Divya Krishnan',
      location: 'Bangalore',
      rating: 5,
      initial: 'D',
      color: '#4facfe'
    },
    {
      id: 4,
      text: 'Fast delivery and amazing product! The georgette saree is lightweight yet elegant. Perfect for festive occasions. The color exactly matched the photos. Very satisfied with my purchase!',
      author: 'Meera Kapoor',
      location: 'Delhi',
      rating: 5,
      initial: 'M',
      color: '#43e97b'
    },
  ];

  return (
    <section className="testimonials py-4 py-md-5" style={{ background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)' }}>
      <div className="container px-3 px-md-4">
        <div className="section-header text-center mb-4 mb-md-5 pt-3 pt-md-5">
          <div style={{ marginBottom: 'clamp(10px, 2vw, 15px)' }}>
            <span style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
              fontWeight: '700',
              letterSpacing: 'clamp(1px, 1vw, 2px)',
              textTransform: 'uppercase'
            }}>
              Customer Reviews
            </span>
          </div>
          <h2 className="fw-bold mb-2 mb-md-3" style={{ fontSize: 'clamp(1.3rem, 5vw, 2.5rem)', letterSpacing: 'clamp(0.5px, 0.5vw, 1px)' }}>
            What Our Customers Say
          </h2>
          <p className="text-muted px-2" style={{ maxWidth: '600px', margin: '0 auto', fontSize: 'clamp(0.8rem, 2.5vw, 1rem)', lineHeight: '1.6' }}>
            Read authentic reviews from our valued customers who have experienced the elegance of swatika Sarees
          </p>
        </div>
        <Swiper
          modules={[Pagination]}
          spaceBetween={15}
          slidesPerView={1}
          pagination={{ 
            clickable: true,
            el: '.testimonial-swiper-pagination'
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="testimonial-swiper mb-4"
          style={{ paddingBottom: '10px' }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="testimonial-item" style={{
                background: 'white',
                borderRadius: '16px',
                padding: '25px 10px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                height: '100%',
                position: 'relative',
                transition: 'all 0.3s ease',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                minWidth: '150px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
              }}>
                {/* Quote Icon */}
                <div style={{
                  fontSize: '50px',
                  lineHeight: '1',
                  color: testimonial.color,
                  opacity: '0.15',
                  position: 'absolute',
                  top: '15px',
                  right: '20px',
                  fontFamily: 'Georgia, serif'
                }}>
                  &quot;
                </div>
                
                {/* Star Rating */}
                <div className="mb-3" style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={testimonial.color}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote style={{ margin: '0', position: 'relative', zIndex: '1', flex: '1' }}>
                  <p style={{
                    fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
                    lineHeight: '1.6',
                    color: '#555',
                    marginBottom: '20px',
                    fontStyle: 'italic'
                  }}>
                    &quot;{testimonial.text}&quot;
                  </p>
                  
                  {/* Author Info */}
                  <div className="d-flex align-items-center mt-auto pt-2">
                    {/* Avatar */}
                    <div style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${testimonial.color} 0%, ${testimonial.color}dd 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px',
                      fontSize: '18px',
                      fontWeight: '700',
                      color: 'white',
                      flexShrink: '0'
                    }}>
                      {testimonial.initial}
                    </div>
                    
                    {/* Name and Location */}
                    <div style={{ textAlign: 'left', overflow: 'hidden' }}>
                      <div style={{
                        fontSize: 'clamp(0.9rem, 3vw, 1rem)',
                        fontWeight: '700',
                        color: '#333',
                        marginBottom: '3px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {testimonial.author}
                      </div>
                      <div style={{
                        fontSize: 'clamp(0.75rem, 2.5vw, 0.8125rem)',
                        color: '#999',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px', flexShrink: 0 }}>
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </blockquote>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="testimonial-swiper-pagination d-flex justify-content-center pb-4 pb-md-5"></div>
      </div>
    </section>
  );
}
