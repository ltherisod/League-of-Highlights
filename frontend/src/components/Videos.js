import "./Videos.css"
import ReactPlayer from "react-player"
import videosActions from "../redux/actions/videosActions"

const Videos = () => {
    console.log(userId)

    return (
        <>
            <div className="usersVideos">
                <div className="videoContent">
                    <div className="contentVideoUser">
                        <h4>:Title</h4>
                        {/* <div className="videoUser"> */}
                        <ReactPlayer url='https://www.youtube.com/watch?v=7qEmVvqjKiQ' className="videoUser" controls={true}/>
                        {/* </div> */}
                    </div>
                    <div className="videoInfo">
                        <p>:hasthaghs</p>
                        <div className="likeReport">
                            {/* <img src={star}/> */}
                            estrellita
                            <button>Report</button>
                        </div>
                    </div>
                    <div className="comments">
                        hola hola
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.user.user
    }
}

const mapDispatchToProps = {
    getUserVideos: videosActions.getUserVideos
}

export default connect(mapStateToProps, mapDispatchToProps)(Videos) 