import React from "react";
import { Redirect, Route } from "react-router";
import { getCurrentUser } from "../../services/authService";

const PrivateCustomer = ({ children, ...rest }) => {
  const user = getCurrentUser();
//   const isCustomer = user && user.userType === "customer";
  const isCustomer = true;
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
      isCustomer? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateCustomer;
