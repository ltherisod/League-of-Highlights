import "./Footer.css"

const Footer = () => {
  return (
    <footer
      className="divFooter"
      style={{
        backgroundImage: "url('https://i.postimg.cc/zvCK05xy/footer2.png')",
      }}
    >
      <div className="footerBox">
        <div className="logo">
          <img
            className="logoFooter "
            alt="footer logo"
            src="/assets/LOHWhite.png"
          />
        </div>
        <div className="socialMedia">
          <a
            className="socialMediaHover"
            href="https://www.youtube.com/user/riotgamesinc"
          >
            <img
              className="socialMediaIcon"
              alt="youtube logo"
              src="/assets/youtube.png"
            />
          </a>
          <a
            className="socialMediaHover"
            href="https://twitter.com/leagueoflegends"
          >
            <img
              className="socialMediaIcon"
              alt="twitter logo"
              src="/assets/twitter.png"
            />
          </a>
          <a
            className="socialMediaHover"
            href="https://www.facebook.com/leagueoflegends"
          >
            <img
              className="socialMediaIcon"
              alt="facebook logo"
              src="/assets/facebook.png"
            />
          </a>
          <a
            className="socialMediaHover"
            href="https://www.instagram.com/leagueoflegends/"
          >
            <img
              className="socialMediaIcon"
              alt="instagram logo"
              src="/assets/instagram.png"
            />
          </a>
          <a
            className="socialMediaHover"
            href="https://www.reddit.com/r/leagueoflegends/"
          >
            <img
              className="socialMediaIcon"
              alt="reddit logo"
              src="/assets/reddit.png"
            />
          </a>
        </div>
        <div className="esrb">
          <img alt="no se que logo" src="/assets/esrb-teen.png"/>
          <div className='esrbText'>
            <p>Blood</p>
            <p>Fantasy violence</p>
            <p>Moderate suggestive themes</p>
            <p>Use of alcohol and tobacco</p>
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
