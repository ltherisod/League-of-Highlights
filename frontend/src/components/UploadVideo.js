import { useEffect, useState } from "react"
import "./UploadVideo.css"
import { connect } from "react-redux"
import videosActions from "../redux/actions/videosActions"
import championsActions from "../redux/actions/championsActions"

const UploadVideo = (props) => {
    const [champions, setChampions] = useState([])

    const getChampions = async () => {
        try{
            const res = await props.getAllChampions()
            console.log(res)
        }catch(e){
            console.log(e.message)
        }
      
    }

    useEffect(() => {
        getChampions()
    },[])


    const [videoData, setVideoData] = useState({
        title: '',
        url: '',
        owner: '',
        champion: '',
    })

    const inputHandler = (e) => {
        setVideoData({ ...videoData, [e.target.name]: e.target.value })
    }
    const sendVideo = async () => {
        if((Object.values(videoData).some((value) => value === ""))){
            return false // hacer alerta que llene los campos.
        }
        const res = await props.sendVideo(videoData)
        if (res.success) {
            alert(`video enviado`)
          } else {
            alert("Something went wrong! Please try later.") //cambiar alert feo
            console.log(res.error) // Manejar el error acá.
          }  
    }

    return (
        <>
            <div className="videoForm">
                <h3>Upload your video</h3>
                <form>
                    <input type="text" name="title" placeholder="Title of your video" onChange={inputHandler}/>
                    <input type="text" name="url" placeholder="url of your video"  onChange={inputHandler} />
                    <select >
                        <option>Choose your champion</option>
                    </select>
                </form>
                <button onClick={sendVideo}>Send Video</button>
            </div>
        </>
        )
}

const mapDispatchToProps = {
    addVideo: videosActions.addVideo,
    getChampions: championsActions.getAllChampions
}

export default connect(null, mapDispatchToProps)(UploadVideo)