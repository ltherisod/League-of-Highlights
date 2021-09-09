import videosActions from "../redux/actions/videosActions"
import ReactPlayer from "react-player"
import Comments from "../components/Comments"
import { connect } from "react-redux"

const Video = (props) => {
  return (
    <div className="videoContent">
      <div className="contentVideoUser">
        <h4>:Title</h4>
        {/* <div className="videoUser"> */}
        <ReactPlayer
          url="https://www.youtube.com/watch?v=7qEmVvqjKiQ"
          className="videoUser"
          controls={true}
        />
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
        <Comments />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  }
}

const mapDispatchToProps = {
  addVideo: videosActions.addVideo,
  deleteVideo: videosActions.deleteVideo,
  updateVideo: videosActions.updateVideo,
  toggleLike: videosActions.toggleLike,
}

export default connect(mapStateToProps, mapDispatchToProps)(Video)
