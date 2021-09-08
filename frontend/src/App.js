import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import "bootstrap/dist/css/bootstrap.min.css"
import SignIn from "./pages/SignIn"
import Community from "./pages/Community"
import EsportsPage from "./pages/EsportsPage"
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom"
import Profile from "./pages/Profile"
import { connect } from "react-redux"
import userActions from "./redux/actions/userActions"
import io from "socket.io-client"
import { useEffect, useState } from "react"

function App(props) {
  const token = localStorage.getItem("token")
  const [socket, setSocket] = useState(null)

  

   useEffect(() => {
    setSocket(io("http://localhost:4000"))
    if (token) {
      props.loginLS(token)
      console.log("Holaa") // NO SACAR POR FAVOR, SE ROMPE TODO
    }
  }, [])

  // if (socket) {
  //   socket.emit("Hola")
  // }
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        {!props.userStatus && <Route path="/signin" component={SignIn} />}
        <Route path="/community" component={Community} />
        {/* Aquí modifiqué a /profile/{user}} para poder obtener el perfil del usuario con ese id.*/}
        {props.userStatus && <Route path="/profile/:username" component={Profile} />} {/*proteger la ruta, por ahora prueban*/} 
        {!props.userStatus && <Route exact path="/signup" component={SignUp} />}
        <Route exact path="/" component={EsportsPage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    userStatus: state.user.user,
  };
};

const mapDispatchToProps = {
  loginLS: userActions.loginLS,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
