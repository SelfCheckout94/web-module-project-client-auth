import "./App.css";

import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";

import LoginForm from "./components/LoginForm";

function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/login" component={LoginForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
