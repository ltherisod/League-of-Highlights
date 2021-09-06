import { NavLink } from "react-router-dom"
import "./Footer.css"

const Footer = () => {
    return (
        <footer className="divFooter" style={{backgroundImage: "url('https://i.postimg.cc/zvCK05xy/footer2.png')"}}>
            <div className="footerBox">
                <div className="logo">
                    <img className="logoFooter" src="./assets/LOHWhite.png"/>
                </div>
                <div className="socialMedia">
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
                <div className="esrb">
                    <img src="./assets/esrb-teen.png"/>
                    <div>
                        <p>Blood</p>
                        <p>Fantasy violence</p>
                        <p>Moderate suggestive themes</p>
                        <p>se of alcohol and tobacco</p>
                        <p>Online interactions not classified by the ESRB</p>
                    </div>
                </div>
                <div className="copy">
                    <p> &copy; League of Highlights. All rights reserved. </p>
                </div>
            </div>
        </footer>
    )

}

export default Footer 