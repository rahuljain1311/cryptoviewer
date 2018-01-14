import React, { Component } from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from "react-router-redux";
import { Route, Redirect } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import thunk from "redux-thunk";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./static/css/bootstrap.css";
import "./static/css/main.css";
import "./static/css/font-awesome.css";

import LandingPageView from "./containers/LandingPageView";
import PharmacyView from "./containers/PharmacyView";
import SummaryView from "./containers/SummaryView";
import PharmacyDetailView from "./containers/PharmacyDetailView";
import AdminView from "./containers/AdminView";
import AdminLogin from "./components/AdminLogin";
import LearnFluView from "./containers/LearnFluView";
import StaticWalletView from "./containers/StaticWalletView";
import SickView from "./containers/SickView";
import SickMapView from "./containers/SickMapView";
import FluMapView from "./containers/FluMapView";
import NotFound from "./components/NotFound";
import profile from "./reducers/profile";
import meta from "./reducers/meta";
import admin from "./reducers/admin";
import {
  StaticVideoChatView,
  StaticVideoCallView
} from "./containers/StaticWalletView";

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

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Route
              exact
              path="/"
              render={() => <Redirect to="/profile/1/1" />}
            />
            <Route
              exact
              path="/profile/:campaignNo/:insuranceNo"
              component={LandingPageView}
            />
            <Route
              exact
              path="/learn/:campaignNo/:insuranceNo"
              component={LearnFluView}
            />
            <Route
              exact
              path="/wallet/:pharmacyNo"
              component={StaticWalletView}
            />
            <Route
              exact
              path="/videochat/:campaignNo/:insuranceNo"
              component={StaticVideoChatView}
            />
            <Route exact path="/videoCall" component={StaticVideoCallView} />
            <Route
              exact
              path="/sick/:campaignNo/:insuranceNo"
              component={SickView}
            />
            <Route
              exact
              path="/pharmacy/:campaignNo/:insuranceNo"
              component={PharmacyView}
            />
            <Route exact path="/map/flu" component={FluMapView} />
            <Route exact path="/map/sick" component={SickMapView} />
            <Route
              exact
              path="/pharmacy/:pharmacyNo"
              component={PharmacyDetailView}
            />
            <Route
              exact
              path="/summary/:insuranceNo/:campaignNo"
              component={SummaryView}
            />
            <Route exact path="/admin" component={AdminView} />
            <Route exact path="/login" component={AdminLogin} />
            <Route exact path="/404" component={NotFound} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
