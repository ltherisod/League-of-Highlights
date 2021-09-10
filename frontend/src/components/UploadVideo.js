import { useEffect, useState } from "react"
import "./UploadVideo.css"
import { connect } from "react-redux"
import videosActions from "../redux/actions/videosActions"
import championsActions from "../redux/actions/championsActions"
import { FiX, FiCheck } from "react-icons/fi";

const UploadVideo = (props) => {
  const [champions, setChampions] = useState([])
  const [view, setView] = useState(false)

  const getChampions = async () => {
    try {
      const res = await props.getAllChampions()
      if (!res.success) throw new Error()
      setChampions(res.response.map((champion) => champion.name))
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    getChampions()
    // eslint-disable-next-line
  }, [])

  const [videoData, setVideoData] = useState({
    title: "",
    url: "",
    owner: props.user._id,
    championName: "",
  })

  const inputHandler = (e) => {
    setVideoData({ ...videoData, [e.target.name]: e.target.value })
  }
  const sendVideo = async () => {
    console.log("entre a esta mierda")
    if (Object.values(videoData).some((value) => value === "")) {
      return false // hacer alerta que llene los campos.
    }

    const res = await props.addVideo(videoData)
    console.log(res)
    if (res.success) {
      alert(`video enviado`)
    } else {
      alert("Something went wrong! Please try later.") //cambiar alert feo
      console.log(res.error) // Manejar el error acá.
    }
  }

  return (
    <>
    <div className="uploadBox">
      {view && 
      <div className="videoForm">
      <h3>Upload your video</h3>
      <form>
        <input
          type="text"
          name="title"
          placeholder="Title of your video"
          onChange={inputHandler}
        />
        <input
          type="text"
          name="url"
          placeholder="url of your video"
          onChange={inputHandler}
        />
        <select name="championName" onChange={inputHandler}>
          <option>Choose your champion</option>
          {champions.map((champion) => (
            <option value={champion} key={champion}>
              {champion}
            </option>
          ))}
        </select>
      </form>
      <button className="sendVideo" onClick={sendVideo}>Send Video</button>
    </div>
      }
      <button className="postButton" onClick={() => setView(!view)}>{view ? <FiX className="close"/> : "New Post"}</button>
    </div>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  }
}

const mapDispatchToProps = {
  addVideo: videosActions.addVideo,
  getAllChampions: championsActions.getAllChampions,
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadVideo)
