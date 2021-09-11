import "./CallToAction.css"
import { Link } from "react-router-dom"
import ReactPlayer from "react-player"

const CallToAction = () => {
    return (
        <div className="mainCallToAction" style={{backgroundImage: "url('https://i.postimg.cc/vmmZW0Cc/nubescall.png')"}}>
            {/* <ReactPlayer url='https://www.youtube.com/watch?v=SQjxq7r4R1s' className="videoCallToAction" playing={true} loop={true} volume={0} muted={true} controls={false}/> */}
                <div className="callImage" style={{backgroundImage:"url('https://i.postimg.cc/jSmqs2bf/call-Image.png')"}}>
                    <Link to="/esports"><button className="buttonCall">PRO VIEWS</button></Link>
                </div>
                {/* <img className="rock" src="https://i.postimg.cc/HWb8Whmg/piedra.png" alt=""/> */}
        </div>
    )
}

export default CallToAction