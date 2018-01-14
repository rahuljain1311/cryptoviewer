import React from "react";
import ReactDOM from "react-dom";
import SplashScreen from "../components/SplashSreen";

const { it } = window;

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SplashScreen />, div);
});
