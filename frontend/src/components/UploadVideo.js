import { useEffect, useState } from "react"
import "./UploadVideo.css"
import { connect } from "react-redux"
import videosActions from "../redux/actions/videosActions"
import championsActions from "../redux/actions/championsActions"
import { FiX } from "react-icons/fi"
import toast from "react-hot-toast"

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
    if (Object.values(videoData).some((value) => value === "")) {
      return toast.custom((t) => (
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
          <img
            style={{ width: "60px", height: "60px" }}
            className="h-4 w-4 rounded-full"
            src="https://i.postimg.cc/g2dLtyDR/logOut.png"
            alt=""
          />
          <p
            className="text-sm font-medium text-white"
            style={{ marginBottom: 0 }}
          >
            Please complete all the fields!
          </p>
        </div>
      ))
    }

    const res = await props.addVideo(videoData)
    if (res.success) {
      return toast.custom(
        (t) => (
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
            <img
              style={{ width: "60px", height: "60px" }}
              className="h-4 w-4 rounded-full"
              src="https://i.postimg.cc/mrHj3y29/success2.png"
              alt=""
            />
            <p
              className="text-sm font-medium text-white"
              style={{ marginBottom: 0 }}
            >
              Video uploaded!
            </p>
          </div>
        ),
        { duration: 1500 }
      )
    } else {
      return toast.custom((t) => (
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
          <img
            style={{ width: "60px", height: "60px" }}
            className="h-4 w-4 rounded-full"
            src="https://i.postimg.cc/g2dLtyDR/logOut.png"
            alt=""
          />
          <p
            className="text-sm font-medium text-white"
            style={{ marginBottom: 0 }}
          >
            Something went wrong! Please try later.
          </p>
        </div>
      ))
    }
  }

  return (
    <>
      <div className="uploadBox">
        {view && (
          <div className="videoForm">
            <h3>Upload your video</h3>
            <form className="uploadForm">
              <input
                className="formInput"
                type="text"
                name="title"
                placeholder="Title of your video"
                onChange={inputHandler}
              />
              <input
                className="formInput"
                type="text"
                name="url"
                placeholder="url of your video"
                onChange={inputHandler}
              />
              <select
                className="championName"
                name="championName"
                onChange={inputHandler}
              >
                <option className="optionChampion">Choose your champion</option>
                {champions.map((champion) => (
                  <option
                    className="optionChampion"
                    value={champion}
                    key={champion}
                  >
                    {champion}
                  </option>
                ))}
              </select>
            </form>
            <button className="sendVideo" onClick={sendVideo}>
              Send Video
            </button>
          </div>
        )}
        <button className="postButton" onClick={() => setView(!view)}>
          {view ? <FiX className="close" /> : "New Post"}
        </button>
      </div>
      {/* <Toaster
        containerStyle={{
          top: 80,
          left: 20,
          bottom: 20,
          right: 20,
        }}
        toastOptions={{
          duration: 1500,
        }}
      /> */}
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
