import BackHome from "../components/BackHome"
import "./Error.css"
import {useEffect} from "react"

const Error = () =>{
    const toTop = () => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        })
      }

useEffect(() => {
    toTop()
}, [])

    return(
        <div className="errorAmumu" style = {{backgroundImage: "url('https://i.postimg.cc/PqDbK4H1/amumulost.jpg')"}}>
            <h2 className="errorTitle">Error 404!</h2>
            <div className="errorText">
                <p>Something went wrong!</p>
                <p>Please Help Amumu go back home!</p>
            </div>
            <BackHome/>
        </div>
    )
}

export default Error