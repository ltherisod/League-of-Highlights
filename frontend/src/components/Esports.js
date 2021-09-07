import "./Esports.css"
import Carousel from "react-bootstrap/Carousel"
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import championsActions from "../redux/actions/championsActions"
import { useEffect, useState } from "react"

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
    }, [])
    
    //console.log([...rotations])

    if (!rotations) {
        return (
            <div className="preloader">
                <p>loading...</p>
            </div>
        )
    }
    

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
            <h2>ESPORTS</h2>
            <div className="rotationsContainer">
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
        </div>
    )
}

const mapDispatchToProps = {
    getChampions: championsActions.getChampionsRotation
}

export default connect(null, mapDispatchToProps)(Esports)