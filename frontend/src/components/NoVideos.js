import "./NoVideos.css"
import Aos from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"

const NoVideos = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 })
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    return (
        <div className="NovideosBox" data-aos="fade-up" data-aos-duration="3000">
            <p>Oh... It seems that there are not videos for us yet!</p>
            <img className="imgNoVideos" src="https://i.postimg.cc/kXP5TyZW/amumuhalloween.png" alt=""/>
        </div>
    )
}

export default NoVideos