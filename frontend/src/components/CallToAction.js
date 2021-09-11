import "./CallToAction.css"
import { Link } from "react-router-dom"

const CallToAction = () => {
    return (
        <div className="mainCallToAction" style={{backgroundImage: "url('https://i.postimg.cc/vmmZW0Cc/nubescall.png')"}}>
                <div className="callImage" style={{backgroundImage:"url('https://i.postimg.cc/jSmqs2bf/call-Image.png')"}}>
                    <Link to="/esports"><button className="buttonCall">PRO VIEWS</button></Link>
                </div>
        </div>
    )
}

export default CallToAction