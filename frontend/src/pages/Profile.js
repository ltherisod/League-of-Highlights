import "./Profile.css"
import Header from "../components/Header"

import { connect } from "react-redux"

const Profile = (props) => {
  console.log(props.userData)
  if (!props.userData) return <p>No hay nada</p>
  return (
    <>
      <Header />
      <main>
        <div>
          <div className="user">
            {/* <h3>UserName</h3> */}
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
            backgroundImage: `url(${props.userData.topChampions[1].image})`,
          }}
        ></div>
      </main>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.user.user,
  }
}

export default connect(mapStateToProps)(Profile)
