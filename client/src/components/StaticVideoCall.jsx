import React, { Component } from "react";
import _ from "lodash";
import StaticScreen from "./StaticScreen";
import img from "../static/images/videoCall.png";

export default class StaticVideoCall extends Component {
  componentDidMount = () => {
    this.props.authCheck();
  };

  render = () => {
    return (
      <StaticScreen
        src={img}
        onClick={() => (window.location = "/videoCall")}
      />
    );
  };
}
