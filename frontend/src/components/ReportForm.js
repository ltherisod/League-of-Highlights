import "./ReportForm.css"
import { useRef } from "react"
import videosActions from "../redux/actions/videosActions"
import { connect } from "react-redux"

const ReportForm = (props) => {
  const input = useRef(null)
  const reportVideoHandler = async () => {
    const res = await props.reportVideo(props.videoId, {
      author: props.user._id,
      content: input.current.value,
    })
    if (res.success) {
      alert("Report enviado.")
      return true
    }
    alert("Error, no pudimos reportar este video.")
  }
  return (
    <>
      <form className="reportForm">
        <textarea
          //   type="textArea"
          ref={input}
          className="reportInput"
          placeholder="Why are you reporting this video?"
        />
        <button type="button" onClick={reportVideoHandler}>
          Send
        </button>
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
