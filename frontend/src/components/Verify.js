import "./Verify.css"
import { Link } from "react-router-dom"

const Verify = () => {
    return (
        <div className="verifyBox">
            <img className="verifyImg" src="https://i.postimg.cc/K8ByHZHN/gnar.png"/>
            <p className="verifyP">Please verify your account to upload a video.</p>
            <Link className="verifyLink" to="/settings">Click here!</Link> 
        </div>
    )
}

export default Verify