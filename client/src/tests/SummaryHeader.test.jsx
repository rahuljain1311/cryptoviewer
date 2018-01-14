import React from "react";
import ReactDOM from "react-dom";
import SummaryHeader from "../components/SummaryHeader";

const { it } = window;

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <SummaryHeader
      coverage="ccc"
      youOwe="something"
      landingPageGreeting="greeting"
    />,
    div
  );
});

it("renders without crashing - diff props", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <SummaryHeader
      coverage="ccc - something"
      youOwe="something - jack"
      landingPageGreeting="greeting new"
    />,
    div
  );
});
