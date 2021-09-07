import Header from "../components/Header"
import Footer from "../components/Footer"
import ReactPlayer from "react-player"
import "./EsportsPage.css"

const EsportsPage = () => {
    return (
        <>
            <Header/>
            <div className="bodyBackground" style={{backgroundImage:"url('https://i.postimg.cc/4dGhW9qH/background-Violeta.png')"}}>
                <h1>ESPORTS</h1>
                <div className="videoContainer">
                <ReactPlayer url='http://www.youtube.com/watch?v=avzfp6RQLYA' className="videoEsports" controls={true}/>
                <ReactPlayer url='http://www.youtube.com/watch?v=b1Qi_aHsZn0' className="videoEsports" controls={true}/>
                <ReactPlayer url='http://www.youtube.com/watch?v=53EjdlmdfNc' className="videoEsports" controls={true}/>
                <ReactPlayer url='http://www.youtube.com/watch?v=wdZ8fVVaL90' className="videoEsports" controls={true}/>
                <ReactPlayer url='http://www.youtube.com/watch?v=todFRrm9auU&t=1s' className="videoEsports" controls={true}/>
                <ReactPlayer url='http://www.youtube.com/watch?v=jnnolqQC1D0' className="videoEsports" controls={true}/>
                </div>
            </div>
            
            <Footer/>
        </>
    )
}

export default EsportsPage