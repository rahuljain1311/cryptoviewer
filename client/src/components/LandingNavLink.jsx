import React from "react";
import PropTypes from "prop-types";
import rightArrow from "../static/images/rightArrow.png";

export default function LandingNavLink(props) {
  const { index, msg, icon } = props;
  const style = index === 0 ? { marginTop: "15px" } : {};

  return (
    <div className="container" style={style}>
      <div className="row patient-nav" onClick={props.routeToUrl}>
        <div className="col-xs-3">
          <img alt="icon" src={icon} className="img-responsive center-block" />
        </div>
        <div className="col-xs-7">
          <p>{msg}</p>
        </div>
        <div className="col-xs-2">
          <img
            alt="arrow"
            className="img-responsive center-block"
            src={rightArrow}
          />
        </div>
      </div>
    </div>
  );
}

LandingNavLink.propTypes = {
  index: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  routeToUrl: PropTypes.func.isRequired
};
