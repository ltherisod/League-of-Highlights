import "./ReportForm.css"
import {useState } from "react"
import videosActions from "../redux/actions/videosActions"
import { connect } from "react-redux"
import {  FiCheck } from "react-icons/fi"
import toast from "react-hot-toast"

const ReportForm = (props) => {
  const [content, setContent] = useState("")
  const reportVideoHandler = async () => {
    const res = await props.reportVideo(props.videoId, {
      author: props.user._id,
      content: content
    })
    if (res.success) {
      setContent('')
      return toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } bg-black flex`}
          style={{ display: "flex", alignContent: "center", alignItems: "center", padding: "5px 10px", borderRadius: "35px"}}
        >
          <img style={{ width: "60px", height: "60px"}}
            className="h-4 w-4 rounded-full"
            src="https://i.postimg.cc/PJkZRZL6/demonteemo.png"
            alt=""
          />
          <p className="text-sm font-medium text-white" style={{marginBottom: 0,}}>
          Successfully reported
          </p>
        </div>
      ))
    }
    return toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } bg-black flex`}
        style={{ display: "flex", alignContent: "center", alignItems: "center", padding: "5px 10px", borderRadius: "35px"}}
      >
        <img style={{ width: "60px", height: "60px"}}
          className="h-4 w-4 rounded-full"
          src="https://i.postimg.cc/9Q6BYPNR/varusfacepalm.png"
          alt=""
        />
        <p className="text-sm font-medium text-white" style={{marginBottom: 0,}}>
          Video wasn't reported
        </p>
      </div>
    ))
  }
  return (
    <>
      <form >
        <div className="reportForm">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="reportInput"
            placeholder="Why are you reporting this video?"
          />
              <FiCheck onClick={reportVideoHandler} className="ok" />
        </div>
      </form>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  }
}

const mapDispatchToProps = {
  reportVideo: videosActions.reportVideo,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm)
