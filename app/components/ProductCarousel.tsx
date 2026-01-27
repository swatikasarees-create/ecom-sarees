'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

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
  return (
    <section id={sectionId} className="product-carousel py-5 position-relative overflow-hidden">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-5 mb-3">
          <h4 className="text-uppercase">{title}</h4>
          <Link href="/sarees" className="btn-link">View All Products</Link>
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
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="product-item image-zoom-effect link-effect">
                  <div className="image-holder position-relative" style={{ height: '450px', overflow: 'hidden' }}>
                    <Link href="/sarees">
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        className="product-image" 
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </Link>
                    <Link href="/sarees" className="btn-icon btn-wishlist">
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <use xlinkHref="#heart"></use>
                      </svg>
                    </Link>
                    <div className="product-content">
                      <h5 className="text-uppercase fs-5 mt-3">
                        <Link href="/sarees">{product.name}</Link>
                      </h5>
                      <Link href="/sarees" className="text-decoration-none" data-after="Add to cart">
                        <span>{product.price}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
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
