import "./Profile.css"
import Header from "../components/Header"
import Footer from "../components/Footer"

const Profile = () => {
    return (
        <>
            <Header/>
            <main>
                <div className="userHero" style={{backgroundImage:"url('https://i.postimg.cc/wM7rV3BX/banner-User-black.png')"}}>
                    <div>
                        <div className="user">
                            <h3>UserName</h3>
                            <div className="avatar"></div>
                        </div>
                        <div className="logoChampion">
                            <div className="avatar">Logo</div>
                        </div>
                    </div>
                    <div className="info"> Rank - Player's info</div>
                    <div className="champion"> Acá va la foto del personaje que están haciendo Lau y Niki</div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Profile