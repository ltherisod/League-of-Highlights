import "./Hero.css"
import "animate.css"

const Hero = () => {

  return (
    <>
        <video loop autoPlay muted className="video">
          <source src="/assets/heronew.mp4" type="video/mp4" />
          </video>
          <div className="contentVideo">
          {/* <div className='glicthBox'> */}
            <div className="animate__animated animate__fadeInUp animate__slower glitch">
                <img  src="https://i.postimg.cc/wj6dZ55f/LOHglitch.png" alt="LOH"/>
            </div>
          {/* </div> */}
      </div>
    </>
  )
}

export default Hero;
