import React from "react";
import { Redirect, Route } from "react-router";
import { getCurrentUser } from "../../services/authService";

const PrivateRoute = ({ children, ...rest }) => {
  const user = getCurrentUser();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user? (
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

export default PrivateRoute;
