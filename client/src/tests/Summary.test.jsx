import React from "react";
import ReactDOM from "react-dom";
import SummaryPage from "../components/Summary";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, combineReducers } from "redux";
import LandingPage from "../components/LandingPage";
import createHistory from "history/createBrowserHistory";
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from "react-router-redux";
import { createLogger } from "redux-logger";
import { mount, shallow } from "enzyme";
import thunk from "redux-thunk";
import profile from "../reducers/profile";
import meta from "../reducers/meta";
import admin from "../reducers/admin";

const history = createHistory();

const loggerMiddleware = createLogger();
const historyMiddleware = routerMiddleware(history);
const middleware = [thunk, historyMiddleware, loggerMiddleware];

const reducers = combineReducers({
  profile,
  meta,
  admin,
  routing: routerReducer
});
const store = createStore(reducers, applyMiddleware(...middleware));

const { it } = window;

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <SummaryPage
        authCheck={() => {}}
        fetchSummaryDetails={() => {}}
        routeToUrl={() => () => {}}
        summaryDetail={{
          whatToExpectNow: ["hi", "bye"],
          youOwe: "you owe",
          alert: "alert",
          landingPageGreeting: "greeting"
        }}
      />
    </Provider>,
    div
  );
});
