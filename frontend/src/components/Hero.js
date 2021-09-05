import { Jumbotron, Button } from 'reactstrap'
import "./Hero.css"

const Hero = () => {
  return (
    <>
      
        <video loop autoPlay muted className="video">
          <source src="/assets/video.mp4" type="video/mp4" />
          </video> 
          <div className="contentVideo">
          <Jumbotron className='d-flex justify-content-center align-items-center flex-column'>
          <h1 className="display-3 text-warning fw-bold my-3">League Of Highlights</h1>
          <p className="lead text-white">
            <Button color="primary">Community</Button>
          </p>
        </Jumbotron>
      </div>
    </>
  )
}

export default Hero;
