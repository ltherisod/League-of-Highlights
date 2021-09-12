import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import "bootstrap/dist/css/bootstrap.min.css"
import SignIn from "./pages/SignIn"
import Community from "./pages/Community"
import EsportsPage from "./pages/EsportsPage"
import Admin from "./pages/Admin"
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom"
import Profile from "./pages/Profile"
import { connect } from "react-redux"
import userActions from "./redux/actions/userActions"
import Error from "./pages/Error"
import { useEffect } from "react"
import Settings from "./pages/Settings"

function App(props) {
  const token = localStorage.getItem("token")
 

  useEffect(() => {
    if (token) {
      props.loginLS(token)
    }
    // eslint-disable-next-line
  }, [token])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        {!props.userStatus && <Route path="/signin" component={SignIn} />}
        <Route path="/community" component={Community} />
        {props.userStatus && (
          <Route path="/profile/:username" component={Profile} />
        )}
        {/* <Route path="/profile/:username" component={Profile} /> */}
        {/*proteger la ruta, por ahora prueban*/}
        {!props.userStatus && <Route exact path="/signup" component={SignUp} />}
        <Route exact path="/esports" component={EsportsPage} />
        {props.userStatus.admin && <Route exact path="/admin" component={Admin} />} 
        <Route path="/error" component={Error} />
        <Route path="/settings" component={Settings} />
        {props.userStatus ? <Redirect to="/" /> : <Redirect to="/error" />}
      </Switch>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    userStatus: state.user.user,
  }
}

const mapDispatchToProps = {
  loginLS: userActions.loginLS,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
