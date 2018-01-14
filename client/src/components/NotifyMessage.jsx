import React from "react";
import PropTypes from "prop-types";
import redNotify from "../static/images/redNotify.png";

export default function NotifyMessage(props) {
  let style = {};
  if (props.index === 0) {
    style = {
      marginTop: "80px"
    };
  }

  return (
    <div className="container" style={style}>
      <div className="row patient-notify">
        <div className="col-xs-3">
          <img
            alt="notify"
            src={redNotify}
            className="img-responsive center-block"
          />
        </div>
        <div
          className="col-xs-9"
          style={{ position: "relative", left: "-17px" }}
        >
          <p>{props.msg}</p>
        </div>
      </div>
    </div>
  );
}

NotifyMessage.propTypes = {
  msg: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};
