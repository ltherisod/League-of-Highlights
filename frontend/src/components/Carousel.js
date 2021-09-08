import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import "swiper/swiper-bundle.css"
import "./Carousel.css"
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import videosActions from "../redux/actions/videosActions"
import ReactPlayer from "react-player"


SwiperCore.use([Navigation, Pagination])



const Carousel = (props) => {
  const [videos, setVideos] = useState([])

  useEffect(() => {

    const getVideos = async () => {
      const res = await props.getTopVideos()
      if(res.success){
        setVideos(res.response)
      } else {
        alert(res.error)//cambiar alert feo
      }
    }
    getVideos()
  },[])

    return (
      <div className="mainCarousel">
        <div className="carouselTitle">
          <p>TOP</p>
          <h2>HIGHLIGHTS</h2>
        </div>
        <div className="carouselBox" style={{backgroundImage: "url('https://i.postimg.cc/GmhKW85Z/fondo-Carousel.png')"}}>
            <Swiper className="carouselContainer"
            // install Swiper modules
            direction={"vertical"}
          //   modules={[Navigation, Pagination]}
          //   spaceBetween={50}
          //   slidesPerView={3}
          //   navigation
            pagination={{ clickable: true }}
          //   scrollbar={{ draggable: true }}
            
          >
            {videos.map((video) =>
            <SwiperSlide key={video._id}>
              <div className="topVideos">
                <h2>{video.owner.username}</h2>
                <div className="championCarousel" style={{backgroundImage: `url(${video.champion.image})`}}></div>
                <ReactPlayer url={video.url} className="videoUser" controls={true}/>
              </div>
            </SwiperSlide> )}
            
          </Swiper>
        </div>
      </div>

    )
}

const mapDispatchToProps = {
  getTopVideos: videosActions.getTopVideos
}

export default connect(null, mapDispatchToProps)(Carousel) 