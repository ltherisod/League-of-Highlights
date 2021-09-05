import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import "swiper/swiper-bundle.css"
import "./Carousel.css"


SwiperCore.use([Navigation, Pagination])



const Carousel = () => {
    return (
        <Swiper className="carouselContainer"
      // install Swiper modules
      direction={"vertical"}
    //   modules={[Navigation, Pagination]}
    //   spaceBetween={50}
    //   slidesPerView={3}
    //   navigation
      pagination={{ clickable: true }}
    //   scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 5</SwiperSlide>
      <SwiperSlide>Slide 6</SwiperSlide>
    </Swiper>

    )
}

export default Carousel