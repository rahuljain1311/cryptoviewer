import React from "react";
import ReactDOM from "react-dom";
import CopyModal from "../components/Navbar";

const { it } = window;

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <CopyModal
      phone="393u949"
      email="sibi@psibi.in"
      profile="alert"
      msgType="alert"
      expirtyUnit="minutes"
      expirtyTime="1"
      routeToUrl={() => {}}
    />,
    div
  );
});
