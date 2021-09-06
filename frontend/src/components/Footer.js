import { NavLink } from "react-router-dom"
import "./Footer.css"

const Footer = () => {
    return (
        <footer className="divFooter" style={{backgroundImage: "url('https://i.postimg.cc/R0Mn1bWd/footerok.png')"}}>
            <div className="footerBox">
                <div className="logo">
                    <img className="logoFooter" src="./assets/LOHWhite.png"/>
                </div>
                <div className="socialMedia">
                    <NavLink to="https://www.youtube.com/user/riotgamesinc">
                        <img className="socialMediaIcon" src="./assets/youtube.png"/>
                    </NavLink>
                    <NavLink to="https://twitter.com/leagueoflegends">
                        <img className="socialMediaIcon" src="./assets/twitter.png"/>
                    </NavLink>
                    <NavLink to="https://www.facebook.com/leagueoflegends">
                        <img className="socialMediaIcon" src="./assets/facebook.png"/>
                    </NavLink>
                    <NavLink to="https://www.instagram.com/leagueoflegends/">
                        <img className="socialMediaIcon" src="./assets/instagram.png"/>
                    </NavLink> 
                    <NavLink to="https://www.reddit.com/r/leagueoflegends/">
                        <img className="socialMediaIcon" src="./assets/reddit.png"/>
                    </NavLink> 
                </div>
            </div>
                <p> &copy; League of Highlights. All rights reserved. </p>
        </footer>
    )

}

export default Footer 