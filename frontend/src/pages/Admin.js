import "./Admin.css"
import Header from "../components/Header"
import { connect } from "react-redux"
import videosActions from "../redux/actions/videosActions"

const Admin = (props) => {
  const deleteReportedVideo = () => {
    props.deleteVideo() // id del video a borrar.
  }

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
}

export default connect(null, mapDispatchToProps)(Admin)
