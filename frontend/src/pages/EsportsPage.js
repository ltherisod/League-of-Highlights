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
            <div className="bodyBackground" style={{backgroundImage:"url('https://i.postimg.cc/fyFKsXCW/pruebadifuminada.png')"}}>
                <div className="esportsBox">
                    <div className= "titleEsports animate__animated animate__fadeInUp" style={{backgroundImage:"url('https://i.postimg.cc/T2qTbmct/ESPORTS.png')"}}></div>
                </div>
                <div className="animate__animated animate__fadeInUp  videoContainer" style={{backgroundImage: "url('https://i.postimg.cc/vmmZW0Cc/nubescall.png')"}}>
                <ReactPlayer url='http://www.youtube.com/watch?v=avzfp6RQLYA' className="videoEsports" controls={true}/>
                <ReactPlayer url='http://www.youtube.com/watch?v=b1Qi_aHsZn0' className="videoEsports" controls={true}/>
                <ReactPlayer url='http://www.youtube.com/watch?v=53EjdlmdfNc' className="videoEsports" controls={true}/>
                <ReactPlayer url='http://www.youtube.com/watch?v=wdZ8fVVaL90' className="videoEsports" controls={true}/>
                <ReactPlayer url='http://www.youtube.com/watch?v=todFRrm9auU&t=1s' className="videoEsports" controls={true}/>
                <ReactPlayer url='http://www.youtube.com/watch?v=jnnolqQC1D0' className="videoEsports" controls={true}/>
                </div>
                <div className="mainBackHome" style={{backgroundImage: "url('https://i.postimg.cc/L5mGj4Tz/back-To-Home.png')"}}>
                    <BackHome/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default EsportsPage