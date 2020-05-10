// src/App.js

import React from "react";
import NavBar from "./components/NavBar";
import map from "./components/MapBox";
import Frontpage from "./components/Frontpage";
import OverviewPage from "./components/OverviewPage/OverviewPage"
import AdminPage from "./components/AdminPage/AdminPage"

import { Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute"
import history from "./utils/history";

import { GoogleAPIProvider } from "./utils/googleAPI";

function App() {
  return (
    <div className="App">
      <style> {'body { background-color: #d7f1f1; }'}</style>
      <Router history={history}>
        <NavBar />
        <Switch>
          <Route path="/" exact component = {Frontpage}/>
          <Route exact path="/hotspot/:slug" component={OverviewPage} />
          <PrivateRoute exact path="/admin" component={AdminPage} />
          <GoogleAPIProvider>
            <Route exact path="/map/:lat/:lng/:zoom" component={map} />
          </GoogleAPIProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;