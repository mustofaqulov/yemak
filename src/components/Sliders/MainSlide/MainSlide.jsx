import 'swiper/css/pagination';
import './mySwiper.css';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import Banner1 from '../../../assets/images/Banner-1.jpg';
import Banner2 from '../../../assets/images/Banner-2.jpg';
import Banner3 from '../../../assets/images/Banner-3.jpg';
import Banner4 from '../../../assets/images/Banner-4.jpg';
import Banner5 from '../../../assets/images/Banner-5.jpg';
import Banner6 from '../../../assets/images/Banner-6.jpg';

export default function MainSlide() {
  let bannerImg = [Banner1, Banner2, Banner3, Banner4, Banner5, Banner6];
  return (
    <div className="relative w-full">
      <Swiper
        centeredSlides={true}
        slidesPerView={4}
        loop={true}
        navigation={true}
        spaceBetween={'20px'}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {bannerImg.map((img, ind) => {
          return (
            <SwiperSlide key={ind}>
              <img src={img} className="swiper-image" />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="absolute inset-0 z-10 bg-custom-gradient pointer-events-none"></div>
    </div>
  );
}
