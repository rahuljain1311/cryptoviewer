import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import _ from "lodash";
import logo from "../logo.png";

function Navbar(props) {
  const { backButton, msg, menu, splashShown } = props;

  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className={classNames("navbar-toggle collapsed", {
              collapse: !menu
            })}
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false"
            style={{ position: "absolute", right: 0 }}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <span
            className={classNames("glyphicon glyphicon-menu-left navbar-back", {
              collapse: !backButton
            })}
            aria-hidden="true"
            onClick={() => {
              if (splashShown === true) {
                props.goBack()();
              } else {
                props.routeToUrl("/")();
              }
            }}
          />
          <a className="navbar-brand" onClick={props.routeToUrl("/")}>
            <img alt="Brand" src={logo} />
          </a>
        </div>
        <div
          className={classNames("collapse navbar-collapse")}
          id="bs-example-navbar-collapse-1"
        >
          <ul
            className={classNames("nav navbar-nav navbar-right", {
              collapse: !menu
            })}
          >
            <li>
              <a style={{ color: "white" }} onClick={props.logout}>
                LOGOUT
              </a>
            </li>
          </ul>
        </div>
        {!_.isNull(msg) && (
          <div className="row sub-header">
            <div className="col-xs-12 center-block text-center">
              <p>{msg}</p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  msg: PropTypes.string,
  backButton: PropTypes.bool,
  goBack: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  menu: PropTypes.bool,
  splashShown: PropTypes.bool.isRequired,
  routeToUrl: PropTypes.func.isRequired
};

Navbar.defaultProps = {
  msg: null,
  backButton: false,
  menu: false
};

export default Navbar;
