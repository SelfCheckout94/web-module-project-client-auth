import React, { useEffect, useState } from "react";

import Friend from "./Friend";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { v4 as uuidv4 } from "uuid";

const initialFormValues = [
  {
    id: "",
    name: "",
    age: "",
    email: "",
  },
];

const initialFriend = {
  id: "",
  name: "",
  age: "",
  email: "",
};

const FriendsList = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState(initialFriend);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosWithAuth()
      .get("/friends")
      .then((res) => {
        setFriends(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setNewFriend({
      ...newFriend,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewFriend(formValues);
    axiosWithAuth()
      .post(`/friends/`, newFriend)
      .then((res) => {
        setFriends([...friends, newFriend]);
      })
      .catch((err) => console.log(err));
    setFormValues(initialFormValues);
  };

  return (
    <div>
      <label>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={formValues.name}
            onChange={handleChange}
          />
          <input
            name="age"
            type="text"
            placeholder="Age"
            value={formValues.age}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="E-Mail"
            value={formValues.email}
            onChange={handleChange}
          />
          <button type="submit">Add Friend</button>
        </form>
      </label>
      {friends.map((obj) => {
        return <Friend data={obj} key={uuidv4()} />;
      })}
    </div>
  );
};

export default FriendsList;
