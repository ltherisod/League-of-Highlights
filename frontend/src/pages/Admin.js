import "./Admin.css"
import Header from "../components/Header"
import { connect } from "react-redux"
import videosActions from "../redux/actions/videosActions"
import userActions from "../redux/actions/userActions"
import { useEffect, useState } from "react"

const Admin = (props) => {
  const [reportedUsers, setReportedUsers] = useState([])
  const [reportedVideos, setReportedVideos] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
    props.getReportedUsers().then((res) => setReportedUsers(res.response))
    props.getReportedVideos().then((res) => setReportedVideos(res.response))
  }, [])

  const dismissUserReport = async () => {}
  const dismissVideoReport = async () => {}

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
      <Header />
      <div className="containerAdmin">
        <h3>Van users</h3>
        {reportedUsers.map((user) => (
          <div key={user._id} className="van">
            <p>{`${user.name} (${user.email}) was reported ${user.reports.length} times:`}</p>
            <ul>
              {user.reports.map((report) => (
                <li key={report._id}>{report.content}</li>
              ))}
            </ul>
            <button onClick={() => deleteUser(user._id)}>Delete account</button>
            <button onClick={dismissUserReport}>Dismiss</button>
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
              delete
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

const mapDispatchToProps = {
  deleteVideo: videosActions.deleteVideo,
  getReportedUsers: userActions.getReportedUsers,
  deleteUser: userActions.deleteUser,
  getReportedVideos: videosActions.getReportedVideos,
}

export default connect(null, mapDispatchToProps)(Admin)
