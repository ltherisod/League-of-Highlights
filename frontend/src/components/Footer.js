import "./Footer.css"

const Footer = () => {
    return (
        <footer>
            <div className="logo">
                <p>LOGO</p>
            </div>
            <p> &copy; League of Highlights. All rights reserved. </p>
            <div className="socialMedia">
                <div className="socialMediaIcon">  
                    <a href="https://www.youtube.com/user/riotgamesinc"
                    target="_blank"
                    rel="noreferrer"
                    >yt</a>
                </div>
                <div className="socialMediaIcon">  
                    <a href="https://twitter.com/leagueoflegends"
                    target="_blank"
                    rel="noreferrer"
                    >tw</a>
                </div>
                <div className="socialMediaIcon">  
                    <a href="https://www.facebook.com/leagueoflegends"
                    target="_blank"
                    rel="noreferrer"
                    >fb</a>
                </div>
                <div className="socialMediaIcon">  
                    <a href="https://www.instagram.com/leagueoflegends/"
                    target="_blank"
                    rel="noreferrer"
                    >ig</a>
                </div>
                <div className="socialMediaIcon">  
                    <a href="https://www.reddit.com/r/leagueoflegends/"
                    target="_blank"
                    rel="noreferrer"
                    >rd</a>
                </div>
            </div>
        </footer>
    )

}

export default Footer 