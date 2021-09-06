import "./Esports.css"
import Carousel from "react-bootstrap/Carousel"
import { NavLink } from "react-router-dom"

let rotations = [
    "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Fiora_0.jpg",
    "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gwen_0.jpg",
    "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg",
    "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kaisa_0.jpg",
    "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Seraphine_0.jpg",
    "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Nunu_0.jpg"
]

const Esports = () => {
    return (
        <div className="news">
            <div className="socialContent">
                <p>JOIN OUR SOCIAL NETWORKS |</p>
                <div className="socialBox">
                    <NavLink className="socialMediaHover" to="https://www.youtube.com/user/riotgamesinc">
                        <img className="socialMediaIcon" src="./assets/youtube.png"/>
                    </NavLink>
                    <NavLink className="socialMediaHover" to="https://twitter.com/leagueoflegends">
                        <img className="socialMediaIcon" src="./assets/twitter.png"/>
                    </NavLink>
                    <NavLink className="socialMediaHover" to="https://www.facebook.com/leagueoflegends">
                        <img className="socialMediaIcon" src="./assets/facebook.png"/>
                    </NavLink>
                    <NavLink className="socialMediaHover" to="https://www.instagram.com/leagueoflegends/">
                        <img className="socialMediaIcon" src="./assets/instagram.png"/>
                    </NavLink> 
                    <NavLink className="socialMediaHover" to="https://www.reddit.com/r/leagueoflegends/">
                        <img className="socialMediaIcon" src="./assets/reddit.png"/>
                    </NavLink> 
                </div>
            </div>
            <h2>News</h2>
            <div className="rotationsContainer">
                <Carousel className="rotationsCarousel">
                    {rotations.map((rotation, index) => {
                        return(
                            <Carousel.Item key={index}>
                            <div className="rotationImg" style={{backgroundImage: `url('${rotation}')`}}>    
                            </div>
                            <Carousel.Caption>
                            <h4 className="rotationTitle">titulo rotacion</h4>
                            </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })
                    }
                </Carousel> 
            </div>
        </div>
    )
}

export default Esports