import React, { Component } from "react";
import _ from "lodash";
import StaticScreen from "./StaticScreen";
import vc1 from "../static/images/videoChat1.png";

export default class StaticVideoChat extends Component {
  componentDidMount = () => {
    this.props.authCheck();
  };

  render = () => {
    return (
      <StaticScreen src={vc1} onClick={this.props.routeToUrl("/videoCall")} />
    );
  };
}
