import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import classes from "./Login.module.css";

const Login = (props) => {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    if (username.length === 0 || password.length === 0) {
      return alert("Please fill username and password");
    }
    e.preventDefault();
    axios
      .post("https://testm2m.tritronik.com/test/login", {
        username,
        password,
      })
      .then((res) => {
        // return props.setToken(res.data.token);
        return history.push("/home", { token: res.data.token });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          return alert("Invalid credentials");
        }
        alert("Something wemt wrong");
      });
  };
  return (
    <div className={`container col-4 align-middle mt-5`}>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="form-control"
            id="username"
            placeholder="username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            id="password"
            placeholder="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
