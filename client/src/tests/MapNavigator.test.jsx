import React from "react";
import ReactDOM from "react-dom";
import MapNavigator from "../components/MapNavigator";

const { it } = window;

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MapNavigator
      msg="msg"
      backRoute={() => {}}
      mapRoute={() => {}}
      primary="map"
    />,
    div
  );
});
