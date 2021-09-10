import BackHome from "../components/BackHome"
import "./Error.css"
const Error = () =>{
    return(
        <div className="errorAmumu" style = {{backgroundImage: "url('https://i.postimg.cc/PqDbK4H1/amumulost.jpg')"}}>
            <div className="errorTitle">
                <h2 className="errorTitle">Error 404!</h2>
                <p>I'm lost! Let's go back to home</p>
            </div>
            <BackHome/>
        </div>
    )
}

export default Error