'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      text: 'More than expected crazy soft, flexible and best fitted white simple denim shirt.',
      author: 'casual way',
    },
    {
      id: 2,
      text: 'Best fitted white denim shirt more than expected crazy soft, flexible',
      author: 'uptop',
    },
    {
      id: 3,
      text: 'Best fitted white denim shirt more white denim than expected flexible crazy soft.',
      author: 'Denim craze',
    },
    {
      id: 4,
      text: 'Best fitted white denim shirt more than expected crazy soft, flexible',
      author: 'uptop',
    },
  ];

  return (
    <section className="testimonials py-5 bg-light">
      <div className="section-header text-center mt-5">
        <h3 className="section-title">WE LOVE GOOD COMPLIMENT</h3>
      </div>
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ 
          clickable: true,
          el: '.testimonial-swiper-pagination'
        }}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="testimonial-swiper overflow-hidden my-5"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="testimonial-item text-center">
              <blockquote>
                <p>&quot;{testimonial.text}&quot;</p>
                <div className="review-title text-uppercase">{testimonial.author}</div>
              </blockquote>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="testimonial-swiper-pagination d-flex justify-content-center mb-5"></div>
    </section>
  );
}
