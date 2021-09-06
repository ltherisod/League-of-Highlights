import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import "bootstrap/dist/css/bootstrap.min.css"
import SignIn from "./pages/SignIn"
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom"
import Profile from "./pages/Profile"
import { useSelector } from "react-redux"

function App() {
  const user = useSelector((state) => state.user)
  console.log(user.user.token)
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/signup" component={SignUp} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

export default App
