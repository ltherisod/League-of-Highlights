import "./Admin.css"
import Header from "../components/Header"

const Admin = () => {
    return (
        <>
            <Header/>
            <div className="van">
                <p>":username" was reported :x times</p>
                <button>van account</button>
            </div>
            <div className="deleteVideo">
                <p>:video reported</p>
                <button>delete</button>
            </div>
        </>
    )
}

export default Admin