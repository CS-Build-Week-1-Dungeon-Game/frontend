import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import Login from "./Components/Login";
import Register from "./Components/Register";
import WorldPage from "./Components/WorldPage";

export default function AppRouter() {
  return (
    <div className="page-view-ui">
      <Switch>
        <Route path="/register" component={Register} />
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/world" component={WorldPage} />
      </Switch>
    </div>
  );
}
