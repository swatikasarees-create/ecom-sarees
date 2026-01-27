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
          <h1 className="section-title text-center mt-4" data-aos="fade-up">Timeless Elegance in Every Drape</h1>
          <div className="col-md-6 text-center" data-aos="fade-up" data-aos-delay="300">
            <p>Discover the finest collection of traditional and contemporary sarees. From luxurious silk to elegant georgette, wedding to party wear, find your perfect six yards of grace at Swastika Sarees. Each saree is crafted with care to celebrate the beauty of Indian tradition.</p>
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
                  <div className="image-holder position-relative" style={{ height: '500px', overflow: 'hidden' }}>
                    <Link href="/sarees?type=designer">
                      <Image 
                        src="/images/banner-image-6.jpg" 
                        alt="Trending Designer Sarees Collection" 
                        fill
                        style={{ objectFit: 'contain' }}
                        priority
                      />
                    </Link>
                  </div>
                  <div className="banner-content py-4">
                    <h5 className="element-title text-uppercase">
                      <Link href="/sarees?type=designer" className="item-anchor">Trending Designer Sarees</Link>
                    </h5>
                    <p>Explore our exclusive designer collection featuring contemporary patterns and vibrant colors perfect for modern women.</p>
                    <div className="btn-left">
                      <Link href="/sarees?type=designer" className="btn-link fs-6 text-uppercase item-anchor text-decoration-none">Shop Now</Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="banner-item image-zoom-effect">
                  <div className="image-holder position-relative" style={{ height: '500px', overflow: 'hidden' }}>
                    <Link href="/sarees?type=silk">
                      <Image 
                        src="/images/banner-image-5.jpg" 
                        alt="Luxurious Silk Sarees" 
                        fill
                        style={{ objectFit: 'contain' }}
                        priority
                      />
                    </Link>
                  </div>
                  <div className="banner-content py-4">
                    <h5 className="element-title text-uppercase">
                      <Link href="/sarees?type=silk" className="item-anchor">Luxurious Silk Sarees</Link>
                    </h5>
                    <p>Experience the richness of pure silk sarees with intricate weaving and timeless elegance for every occasion.</p>
                    <div className="btn-left">
                      <Link href="/sarees?type=silk" className="btn-link fs-6 text-uppercase item-anchor text-decoration-none">Shop Now</Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="banner-item image-zoom-effect">
                  <div className="image-holder position-relative" style={{ height: '500px', overflow: 'hidden' }}>
                    <Link href="/sarees?type=wedding">
                      <Image 
                        src="/images/banner-image-4.jpg" 
                        alt="Bridal Wedding Sarees" 
                        fill
                        style={{ objectFit: 'contain' }}
                        priority
                      />
                    </Link>
                  </div>
                  <div className="banner-content py-4">
                    <h5 className="element-title text-uppercase">
                      <Link href="/sarees?type=wedding" className="item-anchor">Bridal Wedding Collection</Link>
                    </h5>
                    <p>Make your special day unforgettable with our exquisite wedding sarees adorned with intricate embroidery and rich fabrics.</p>
                    <div className="btn-left">
                      <Link href="/sarees?type=wedding" className="btn-link fs-6 text-uppercase item-anchor text-decoration-none">Shop Now</Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="banner-item image-zoom-effect">
                  <div className="image-holder position-relative" style={{ height: '500px', overflow: 'hidden' }}>
                    <Link href="/sarees?type=party">
                      <Image 
                        src="/images/banner-image-3.jpg" 
                        alt="Party Wear Sarees" 
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </Link>
                  </div>
                  <div className="banner-content py-4">
                    <h5 className="element-title text-uppercase">
                      <Link href="/sarees?type=party" className="item-anchor">Party Wear Elegance</Link>
                    </h5>
                    <p>Stand out at every celebration with our stunning party wear sarees featuring modern designs and glamorous appeal.</p>
                    <div className="btn-left">
                      <Link href="/sarees?type=party" className="btn-link fs-6 text-uppercase item-anchor text-decoration-none">Shop Now</Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="banner-item image-zoom-effect">
                  <div className="image-holder position-relative" style={{ height: '500px', overflow: 'hidden' }}>
                    <Link href="/sarees?type=georgette">
                      <Image 
                        src="/images/banner-image-2.jpg" 
                        alt="Georgette Sarees" 
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </Link>
                  </div>
                  <div className="banner-content py-4">
                    <h5 className="element-title text-uppercase">
                      <Link href="/sarees?type=georgette" className="item-anchor">Graceful Georgette Sarees</Link>
                    </h5>
                    <p>Discover lightweight and flowy georgette sarees perfect for both casual and festive occasions with effortless draping.</p>
                    <div className="btn-left">
                      <Link href="/sarees?type=georgette" className="btn-link fs-6 text-uppercase item-anchor text-decoration-none">Shop Now</Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="banner-item image-zoom-effect">
                  <div className="image-holder position-relative" style={{ height: '500px', overflow: 'hidden' }}>
                    <Link href="/sarees">
                      <Image 
                        src="/images/banner-image-1.jpg" 
                        alt="Premium Saree Collection" 
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </Link>
                  </div>
                  <div className="banner-content py-4">
                    <h5 className="element-title text-uppercase">
                      <Link href="/sarees" className="item-anchor">Premium Saree Collection</Link>
                    </h5>
                    <p>Browse our entire collection of premium sarees featuring traditional craftsmanship and contemporary designs.</p>
                    <div className="btn-left">
                      <Link href="/sarees" className="btn-link fs-6 text-uppercase item-anchor text-decoration-none">View All</Link>
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
