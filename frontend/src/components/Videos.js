import "./Videos.css"
import ReactPlayer from "react-player"

const Videos = () => {
    return (
        <>
            <div className="usersVideos">
                <div className="videoContent">
                    <div className="videoUser">
                        <h4>:Title</h4>
                        {/* <div className="videoUser"> */}
                        <ReactPlayer url='https://www.youtube.com/watch?v=7qEmVvqjKiQ' className="video" controls={true}/>
                        {/* </div> */}
                    </div>
                    <div className="videoInfo">
                        <p>:hasthaghs</p>
                        <div className="likeReport">
                            {/* <img src={star}/> */}
                            estrellita
                            <button>Report</button>
                        </div>
                        <div className="comments">
                            hola hola
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Videos