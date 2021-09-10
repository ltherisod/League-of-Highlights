import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Community.css";
import "./Home.css"
import { connect } from "react-redux"
import BackHome from "../components/BackHome";
import Aos from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"

const Community = (props) => {

  useEffect (() => {
    Aos.init({duration:2000})
  } ,[])

  return (
    <>
    <div className="bodyBackground" style={{backgroundImage:"url('https://i.postimg.cc/fyFKsXCW/pruebadifuminada.png')"}}>
        <Header {...props}/>
        <div className="heroCommunity"></div>
        <div className="community">
          <div className="textCommunity" style={{backgroundImage:"url('https://i.postimg.cc/K8MXJNQt/community.png')"}}></div>
        </div>
          <div className="photos">
            <div className="picBox" data-aos="fade-up-right">
              <div className="picCommunity" style={{backgroundImage:"url('https://i.postimg.cc/0yx5NHVL/Ee-Q6x-P-XYAAe-Yhq.jpg')"}}></div>
              <div className="picCommunity" style={{backgroundImage:"url('https://i.postimg.cc/Njy91n6L/FHOp4q6oq-RYUl3m-X2-X9-ZPpc-Pr-Z3vki-EAqivaf-Xj-RGc-E-1.jpg')"}}></div>
            </div>
            <div className="picBox" data-aos="fade-right">
              <div className="picCommunity" style={{backgroundImage:"url('https://i.postimg.cc/L8yDsGHX/DUlz7f-XXc-AAKse-B.jpg')"}}></div>
              <div className="picCommunity" style={{backgroundImage:"url('https://i.postimg.cc/hGy5HfJ2/de651pd-55834d28-12b3-4edb-be3f-4adf37846837.jpg')"}}></div>
            </div>
            <div className="picBox" data-aos="fade-up-right">
              <div className="picCommunity" style={{backgroundImage:"url('https://i.postimg.cc/nhQbKKCn/Ahri-1253284740-172372-1024x1263.png')"}}></div>
              <div className="picCommunity" style={{backgroundImage:"url('https://i.postimg.cc/9XqdhrRr/12495063-1711676362447322-963432819313716272-n.jpg')"}}></div>
            </div>
          </div>
          <div className="mainBackHome" style={{backgroundImage: "url('https://i.postimg.cc/L5mGj4Tz/back-To-Home.png')"}}>
            <BackHome/>
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
