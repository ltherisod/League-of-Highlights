import "./Admin.css"
import Header from "../components/Header"
import { connect } from "react-redux"
import videosActions from "../redux/actions/videosActions"
import userActions from "../redux/actions/userActions"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Admin = (props) => {
  const [reportedUsers, setReportedUsers] = useState([])
  const [reportedVideos, setReportedVideos] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
    props.getReportedUsers().then((res) => setReportedUsers(res.response))
    props.getReportedVideos().then((res) => setReportedVideos(res.response))
  }, [])

  const dismissUserReport = async (id) => {
    const res = await props.dismissUserReport(id)
    if (res.success) {
      alert("Todo salió bien")
      setReportedUsers(
        reportedUsers.filter((user) => user._id !== res.response._id)
      )
      return true
    }
    alert(res.error)
  }
  const dismissVideoReport = async (id) => {
    const res = await props.dismissVideoReport(id)
    if (res.success) {
      alert("Todo salió bien.")
      setReportedVideos(
        reportedVideos.filter((video) => video._id !== res.response._id)
      )
      return true
    }
    alert(res.error)
  }

  const deleteReportedVideo = async (id, token) => {
    const res = await props.deleteVideo(id, token) // id del video a borrar.
    if (res.success) {
      setReportedVideos(
        reportedVideos.filter((video) => video._id !== res.response._id)
      )
      alert("Video borrado.")
      return true
    }
    alert("Error: " + res.error)
  }
  const deleteUser = async (id) => {
    const res = await props.deleteUser(id)
    if (res.success) {
      setReportedUsers(
        reportedUsers.filter((user) => user._id !== res.response._id)
      )
      alert("Usuario borrado.")
      return true
    }
    alert("Error: " + res.error)
  }

  return (
    <>
      <Header {...props} />
      <div className="containerAdmin">
        <h3>Van users</h3>
        {reportedUsers.map((user) => (
          <div key={user._id} className="van">
            <p>
              <Link to={`/profile/${user.username}`}>{user.username}</Link> (
              {user.email}) was reported {user.reports.length} times:
            </p>
            <ul>
              {user.reports.map((report) => (
                <li key={report._id}>{report.content}</li>
              ))}
            </ul>
            <button onClick={() => deleteUser(user._id)}>Delete account</button>
            <button onClick={() => dismissUserReport(user._id)}>Dismiss</button>
          </div>
        ))}
        <h3>Van videos</h3>
        {reportedVideos.map((video) => (
          <div key={video._id} className="deleteVideo">
            <p>{`The video "${video.title}" owned by ${video.owner.username} was reported ${video.reports.length} times:`}</p>
            <ul>
              {video.reports.map((report) => (
                <li key={report._id}>{report.content}</li>
              ))}
            </ul>
            <p>:video reported</p>
            <button
              onClick={() =>
                deleteReportedVideo(video._id, localStorage.getItem("token"))
              }
            >
              Delete
            </button>
            <button onClick={() => dismissVideoReport(video._id)}>
              Dismiss
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

const mapDispatchToProps = {
  getReportedVideos: videosActions.getReportedVideos,
  deleteVideo: videosActions.deleteVideo,
  dismissVideoReport: videosActions.dismissVideoReport,
  getReportedUsers: userActions.getReportedUsers,
  deleteUser: userActions.deleteUser,
  dismissUserReport: userActions.dismissUserReport,
}

export default connect(null, mapDispatchToProps)(Admin)
