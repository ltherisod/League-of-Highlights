import { Jumbotron, Button } from 'reactstrap';
import ReactPlayer from 'react-player/youtube'

const Hero = () => {
  return (
    <>
      <div>
        {/* <video id="video" styles={{ backgroundImage:'url(https://www.youtube.com/watch?v=BTkl7budS2M)'}} autoPlay muted loop></video> */}

        {/* <video loop autoPlay muted>
          <source src="https://www.youtube.com/watch?v=BTkl7budS2M" type="video/mp4" />
          </video>  */}
       <ReactPlayer
              className="position-relative"
              url="https://www.youtube.com/watch?v=BTkl7budS2M"
              loop={true}
              playing={true}
              width='100%'
              sandbox="allow-scripts"
            />
 <Jumbotron>
        <h1 className="display-3">Hello, world!</h1>
        <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr className="my-2" />
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <p className="lead">
          <Button color="primary">Learn More</Button>
        </p>
      </Jumbotron>
      </div>
    </>
  );
};

export default Hero;
