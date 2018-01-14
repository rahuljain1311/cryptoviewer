import React from "react";
import ReactDOM from "react-dom";
import NotifyMessage from "../components/NotifyMessage";

const { it } = window;

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<NotifyMessage index={1} msg="hello haskell" />, div);
});

it("renders without crashing - diff props", () => {
  const div = document.createElement("div");
  ReactDOM.render(<NotifyMessage index={0} msg="hello haskell" />, div);
});
