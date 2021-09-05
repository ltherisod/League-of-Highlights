import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import Profile from "./pages/Profile"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/signup" component={SignUp}/>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
       
}

export default App
