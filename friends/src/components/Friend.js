import React from "react";

const Friend = ({ data }) => {
  return (
    <div>
      <div>
        <h2>{data.name}</h2>
        <h3>{data.age}</h3>
        <p>{data.email}</p>
      </div>
    </div>
  );
};

export default Friend;
