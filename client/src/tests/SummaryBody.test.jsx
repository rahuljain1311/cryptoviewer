import React from "react";
import ReactDOM from "react-dom";
import SummaryBody from "../components/SummaryBody";

const { it } = window;

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SummaryBody whatToExpectNow={["hi", "bye"]} />, div);
});
