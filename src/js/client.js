import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, useRouterHistory } from "react-router";
import { createHashHistory } from 'history'
import { Provider } from "react-redux"

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import store from "./store"

const app = document.getElementById('app'); //This is where you are inserting react stuff
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

ReactDOM.render(
  <Provider store={store}>
    <Router history={appHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Home}></IndexRoute>
      </Route>
    </Router>
  </Provider>,
app);
