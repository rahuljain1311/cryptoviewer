import React from "react";
import ReactDOM from "react-dom";
import Pharmacy from "../components/Pharmacy";

const { it } = window;

it("renders without crashing", () => {
  const div = document.createElement("div");
  const distance = {
    value: 2,
    unit: "dfd"
  };
  const waitTime = {
    start: 8,
    end: 3,
    unit: "miles"
  };
  const hours = [];

  ReactDOM.render(
    <Pharmacy
      index={1}
      name="hello"
      isFree
      distance={distance}
      isWalkIn
      waitTime={waitTime}
      hours={hours}
      cost={{ min: 3, max: 9, unit: "$" }}
      isPCP
      style={{}}
      overridePCP
      bookPcpAppointment={() => {}}
      updatePcpScheduledTime={() => {}}
      authCheck={() => {}}
    />,
    div
  );
});
