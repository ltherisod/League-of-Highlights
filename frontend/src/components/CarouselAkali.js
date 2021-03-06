import "./CarouselAkali.css"
import Carousel from "react-bootstrap/Carousel"

const CarouselAkali = () => {
    return (
        <div className="mainAkali" style={{backgroundImage:"url('https://i.postimg.cc/V6RbWKFT/fondo-Akali.png')"}}>
            <div className="diamond" style={{backgroundImage:"url('https://i.postimg.cc/zv3qmJx7/Artboard-1.png')"}}>
                <Carousel className="akaliCarousel carousel-fade">
                    <Carousel.Item>
                    <div className="akaliImg" style={{backgroundImage: `url('https://i.postimg.cc/6p57pjrS/Mesa-de-trabajo-1.png')`}}>    
                    </div>
                    </Carousel.Item>
                    <Carousel.Item>
                    <div className="akaliImg" style={{backgroundImage: `url('https://i.postimg.cc/CLKLqVVS/Mesa-de-trabajo-2.png')`}}>    
                    </div>
                    </Carousel.Item>
                    <Carousel.Item>
                    <div className="akaliImg" style={{backgroundImage: `url('https://i.postimg.cc/htkS6zQt/Mesa-de-trabajo-3.png')`}}>    
                    </div>
                    </Carousel.Item>
                    <Carousel.Item>
                    <div className="akaliImg" style={{backgroundImage: `url('https://i.postimg.cc/d1vJQbBM/Mesa-de-trabajo-4.png')`}}>    
                    </div>
                    </Carousel.Item>
                </Carousel> 
            </div>
        </div>
    )
}

export default CarouselAkali