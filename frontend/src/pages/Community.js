import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Community.css";
import "./Home.css"
import { connect } from "react-redux"

const Community = () => {
  return (
    <>
    <div className="bodyBackground" style={{backgroundImage:"url('https://i.postimg.cc/4dGhW9qH/background-Violeta.png')"}}>
        <Header />
        <div className="imageAndText">
        </div>
        <h2 className='text-center'>COMMUNITY</h2>
        <div className="photos">
          <div
            style={{
              backgroundImage: `url("https://i.postimg.cc/L8Pw82PW/2021-2-15-Pirate-Invicta.jpg")`,
            }}
            className="photo"
          ></div>
          <div
            style={{
              backgroundImage: `url("https://i.postimg.cc/XYX3mcdk/ploop4.jpg")`,
            }}
            className="photo"
          >
            ''
          </div>
          <div
            style={{
              backgroundImage: `url("https://i.postimg.cc/c4BT9CQ0/2021-2-15-Laurits-Rask.jpg")`,
            }}
            className="photo"
          >
            ''
          </div>
          <div
            style={{
              backgroundImage: `url("https://i.postimg.cc/TYB2s2GN/2021-2-15-Little-Legends.jpg")`,
            }}
            className="photo"
          >
            ''
          </div>
          <div
            style={{
              backgroundImage: `url("https://i.postimg.cc/j2HVkThm/2021-2-15-Nasus-Kim.jpg")`,
            }}
            className="photo"
          >
            ''
          </div>
          <div
            style={{
              backgroundImage: `url("https://i.postimg.cc/gcHLZZVy/ploop5.jpg")`,
            }}
            className="photo"
          >
            ''
          </div>
          <div
            style={{
              backgroundImage: `url("https://i.postimg.cc/9MJVWC99/ploop3.jpg")`,
            }}
            className="photo"
          >
            ''
          </div>
          <div
            style={{
              backgroundImage: `url("https://i.postimg.cc/RhkYmDgf/ploop2.jpg")`,
            }}
            className="photo"
          >
            ''
          </div>
          <div
            style={{
              backgroundImage: `url("https://i.postimg.cc/hGvN9TQX/ploop1.jpg")`,
            }}
            className="photo"
          >
            ''
          </div>
          <div
            style={{
              backgroundImage: `url("https://i.postimg.cc/0Qyc1fnn/hk3drryu9wnicc44unma.jpg")`,
            }}
            className="photo"
          >
            ''
          </div>
          <div
            style={{
              backgroundImage: `url("https://i.postimg.cc/65BpfYrj/2021-2-15-John-Crazzy.jpg")`,
            }}
            className="photo"
          >
            ''
          </div>
          <div
            style={{
              backgroundImage: `url("https://i.postimg.cc/hGLKwT42/OIP.jpg")`,
            }}
            className="photo"
          >
            ''
          </div>
        </div>
        <Footer />
    </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userStatus: state.user.user,
  }
}

export default connect(mapStateToProps)(Community)
