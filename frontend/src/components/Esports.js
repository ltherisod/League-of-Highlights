import "./Esports.css"
import Carousel from "react-bootstrap/Carousel"
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import championsActions from "../redux/actions/championsActions"
import { useEffect, useState } from "react"
import "animate.css"

const Esports = (props) => {
    const [rotations, setRotations] = useState([])
    
    useEffect(() => {
        const fetchRotations = async () => {
            try {
                const response = await props.getChampions()
                setRotations(response.response)
            } catch (e) {
                console.log(e)
            }
        }
        fetchRotations()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!rotations) {
        return (
            <div className="preloader">
                <p>loading...</p>
            </div>
        )
    }
    
    return (
        <div className="news" >
            <div className="socialContent">
                <p>JOIN OUR SOCIAL NETWORKS |</p>
                <div className="socialBox">
                    <a className="socialMediaHover" href="https://www.youtube.com/user/riotgamesinc" target="_blank">
                        <img className="socialMediaIcon" src="./assets/youtube.png" alt=""/>
                    </a>
                    <a className="socialMediaHover" href="https://twitter.com/leagueoflegends" target="_blank">
                        <img className="socialMediaIcon" src="./assets/twitter.png" alt=""/>
                    </a>
                    <a className="socialMediaHover" href="https://www.facebook.com/leagueoflegends" target="_blank">
                        <img className="socialMediaIcon" src="./assets/facebook.png" alt=""/>
                    </a>
                    <a className="socialMediaHover" href="https://www.instagram.com/leagueoflegends/" target="_blank">
                        <img className="socialMediaIcon" src="./assets/instagram.png" alt=""/>
                    </a> 
                    <a className="socialMediaHover" href="https://www.reddit.com/r/leagueoflegends/" target="_blank">
                        <img className="socialMediaIcon" src="./assets/reddit.png" alt=""/>
                    </a> 
                </div>
            </div>
            <div className="titleRotation" style={{backgroundImage:"url('https://i.postimg.cc/6p2q1Gg5/champions-Rotation.png')"}}></div>
            <div className="dividerTop" style={{backgroundImage:"url('https://i.postimg.cc/wMgzzdnf/dividertop.png')"}}></div>
            <div className="rotationsContainer">
                <div className="carouselBorder" style={{backgroundImage:"url('https://i.postimg.cc/9MZDQC0y/marcovideo.png')"}}></div>
                <Carousel className="rotationsCarousel">
                    {rotations.map((rotation, index) => {
                        return(
                            <Carousel.Item key={index}>
                            <div className="rotationImg" style={{backgroundImage: `url('${rotation.background}')`}}>    
                            </div>
                            </Carousel.Item>
                        )
                    })
                    }
                </Carousel> 
            </div>
            <div className="dividerButtom" style={{backgroundImage:"url('https://i.postimg.cc/brxv0gfM/divider.png')"}}></div>
        </div>
    )
}

const mapDispatchToProps = {
    getChampions: championsActions.getChampionsRotation
}

export default connect(null, mapDispatchToProps)(Esports)