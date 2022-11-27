import React from "react";
import { getCurrentUser } from "../../../services/authService";

const CustomerProfile = () => {
  const user = getCurrentUser();
  return (
    <div>
      <h1>Current Customer info</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Id: {user._id}</p>
    </div>
  );
};

export default CustomerProfile;
