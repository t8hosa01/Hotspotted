// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-spa";
import history from "./utils/history";
import { BackendAPIProvider } from "./utils/backendAPI";

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    client_id={process.env.REACT_APP_AUTH_CLIENT}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
    audience={process.env.REACT_APP_AUTH_AUDIENCE}
  >
    <BackendAPIProvider>
      <App />
    </BackendAPIProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();