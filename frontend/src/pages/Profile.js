import "./Profile.css"
import "./Home.css"
import Header from "../components/Header"
import { useEffect, useState, useRef } from "react"
import { connect } from "react-redux"
import Footer from "../components/Footer"
import userActions from "../redux/actions/userActions"
import Videos from "../components/Videos"
import UploadVideo from "../components/UploadVideo"
import BackHome from "../components/BackHome"
import { FiRefreshCw, FiAlertTriangle } from "react-icons/fi"

const Profile = (props) => {
  const [showProfileData, setShowProfileData] = useState({})
  const [loader, setLoader] = useState(true)
  const [userReportVisible, setUserReportVisible] = useState(false)
  const reportContent = useRef(null)

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

  const reportHandler = async () => {
    if (!reportContent.current.value) {
      alert("Escribe la razón flojo de mierda.")
      return false
    }
    const res = await props.reportUser(
      showProfileData._id,
      reportContent.current.value
    )
    console.log(res)
  }

  useEffect(() => {
    setLoader(true)
    window.scroll(0, 0)
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
  if (!Object.keys(showProfileData).length) return <p>Que no se rompa.</p> // Vuela después.
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
                  <div
                    className="frameIcon"
                    // style={{
                    //   backgroundImage:
                    //     "url('https://i.postimg.cc/L6g8PMSW/portrait-frame.png')",
                    // }}
                  >
                    <div
                      className="avatar"
                      style={{
                        backgroundImage: `url(${showProfileData.icon})`,
                      }}
                    ></div>
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

                <button
                  onClick={() => setUserReportVisible(!userReportVisible)}
                >
                  <FiAlertTriangle className="reportUser" />
                </button>
                {userReportVisible && (
                  <>
                    <input
                      type="text"
                      ref={reportContent}
                      placeholder="Why do you want to report this user?"
                    ></input>
                    <button onClick={reportHandler}>Send</button>
                  </>
                )}
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
          {showProfileData._id === props.userData._id && <UploadVideo />}
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
