import "./Videos.css"
import videosActions from "../redux/actions/videosActions"
import { connect } from "react-redux"
import Video from "./Video"
import { useState, useEffect } from "react"
import NoVideos from "./NoVideos"

const Videos = (props) => {
  // console.log(userId)
  const [loading, setLoading] = useState(true)
  const getVideos = async () => {
    const res = await props.getUserVideos(props.username)
    if (!res.success) {
      // Tostada o algo, porque no cargan los videos.
    }
    // Validar res
    setLoading(false)
  }

  useEffect(() => {
    getVideos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.username])

  if (loading) return <p>Loading...</p>
  if (!props.userVideos.length && props.user.verified) return <NoVideos/>
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
    user: state.user.user
  }
}

const mapDispatchToProps = {
  getUserVideos: videosActions.getUserVideos,
}

export default connect(mapStateToProps, mapDispatchToProps)(Videos)
