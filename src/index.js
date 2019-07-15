import React from "react";
import ReactDOM from "react-dom";
import { Router, withRouter } from "react-router-dom";
import history from "./containers/auth-zero/history";
import "./index.css";
import App from "./App";
import * as Sentry from "@sentry/browser";

const AppWithRouter = withRouter(App);

Sentry.init({
  dsn: "https://21869e247bc34426948c638aed297a3a@sentry.io/1505550"
});

ReactDOM.render(
  <Router history={history}>
    <AppWithRouter />
  </Router>,
  document.getElementById("root")
);
