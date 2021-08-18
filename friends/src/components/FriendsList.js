import React, { useEffect, useState } from "react";

import Friend from "./Friend";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { v4 as uuidv4 } from "uuid";

const initialFormValues = {
  id: uuidv4(),
  name: "",
  age: "",
  email: "",
};

const FriendsList = () => {
  const [formValues, setFormValues] = useState([initialFormValues]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/friends")
      .then((res) => {
        setFriends(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setFormValues({
      friend: {
        ...formValues,
        [e.target.name]: e.target.value,
      },
    });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .get(`/friends`)
      .then((res) => {
        console.log(res);
        setFriends([...friends, formValues]);
      })
      .catch((err) => console.log(err));
    setFormValues(initialFormValues);
    console.log(friends);
  };

  return (
    <div>
      <label>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placehold="Name"
            value={formValues.name}
            onChange={handleChange}
          />
          <input
            name="age"
            type="text"
            placehold="Age"
            value={formValues.age}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placehold="E-Mail"
            value={formValues.email}
            onChange={handleChange}
          />
          <button type="submit">Add Friend</button>
        </form>
      </label>
      {friends.map((obj) => {
        return <Friend data={obj} />;
      })}
    </div>
  );
};

export default FriendsList;
