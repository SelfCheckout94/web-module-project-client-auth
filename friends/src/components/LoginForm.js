import React, { useState } from "react";

import axios from "axios";

const initialFormValues = {
  credentials: {
    username: "",
    password: "",
  },
};
const LoginForm = (props) => {
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChange = (e) => {
    e.preventDefault();
    setFormValues({
      credentials: {
        ...formValues.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", formValues.credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/friendslist");
      })
      .catch((err) => console.log(err));
    setFormValues(initialFormValues);
  };

  return (
    <div>
      <label>
        Login:
        <form onSubmit={login}>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={formValues.credentials.username}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formValues.credentials.password}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </label>
    </div>
  );
};

export default LoginForm;
