import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default function MapNavigator(props) {
  return (
    <div className="container list-view-header">
      <div className="row center-block">
        <div className="col-xs-12 pharmacy-header">
          <p className="text-center">{props.msg}</p>
        </div>
      </div>

      <div className="row switcher center-block">
        <div className="col-xs-offset-1 col-xs-5 zpadding">
          <button
            onClick={props.backRoute}
            className={classNames("btn btn-block", {
              "btn-primary": props.primary === "list",
              "btn-default": props.primary === "map"
            })}
          >
            List
          </button>
        </div>

        <div className="col-xs-5 zpadding">
          <button
            onClick={props.mapRoute}
            className={classNames("btn btn-block", {
              "btn-primary": props.primary === "map",
              "btn-default": props.primary === "list"
            })}
          >
            Map
          </button>
        </div>
      </div>
    </div>
  );
}

MapNavigator.propTypes = {
  msg: PropTypes.string.isRequired,
  backRoute: PropTypes.func.isRequired,
  mapRoute: PropTypes.func.isRequired,
  primary: PropTypes.string.isRequired
};
