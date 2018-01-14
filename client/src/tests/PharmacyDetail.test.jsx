import React from "react";
import ReactDOM from "react-dom";
import PharmacyDetail from "../components/PharmacyDetail";

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
  const distance = {
    value: 2,
    unit: "dfd"
  };
  const waitTime = {
    start: 8,
    end: 3,
    unit: "miles"
  };
  const pharmacy = {
    index: 1,
    name: "hello",
    isFree: false,
    distance,
    isWalkIn: false,
    waitTime,
    hours: [],
    cost: { min: 3, max: 9, unit: "$" },
    isPCP: false,
    style: {},
    overridePCP: false,
    bookPcpAppointment: () => {},
    updatePcpScheduledTime: () => {},
    authCheck: () => {},
    key: 1,
    pharmacyNo: 1
  };
  ReactDOM.render(
    <Provider store={store}>
      <PharmacyDetail
        authCheck={() => {}}
        pharmacy={pharmacy}
        schedule={{ scheduled: true, time: Date() }}
        bookAppointment={() => {}}
        routeToUrl={() => () => {}}
        updateScheduledTime={() => {}}
      />
    </Provider>,
    div
  );
});
