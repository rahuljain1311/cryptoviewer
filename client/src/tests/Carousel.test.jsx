import React from "react";
import ReactDOM from "react-dom";
import Carousel from "../components/Carousel";

const { it } = window;

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Carousel
      updateSliderRef={() => {}}
      locations={[]}
      index={1}
      updateCurrentMarker={() => () => {}}
      routeToUrl={() => () => {}}
      msg="hello haskell"
    />,
    div
  );
});

it("renders without crashing - with data", () => {
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
  const pharmacy = {
    index: 1,
    name: "hello",
    isFree: true,
    distance,
    isWalkIn: true,
    waitTime,
    hours: [],
    cost: { min: 3, max: 9, unit: "$" },
    isPCP: true,
    style: {},
    overridePCP: true,
    bookPcpAppointment: () => {},
    updatePcpScheduledTime: () => {},
    authCheck: () => {},
    key: 1,
    doctorNo: 1
  };

  ReactDOM.render(
    <Carousel
      updateSliderRef={() => {}}
      locations={[pharmacy]}
      index={1}
      updateCurrentMarker={() => () => {}}
      routeToUrl={() => () => {}}
      msg="hello haskell"
    />,
    div
  );
});

it("renders without crashing - with data", () => {
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
  const pharmacy = {
    index: 1,
    name: "hello",
    isFree: false,
    distance,
    isWalkIn: false,
    waitTime,
    hours: [],
    cost: { min: 3, max: 9, unit: "$" },
    isPCP: false,
    style: {},
    overridePCP: false,
    bookPcpAppointment: () => {},
    updatePcpScheduledTime: () => {},
    authCheck: () => {},
    key: 1,
    pharmacyNo: 1
  };

  ReactDOM.render(
    <Carousel
      updateSliderRef={() => {}}
      locations={[pharmacy, pharmacy]}
      index={1}
      updateCurrentMarker={() => () => {}}
      routeToUrl={() => () => {}}
      msg="hello haskell"
    />,
    div
  );
});
