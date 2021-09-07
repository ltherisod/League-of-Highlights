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
    }

  }, [])

  if (socket) {
    socket.emit("Hola")
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/community" component={Community} />
        {/* Aquí modifiqué a /profile/{mongoId} para poder obtener el perfil del usuario con ese id.*/}
        <Route path="/profile" component={Profile} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/esports" component={EsportsPage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

const mapDispatchToProps = {
  loginLS: userActions.loginLS,
}

export default connect(null, mapDispatchToProps)(App)
