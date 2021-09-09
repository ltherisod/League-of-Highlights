import "./BackHome.css"
import { Link } from "react-router-dom"

const BackHome = () => {
    return (
        <>
            <Link to="/"><button className="backHomeButton">BACK HOME!</button></Link>
            <div className="homeDriverButtom" style={{backgroundImage:"url('https://i.postimg.cc/brxv0gfM/divider.png')"}}></div>
        </>
    )
}

export default BackHome