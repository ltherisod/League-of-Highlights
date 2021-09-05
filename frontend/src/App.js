import Home from "./pages/Home";
import SignIn from './pages/SignIn'
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./pages/Profile"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route exact path="/profile" component={Profile} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
       
}

export default App
