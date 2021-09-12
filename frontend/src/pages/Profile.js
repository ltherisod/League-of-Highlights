import "./Profile.css"
import "./Home.css"
import Header from "../components/Header"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Footer from "../components/Footer"
import userActions from "../redux/actions/userActions"
import Videos from "../components/Videos"
import UploadVideo from "../components/UploadVideo"
import BackHome from "../components/BackHome"
import { FiRefreshCw, FiAlertTriangle, FiCheck } from "react-icons/fi"
import toast, { Toaster } from 'react-hot-toast'
import Verify from "../components/Verify"
import Error from "./Error"

const Profile = (props) => {
  const [showProfileData, setShowProfileData] = useState({})
  const [loader, setLoader] = useState(true)
  const [userReportVisible, setUserReportVisible] = useState(false)
  //const reportContent = useRef(null)
  const [content, setContent] = useState("")

  const toTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }

  async function fetchUser() {
    try {
      const response = await props.getProfileByName(props.match.params.username)
      return response
    } catch (error) {
      console.log(error)
    }
  }
  
  const refreshHandler = async () => {
    const res = await props.refresh(showProfileData.user, showProfileData._id)
    if (res.success) {
      setShowProfileData(res.response)
      return true
    }
    console.error(res.error)
    return false
  }
//reportContent.current.value
  const reportHandler = async () => {
    if (!content) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } bg-black flex`}
          style={{ display: "flex", alignContent: "center", alignItems: "center", padding: "5px 10px", borderRadius: "35px"}}
        >
          <img style={{ width: "60px", height: "60px"}}
            className="h-4 w-4 rounded-full"
            src="https://i.postimg.cc/9Q6BYPNR/varusfacepalm.png"
            alt=""
          />
          <p className="text-sm font-medium text-white" style={{marginBottom: 0,}}>
            empty field!
          </p>
        </div>
      ))
      return false
    }
    try{
      const res = await props.reportUser(
        showProfileData._id,
       content
      )
      if(res.success){
        setContent('')
        return toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } bg-black flex`}
            style={{ display: "flex", alignContent: "center", alignItems: "center", padding: "5px 10px", borderRadius: "35px"}}
          >
            <img style={{ width: "60px", height: "60px"}}
              className="h-4 w-4 rounded-full"
              src="https://i.postimg.cc/PJkZRZL6/demonteemo.png"
              alt=""
            />
            <p className="text-sm font-medium text-white" style={{marginBottom: 0,}}>
            Successfully reported
            </p>
          </div>
        ))
      }else{
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } bg-black flex`}
            style={{ display: "flex", alignContent: "center", alignItems: "center", padding: "5px 10px", borderRadius: "35px"}}
          >
            <img style={{ width: "60px", height: "60px"}}
              className="h-4 w-4 rounded-full"
              src="https://i.postimg.cc/PJkZRZL6/demonteemo.png"
              alt=""
            />
            <p className="text-sm font-medium text-white" style={{marginBottom: 0,}}>
            {res.error}
            </p>
          </div>
        ))
      }
    }catch(error){
      console.log('caigo en catch de report handler ')
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } bg-black flex`}
          style={{ display: "flex", alignContent: "center", alignItems: "center", padding: "5px 10px", borderRadius: "35px"}}
        >
          <img style={{ width: "60px", height: "60px"}}
            className="h-4 w-4 rounded-full"
            src="https://i.postimg.cc/g2dLtyDR/logOut.png"
            alt=""
          />
          <p className="text-sm font-medium text-white" style={{marginBottom: 0,}}>
          {error}
          </p>
        </div>
      ))
    }
    
  }

  useEffect(() => {
    setLoader(true)
    toTop()
    fetchUser(showProfileData)
      .then((response) => {
        setShowProfileData(response.response || {})
        setLoader(false)
      })
      .catch((e) => console.log(e.message))
    // eslint-disable-next-line
  }, [props.match.params.username])

  if (loader) {
    return (
      <div className="loaderdiv">
        <img src="/assets/lol.gif" alt="" />
      </div>
    )
  }
  if (!Object.keys(showProfileData).length) return (<Error/>)
  return (
    <>
      <div
        className="bodyBackground"
        style={{
          backgroundImage: "url('https://i.postimg.cc/hPZZ3SQn/azulazo.png')",
        }}
      >
        <Header {...props} />
        <main>
          <div
            className="userHero"
            style={{
              backgroundImage:
                "url('https://i.postimg.cc/hvzp7Ycm/fondazo.png')",
            }}
          >
            <div className="userSideBox">
              <div
                className="userside"
                style={{
                  backgroundImage:
                    "url('https://i.postimg.cc/0NKMfdKp/banderita.png')",
                }}
              >
                <div className="user">
                  <div className="frameIcon">
                    <div className="avatar" style={{backgroundImage: `url(${showProfileData.icon})`, }}></div>
                  </div>
                  <div className="usernameProfile">
                    {props.match.params.username}
                  </div>
                </div>
                <div className="info">
                  <div
                    className="rank"
                    style={{
                      backgroundImage: `url(${showProfileData.rank.image})`,
                    }}
                  ></div>
                  <div className="rankNameProfile">
                    {showProfileData.rank.name} {showProfileData.division}
                  </div>
                </div>
                <div
                  className="tag"
                  style={{
                    backgroundImage: `url(${showProfileData.topChampions[0].tags[0].image})`,
                  }}
                ></div>
              </div>
              <div className="boxRefresh">
                <button onClick={refreshHandler}>
                  <FiRefreshCw className="refresh" />
                </button>
                <div className="boxReport">
                  <button
                    onClick={() => setUserReportVisible(!userReportVisible)}
                  >
                    <FiAlertTriangle className="reportUser" />
                  </button>
                  {userReportVisible && (
                    <>
                      <input
                      className="reportInput"
                        type="text"
                        //ref={reportContent}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Why do you want to report this user?"
                      ></input>
                      <button onClick={reportHandler}>
                        <FiCheck className="ok" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="championBox">
              <div
                className="dividerTopProfile"
                style={{
                  backgroundImage:
                    "url('https://i.postimg.cc/wMgzzdnf/dividertop.png')",
                }}
              ></div>
              <div className="championback">
                <div
                  className="champion"
                  style={{
                    backgroundImage: `url(${showProfileData.topChampions[0].image})`,
                  }}
                ></div>
              </div>
              <div
                className="dividerButtomProfile"
                style={{
                  backgroundImage:
                    "url('https://i.postimg.cc/brxv0gfM/divider.png')",
                }}
              ></div>
            </div>
          </div>
          {/* Protegida la sección del formulario para agregar video */}
          {showProfileData._id === props.userData._id &&
          props.userData.verified && <UploadVideo />}
          {showProfileData._id === props.userData._id &&
          !props.userData.verified && <Verify/>}
          <div className="boxVideos">
            <Videos
              className="videoPost"
              username={props.match.params.username}
            />
          </div>
          <div
            className="mainBackHome"
            style={{
              backgroundImage:
                "url('https://i.postimg.cc/V6RbWKFT/fondo-Akali.png')",
            }}
          >
            <BackHome />
          </div>
        </main>
        <Footer />
      </div>
      <Toaster 
        containerStyle={{
          top: 80,
          left: 20,
          bottom: 20,
          right: 20,}}
        toastOptions={{
          duration: 1500,
      }}/>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.user.user,
  }
}

const mapDispatchToProps = {
  getProfileByName: userActions.getProfileByName,
  refresh: userActions.refresh,
  reportUser: userActions.reportUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
