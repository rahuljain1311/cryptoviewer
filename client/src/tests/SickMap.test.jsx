import React from "react";
import ReactDOM from "react-dom";
import SickMap from "../components/SickMap";
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

const { it, expect } = window;

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <SickMap
        authCheck={() => {}}
        updateMapReference={() => {}}
        locations={[]}
        campaignNo={1}
        insuranceNo={1}
        routeToUrl={() => () => {}}
        sickMap={{ currentDoctor: null }}
        updateSickMarker={() => {}}
        sliderRef={null}
        updateSliderRef={() => {}}
      />
    </Provider>,
    div
  );
});
/* 
 * it("shallow render", () => {
 *   const div = document.createElement("div");
 *   const wrapper = shallow(
 *     <Provider store={store}>
 *       <SickMap
 *         authCheck={() => {}}
 *         updateMapReference={() => {}}
 *         locations={[]}
 *         campaignNo={1}
 *         insuranceNo={1}
 *         routeToUrl={() => () => {}}
 *         sickMap={{ currentDoctor: null }}
 *         updateSickMarker={() => {}}
 *         sliderRef={null}
 *         updateSliderRef={() => {}}
 *       />
 *     </Provider>
 *   ).dive();
 *   expect(wrapper.find(".navbar-header")).to.have.length(1);
 * });*/
