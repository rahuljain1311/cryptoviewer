import React from "react";
import ReactDOM from "react-dom";
import LandingNavLink from "../components/LandingNavLink";

const { it } = window;

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <LandingNavLink
      index={1}
      icon="fa"
      msg="something"
      routeToUrl={() => {}}
    />,
    div
  );
});
