'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function HeroSection() {
  return (
    <section id="billboard" className="bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <h1 className="section-title text-center mt-4" data-aos="fade-up">New Collections</h1>
          <div className="col-md-6 text-center" data-aos="fade-up" data-aos-delay="300">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe voluptas ut dolorum consequuntur, adipisci
              repellat! Eveniet commodi voluptatem voluptate, eum minima, in suscipit explicabo voluptatibus harum,
              quibusdam ex repellat eaque!</p>
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
                  <div className="image-holder">
                    <Link href="#">
                      <Image 
                        src="/images/banner-image-6.jpg" 
                        alt="product" 
                        className="img-fluid" 
                        width={600} 
                        height={750}
                        style={{ width: '100%', height: 'auto' }}
                        priority
                      />
                    </Link>
                  </div>
                  <div className="banner-content py-4">
                    <h5 className="element-title text-uppercase">
                      <Link href="/" className="item-anchor">Soft leather jackets</Link>
                    </h5>
                    <p>Scelerisque duis aliquam qui lorem ipsum dolor amet, consectetur adipiscing elit.</p>
                    <div className="btn-left">
                      <Link href="#" className="btn-link fs-6 text-uppercase item-anchor text-decoration-none">Discover Now</Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="banner-item image-zoom-effect">
                  <div className="image-holder">
                    <Link href="#">
                      <Image 
                        src="/images/banner-image-1.jpg" 
                        alt="product" 
                        className="img-fluid" 
                        width={600} 
                        height={750}
                        style={{ width: '100%', height: 'auto' }}
                        priority
                      />
                    </Link>
                  </div>
                  <div className="banner-content py-4">
                    <h5 className="element-title text-uppercase">
                      <Link href="/" className="item-anchor">Soft leather jackets</Link>
                    </h5>
                    <p>Scelerisque duis aliquam qui lorem ipsum dolor amet, consectetur adipiscing elit.</p>
                    <div className="btn-left">
                      <Link href="#" className="btn-link fs-6 text-uppercase item-anchor text-decoration-none">Discover Now</Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="banner-item image-zoom-effect">
                  <div className="image-holder">
                    <Link href="#">
                      <Image 
                        src="/images/banner-image-2.jpg" 
                        alt="product" 
                        className="img-fluid" 
                        width={600} 
                        height={750}
                        style={{ width: '100%', height: 'auto' }}
                        priority
                      />
                    </Link>
                  </div>
                  <div className="banner-content py-4">
                    <h5 className="element-title text-uppercase">
                      <Link href="/" className="item-anchor">Soft leather jackets</Link>
                    </h5>
                    <p>Scelerisque duis aliquam qui lorem ipsum dolor amet, consectetur adipiscing elit.</p>
                    <div className="btn-left">
                      <Link href="#" className="btn-link fs-6 text-uppercase item-anchor text-decoration-none">Discover Now</Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="banner-item image-zoom-effect">
                  <div className="image-holder">
                    <Link href="#">
                      <Image 
                        src="/images/banner-image-3.jpg" 
                        alt="product" 
                        className="img-fluid" 
                        width={600} 
                        height={750}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </Link>
                  </div>
                  <div className="banner-content py-4">
                    <h5 className="element-title text-uppercase">
                      <Link href="/" className="item-anchor">Soft leather jackets</Link>
                    </h5>
                    <p>Scelerisque duis aliquam qui lorem ipsum dolor amet, consectetur adipiscing elit.</p>
                    <div className="btn-left">
                      <Link href="#" className="btn-link fs-6 text-uppercase item-anchor text-decoration-none">Discover Now</Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="banner-item image-zoom-effect">
                  <div className="image-holder">
                    <Link href="#">
                      <Image 
                        src="/images/banner-image-4.jpg" 
                        alt="product" 
                        className="img-fluid" 
                        width={600} 
                        height={750}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </Link>
                  </div>
                  <div className="banner-content py-4">
                    <h5 className="element-title text-uppercase">
                      <Link href="/" className="item-anchor">Out crop sweater</Link>
                    </h5>
                    <p>Scelerisque duis aliquam qui lorem ipsum dolor amet, consectetur adipiscing elit.</p>
                    <div className="btn-left">
                      <Link href="#" className="btn-link fs-6 text-uppercase item-anchor text-decoration-none">Discover Now</Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="banner-item image-zoom-effect">
                  <div className="image-holder">
                    <Link href="#">
                      <Image 
                        src="/images/banner-image-5.jpg" 
                        alt="product" 
                        className="img-fluid" 
                        width={600} 
                        height={750}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </Link>
                  </div>
                  <div className="banner-content py-4">
                    <h5 className="element-title text-uppercase">
                      <Link href="/" className="item-anchor">Soft leather jackets</Link>
                    </h5>
                    <p>Scelerisque duis aliquam qui lorem ipsum dolor amet, consectetur adipiscing elit.</p>
                    <div className="btn-left">
                      <Link href="#" className="btn-link fs-6 text-uppercase item-anchor text-decoration-none">Discover Now</Link>
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
    </section>
  );
}
