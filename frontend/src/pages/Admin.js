import "./Admin.css"
import Header from "../components/Header"
import { connect } from "react-redux"
import videosActions from "../redux/actions/videosActions"
import userActions from "../redux/actions/userActions"
import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import toast, {Toaster} from "react-hot-toast"

const Admin = (props) => {
  const [reportedUsers, setReportedUsers] = useState([])
  const [reportedVideos, setReportedVideos] = useState([])
  const [unverifiedAccounts, setUnverifiedAccounts] = useState([])
  const [filterMailsCondition, setFilterMailsCondition] = useState("")

  

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
    
    props
      .getReportedUsers()
      .then((res) => setReportedUsers(res.response))
      .catch((e) => toast("This didn't work!",
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    ))
    props
      .getReportedVideos()
      .then((res) => setReportedVideos(res.response))
      .catch((e) => toast("This didn't work!",
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    ))
    props
      .getUnverifiedAccounts()
      .then((res) => setUnverifiedAccounts(res.response))
      .catch((e) => toast("This didn't work!",
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    ))
  }, [])

  const dismissUserReport = async (id) => {
    const res = await props.dismissUserReport(id)
    if (res.success) {
      toast("Report dismissed!",
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    )
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
      toast("Video report dismissed!",
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    )
      setReportedVideos(
        reportedVideos.filter((video) => video._id !== res.response._id)
      )
      return true
    }
    alert(res.error)
  }

  const confirm = (callback, id) => {
    return (
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } bg-black flex`}
          style={{ display: "flex", alignContent: "center", alignItems: "center", padding: "15px 20px", borderRadius: "35px"}}
        >
          <p className="text-sm font-medium text-white" style={{marginBottom: 0,}}>
            Delete? 
          </p>
          <button onClick={() => {callback(id) 
            toast.dismiss(t.id)}} style={{backgroundColor: "rgb(189, 151, 81)",  color: "white", padding: "5px", margin: "2px"}}>
            Yes
          </button>
          <button onClick={() => toast.dismiss(t.id)} style={{backgroundColor: "rgb(189, 151, 81)",  color: "white", padding: "5px", margin: "2px"}}>
            No
          </button>
        </div>
      )) 
    )
    }

  const deleteReportedVideo = async (id) => {
    const res = await props.deleteVideo(id, localStorage.getItem("token")) // id del video a borrar.
    if (res.success) {
      setReportedVideos(
        reportedVideos.filter((video) => video._id !== res.response._id)
      )
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
      toast("User deleted successfully!",
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    )
      return true
    }
    alert("Error: " + res.error)
  }

  const onVerifyAccount = async (code, id) => {
    const res = await props.verifyCode(code, id)
    if (res.success) {
      
      (toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } bg-black flex`}
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            padding: "5px 10px",
            borderRadius: "35px",
          }}
        >
          
            <img style={{ width: "60px", height: "60px"}}
              className="h-4 w-4 rounded-full"
              src="https://i.postimg.cc/mrHj3y29/success2.png"
              alt=""
            />
            <p className="text-sm font-medium text-white" style={{marginBottom: 0,}}>
              Verified account! 
            </p>
          </div>
        ))
      )

      setUnverifiedAccounts(
        unverifiedAccounts.filter((acc) => acc._id !== res.response._id)
      )
      return true
    }
    alert(res.error)
  }

  return (
    <>
      <Header {...props} />
      <div
        className="containerAdmin"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/QVGzdGYs/riot-desktop-background-2x.jpg')",
        }}
      >
        <div className="divBanUsers">
          <h3>Ban users</h3>
          {reportedUsers.map((user) => (
            <div key={user._id} className="userToBan">
              <p>
                <Link to={`/profile/${user.username}`}>{user.username}</Link> (
                {user.email}) was reported {user.reports.length} times:
              </p>
              <ul>
                {user.reports.map((report) => (
                  <li key={report._id}>{report.content}</li>
                ))}
              </ul>
              <div className="buttonCont">
                <button
                  className="deleteadm"
                  onClick={() => confirm(deleteUser, user._id)}
                >
                  Delete
                </button>
                <button
                  className="dismissadm"
                  onClick={() => dismissUserReport(user._id)}
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="divBanVideos">
          <h3>Ban videos</h3>
          {reportedVideos.map((video) => (
            <div key={video._id} className="videoToBan">
              <p>{`The video "${video.title}" owned by ${video.owner.username} was reported ${video.reports.length} times:`}</p>
              <ul>
                {video.reports.map((report) => (
                  <li key={report._id}>{report.content}</li>
                ))}
              </ul>
              <div className="buttonCont">
                <button
                  className="deleteadm"
                  onClick={() =>
                    confirm(deleteReportedVideo,
                      video._id
                    )
                  }
                >
                  Delete
                </button>
                <button
                  className="dismissadm"
                  onClick={() => dismissVideoReport(video._id)}
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="divBanUsers">
          <h3>Unverified Accounts</h3>
          <input
            type="text"
            onChange={(e) => setFilterMailsCondition(e.target.value)}
            placeholder="Filter by email"
          />
          <ul>
            {unverifiedAccounts
              .filter((u) =>
                u.email.includes(filterMailsCondition.trim().toLowerCase())
              )
              .map((user) => (
                <li key={user._id} className="userToBan">
                  <p>{user.email}</p>
                  <button
                    type="button"
                    onClick={() => onVerifyAccount(user.verifyCode, user._id)}
                  >
                    Verify account
                  </button>
                  {/* <p>
                <Link to={`/profile/${user.username}`}>{user.username}</Link> (
                {user.email}) was reported {user.reports.length} times:
              </p>
              <ul>
                {unverifiedAccounts.map((report) => (
                  <li key={report._id}>{report.content}</li>
                ))}
              </ul>
              <div className="buttonCont">
                <button
                  className="deleteadm"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
                <button
                  className="dismissadm"
                  onClick={() => dismissUserReport(user._id)}
                >
                  Dismiss
                </button>
              </div> */}
                </li>
              ))}
          </ul>
        </div>
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
  getUnverifiedAccounts: userActions.getUnverifiedAccounts,
  verifyCode: userActions.verifyCode,
}

export default connect(null, mapDispatchToProps)(Admin)
