import React, { Component } from "react";
import Cookies from "universal-cookie";

export class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (e, name) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  onSubmit = () => {
    if (this.state.username === "admin" && this.state.password === "admin") {
      const cookies = new Cookies();
      cookies.set("is_login", true, { path: "/" });
      this.props.login(true);
    }
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="login-page">
        <div className="form-group">
          <label className="font-weight-bold">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => this.handleChange(e, "username")}
          />
        </div>
        <div className="form-group">
          <label className="font-weight-bold">Password</label>
          <input
            type="password"
            className="form-control "
            value={password}
            onChange={(e) => this.handleChange(e, "password")}
          />
        </div>
        <button
          type="submit"
          onClick={this.onSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
    );
  }
}

export default Login;
