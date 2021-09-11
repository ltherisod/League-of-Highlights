import "./CallToAction.css"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import Aos from "aos"
import "aos/dist/aos.css"

const CallToAction = () => {

    useEffect(() => {
        Aos.init({ duration: 1500 })
      }, [])

    return (
        <div className="mainCallToAction" style={{backgroundImage: "url('https://i.postimg.cc/vmmZW0Cc/nubescall.png')"}}>
            {/* <ReactPlayer url='https://www.youtube.com/watch?v=SQjxq7r4R1s' className="videoCallToAction" playing={true} loop={true} volume={0} muted={true} controls={false}/> */}
                <div className="callImage" data-aos="flip-down"  style={{backgroundImage:"url('https://i.postimg.cc/jSmqs2bf/call-Image.png')"}}>
                    <Link to="/esports"><button className="buttonCall">PRO VIEWS</button></Link>
                </div>
                {/* <img className="rock" src="https://i.postimg.cc/HWb8Whmg/piedra.png" alt=""/> */}
        </div>
    )
}

export default CallToAction