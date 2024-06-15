import 'swiper/css/pagination';

import './mySwiper.css';
import 'swiper/css';

import { Swiper, SwiperSlide } from 'swiper/react';

//images
import Banner1 from '../../../assets/images/Banner-1.jpg';
import Banner2 from '../../../assets/images/Banner-2.jpg';
import Banner3 from '../../../assets/images/Banner-3.jpg';
import Banner4 from '../../../assets/images/Banner-4.jpg';
import Banner5 from '../../../assets/images/Banner-5.jpg';

export default function MainSlide() {
  let bannerImg = [Banner1, Banner2, Banner3, Banner4, Banner5];
  return (
    <Swiper slidesPerView={4} loop={true} navigation={true} className="mySwiper">
      {bannerImg.map((img, ind) => {
        return (
          <SwiperSlide key={ind}>
            <img src={img} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
