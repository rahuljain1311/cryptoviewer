import React from "react";
import ReactDOM from "react-dom";
import SummaryInformation from "../components/SummaryInformation";

const { it } = window;

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <SummaryInformation routeToUrl={() => {}} alert="alert" />,
    div
  );
});
