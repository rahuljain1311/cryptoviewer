import React from "react";
import ReactDOM from "react-dom";
import MapArea from "../components/MapArea";
import { Provider } from "react-redux";
import { gmapUrl } from "../helpers/utils";
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
      <MapArea
        loadingElement={<div />}
        containerElement={<div style={{ height: "78vh", marginTop: "22vh" }} />}
        mapElement={<div style={{ height: "78vh" }} />}
        locations={[]}
        googleMapURL={gmapUrl}
      />
    </Provider>,
    div
  );
});

it("renders without crashing with locations", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <MapArea
        loadingElement={<div />}
        containerElement={<div style={{ height: "78vh", marginTop: "22vh" }} />}
        mapElement={<div style={{ height: "78vh" }} />}
        locations={[{ latitude: null, longitude: null }]}
        googleMapURL={gmapUrl}
        sickMap={{ currentDoctor: 1 }}
        updateSickMarker={() => {}}
        sliderRef={null}
      />
    </Provider>,
    div
  );
});
