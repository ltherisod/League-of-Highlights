import "./Admin.css"
import Header from "../components/Header"
import { connect } from "react-redux"
import videosActions from "../redux/actions/videosActions"
import userActions from "../redux/actions/userActions"
import { useEffect, useState } from "react"

const Admin = (props) => {
  const [reportedUsers, serReportedUsers] = useState([])
  const deleteReportedVideo = () => {
    props.deleteVideo() // id del video a borrar.
  }
  
  useEffect(() =>{
    props.getReportedUsers()
  },[])

  const deleteUser = () => {}
  return (
    <>
      <Header />
      <div className="containerAdmin">
        <div className="van">
          <p>":username" was reported :x times</p>
          <button onClick={deleteUser}>van account</button>
        </div>
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
  getReportedUsers: userActions.getReportedUsers
}

export default connect(null, mapDispatchToProps)(Admin)
