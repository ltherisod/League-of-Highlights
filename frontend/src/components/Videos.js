import "./Videos.css"
import videosActions from "../redux/actions/videosActions"
import { connect } from "react-redux"
import Video from "./Video"
import { useState, useEffect } from "react"

const Videos = (props) => {
  // console.log(userId)
  const [loading, setLoading] = useState(true)
  console.log(props.username)
  const getVideos = async () => {
    const res = await props.getUserVideos(props.username)
    // Validar res
    setLoading(false)
  }

  useEffect(() => {
    getVideos()
  }, [props.username])

  if (loading) return <p>Loading...</p>
  if (!props.userVideos.length) return <p>Todavía no tengo videos :c</p>
  // Después de esto hay que renderizar desde props.userVideos
  return (
    <>
      <div className="usersVideos">
        {props.userVideos.map((video) => (
          <Video key={video._id} video={video} />
        ))}
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    // userId: state.user.user,
    userVideos: state.videos.userVideos,
  }
}

const mapDispatchToProps = {
  getUserVideos: videosActions.getUserVideos,
}

export default connect(mapStateToProps, mapDispatchToProps)(Videos)
