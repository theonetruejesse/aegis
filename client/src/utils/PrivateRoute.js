import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  const location = useLocation();
  let searchParam = `?next=${location.pathname}`;
  if (location.pathname === "/") {
    searchParam = "";
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              search: searchParam || null,
            }}
          />
        );
      }}
    ></Route>
  );
}
