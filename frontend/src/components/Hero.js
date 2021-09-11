import { Jumbotron } from 'reactstrap'
import "./Hero.css"

const Hero = () => {

  return (
    <>
        <video loop autoPlay muted className="video">
          <source src="/assets/heronew.mp4" type="video/mp4" />
          </video>
          <div className="contentVideo">
          <Jumbotron className='d-flex justify-content-center align-items-center'>
          <div className="glitch">
              {/* <img  src="https://i.postimg.cc/XqG8WMvg/LOHNEONNEGRO1.png" alt="LOH"/> */}
          </div>
        </Jumbotron>
      </div>
    </>
  )
}

export default Hero;
