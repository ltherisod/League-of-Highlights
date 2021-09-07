import "./Profile.css"
import "./Home.css"
import Header from "../components/Header"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Footer from "../components/Footer"
import userActions from "../redux/actions/userActions"

const Profile = (props) => {
  const [showProfileData, setShowProfileData] = useState({})
  const [loader, setLoader] = useState(true)

  async function fetchUser() {
    try {
      const response = await props.getProfileByName(props.match.params.username)
      const refreshedUser = await props.refresh(
        response.response?.username,
        response.response?._id
      )
      return refreshedUser
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    window.scroll(0, 0)
    fetchUser(showProfileData)
      .then((response) => {
        setShowProfileData(response.response || {})
        setLoader(false)
      })
      .catch((e) => console.log(e.message))
  }, [])
  console.log(showProfileData)
  if (loader) {
    return (
      <div className="loaderdiv">
        <h2>Loading</h2>
      </div>
    )
  }
  if (!Object.keys(showProfileData).length) return <p>Que no se rompa.</p> // Vuela después.
  return (
    <>
      <div
        className="bodyBackground"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/4dGhW9qH/background-Violeta.png')",
        }}
      >
        <Header />
        <main>
          <div
            className="userHero"
            style={{
              backgroundImage:
                "url('https://i.postimg.cc/wM7rV3BX/banner-User-black.png')",
            }}
          >
            <div>
              <div className="user">
                <h3>{props.match.params.username}</h3>
                <div
                  className="avatar"
                  style={{ backgroundImage: `url(${showProfileData.icon})` }}
                ></div>
              </div>
              <div className="logoChampion">
                <div
                  className="tag"
                  style={{
                    backgroundImage: `url(${showProfileData.topChampions[0].tags[0].image})`,
                  }}
                ></div>
              </div>
            </div>
            <div className="info">
              <div
                className="rank"
                style={{
                  backgroundImage: `url(${showProfileData.rank.image})`,
                }}
              ></div>
              <h4>
                {showProfileData.rank.name} {showProfileData.division}
              </h4>
            </div>
            <div
              className="champion"
              style={{
                backgroundImage: `url(${showProfileData.topChampions[0].image})`,
              }}
            ></div>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
