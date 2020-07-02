import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetail";
import Cookies from "universal-cookie";

class App extends Component {
  state = {
    is_login: undefined,
  };

  login = (is_login) => this.setState({ is_login });

  handleLogout = () => {
    const cookies = new Cookies();
    cookies.set("is_login", false, { path: "/" });
    this.login(false);
  };

  componentDidMount() {
    const cookies = new Cookies();
    this.setState({ is_login: cookies.get("is_login") === "true" });
  }

  render() {
    const { is_login } = this.state;

    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-primary">
          <a className="navbar-brand font-weight-bolder" href="/">
            Jobs
          </a>
          {is_login ? (
            <div
              className="navbar-brand my-0 logout-btn"
              onClick={this.handleLogout}
            >
              Log Out
            </div>
          ) : null}
        </nav>
        <div>
          {is_login !== undefined ? (
            <Router>
              <Switch>
                <Route path="/" exact>
                  {is_login ? (
                    <Redirect to="/jobs" />
                  ) : (
                    <Redirect to="/login" />
                  )}
                </Route>
                <Route path="/login">
                  {is_login ? (
                    <Redirect to="/jobs" />
                  ) : (
                    <Login login={this.login} />
                  )}
                </Route>
                <Route path="/jobs">
                  {is_login ? <JobList /> : <Redirect to="/login" />}
                </Route>
                <Route
                  path="/job/:id"
                  render={(routeProps) =>
                    is_login ? (
                      <JobDetail {...routeProps} />
                    ) : (
                      <Redirect to="/login" />
                    )
                  }
                />
              </Switch>
            </Router>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    );
  }
}

export default App;
