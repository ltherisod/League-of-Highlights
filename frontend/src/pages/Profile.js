import "./Profile.css"
import "./Home.css"
import Header from "../components/Header"
import { connect } from "react-redux"
import Footer from "../components/Footer"

const Profile = (props) => {
    console.log(props.userData)

    return (
        <>
            <div className="bodyBackground" style={{backgroundImage:"url('https://i.postimg.cc/4dGhW9qH/background-Violeta.png')"}}>
                <Header/>
                <main>
                    <div className="userHero" style={{backgroundImage:"url('https://i.postimg.cc/wM7rV3BX/banner-User-black.png')"}}>
                        <div>
                            <div className="user">
                                <h3>{props.userData.username}</h3>
                                <div className="avatar" style={{backgroundImage: `url(${props.userData.icon})`}}></div>
                            </div>
                            <div className="logoChampion">
                                <div className="tag" style={{backgroundImage: `url(${props.userData.topChampions[0].tags[0].image})`}}></div>
                            </div>
                        </div>
                        <div className="info">
                        <div className="rank" style= {{backgroundImage: `url(${props.userData.rank.image})`}}></div>
                            <h4>{props.userData.rank.name} {props.userData.division}</h4>
                        </div>
                        <div className="champion"  style={{backgroundImage: `url(${props.userData.topChampions[0].image})`}}></div>
                    </div>
                </main>
                <Footer/>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
  return {
    userData: state.user.user,
  }
}

export default connect(mapStateToProps)(Profile)
