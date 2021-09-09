import Header from "../components/Header"
import Footer from "../components/Footer"
import ReactPlayer from "react-player"
import BackHome from "../components/BackHome";
import "./EsportsPage.css"
import "animate.css"

const EsportsPage = (props) => {
    return (
        <>
            <Header {...props}/>
            <div className="bodyBackground" style={{backgroundImage:"url('https://i.postimg.cc/4dGhW9qH/background-Violeta.png')"}}>
                <h2 className= "titleEsports animate__animated animate__fadeInUp">ESPORTS</h2>
                <div className="animate__animated animate__fadeInUp  videoContainer" style={{backgroundImage: "url('https://i.postimg.cc/vmmZW0Cc/nubescall.png')"}}>
                <ReactPlayer url='http://www.youtube.com/watch?v=avzfp6RQLYA' className="videoEsports" controls={true}/>
                <ReactPlayer url='http://www.youtube.com/watch?v=b1Qi_aHsZn0' className="videoEsports" controls={true}/>
                <ReactPlayer url='http://www.youtube.com/watch?v=53EjdlmdfNc' className="videoEsports" controls={true}/>
                <ReactPlayer url='http://www.youtube.com/watch?v=wdZ8fVVaL90' className="videoEsports" controls={true}/>
                <ReactPlayer url='http://www.youtube.com/watch?v=todFRrm9auU&t=1s' className="videoEsports" controls={true}/>
                <ReactPlayer url='http://www.youtube.com/watch?v=jnnolqQC1D0' className="videoEsports" controls={true}/>
                </div>
                <BackHome/>
            </div>
            
            <Footer/>
        </>
    )
}

export default EsportsPage