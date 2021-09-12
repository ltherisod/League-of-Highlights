import "./Verify.css"
import { Link } from "react-router-dom"
import Aos from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"

const Verify = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 })
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    return (
        <div className="verifyBox" data-aos="fade-up" data-aos-duration="3000">
            <img className="verifyImg" src="https://i.postimg.cc/K8ByHZHN/gnar.png"/>
            <p className="verifyP">Please verify your account to upload a video.</p>
            <Link className="verifyLink" to="/settings">Click here!</Link> 
        </div>
    )
}

export default Verify