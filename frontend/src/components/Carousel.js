import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation, Pagination } from "swiper"
import "swiper/swiper-bundle.css"
import "./Carousel.css"
import { connect } from "react-redux"
import { useEffect, useState } from "react"
import videosActions from "../redux/actions/videosActions"
import ReactPlayer from "react-player"
import toast from 'react-hot-toast'

SwiperCore.use([Navigation, Pagination])

const Carousel = (props) => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const getVideos = async () => {
      const res = await props.getTopVideos()
      if (res.success) {
        setVideos(res.response)
      } else {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } bg-black flex`}
            style={{ display: "flex", alignContent: "center", alignItems: "center", padding: "5px 10px", borderRadius: "35px"}}
          >
            <img style={{ width: "60px", height: "60px"}}
              className="h-4 w-4 rounded-full"
              src="https://i.postimg.cc/mrHj3y29/success2.png"
              alt=""
            />
            <p className="text-sm font-medium text-white" style={{marginBottom: 0,}}>
              {res.error}
            </p>
          </div>
        ))
      }
    }
    getVideos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

    return (
      <div className="mainCarousel" style={{backgroundImage:"url('https://i.postimg.cc/jqv6g9y6/difuminadonegro.png')"}}>
          {/* <p className='topTitle'>TOP</p>
          <h2 className='titleCarouselHome'>HIGHLIGHTS</h2> */}
          <div className="boxTitleCarousel">
              <div className="carouselTitle" style={{backgroundImage:"url('https://i.postimg.cc/nLx9RsFh/highlights.png')"}}></div>
              <div className="dividerButtomCarousel" style={{backgroundImage:"url('https://i.postimg.cc/brxv0gfM/divider.png')"}}></div>
          </div>
        <div className="carouselBox" style={{backgroundImage: "url('https://i.postimg.cc/FKvnT7Zd/fondo-Carousel2.png')"}}>
            <Swiper className="carouselContainer"
            // install Swiper modules
            direction={"vertical"}
          //   modules={[Navigation, Pagination]}
          //   spaceBetween={50}
          //   slidesPerView={3}
          //   navigation
          pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
        >
          {videos.map((video) => (
            <SwiperSlide key={video._id}>
              <div className="topVideos">
                <div
                  className="championCarousel"
                  style={{ backgroundImage: `url(${video.champion.image})` }}
                >
                  <div className="userBox">
                    <p className="usernameTopVideo">{video.owner.username}</p>
                  </div>
                  <ReactPlayer
                    width="360px"
                    height="250px"
                    url={video.url}
                    className="videoUser"
                    playing={true}
                    loop={true}
                    volume={0}
                    muted={true}
                    controls={false}
                    origin={"https://leagueofhighlights.herokuapp.com"}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  getTopVideos: videosActions.getTopVideos,
}

export default connect(null, mapDispatchToProps)(Carousel)
