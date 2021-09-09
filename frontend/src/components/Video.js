import videosActions from "../redux/actions/videosActions"
import ReactPlayer from "react-player"
import Comments from "../components/Comments"
import { connect } from "react-redux"

const Video = (props) => {
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
            <button
              onClick={() => props.toggleLike(props.video._id, props.user._id)}
            >
              {props.video.likes.includes(props.user._id) ? "Dislike" : "Like"}
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
      <div className="videoInfo">
        <div className="likeReport">
          {/* <img src={star}/> */}
          {props.video.likes.length}
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
