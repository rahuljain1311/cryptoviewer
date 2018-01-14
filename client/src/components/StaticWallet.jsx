import React, { Component } from "react";
import _ from "lodash";
import StaticScreen from "./StaticScreen";
import wallet1 from "../static/images/wallet1.png";
import wallet2 from "../static/images/wallet2.png";
import wallet3 from "../static/images/wallet3.png";
import wallet4 from "../static/images/wallet4.png";
import wallet5 from "../static/images/wallet5.png";

export default class StaticWallet extends Component {
  componentDidMount = () => {
    this.props.authCheck();
  };

  render = () => {
    const { props } = this;
    const images = _.zipObject(_.range(1, 6), [
      wallet1,
      wallet2,
      wallet3,
      wallet4,
      wallet5
    ]);

    const image = images[props.pharmacyNo];

    return (
      <StaticScreen src={image} style={{ position: "relative", top: "50px" }} />
    );
  };
}
