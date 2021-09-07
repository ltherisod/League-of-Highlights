import "./Profile.css"
import Header from "../components/Header"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Footer from "../components/Footer"
import userActions from "../redux/actions/userActions"

const Profile = (props) => {
  const [showProfileData, setShowProfileData] = useState([])
  const [loader, setLoader] = useState(true)

  async function getProfileByName() {
    try {
      console.log(props.userData)
      let response = await props.getProfileByName(props.userData.username)
      console.log("[]" + props.userData.username) // reemplazar por props.match.params.culito /:culito
      return response
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    window.scroll(0, 0)
    getProfileByName(showProfileData)
      .then((response) => {
        setShowProfileData(response)
        setLoader(false)
      })
      .catch((e) => console.log(e.message))
  }, [])
  console.log(props.userData)
  console.log(showProfileData)
  // const reflesh=(username, userMongoId, isGuest)=>{
  //     props.reflesh(username, userMongoId, isGuest)
  //     .then((res) =>{
  //         if(res.success){

  //         }else{
  //             throw new Error()
  //         }
  //     })
  //     .catch((error) => console.log(error))
  //  }

  if (loader) {
    return (
      <div className="loaderdiv">
        <h2>Loading</h2>
      </div>
    )
  }
  if (!Object.keys(props.userData).length)
    return <p>Todavía no tengo la data.</p> // Esto vuela después

  return (
    <>
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
              <h3>{props.userData.username}</h3>
              <div
                className="avatar"
                style={{ backgroundImage: `url(${props.userData.icon})` }}
              ></div>
            </div>
            <div className="logoChampion">
              <div
                className="tag"
                style={{
                  backgroundImage: `url(${props.userData.topChampions[0].tags[0].image})`,
                }}
              ></div>
              <button>
                <img src="./assets/reflesh" alt="reflesh" />
              </button>
            </div>
          </div>
          <div className="info">
            <div
              className="rank"
              style={{ backgroundImage: `url(${props.userData.rank.image})` }}
            ></div>
            <h4>
              {props.userData.rank.name} {props.userData.division}
            </h4>
          </div>
          <div
            className="champion"
            style={{
              backgroundImage: `url(${props.userData.topChampions[0].image})`,
            }}
          ></div>
        </div>
      </main>
      <Footer />
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