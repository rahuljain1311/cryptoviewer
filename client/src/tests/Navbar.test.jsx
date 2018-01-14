import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../components/Navbar";

const { it } = window;

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Navbar
      msg="hello"
      backButton
      goBack={() => {}}
      logout={() => {}}
      menu
      splashShown
      routeToUrl={() => {}}
    />,
    div
  );
});
