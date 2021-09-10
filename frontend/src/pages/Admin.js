import "./Admin.css"
import Header from "../components/Header"
import { connect } from "react-redux"
import videosActions from "../redux/actions/videosActions"
import userActions from "../redux/actions/userActions"
import { useEffect, useState } from "react"

const Admin = (props) => {
  const [reportedUsers, setReportedUsers] = useState([])
  const deleteReportedVideo = () => {
    props.deleteVideo() // id del video a borrar.
  }

  console.log(reportedUsers)
  useEffect(() => {
    props.getReportedUsers().then((res) => setReportedUsers(res.response))
  }, [])
  const dismissReport = async () => {}

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
            <button onClick={dismissReport}>Dismiss</button>
          </div>
        ))}
        <h3>Van videos</h3>
        <div className="deleteVideo">
          <p>:video reported</p>
          <button onClick={deleteReportedVideo}>delete</button>
        </div>
      </div>
    </>
  )
}

const mapDispatchToProps = {
  deleteVideo: videosActions.deleteVideo,
  getReportedUsers: userActions.getReportedUsers,
  deleteUser: userActions.deleteUser,
}

export default connect(null, mapDispatchToProps)(Admin)
