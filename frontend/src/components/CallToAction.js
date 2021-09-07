import "./CallToAction.css"
import { Link } from "react-router-dom"

const CallToAction = () => {
    return (
        <div className="mainCallToAction" style={{backgroundImage: "url('https://i.postimg.cc/vmmZW0Cc/nubescall.png')"}}>
            <Link to="/esports"><button className="buttonCall">PRO VIEWS</button></Link>
            <img className="rock" src="https://i.postimg.cc/HWb8Whmg/piedra.png"/>
        </div>
    )
}

export default CallToAction