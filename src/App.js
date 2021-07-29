import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login/Login";
import React, { useState } from "react";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
