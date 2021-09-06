import "./Profile.css"
import Header from '../components/Header'

const Profile = (props) => {
    return (
        <>
            <Header/>
            <main>
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
            </main>
        </>
    )
}

export default Profile