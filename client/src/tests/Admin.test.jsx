import React from "react";
import ReactDOM from "react-dom";
import Admin from "../components/Admin";
import AdminView from "../containers/AdminView";
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

const { it } = window;
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

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <Admin
        isAdmin
        routeToLogin={() => {}}
        fetchProfiles={() => {}}
        updateAdminInput={() => {}}
        adminValidationFailure={() => {}}
        sendMessage={() => {}}
        email="sibi@psibi.in"
        phone="+91948384u23"
        insuranceNo={1}
        msgType="alert"
        onProgress
        validation={{ email: true, emailMsg: "some message" }}
        profiles={[{ insuranceNo: 1, firstName: "hello" }]}
        apiSuccess
        apiFailed={false}
      />
    </Provider>,
    div
  );
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <AdminView />
    </Provider>,
    div
  );
});
