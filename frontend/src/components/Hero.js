import { Jumbotron } from 'reactstrap'
import "./Hero.css"

const Hero = () => {
  return (
    <>
        <video loop autoPlay muted className="video">
          <source src="/assets/videoplayback.mp4" type="video/mp4" />
          </video>
          <div className="contentVideo">
          <Jumbotron className='d-flex justify-content-center align-items-center flex-column'>
          <div className="heroTitle">
            <img  src="./assets/LOHNEONNEGRO.png" alt="LOH"/>
          </div>
        </Jumbotron>
      </div>
    </>
  )
}

export default Hero;
