import { Swiper, SwiperSlide, } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Card from "@components/movieCard";

import "swiper/css";
import 'swiper/css/navigation';
import "./carousel.css";


function Carousel(props: any) {
  return (
    <Swiper
      effect={"coverflow"}
      className="swiper"
      modules={[Autoplay, Navigation]}
      autoplay={{ delay: props.delay, reverseDirection: props.reverse }}
      navigation={true}
      spaceBetween={20}
      breakpoints={{
        500: { slidesPerView: 1 },
        768: { slidesPerView: 3 },
        1200: { slidesPerView: 5 },
      }}>
      {
        props.list && props.list.length > 0 && props.list.map((item: any, index: number) => {
          return (
            <SwiperSlide key={`carousel-${index}`} >
              <Card
                item={item}
              ></Card>
            </SwiperSlide>
          );
        })
      }
    </Swiper >
  );
}

export default Carousel;
