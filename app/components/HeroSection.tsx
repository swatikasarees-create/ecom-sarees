'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { getProductImageByHash } from '../lib/productImage';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const instaImg = (hash: string) => getProductImageByHash(hash);

export default function HeroSection() {
  return (
    <section id="billboard" className="bg-light py-3 py-md-5">
      <div className="container">
        <div className="row justify-content-center">
          <h1 className="section-title text-center mt-2 mt-md-4 px-3" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }} data-aos="fade-up">OUR TOP TRENDING</h1>
          <div className="col-md-8 col-lg-6 text-center px-3 px-md-2" data-aos="fade-up" data-aos-delay="300">
            <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>Discover the finest collection of traditional and contemporary sarees. From luxurious silk to elegant georgette, wedding to party wear, find your perfect six yards of grace at swatika Sarees. Each saree is crafted with care to celebrate the beauty of Indian tradition.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="swiper main-swiper py-4 position-relative" data-aos="fade-up" data-aos-delay="600">
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
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                className="border-animation-left"
              >
              <SwiperSlide>
                <div className="banner-item image-zoom-effect">
                  <div className="image-holder position-relative" style={{ height: 'clamp(300px, 60vw, 500px)', overflow: 'hidden' }}>
                    <Link href="/sarees/7">
                      <Image
                        src={instaImg('ba76809e38182a59fc059fd1b5ff8d54fbef1671671d7dc2d45e60da014280e0')}
                        alt="Cream Saree with Vibrant Pink Border"
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center top' }}
                        priority
                        unoptimized
                      />
                    </Link>
                  </div>
                  <div className="banner-content py-3 py-md-4 px-2 px-md-0">
                    <h5 className="element-title text-uppercase" style={{ fontSize: 'clamp(0.9rem, 3vw, 1.25rem)' }}>
                      <Link href="/sarees/7" className="item-anchor">Cream Saree – Pink Border</Link>
                    </h5>
                    <p className="d-none d-md-block" style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>Classic cream base meets a striking pink border and ornate motif detailing—ideal for wedding rituals and special occasions. ₹11,000</p>
                    <div className="btn-left">
                      <Link href="/checkout?productId=7&product=Cream%20Saree%20%E2%80%93%20Pink%20Border" className="btn-link text-uppercase item-anchor text-decoration-none" style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Shop Now</Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="banner-item image-zoom-effect">
                  <div className="image-holder position-relative" style={{ height: 'clamp(300px, 60vw, 500px)', overflow: 'hidden' }}>
                    <Link href="/sarees/40">
                      <Image
                        src={instaImg('d572b2ddeebc5c37c8eb4c63deb69e10c3543589c62374ec45558d4217058267')}
                        alt="Patola Silk Saree"
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center top' }}
                        priority
                        unoptimized
                      />
                    </Link>
                  </div>
                  <div className="banner-content py-3 py-md-4 px-2 px-md-0">
                    <h5 className="element-title text-uppercase" style={{ fontSize: 'clamp(0.9rem, 3vw, 1.25rem)' }}>
                      <Link href="/sarees/40" className="item-anchor">Patola Silk Saree</Link>
                    </h5>
                    <p className="d-none d-md-block" style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>Stunning Patola silk saree with intricate traditional patterns, vibrant red base and contrasting golden border. ₹6,000</p>
                    <div className="btn-left">
                      <Link href="/checkout?productId=40&product=Patola%20Silk%20Saree" className="btn-link text-uppercase item-anchor text-decoration-none" style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Shop Now</Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="banner-item image-zoom-effect">
                  <div className="image-holder position-relative" style={{ height: 'clamp(300px, 60vw, 500px)', overflow: 'hidden' }}>
                    <Link href="/sarees/18">
                      <Image
                        src={instaImg('33b3c5ac84e7f428324c6d67f6a7f0732598ee87e26a0b165e594c3932725ac9')}
                        alt="Tissue Silk Saree"
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center top' }}
                        priority
                        unoptimized
                      />
                    </Link>
                  </div>
                  <div className="banner-content py-3 py-md-4 px-2 px-md-0">
                    <h5 className="element-title text-uppercase" style={{ fontSize: 'clamp(0.9rem, 3vw, 1.25rem)' }}>
                      <Link href="/sarees/18" className="item-anchor">Tissue Silk Saree</Link>
                    </h5>
                    <p className="d-none d-md-block" style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>Luxurious tissue silk saree with a graceful silhouette and subtle natural sheen—perfect for weddings and festive celebrations. ₹4,999</p>
                    <div className="btn-left">
                      <Link href="/checkout?productId=18&product=Tissue%20Silk%20Saree" className="btn-link text-uppercase item-anchor text-decoration-none" style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Shop Now</Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="banner-item image-zoom-effect">
                  <div className="image-holder position-relative" style={{ height: 'clamp(300px, 60vw, 500px)', overflow: 'hidden' }}>
                    <Link href="/sarees/5">
                      <Image
                        src={instaImg('46a257b9b9f758da7849f836bf71346d414778c4382aac9c626a44c1c91301b9')}
                        alt="Net Embellished Saree"
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center top' }}
                        unoptimized
                      />
                    </Link>
                  </div>
                  <div className="banner-content py-3 py-md-4 px-2 px-md-0">
                    <h5 className="element-title text-uppercase" style={{ fontSize: 'clamp(0.9rem, 3vw, 1.25rem)' }}>
                      <Link href="/sarees/5" className="item-anchor">Net Embellished Saree</Link>
                    </h5>
                    <p className="d-none d-md-block" style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>Seafoam saree with detailed embroidered border and sequin work for a refined shine. Sophisticated for weddings and evening celebrations. ₹8,000</p>
                    <div className="btn-left">
                      <Link href="/checkout?productId=5&product=Net%20Embellished%20Saree" className="btn-link text-uppercase item-anchor text-decoration-none" style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Shop Now</Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="banner-item image-zoom-effect">
                  <div className="image-holder position-relative" style={{ height: 'clamp(300px, 60vw, 500px)', overflow: 'hidden' }}>
                    <Link href="/sarees/6">
                      <Image
                        src={instaImg('b9606fa353f07c69822a7f45e9dff88435ded645dc85564219b7027cf3b5ac5f')}
                        alt="Rust Orange Silk Saree"
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center top' }}
                        unoptimized
                      />
                    </Link>
                  </div>
                  <div className="banner-content py-3 py-md-4 px-2 px-md-0">
                    <h5 className="element-title text-uppercase" style={{ fontSize: 'clamp(0.9rem, 3vw, 1.25rem)' }}>
                      <Link href="/sarees/6" className="item-anchor">Rust Orange Silk Saree</Link>
                    </h5>
                    <p className="d-none d-md-block" style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>Rich rust-orange saree with bandhani-inspired pattern and standout metallic pallu—perfect for cultural events and wedding functions. ₹4,500</p>
                    <div className="btn-left">
                      <Link href="/checkout?productId=6&product=Rust%20Orange%20Silk%20Saree" className="btn-link text-uppercase item-anchor text-decoration-none" style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Shop Now</Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="banner-item image-zoom-effect">
                  <div className="image-holder position-relative" style={{ height: 'clamp(300px, 60vw, 500px)', overflow: 'hidden' }}>
                    <Link href="/sarees/35">
                      <Image
                        src={instaImg('8f984c7487be2c119a063599ec22580bfdb5b1a3476cd89793531fe8ddc9c3a6')}
                        alt="Stone Work Net Saree"
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center top' }}
                        unoptimized
                      />
                    </Link>
                  </div>
                  <div className="banner-content py-3 py-md-4 px-2 px-md-0">
                    <h5 className="element-title text-uppercase" style={{ fontSize: 'clamp(0.9rem, 3vw, 1.25rem)' }}>
                      <Link href="/sarees/35" className="item-anchor">Stone Work Net Saree</Link>
                    </h5>
                    <p className="d-none d-md-block" style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>Graceful net saree adorned with intricate stone work and elegant detailing—designed for luxurious sparkle at weddings and receptions. ₹11,000</p>
                    <div className="btn-left">
                      <Link href="/checkout?productId=35&product=Stone%20Work%20Net%20Saree" className="btn-link text-uppercase item-anchor text-decoration-none" style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>Shop Now</Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
            <div className="swiper-pagination"></div>
            <div className="icon-arrow icon-arrow-left">
              <svg width="50" height="50" viewBox="0 0 24 24">
                <use xlinkHref="#arrow-left"></use>
              </svg>
            </div>
            <div className="icon-arrow icon-arrow-right">
              <svg width="50" height="50" viewBox="0 0 24 24">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 767.98px) {
          #billboard .icon-arrow {
            display: none !important;
          }

          #billboard .swiper.main-swiper {
            padding-bottom: 8px !important;
          }
        }
      `}</style>
    </section>
  );
}
