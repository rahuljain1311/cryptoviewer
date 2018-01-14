import React from "react";
import ReactDOM from "react-dom";
import AskFooter from "../components/AskFooter";

const { it } = window;

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AskFooter routeToUrl={() => () => {}} hideLearn />, div);
});
