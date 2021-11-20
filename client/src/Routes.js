import React from "react";
import { Switch, Route } from "react-router-dom";
import Vid from "./containers/Vid";
import Login from "./containers/Login";
import Home from "./containers/Home";
import PrivateRoute from "./utils/PrivateRoute.js";

// import Register from "./containers/Register";

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path="/vid/:id" component={Vid} />
      <Route exact path="/login" render={() => <Login />} />
      <PrivateRoute path="/" component={Home} />
      {/* 
      Not implemented for security purposes, let me know if needed:
      <Route exact path="/register" render={() => <Register />} /> 
      */}
    </Switch>
  );
}
