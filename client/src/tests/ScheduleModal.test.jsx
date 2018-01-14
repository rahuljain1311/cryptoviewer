import React from "react";
import ReactDOM from "react-dom";
import ScheduleModal from "../components/ScheduleModal";

const { it } = window;

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <ScheduleModal
      date={new Date()}
      bookAppointment={() => {}}
      showWallet={false}
      routeToUrl={() => {}}
    />,
    div
  );
});
