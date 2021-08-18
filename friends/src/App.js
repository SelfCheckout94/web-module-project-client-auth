import "./App.css";

import {
  Link,
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import FriendsList from "./components/FriendsList";
import LoginForm from "./components/LoginForm";
import PrivateRoute from "./components/PrivateRoute";
import { axiosWithAuth } from "./utils/axiosWithAuth";

function App() {
  const logout = () => {
    axiosWithAuth()
      .post("/logout")
      .then(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link onClick={logout}>Logout</Link>
          </li>
          <li>
            <Link to="/friendslist">Friends</Link>
          </li>
        </ul>
        <Switch>
          <PrivateRoute path="/friendslist" component={FriendsList} />
          <Route path="/login" component={LoginForm} />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
