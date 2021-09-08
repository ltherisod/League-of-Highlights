import "./BackHome.css"
import { Link } from "react-router-dom"

const BackHome = () => {
    return (
        <div className="mainBackHome" style={{backgroundImage: "url('https://i.postimg.cc/3w3N43TT/backhome.png')"}}>
            <Link to="/"><button className="backHomeButton">BACK HOME!</button></Link>
            <div className="homeDriverButtom" style={{backgroundImage:"url('https://i.postimg.cc/brxv0gfM/divider.png')"}}></div>
        </div>
    )
}

export default BackHome