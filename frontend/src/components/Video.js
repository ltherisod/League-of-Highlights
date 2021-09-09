import videosActions from "../redux/actions/videosActions"
import ReactPlayer from "react-player"
import Comments from "../components/Comments"
import { connect } from "react-redux"
import ReportForm from "./ReportForm"
import { useState } from "react"
import "./Videos.css"

const Video = (props) => {
  const [showReport, setShowReport] = useState(false)
  const deleteHandler = async () => {
    // Pedir confirmación
    const res = await props.deleteVideo(
      props.video._id,
      localStorage.getItem("token")
    )
    if (res.success) {
      console.log("Video eliminado.")
      return false
    }
    alert("No pudimos eliminar el video.")
  }

  const updateHandler = async () => {}

  const reportHandler = async () => {
    setShowReport(!showReport)
  }

  let star = props.video.likes.includes(props.user._id) ? "/assets/star_fill.svg" : "/assets/star.svg"
  return (
    <div className="videoContent">
      <div className="contentVideoUser">
        <h4>{props.video.title}</h4>
        {props.video.owner === props.user._id && (
          <>
            <button type="button" onClick={deleteHandler}>
              Delete
            </button>
            <button type="button" onClick={updateHandler}>
              Update
            </button>
          </>
        )}
        <ReactPlayer
          url={props.video.url}
          className="videoUser"
          controls={true}
        />
        {/* </div> */}
      </div>
      <div className="likeReport">
        <div className="videolikes">
          <img src={star}  onClick={() => props.toggleLike(props.video._id, props.user._id)}/>
          {props.video.likes.length}
        </div>
        <button onClick={reportHandler}>Report</button>
        {showReport ? <ReportForm /> : null}
      </div>
      <div className="comments">
        <Comments video={props.video} />
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
