import videosActions from "../redux/actions/videosActions"
import ReactPlayer from "react-player"
import Comments from "../components/Comments"
import { connect } from "react-redux"
import ReportForm from "./ReportForm"
import { useState } from "react"
import "./Videos.css"
import { FiAlertTriangle, FiTrash2 } from "react-icons/fi"
import toast from "react-hot-toast"

const Video = (props) => {
  const [showReport, setShowReport] = useState(false)
  const deleteHandler = async () => {
    // Pedir confirmación
    const res = await props.deleteVideo(
      props.video._id,
      localStorage.getItem("token")
    )
    if (res.success) {
      return (
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } bg-black flex`}
            style={{ display: "flex", alignContent: "center", alignItems: "center", padding: "5px 10px", borderRadius: "35px"}}
          >
            <img style={{ width: "60px", height: "60px"}}
              className="h-4 w-4 rounded-full"
              src="https://i.postimg.cc/Y2JPJ0TM/success.png"
              alt=""
            />
            <p className="text-sm font-medium text-white" style={{marginBottom: 0,}}>
              Video deleted!
            </p>
          </div>
        ))
      )
    }
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } bg-black flex`}
        style={{ display: "flex", alignContent: "center", alignItems: "center", padding: "5px 10px", borderRadius: "35px"}}
      >
        <img style={{ width: "60px", height: "60px"}}
          className="h-4 w-4 rounded-full"
          src="https://i.postimg.cc/g2dLtyDR/logOut.png"
          alt=""
        />
        <p className="text-sm font-medium text-white" style={{marginBottom: 0,}}>
          We couldn't delete the video
        </p>
      </div>
    ))
  }

  const confirm = () => {
    return (
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } bg-black flex`}
          style={{ display: "flex", alignContent: "center", alignItems: "center", padding: "15px 20px", borderRadius: "35px"}}
        >
          <p className="text-sm font-medium text-white" style={{marginBottom: 0,}}>
            Delete video? 
          </p>
          <button onClick={deleteHandler} style={{backgroundColor: "rgb(189, 151, 81)",  color: "white", padding: "5px", margin: "2px"}}>
            Yes
          </button>
          <button onClick={() => toast.dismiss(t.id)} style={{backgroundColor: "rgb(189, 151, 81)",  color: "white", padding: "5px", margin: "2px"}}>
            No
          </button>
        </div>
      ))
      
    )
    }

  const reportHandler = async () => {
    setShowReport(!showReport)
  }

  let star = props.video.likes.includes(props.user._id)
    ? "/assets/star_fill.svg"
    : "/assets/star.svg"

  return (
    // <div className="videoContent" style={{backgroundImage:"url('https://i.postimg.cc/rszLM3Ft/news-banner-frame.png')"}}>
    <div className="videoContent">
      <div className="contentVideoUser">
        <div className="titleVideo">
          <h4>{props.video.title}</h4>
          {props.video.owner === props.user._id && (
            <>
              {/* <button type="button" onClick={updateHandler}>
                  Update
                </button> */}
            </>
          )}
        </div>
        <ReactPlayer
          width="650px"
          height="400px"
          url={props.video.url}
          className="videoUser"
          controls={true}
        />
        {/* </div> */}
      </div>
      <div className="likeReport">
        <div className="videolikes">
          {props.video.likes.length}
          <img
            className="star"
            src={star}
            onClick={() => props.toggleLike(props.video._id, props.user._id)}
            alt=""
          />
        </div>
        <div className="buttonsProfile">
          {props.user._id === props.video.owner && (
            <button type="button" onClick={confirm}>
              <FiTrash2 className="delete" />
            </button>
          )}
          <button type="button" onClick={reportHandler}>
            <FiAlertTriangle className="report" />
          </button>
        </div>
        {showReport ? <ReportForm videoId={props.video._id} /> : null}
      </div>
      <div className="commentsfather">
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
